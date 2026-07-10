import React, { useState } from 'react';
import { Lab } from '../types';
import { Download, Copy, Check, Sparkles, BookOpenCheck, HelpCircle, ArrowRight, ShieldCheck, FileCode } from 'lucide-react';

interface LabsProps {
  labs: Lab[];
}

export default function Labs({ labs }: LabsProps) {
  const [selectedLabId, setSelectedLabId] = useState<number>(1);
  const [activeCodeTab, setActiveCodeTab] = useState<'starter' | 'solution'>('starter');
  const [copied, setCopied] = useState(false);

  const selectedLab = labs.find((l) => l.id === selectedLabId) || labs[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/50 dark:border-white/10 pb-6">
        <div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Practical Labs Portal
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Gain practical confidence by building, profiling, and debugging 12 advanced collection systems.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="rounded-full bg-indigo-100 dark:bg-indigo-950/40 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200/20 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            12 Active Scenarios
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Lab selection drawer */}
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 px-3 mb-2">
            Select Lab Assignment
          </h2>
          <div className="max-h-[600px] overflow-y-auto space-y-1 pr-2">
            {labs.map((lab) => (
              <button
                key={lab.id}
                id={`lab-select-${lab.id}`}
                onClick={() => {
                  setSelectedLabId(lab.id);
                  setActiveCodeTab('starter');
                }}
                className={`w-full text-left rounded-xl px-4 py-3.5 text-xs transition-all border flex items-center gap-3 ${
                  selectedLabId === lab.id
                    ? 'bg-indigo-500/10 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 dark:border-white/10 backdrop-blur-md shadow-lg font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-white/5 border-transparent hover:border-slate-200/50 dark:hover:border-white/10 font-medium'
                }`}
              >
                <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  selectedLabId === lab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                }`}>
                  {lab.id}
                </div>
                <span className="truncate">{lab.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lab details main stage */}
        <div className="lg:col-span-3 space-y-8">
          {/* Lab Overview Header */}
          <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 space-y-4 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                Lab Assignment #{selectedLab.id} &bull; {selectedLab.topic} Module
              </span>
              <button
                onClick={() => handleDownloadFile(`${selectedLab.title.replace(/\s+/g, '')}.java`, selectedLab.starterCode)}
                id="download-starter-btn"
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 text-xs font-semibold text-white transition-all shadow-lg shadow-indigo-500/15 active:scale-95 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                Download Starter Code
              </button>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {selectedLab.title}
            </h2>
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 flex items-center gap-1">
                <BookOpenCheck className="h-4 w-4 text-indigo-500" />
                Laboratory Objective
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
                {selectedLab.objective}
              </p>
            </div>
          </div>

          {/* Core Problem Statement and Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 space-y-4 shadow-lg">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileCode className="h-4 w-4 text-indigo-500" />
                Problem Statement
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedLab.problemStatement}
              </p>

              {/* Sample input output panel */}
              <div className="rounded-lg bg-slate-100/50 dark:bg-black/20 p-4 space-y-2 border border-slate-200/50 dark:border-white/10 backdrop-blur-sm">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Sample I/O:</h4>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 space-y-1.5">
                  <p><strong>Input:</strong> {selectedLab.sampleInputOutput.input}</p>
                  <pre className="text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-black/40 p-2 rounded border border-slate-200/50 dark:border-white/10 mt-1 whitespace-pre-wrap">
                    {selectedLab.sampleInputOutput.output}
                  </pre>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 space-y-4 shadow-lg">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ArrowRight className="h-4 w-4 text-emerald-500" />
                Step-by-Step Tasks
              </h3>
              <ol className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                {selectedLab.tasks.map((task, i) => (
                  <li key={i} className="flex gap-2.5 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-[10px]">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{task}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Code Viewer Stage */}
          <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-lg overflow-hidden">
            {/* Tab Controllers */}
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 backdrop-blur-sm px-4 py-2">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setActiveCodeTab('starter')}
                  id="tab-select-starter-code"
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeCodeTab === 'starter'
                      ? 'bg-white/80 dark:bg-white/10 border border-slate-200/50 dark:border-white/10 text-indigo-600 dark:text-indigo-400 backdrop-blur-sm shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Starter Template
                </button>
                <button
                  onClick={() => setActiveCodeTab('solution')}
                  id="tab-select-solution-code"
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeCodeTab === 'solution'
                      ? 'bg-white/80 dark:bg-white/10 border border-slate-200/50 dark:border-white/10 text-indigo-600 dark:text-indigo-400 backdrop-blur-sm shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Reference Solution
                </button>
              </div>

              <button
                onClick={() => handleCopyCode(activeCodeTab === 'starter' ? selectedLab.starterCode : selectedLab.solutionCode)}
                id="copy-lab-code-btn"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/10 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            {/* Code pane */}
            <div className="p-4 bg-slate-950/85 text-slate-300 font-mono text-xs overflow-x-auto max-h-[450px] border-t border-slate-200/50 dark:border-white/10 shadow-inner">
              <pre><code>{activeCodeTab === 'starter' ? selectedLab.starterCode : selectedLab.solutionCode}</code></pre>
            </div>
          </div>

          {/* Instructor Notes / Hints Gate */}
          <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-indigo-500" />
              Instructor Discussion Guidelines & Test Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-650 dark:text-slate-400 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <HelpCircle className="h-3.5 w-3.5 text-indigo-500" />
                  Teaching Hints:
                </h4>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-500 dark:text-slate-400">
                  {selectedLab.instructorHints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  Unit Verification Checklist:
                </h4>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-500 dark:text-slate-400">
                  {selectedLab.testCases.map((tc, i) => (
                    <li key={i}>{tc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
