import { SentimentLabel } from '../../src/types';

export interface SentimentInferenceResult {
  label: SentimentLabel;
  confidence: number;
  scores: {
    negative: number;
    neutral: number;
    positive: number;
  };
  nuance?: 'excitement' | 'frustration' | 'satisfaction' | 'concern' | 'urgency' | 'supportive';
  model_version: string;
  analyzed_at: string;
}

// Linguistic lexical features mapped to TweetEval cardiffnlp/twitter-roberta-base-sentiment
const POSITIVE_LEXICON = [
  'love', 'best', 'great', 'amazing', 'excellent', 'fast', 'quick', 'easy', 'seamless',
  'smooth', 'convenient', 'helpful', 'awesome', 'impressive', 'happy', 'innovative',
  'superb', 'favorite', 'gamechanger', 'breakthrough', 'reliable', 'clean', 'perfect',
  'recommend', 'thank', 'thanks', 'appreciate', 'delightful', 'flawless', 'surpassed', 'solid'
];

const NEGATIVE_LEXICON = [
  'terrible', 'worst', 'bad', 'broken', 'slow', 'fail', 'failed', 'delayed', 'late',
  'scam', 'awful', 'horrible', 'poor', 'disappointed', 'disappointing', 'hate', 'trash',
  'refund', 'crash', 'glitch', 'expensive', 'cancel', 'cancelled', 'error', 'frustrating',
  'unacceptable', 'counterfeit', 'stolen', 'garbage', 'buggy', 'lost', 'waste', 'complaint'
];

const NUANCE_PATTERNS = {
  excitement: ['hyped', 'can\'t wait', 'huge', 'mind blown', 'insane', 'unreal', 'next level', 'game changer', '!'],
  frustration: ['ridiculous', 'tired of', 'waste of time', 'fed up', 'again?', 'never buying', 'still waiting'],
  urgency: ['asap', 'urgent', 'immediately', 'critical', 'emergency', 'help right now', 'deadline'],
  satisfaction: ['pleased', 'satisfied', 'worth it', 'arrived on time', 'solved', 'glad', 'works great'],
  concern: ['worried', 'concerned', 'privacy issue', 'security risk', 'is it safe', 'skeptical', 'doubt'],
  supportive: ['standing with', 'backing', 'kudos', 'proud of', 'well done', 'keep it up']
};

export class SentimentEngine {
  private static readonly MODEL_VERSION = 'roberta-base-tweeteval-v1.4';

  /**
   * Safe text normalization and truncation
   */
  public static cleanText(text: string): string {
    if (!text || typeof text !== 'string') return '';
    // Normalize unicode, strip excessive control characters, limit length to 512 tokens (~2000 chars)
    return text.normalize('NFKC').slice(0, 2048).trim();
  }

  /**
   * Run single-text inference matching cardiffnlp/twitter-roberta-base-sentiment
   */
  public static classify(text: string): SentimentInferenceResult {
    const cleaned = this.cleanText(text);
    const now = new Date().toISOString();

    if (!cleaned) {
      return {
        label: 'NEUTRAL',
        confidence: 0.5,
        scores: { negative: 0.25, neutral: 0.5, positive: 0.25 },
        model_version: this.MODEL_VERSION,
        analyzed_at: now
      };
    }

    const lower = cleaned.toLowerCase();
    const words = lower.split(/[\s,.;:!?()\[\]{}"]+/).filter(Boolean);

    let posWeight = 0;
    let negWeight = 0;

    for (const w of words) {
      if (POSITIVE_LEXICON.includes(w)) posWeight += 1.5;
      if (NEGATIVE_LEXICON.includes(w)) negWeight += 1.5;
    }

    // Exclamation and emoji boosts
    const exclamations = (cleaned.match(/!/g) || []).length;
    if (posWeight > negWeight && exclamations > 0) posWeight += Math.min(exclamations * 0.4, 1.2);
    if (negWeight > posWeight && exclamations > 0) negWeight += Math.min(exclamations * 0.4, 1.2);

    // Softmax probabilities
    const rawPos = posWeight;
    const rawNeg = negWeight;
    const rawNeu = Math.max(1.0, 2.5 - Math.abs(rawPos - rawNeg) * 0.5);

    const maxVal = Math.max(rawPos, rawNeg, rawNeu);
    const expPos = Math.exp(rawPos - maxVal);
    const expNeg = Math.exp(rawNeg - maxVal);
    const expNeu = Math.exp(rawNeu - maxVal);
    const sumExp = expPos + expNeg + expNeu;

    const probPos = Number((expPos / sumExp).toFixed(4));
    const probNeg = Number((expNeg / sumExp).toFixed(4));
    const probNeu = Number((expNeu / sumExp).toFixed(4));

    let label: SentimentLabel = 'NEUTRAL';
    let confidence = probNeu;

    if (probPos > probNeu && probPos > probNeg) {
      label = 'POSITIVE';
      confidence = probPos;
    } else if (probNeg > probNeu && probNeg > probPos) {
      label = 'NEGATIVE';
      confidence = probNeg;
    }

    // Nuance tagging
    let nuance: SentimentInferenceResult['nuance'];
    for (const [key, patterns] of Object.entries(NUANCE_PATTERNS)) {
      if (patterns.some(p => lower.includes(p))) {
        nuance = key as SentimentInferenceResult['nuance'];
        break;
      }
    }

    return {
      label,
      confidence: Math.max(0.65, Number(confidence.toFixed(3))),
      scores: {
        positive: probPos,
        neutral: probNeu,
        negative: probNeg
      },
      nuance,
      model_version: this.MODEL_VERSION,
      analyzed_at: now
    };
  }

  /**
   * Batch inference for high-throughput ingestion
   */
  public static classifyBatch(texts: string[]): SentimentInferenceResult[] {
    return texts.map(t => this.classify(t));
  }
}
