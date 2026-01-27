
import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { getPageInsights } from '../services/geminiService';
import { LinkPage } from '../types';

interface AIInsightPanelProps {
  page: LinkPage;
}

export const AIInsightPanel: React.FC<AIInsightPanelProps> = ({ page }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      const result = await getPageInsights(page);
      setInsight(result);
      setLoading(false);
    };
    fetchInsight();
  }, [page]);

  if (loading) {
    return (
      <div className="mt-8 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 animate-pulse">
        <div className="h-4 bg-indigo-100 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-indigo-100 rounded w-full"></div>
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
        <Sparkles className="w-12 h-12 text-indigo-600" />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">AI Brand Insight</h3>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed font-medium">
        {insight}
      </p>
    </div>
  );
};
