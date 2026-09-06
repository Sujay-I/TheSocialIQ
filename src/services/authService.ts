import { AuthUser, LoginCredentials, SignupData, OnboardingSetupData, AuthError, IntelligenceMode } from '../types';

const STORAGE_USERS_KEY = 'socialiq_registered_users';
const STORAGE_SESSION_KEY = 'socialiq_active_session';
const STORAGE_RESET_TOKENS_KEY = 'socialiq_pwd_reset_tokens';
const STORAGE_VERIFY_TOKENS_KEY = 'socialiq_verify_tokens';

interface StoredUserAccount {
  user: AuthUser;
  passwordHash: string;
  failedLoginAttempts?: number;
  lockedUntil?: number;
}

// Simple deterministic hash simulation so passwords are NEVER in plaintext
function hashPassword(password: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < password.length; i++) {
    hash ^= password.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return `sha256_sim_${hash.toString(16)}_${password.length * 7}`;
}

const DEFAULT_DEMO_USER: AuthUser = {
  id: 'usr-demo-001',
  firstName: 'Demo',
  lastName: 'User',
  name: 'Demo User',
  email: 'demo@socialiq.ai',
  emailVerified: true,
  onboardingCompleted: true,
  intelligenceMode: 'corporate',
  organizationId: 'amazon',
  organizationName: 'Amazon Inc.',
  role: 'Principal Intelligence Director',
  initials: 'DU',
  avatar: '',
  theme: 'system',
  notifications_enabled: true,
  authMethod: 'demo',
  createdAt: '2026-01-01T00:00:00Z',
  lastLoginAt: new Date().toISOString()
};

const DEFAULT_ALEX_USER: AuthUser = {
  id: 'usr-alex-002',
  firstName: 'Alex',
  lastName: 'Chen',
  name: 'Alex Chen',
  email: 'alex.chen@socialiq.ai',
  emailVerified: true,
  onboardingCompleted: true,
  intelligenceMode: 'corporate',
  organizationId: 'amazon',
  organizationName: 'Amazon Inc.',
  role: 'Principal Analyst',
  initials: 'AC',
  avatar: '',
  theme: 'system',
  notifications_enabled: true,
  authMethod: 'credentials',
  createdAt: '2026-01-15T00:00:00Z',
  lastLoginAt: new Date().toISOString()
};

function getStoredUsers(): StoredUserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      const initial: StoredUserAccount[] = [
        {
          user: DEFAULT_DEMO_USER,
          passwordHash: hashPassword('Demo1234!')
        },
        {
          user: DEFAULT_ALEX_USER,
          passwordHash: hashPassword('SocialIQ2026!')
        }
      ];
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read stored users', err);
    return [];
  }
}

function saveStoredUsers(users: StoredUserAccount[]) {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save stored users', err);
  }
}

interface ActiveSession {
  userId: string;
  token: string;
  expiresAt: number;
  rememberMe: boolean;
}

export class AuthService {
  /**
   * Get active authenticated user from session
   */
  static getCurrentUser(): AuthUser | null {
    try {
      const sessionRaw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!sessionRaw) return null;

      const session: ActiveSession = JSON.parse(sessionRaw);
      if (Date.now() > session.expiresAt) {
        // Expired
        localStorage.removeItem(STORAGE_SESSION_KEY);
        return null;
      }

      const users = getStoredUsers();
      const match = users.find(u => u.user.id === session.userId);
      return match ? match.user : null;
    } catch (err) {
      console.error('Error fetching current user session', err);
      return null;
    }
  }

  /**
   * Verify if session is currently valid
   */
  static isSessionValid(): boolean {
    const user = this.getCurrentUser();
    return user !== null;
  }

  /**
   * Authenticate with email and password
   */
  static async login(credentials: LoginCredentials): Promise<AuthUser> {
    // Artificial latency for realism
    await new Promise(r => setTimeout(r, 450));

    const email = credentials.email.trim().toLowerCase();
    const users = getStoredUsers();
    const account = users.find(u => u.user.email.toLowerCase() === email);

    if (!account) {
      const err: AuthError = {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email address or password. Please verify and try again.'
      };
      throw err;
    }

    // Check account lockout
    if (account.lockedUntil && account.lockedUntil > Date.now()) {
      const waitMin = Math.ceil((account.lockedUntil - Date.now()) / 60000);
      const err: AuthError = {
        code: 'ACCOUNT_LOCKED',
        message: `Account is temporarily locked due to repeated invalid attempts. Please try again in ${waitMin} minutes.`
      };
      throw err;
    }

    // Validate password hash
    const inputHash = hashPassword(credentials.password || '');
    if (account.passwordHash !== inputHash) {
      account.failedLoginAttempts = (account.failedLoginAttempts || 0) + 1;
      if (account.failedLoginAttempts >= 5) {
        account.lockedUntil = Date.now() + 15 * 60 * 1000; // 15 mins
      }
      saveStoredUsers(users);

      const err: AuthError = {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email address or password. Please verify and try again.'
      };
      throw err;
    }

    // Reset failed attempts
    account.failedLoginAttempts = 0;
    account.lockedUntil = undefined;
    account.user.lastLoginAt = new Date().toISOString();
    saveStoredUsers(users);

    // Create session
    const duration = credentials.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    const session: ActiveSession = {
      userId: account.user.id,
      token: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      expiresAt: Date.now() + duration,
      rememberMe: !!credentials.rememberMe
    };
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));

    return account.user;
  }

  /**
   * Fast Demo Login for hackathon evaluators
   */
  static async loginWithDemo(preferredMode?: IntelligenceMode): Promise<AuthUser> {
    await new Promise(r => setTimeout(r, 350));
    const users = getStoredUsers();
    let demoAccount = users.find(u => u.user.email === 'demo@socialiq.ai');

    if (!demoAccount) {
      demoAccount = {
        user: { ...DEFAULT_DEMO_USER },
        passwordHash: hashPassword('Demo1234!')
      };
      users.push(demoAccount);
    }

    if (preferredMode) {
      demoAccount.user.intelligenceMode = preferredMode;
    }

    demoAccount.user.lastLoginAt = new Date().toISOString();
    saveStoredUsers(users);

    const session: ActiveSession = {
      userId: demoAccount.user.id,
      token: `demo_sess_${Date.now()}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      rememberMe: true
    };
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));

    return demoAccount.user;
  }

  /**
   * Social OAuth (Google / Microsoft)
   */
  static async loginWithSocial(provider: 'google' | 'microsoft'): Promise<AuthUser> {
    await new Promise(r => setTimeout(r, 600));

    const email = provider === 'google' ? 'evaluator@gmail.com' : 'evaluator@microsoft.com';
    const users = getStoredUsers();
    let account = users.find(u => u.user.email.toLowerCase() === email);

    if (!account) {
      const newUser: AuthUser = {
        id: `usr-sso-${Date.now()}`,
        firstName: provider === 'google' ? 'Google' : 'Microsoft',
        lastName: 'Enterprise User',
        name: `${provider === 'google' ? 'Google' : 'Microsoft'} Enterprise User`,
        email,
        emailVerified: true,
        onboardingCompleted: true,
        intelligenceMode: 'corporate',
        organizationId: 'amazon',
        organizationName: 'Amazon Inc.',
        role: 'Enterprise Director',
        initials: provider === 'google' ? 'GU' : 'MU',
        authMethod: 'sso',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
      account = {
        user: newUser,
        passwordHash: hashPassword(Math.random().toString())
      };
      users.push(account);
      saveStoredUsers(users);
    }

    const session: ActiveSession = {
      userId: account.user.id,
      token: `sso_${provider}_${Date.now()}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      rememberMe: true
    };
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));

    return account.user;
  }

  /**
   * Sign up a new account
   */
  static async signup(data: SignupData): Promise<{ user: AuthUser; verificationToken: string }> {
    await new Promise(r => setTimeout(r, 500));

    const email = data.email.trim().toLowerCase();
    const users = getStoredUsers();

    if (users.some(u => u.user.email.toLowerCase() === email)) {
      const err: AuthError = {
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'An account with this email address already exists. Please sign in instead.'
      };
      throw err;
    }

    const initials = `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`.toUpperCase() || 'IQ';
    const newUser: AuthUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      name: `${data.firstName.trim()} ${data.lastName.trim()}`,
      email,
      emailVerified: false,
      onboardingCompleted: false,
      intelligenceMode: undefined,
      initials,
      role: 'Intelligence Strategist',
      authMethod: 'credentials',
      createdAt: new Date().toISOString()
    };

    const newAccount: StoredUserAccount = {
      user: newUser,
      passwordHash: hashPassword(data.password || 'SocialIQ#2026')
    };

    users.push(newAccount);
    saveStoredUsers(users);

    // Generate verification token
    const token = `verify_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const verifyTokens = JSON.parse(localStorage.getItem(STORAGE_VERIFY_TOKENS_KEY) || '{}');
    verifyTokens[email] = {
      token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };
    localStorage.setItem(STORAGE_VERIFY_TOKENS_KEY, JSON.stringify(verifyTokens));

    return { user: newUser, verificationToken: token };
  }

  /**
   * Verify email address
   */
  static async verifyEmail(tokenOrDemo?: string, email?: string): Promise<AuthUser> {
    await new Promise(r => setTimeout(r, 400));
    const users = getStoredUsers();

    // If specific email provided, find it
    let account = email ? users.find(u => u.user.email.toLowerCase() === email.toLowerCase()) : null;

    if (!account && users.length > 0) {
      // Find the most recent unverified user or first user
      account = users.find(u => !u.user.emailVerified) || users[0];
    }

    if (!account) {
      throw { code: 'UNAUTHORIZED', message: 'No pending account found for email verification.' } as AuthError;
    }

    account.user.emailVerified = true;
    saveStoredUsers(users);

    // Auto-login into session
    const session: ActiveSession = {
      userId: account.user.id,
      token: `sess_verified_${Date.now()}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      rememberMe: true
    };
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));

    return account.user;
  }

  /**
   * Resend verification email
   */
  static async resendVerification(email: string): Promise<void> {
    await new Promise(r => setTimeout(r, 300));
    const token = `verify_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const verifyTokens = JSON.parse(localStorage.getItem(STORAGE_VERIFY_TOKENS_KEY) || '{}');
    verifyTokens[email.toLowerCase()] = {
      token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };
    localStorage.setItem(STORAGE_VERIFY_TOKENS_KEY, JSON.stringify(verifyTokens));
  }

  /**
   * Forgot password request (generic security response)
   */
  static async forgotPassword(email: string): Promise<void> {
    await new Promise(r => setTimeout(r, 450));
    const cleanEmail = email.trim().toLowerCase();
    const token = `reset_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const tokens = JSON.parse(localStorage.getItem(STORAGE_RESET_TOKENS_KEY) || '{}');
    tokens[token] = {
      email: cleanEmail,
      expiresAt: Date.now() + 60 * 60 * 1000 // 1 hr
    };
    localStorage.setItem(STORAGE_RESET_TOKENS_KEY, JSON.stringify(tokens));
  }

  /**
   * Reset password with token
   */
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    await new Promise(r => setTimeout(r, 500));
    const tokens = JSON.parse(localStorage.getItem(STORAGE_RESET_TOKENS_KEY) || '{}');
    const record = tokens[token];

    // For demo/prototype convenience, accept standard demo tokens or validate record
    if (token !== 'demo-valid-token' && (!record || Date.now() > record.expiresAt)) {
      const err: AuthError = {
        code: record ? 'EXPIRED_RESET_TOKEN' : 'INVALID_RESET_TOKEN',
        message: 'This password reset link is invalid or has expired. Please request a new one.'
      };
      throw err;
    }

    const email = record ? record.email : 'alex.chen@socialiq.ai';
    const users = getStoredUsers();
    const account = users.find(u => u.user.email.toLowerCase() === email.toLowerCase());

    if (account) {
      account.passwordHash = hashPassword(newPassword);
      saveStoredUsers(users);
    }

    if (record) {
      delete tokens[token];
      localStorage.setItem(STORAGE_RESET_TOKENS_KEY, JSON.stringify(tokens));
    }
  }

  /**
   * Update current user profile fields
   */
  static async updateUser(updates: Partial<AuthUser>): Promise<AuthUser> {
    const current = this.getCurrentUser();
    if (!current) throw { code: 'UNAUTHORIZED', message: 'No active session.' } as AuthError;

    const users = getStoredUsers();
    const account = users.find(u => u.user.id === current.id);
    if (!account) throw { code: 'UNAUTHORIZED', message: 'User record not found.' } as AuthError;

    account.user = {
      ...account.user,
      ...updates,
      name: updates.firstName || updates.lastName
        ? `${updates.firstName || account.user.firstName} ${updates.lastName || account.user.lastName}`
        : account.user.name
    };

    saveStoredUsers(users);
    return account.user;
  }

  /**
   * Complete the Onboarding Wizard
   */
  static async completeOnboarding(setup: OnboardingSetupData): Promise<AuthUser> {
    const current = this.getCurrentUser();
    const userId = current ? current.id : DEFAULT_DEMO_USER.id;

    const users = getStoredUsers();
    let account = users.find(u => u.user.id === userId);

    if (!account) {
      account = {
        user: { ...DEFAULT_DEMO_USER },
        passwordHash: hashPassword('Demo1234!')
      };
      users.push(account);
    }

    account.user.onboardingCompleted = true;
    account.user.intelligenceMode = setup.intelligenceMode;
    if (setup.organizationName) {
      account.user.organizationName = setup.organizationName;
      account.user.organizationId = setup.organizationName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    saveStoredUsers(users);
    return account.user;
  }

  /**
   * Logout user and revoke session
   */
  static async logout(): Promise<void> {
    await new Promise(r => setTimeout(r, 200));
    localStorage.removeItem(STORAGE_SESSION_KEY);
  }
}

export const authService = AuthService;
