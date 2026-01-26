import { PREFERENCE_CATEGORIES, getAllTagsFlat } from '../../types/preferences';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const LifestylePicker = ({ onComplete }: { onComplete: () => void }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (id: string) => {
    setSelectedTags(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Customize Your Roadmap</h2>
        <p className="text-slate-500 mt-2 text-lg">Select 3+ things you enjoy. We'll find CME that fits your life.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PREFERENCE_CATEGORIES.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{category.emoji}</span>
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">{category.label}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${
                    selectedTags.includes(tag.id)
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300'
                  }`}
                >
                  <span>{tag.emoji}</span>
                  <span className="font-medium text-sm">{tag.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onComplete}
          disabled={selectedTags.length < 3}
          className={`px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all ${
            selectedTags.length >= 3 
            ? 'bg-slate-900 text-white shadow-xl hover:scale-105 active:scale-95' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Generate Personalized Roadmap
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};