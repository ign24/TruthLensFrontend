import { ref } from 'vue';

interface AnalysisResult {
  factualAccuracy: number;
  bias: 'left' | 'right' | 'neutral';
  emotionalLevel: string;
  recommendation: string;
}

export function useAnalysis() {
  const result = ref<AnalysisResult | null>(null);

  const analyzeContent = async (text: string): Promise<AnalysisResult> => {
    const response = await fetch('https://truthlens-backend-production.up.railway.app/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input_text: text })
    });

    const data = await response.json();

    const formatted: AnalysisResult = {
      factualAccuracy: data.factual_accuracy,
      bias: data.bias,
      emotionalLevel: data.emotional_tone,
      recommendation: data.recommendation
    };

    result.value = formatted;
    return formatted;
  };

  return {
    result,
    analyzeContent
  };
}