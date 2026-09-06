import {
  AnalyticsSummary,
  CascadeSimulationResult,
  Corporation,
  IngestionJob,
  IntelligenceMode,
  PersonalAnalyticsSummary,
  EducationAnalyticsSummary,
  PlatformType,
  SocialPost,
  TimeRange
} from '../types';

const BASE_URL = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || '';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    try {
      const res = await fetch(url, { ...options, headers });
      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          errorData = { message: `Request failed with status ${res.status}` };
        }
        throw new Error(errorData?.error?.message || errorData?.message || `HTTP ${res.status}`);
      }
      return await res.json();
    } catch (err: any) {
      console.error(`API error on ${url}:`, err);
      throw err;
    }
  }

  // Health
  async getHealth() {
    return this.request<{ status: string; api: boolean; database: boolean; model: boolean; model_version: string }>('/health');
  }

  // Corporations
  async getCorporations(): Promise<{ data: Corporation[] }> {
    return this.request<{ data: Corporation[] }>('/api/v1/corporations');
  }

  async getCorporation(id: string): Promise<{ data: Corporation }> {
    return this.request<{ data: Corporation }>(`/api/v1/corporations/${id}`);
  }

  async createCorporation(corp: Partial<Corporation>): Promise<{ data: Corporation }> {
    return this.request<{ data: Corporation }>('/api/v1/corporations', {
      method: 'POST',
      body: JSON.stringify(corp)
    });
  }

  async updateCorporation(id: string, updates: Partial<Corporation>): Promise<{ data: Corporation }> {
    return this.request<{ data: Corporation }>(`/api/v1/corporations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteCorporation(id: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/v1/corporations/${id}`, {
      method: 'DELETE'
    });
  }

  // Mode-aware Global Analytics
  async getModeAnalytics(params: {
    mode: IntelligenceMode;
    organization?: string;
    institution?: string;
    range?: TimeRange;
    platform?: string;
  }): Promise<{ mode: string; organization?: string; data: any }> {
    const query = new URLSearchParams();
    query.set('mode', params.mode);
    if (params.organization) query.set('organization', params.organization);
    if (params.institution) query.set('institution', params.institution);
    if (params.range) query.set('range', params.range);
    if (params.platform) query.set('platform', params.platform);

    return this.request<{ mode: string; organization?: string; data: any }>(`/api/v1/analytics?${query.toString()}`);
  }

  // Analytics
  async getAnalytics(id: string, range: TimeRange = '30D'): Promise<AnalyticsSummary> {
    return this.request<AnalyticsSummary>(`/api/v1/corporations/${id}/analytics?range=${range}`);
  }

  async getSentiment(id: string, range: TimeRange = '30D') {
    return this.request<any>(`/api/v1/corporations/${id}/sentiment?range=${range}`);
  }

  async getTrends(id: string, range: TimeRange = '30D') {
    return this.request<any>(`/api/v1/corporations/${id}/trends?range=${range}`);
  }

  async getNetwork(id: string) {
    return this.request<{ data: any }>(`/api/v1/corporations/${id}/network`);
  }

  async simulateCascade(id: string, nodeId: string = '@techinsider'): Promise<{ data: CascadeSimulationResult }> {
    return this.request<{ data: CascadeSimulationResult }>(`/api/v1/corporations/${id}/simulate-cascade`, {
      method: 'POST',
      body: JSON.stringify({ node_id: nodeId })
    });
  }

  // Posts
  async getPosts(
    id: string,
    params: { platform?: string; sentiment?: string; q?: string; page?: number; limit?: number } = {}
  ): Promise<{ data: SocialPost[]; meta: { total: number; page: number; limit: number; total_pages: number } }> {
    const query = new URLSearchParams();
    if (params.platform) query.set('platform', params.platform);
    if (params.sentiment) query.set('sentiment', params.sentiment);
    if (params.q) query.set('q', params.q);
    if (params.page) query.set('page', params.page.toString());
    if (params.limit) query.set('limit', params.limit.toString());

    return this.request(`/api/v1/corporations/${id}/posts?${query.toString()}`);
  }

  // Ingestion & Import
  async triggerIngest(id: string, platform: PlatformType = 'x'): Promise<{ message: string; job: IngestionJob }> {
    return this.request<{ message: string; job: IngestionJob }>(`/api/v1/corporations/${id}/ingest`, {
      method: 'POST',
      body: JSON.stringify({ platform })
    });
  }

  async importPosts(id: string, items: any[]): Promise<{ message: string; count: number }> {
    return this.request<{ message: string; count: number }>(`/api/v1/corporations/${id}/import`, {
      method: 'POST',
      body: JSON.stringify({ items })
    });
  }

  // Insights
  async getAIInsights(id: string) {
    return this.request<{ data: any }>(`/api/v1/corporations/${id}/insights`);
  }

  async generateAIInsights(id: string) {
    return this.request<{ data: any }>(`/api/v1/corporations/${id}/insights/generate`, {
      method: 'POST'
    });
  }

  // Reports
  async getExecutiveReport(id: string) {
    return this.request<{ data: any }>(`/api/v1/corporations/${id}/reports`);
  }

  getPostsCsvUrl(id: string): string {
    return `${BASE_URL}/api/v1/corporations/${id}/reports?format=csv`;
  }

  // Reset demo
  async resetDemoData() {
    return this.request<{ message: string }>('/api/v1/corporations/reset-demo', {
      method: 'POST'
    });
  }
}

export const api = new ApiClient();
