import React, { useState } from 'react';
import { Topic } from '../types';
import { Copy, Check, Terminal, ExternalLink, HelpCircle, Code } from 'lucide-react';

interface TopicsProps {
  topics: Topic[];
}

export default function Topics({ topics }: TopicsProps) {
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || 'list');
  const [copied, setCopied] = useState(false);

  const selectedTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-6">
      {/* Topics List sidebar */}
      <div className="lg:col-span-1 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 px-3 mb-4">
          Framework Modules
        </h2>
        <div className="space-y-1">
          {topics.map((topic) => (
            <button
              key={topic.id}
              id={`topic-select-${topic.id}`}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`w-full text-left rounded-xl px-4 py-3.5 text-xs font-semibold transition-all flex items-center justify-between border ${
                selectedTopicId === topic.id
                  ? 'bg-indigo-500/10 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 dark:border-white/10 backdrop-blur-md shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-white/5 border-transparent hover:border-slate-200/50 dark:hover:border-white/10'
              }`}
            >
              <span>{topic.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content browser */}
      <div className="lg:col-span-3 space-y-8 border-l border-slate-200/50 dark:border-white/10 lg:pl-8">
        {/* Header section */}
        <div className="space-y-3">
          <h1 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {selectedTopic.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {selectedTopic.description}
          </p>
        </div>

        {/* Key Concepts panel */}
        <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-5 space-y-3 shadow-lg">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
            Core Learning Concepts
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-400">
            {selectedTopic.keyConcepts.map((concept, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                <span>{concept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Explanation */}
        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-400 space-y-4">
          {selectedTopic.detailedContent.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('###')) {
              return (
                <h3 key={index} className="text-lg font-bold text-slate-900 dark:text-white pt-2 border-b border-slate-100/50 dark:border-white/10 pb-1">
                  {paragraph.replace('###', '').trim()}
                </h3>
              );
            }
            if (paragraph.startsWith('* **')) {
              // Special bullet list mapping
              return (
                <ul key={index} className="list-disc pl-5 space-y-1.5">
                  {paragraph.split('\n').map((item, itemIdx) => {
                    const cleaned = item.replace(/^\*\s+/, '').trim();
                    const boldPart = cleaned.match(/^\*\*(.*?)\*\*/)?.[1] || '';
                    const normalPart = cleaned.replace(/^\*\*.*?\*\*/, '').trim();
                    return (
                      <li key={itemIdx}>
                        {boldPart && <strong>{boldPart}</strong>}
                        {normalPart}
                      </li>
                    );
                  })}
                </ul>
              );
            }
            if (paragraph.startsWith('*')) {
              return (
                <ul key={index} className="list-disc pl-5 space-y-1">
                  {paragraph.split('\n').map((item, itemIdx) => (
                    <li key={itemIdx}>{item.replace(/^\*\s+/, '').trim()}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="leading-relaxed whitespace-pre-line">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Live Code Example snippet */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-indigo-500" />
              API Code Implementation Example
            </h3>
            <button
              onClick={() => handleCopyCode(selectedTopic.codeExample)}
              id="copy-code-topic-btn"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/10 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy Snippet
                </>
              )}
            </button>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/80 backdrop-blur-md p-4 font-mono text-xs text-slate-300 overflow-x-auto shadow-lg">
            <pre><code>{selectedTopic.codeExample}</code></pre>
          </div>
        </div>

        {/* Complexity Big-O Table */}
        {selectedTopic.complexityTable && (
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
              <Code className="h-4 w-4 text-indigo-500" />
              Asymptotic Complexity Analysis (Big-O)
            </h3>
            <div className="overflow-hidden rounded-xl border border-slate-200/50 dark:border-white/10 shadow-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100/50 dark:bg-white/5 backdrop-blur-sm text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200/50 dark:border-white/10">
                  <tr>
                    {Object.keys(selectedTopic.complexityTable[0]).map((key) => (
                      <th key={key} className="px-4 py-3 capitalize">{key.replace(/([A-Z])/g, ' $1')}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50 dark:divide-white/10 text-slate-700 dark:text-slate-300 bg-white/40 dark:bg-white/5 backdrop-blur-md">
                  {selectedTopic.complexityTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-100/30 dark:hover:bg-white/5 transition-colors">
                      {Object.values(row).map((val, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-3 font-mono text-slate-800 dark:text-slate-200">
                          <span className={val?.toString().includes('O(') ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}>
                            {val}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
