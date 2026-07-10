import React, { useState } from 'react';
import { Lab } from '../types';
import { ShieldAlert, BookOpen, Key, CheckCircle, BarChart2, MessageSquare, Terminal, Eye, FileText, UserCheck } from 'lucide-react';

interface AdminProps {
  labs: Lab[];
}

export default function Admin({ labs }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default true for developer ease, show lock screen on demand
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'solutions' | 'submissions' | 'discussions' | 'analytics'>('solutions');
  const [selectedLabId, setSelectedLabId] = useState<number>(1);

  const selectedLab = labs.find((l) => l.id === selectedLabId) || labs[0];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
    } else {
      setErrorMsg('Invalid Instructor Access Token');
    }
  };

  const studentSubmissions = [
    { student: 'Alice Johnson', lab: 'Lab 1: List Benchmarking', date: '2026-07-08', file: 'ListBenchmark.java', score: 100, status: 'Graded (Auto)' },
    { student: 'Bob Miller', lab: 'Lab 3: HashMap Collision', date: '2026-07-09', file: 'CollisionAnalysis.java', score: 85, status: 'Graded (Auto)' },
    { student: 'Charlie Davis', lab: 'Lab 12: Hashing Contract', date: '2026-07-10', file: 'BugDemo.java', score: 100, status: 'Graded (Auto)' },
    { student: 'Diana Prince', lab: 'Lab 11: Circular Queue', date: '2026-07-10', file: 'CircularQueue.java', score: 95, status: 'Graded (Auto)' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-md w-full border border-slate-200/50 dark:border-white/10 rounded-2xl p-8 bg-white/40 dark:bg-white/5 shadow-2xl backdrop-blur-md text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Instructor Authorization Portal</h2>
            <p className="text-xs text-slate-500 leading-relaxed">Enter your instructor-level security access token to review key solutions, rubrics, and discussion guides.</p>
          </div>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="password"
                placeholder="Access Token (Hint: admin123)"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full rounded-xl border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-slate-950/85 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {errorMsg && (
              <div className="text-rose-500 text-xs font-semibold text-center mt-1">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/15 cursor-pointer transition-all"
            >
              Authorize Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      {/* Title Header with credentials status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/50 dark:border-white/10 pb-6">
        <div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="h-8 w-8 text-indigo-500 shrink-0" />
            Instructor Resource Hub
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Review detailed, complete answers, classroom debate prompts, mock student submittals, and analytics stubs.
          </p>
        </div>

        {/* Sub-tabs controller */}
        <div className="flex flex-wrap bg-slate-100/50 dark:bg-white/5 p-1 rounded-lg border border-slate-200/50 dark:border-white/10 backdrop-blur-sm self-start">
          <button
            onClick={() => setActiveSubTab('solutions')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
              activeSubTab === 'solutions' ? 'bg-white/85 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/30 dark:border-white/5 backdrop-blur-sm' : 'text-slate-500'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Lab Keys
          </button>
          <button
            onClick={() => setActiveSubTab('submissions')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
              activeSubTab === 'submissions' ? 'bg-white/85 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/30 dark:border-white/5 backdrop-blur-sm' : 'text-slate-500'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" />
            Student submissions
          </button>
          <button
            onClick={() => setActiveSubTab('discussions')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
              activeSubTab === 'discussions' ? 'bg-white/85 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/30 dark:border-white/5 backdrop-blur-sm' : 'text-slate-500'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Debate Hints
          </button>
          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
              activeSubTab === 'analytics' ? 'bg-white/85 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/30 dark:border-white/5 backdrop-blur-sm' : 'text-slate-500'
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            Console Analytics
          </button>
        </div>
      </div>

      {/* solutions key View tab */}
      {activeSubTab === 'solutions' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 px-3 mb-2">Select Solution</h3>
            <div className="max-h-[500px] overflow-y-auto space-y-1">
              {labs.map((lab) => (
                <button
                  key={lab.id}
                  id={`sol-select-${lab.id}`}
                  onClick={() => setSelectedLabId(lab.id)}
                  className={`w-full text-left rounded-xl px-4 py-3 text-xs transition-all border cursor-pointer ${
                    selectedLabId === lab.id
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25 shadow-md font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-150/50 dark:hover:bg-white/10 border-transparent font-medium'
                  }`}
                >
                  Lab {lab.id}: {lab.title.split(' ')[0]}...
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-4 shadow-lg backdrop-blur-md">
              <span className="text-[10px] uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full px-2.5 py-1 font-bold text-indigo-600 dark:text-indigo-400">
                Official grading Solution key #{selectedLab.id}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{selectedLab.title}</h2>

              {/* Complete solutions source code view */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                  <span>Reference Source Code (.java)</span>
                </div>
                <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-slate-950/90 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[300px] shadow-inner">
                  <pre><code>{selectedLab.solutionCode}</code></pre>
                </div>
              </div>

              {/* Instructor testing validations */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Unit Verification Checklist</h4>
                <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  {selectedLab.testCases.map((tc, idx) => (
                    <li key={idx}>{tc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discussions Hints Tab */}
      {activeSubTab === 'discussions' && (
        <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-6 shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <MessageSquare className="h-5.5 w-5.5 text-indigo-500" />
            Classroom Discussion Prompt Guide
          </h2>
          <div className="divide-y divide-slate-200/50 dark:divide-white/10 space-y-4">
            {labs.slice(0, 6).map((lab) => (
              <div key={lab.id} className="pt-4 first:pt-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Lab {lab.id} Prompt: {lab.title}</h4>
                <p className="text-xs text-slate-500 mt-1 italic">Teaching Question: Why must students understand the difference between abstract collection interface rules and concrete mechanics here?</p>
                <div className="mt-2.5 rounded-xl bg-slate-100/50 dark:bg-slate-950/60 p-4 text-xs text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/10">
                  <strong>Discussion Core Answer:</strong> {lab.instructorHints[0] || 'Clarify runtime memory shifting and heap pressure issues.'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mock submissions tracker queue */}
      {activeSubTab === 'submissions' && (
        <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 overflow-hidden shadow-lg backdrop-blur-md">
          <div className="bg-slate-100/50 dark:bg-white/5 border-b border-slate-200/50 dark:border-white/10 px-6 py-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-indigo-500" />
              Student Laboratory submissions queue
            </h3>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              4 Pending Review
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100/30 dark:bg-white/5 text-slate-500 font-semibold border-b border-slate-200/50 dark:border-white/10">
                <tr>
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Lab Name</th>
                  <th className="px-6 py-3">File Submitted</th>
                  <th className="px-6 py-3">Submit Date</th>
                  <th className="px-6 py-3 text-center">Score</th>
                  <th className="px-6 py-3 text-center">Review Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-white/10 text-slate-700 dark:text-slate-300">
                {studentSubmissions.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-150/50 dark:hover:bg-white/10 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{sub.student}</td>
                    <td className="px-6 py-4">{sub.lab}</td>
                    <td className="px-6 py-4 font-mono text-slate-500">{sub.file}</td>
                    <td className="px-6 py-4 text-slate-500">{sub.date}</td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-650 dark:text-emerald-400">{sub.score}/100</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="h-3 w-3" />
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Stub Console */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-2 shadow-lg backdrop-blur-md text-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Class Average Score</span>
              <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">92.4%</p>
              <p className="text-[10px] text-slate-400">calculated across 18 enrolled students</p>
            </div>
            <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-2 shadow-lg backdrop-blur-md text-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Most Difficult Lab</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white">Lab 5: Concurrency</p>
              <p className="text-[10px] text-slate-400">Avg score: 81.2% (requires thread-safety)</p>
            </div>
            <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-2 shadow-lg backdrop-blur-md text-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Class Progress Index</span>
              <p className="text-3xl font-black text-emerald-500">88.5%</p>
              <p className="text-[10px] text-slate-400">completion rate across 12 modules</p>
            </div>
          </div>

          {/* Console analytics logger */}
          <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-slate-950/90 p-5 space-y-3 shadow-lg backdrop-blur-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-indigo-400" />
              Console Analytics Logging Stub
            </h3>
            <div className="font-mono text-[10px] sm:text-xs text-slate-400 space-y-1 h-[200px] overflow-y-auto leading-relaxed">
              <div>[ANALYTICS] Loading classroom index table...</div>
              <div>[ANALYTICS] Student roster populated: 18 active directory targets.</div>
              <div>[ANALYTICS] Computing aggregated statistics...</div>
              <div className="text-sky-400">[METRIC] Quiz 1 (List Basics) Class Avg: 96% | Fail Rate: 0%</div>
              <div className="text-sky-400">[METRIC] Quiz 3 (HashMap keys) Class Avg: 88% | Fail Rate: 5%</div>
              <div className="text-sky-400">[METRIC] Quiz 5 (Concurrency Map) Class Avg: 78% | Fail Rate: 16%</div>
              <div className="text-yellow-400">[ALERT] Concurrency thread-safety is flagged as the highest failed topic context. Recommend review lecture.</div>
              <div className="text-emerald-400">[ANALYTICS] Sync complete. System sleep state activated.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
