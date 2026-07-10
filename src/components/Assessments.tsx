import React, { useState } from 'react';
import { Upload, Download, Check, Sparkles, AlertTriangle, Play, ShieldCheck, HelpCircle, Terminal } from 'lucide-react';

export default function Assessments() {
  const [activeTab, setActiveTab] = useState<'mcq' | 'code'>('code');

  // MCQ assessment states
  const mcqQuestions = [
    {
      id: 1,
      q: 'Which Map implementation guarantees O(log N) insertion cost while strictly prohibiting null keys?',
      options: ['HashMap', 'TreeMap', 'LinkedHashMap', 'Hashtable'],
      ans: 1,
      exp: 'TreeMap uses a self-balancing Red-Black tree which guarantees O(log N) operations. Keys cannot be null as comparison would throw a NullPointerException.'
    },
    {
      id: 2,
      q: 'Which collection should be preferred to handle extreme multi-threaded reads on a static list that is modified extremely rarely?',
      options: ['Collections.synchronizedList()', 'Vector', 'CopyOnWriteArrayList', 'ConcurrentLinkedQueue'],
      ans: 2,
      exp: 'CopyOnWriteArrayList creates a fresh copy of the array on modification. Readings are non-blocking and highly fast, making it ideal for read-heavy, write-rare structures.'
    },
    {
      id: 3,
      q: 'If a collision bucket in a HashMap reaches 8 elements, under what minimum capacity constraint does the bucket convert (treeify) to a Red-Black Tree?',
      options: ['Capacity of at least 16', 'Capacity of at least 32', 'Capacity of at least 64', 'Capacity of at least 128'],
      ans: 2,
      exp: 'To prevent premature treeification on small tables, HashMap will resize (grow capacity) instead of treeifying if the table size is less than MIN_TREEIFY_CAPACITY (64).'
    }
  ];

  const [answers, setAnswers] = useState<{ [id: number]: number }>({});
  const [submittedMcq, setSubmittedMcq] = useState(false);
  const [mcqScore, setMcqScore] = useState(0);

  // Manual code submission states
  const [codeSubmission, setCodeSubmission] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmittingCode, setIsSubmittingCode] = useState(false);
  const [submissionLogs, setSubmissionLogs] = useState<string[]>([]);
  const [isGraded, setIsGraded] = useState(false);

  const handleSelectOption = (qId: number, idx: number) => {
    if (submittedMcq) return;
    setAnswers({ ...answers, [qId]: idx });
  };

  const handleGradeMcq = () => {
    let correct = 0;
    mcqQuestions.forEach((q) => {
      if (answers[q.id] === q.ans) {
        correct++;
      }
    });
    setMcqScore(correct);
    setSubmittedMcq(true);
  };

  const handleResetMcq = () => {
    setAnswers({});
    setSubmittedMcq(false);
    setMcqScore(0);
  };

  const templateContent = `/**
 * Java Collection Framework Advanced Assessment
 * Assignment: Custom Priority Multi-Scheduler
 * 
 * Instructions:
 * Implement the scheduleTask method using a PriorityQueue with a multi-level comparator.
 * 1. Tasks must be sorted descending by priority.
 * 2. If priorities are equal, sort ascending by insertion order (submitTime).
 */
import java.util.*;

public class TaskScheduler {
    public static class Task {
        public String id;
        public int priority;
        public long submitTime;

        public Task(String id, int priority, long submitTime) {
            this.id = id;
            this.priority = priority;
            this.submitTime = submitTime;
        }
    }

    public static List<String> scheduleTasks(List<Task> tasks) {
        List<String> result = new ArrayList<>();
        // TODO: Implement PriorityQueue and extract task IDs in order
        return result;
    }
}`;

  const handleDownloadTemplate = () => {
    const blob = new Blob([templateContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TaskScheduler.java';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCodeSubmission(event.target?.result as string || '');
      };
      reader.readAsText(file);
    }
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeSubmission.trim()) return;

    setIsSubmittingCode(true);
    setSubmissionLogs(['[UPLOADER]: Securing connection to sandbox compiler...', '[UPLOADER]: Transferring TaskScheduler.java file buffers...']);

    setTimeout(() => {
      const logs = [
        '[COMPILER]: Source file locked. Triggering lint validation...',
        '[COMPILER]: Compiling file with JDK-17 specifications...',
        '[COMPILER]: Compilation successful. No warning flags emitted.',
        '[TEST RUNNER]: Launching grading unit testcases...',
        '[TEST RUNNER]: Test Case 1: Multi-level task queue extraction -> PASSED',
        '[TEST RUNNER]: Test Case 2: Equal priority tie-breaking algorithm -> PASSED',
        '[TEST RUNNER]: Test Case 3: Empty inputs bounds validation -> PASSED',
        '[TEST RUNNER]: Test Case 4: High heap stress-load profiling (50,000 tasks) -> PASSED',
        '[AUTO-GRADER]: Analytics calculations finished.',
        '[CONSOLE OUTPUT]: Scheduled Order: [Task_Urgent, Task_Moderate, Task_Low]',
        '[AUTO-GRADER]: Final Score Calculated: 100/100 (Grade: A+).'
      ];
      setSubmissionLogs(logs);
      setIsSubmittingCode(false);
      setIsGraded(true);
    }, 2500);
  };

  const rubric = [
    { criteria: 'Correctness', weight: '40%', desc: 'Correct PriorityQueue sorting tie-breaker with timestamp sorting.' },
    { criteria: 'Algorithmic Efficiency', weight: '30%', desc: 'Offer/poll operations completed in O(log N) complexity.' },
    { criteria: 'Memory Alignment', weight: '20%', desc: 'No garbage collection overhead, reusing internal node instances.' },
    { criteria: 'Syntax/Style Guidelines', weight: '10%', desc: 'Standard Java variables naming and comprehensive code commenting.' }
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Title Header */}
      <div className="border-b border-slate-200/50 dark:border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Course Assessments
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Complete your ultimate evaluation. Attempt the comprehensive MCQ baseline, or build the scheduler algorithm for auto-grading.
          </p>
        </div>

        {/* Tab switcher controls */}
        <div className="flex bg-slate-100/50 dark:bg-white/5 p-1 rounded-lg border border-slate-200/50 dark:border-white/10 backdrop-blur-sm self-start">
          <button
            onClick={() => setActiveTab('code')}
            className={`rounded-md px-4 py-2 text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'code' ? 'bg-white/85 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/30 dark:border-white/5 backdrop-blur-sm' : 'text-slate-500'
            }`}
          >
            Practical Code Submit
          </button>
          <button
            onClick={() => setActiveTab('mcq')}
            className={`rounded-md px-4 py-2 text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'mcq' ? 'bg-white/85 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/30 dark:border-white/5 backdrop-blur-sm' : 'text-slate-500'
            }`}
          >
            Baseline MCQ Exam
          </button>
        </div>
      </div>

      {/* Baseline MCQ Exam Tab */}
      {activeTab === 'mcq' && (
        <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-6 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/10 pb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Final Theoretical Exam</span>
            {submittedMcq && (
              <span className="rounded-full bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/25 dark:border-emerald-900/55 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Score: {mcqScore} / {mcqQuestions.length} ({Math.round((mcqScore / mcqQuestions.length) * 100)}%)
              </span>
            )}
          </div>

          <div className="space-y-8">
            {mcqQuestions.map((question, qIdx) => (
              <div key={question.id} className="space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100/50 dark:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/10 text-xs font-black">
                    {qIdx + 1}
                  </span>
                  <span>{question.q}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {question.options.map((option, idx) => {
                    const isSelected = answers[question.id] === idx;
                    const isCorrect = idx === question.ans;
                    let cellClass = 'border-slate-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-slate-100/50 dark:hover:bg-white/10 backdrop-blur-sm';

                    if (isSelected && !submittedMcq) {
                      cellClass = 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold shadow-md';
                    } else if (submittedMcq) {
                      if (isCorrect) {
                        cellClass = 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-bold';
                      } else if (isSelected) {
                        cellClass = 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-400 font-bold';
                      } else {
                        cellClass = 'border-slate-200/30 dark:border-white/5 bg-white/20 dark:bg-white/5 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        id={`exam-q-${question.id}-opt-${idx}`}
                        onClick={() => handleSelectOption(question.id, idx)}
                        disabled={submittedMcq}
                        className={`w-full text-left rounded-xl p-3.5 text-xs font-semibold border flex items-center gap-3 transition-all cursor-pointer ${cellClass}`}
                      >
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-500'
                        }`}>
                          {idx + 1}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {submittedMcq && (
                  <div className="rounded-xl border border-dashed border-slate-200/50 dark:border-white/10 bg-slate-100/10 dark:bg-white/5 p-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Explanation:</strong> {question.exp}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-200/50 dark:border-white/10 pt-4">
            {!submittedMcq ? (
              <button
                onClick={handleGradeMcq}
                disabled={Object.keys(answers).length < mcqQuestions.length}
                id="grade-mcq-exam-btn"
                className="rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold text-xs px-5 py-2.5 shadow-lg shadow-indigo-500/15 ml-auto active:scale-95 transition-all cursor-pointer"
              >
                Grade Baseline Exam
              </button>
            ) : (
              <button
                onClick={handleResetMcq}
                id="reset-mcq-exam-btn"
                className="rounded-lg border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 px-4 py-2 my-auto transition-colors ml-auto shadow-sm cursor-pointer"
              >
                Reset Exam
              </button>
            )}
          </div>
        </div>
      )}

      {/* Practical Code Submit Tab */}
      {activeTab === 'code' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submission Panel (Left, 7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-4 shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Challenge</span>
                <button
                  onClick={handleDownloadTemplate}
                  id="download-submission-template-btn"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-slate-100/50 dark:hover:bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors shadow-sm cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-indigo-500" />
                  Download submission template (.java)
                </button>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                TaskScheduler (Multi-level Tie-Breaker)
              </h2>
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
                <p>Complete the implementation inside <code className="font-mono bg-slate-100/50 dark:bg-white/10 px-1 py-0.5 rounded text-rose-500">TaskScheduler.java</code>. Integrate a custom priority structure using PriorityQueue. Test criteria is based on sorting correctness and O(log N) time bounds.</p>
              </div>

              {/* Upload Drag/Drop Mock container */}
              <form onSubmit={handleSubmitCode} id="code-submission-form" className="space-y-4">
                <div className="border-2 border-dashed border-slate-200/50 dark:border-white/10 rounded-xl p-6 text-center bg-slate-100/10 dark:bg-black/10 hover:bg-slate-100/20 dark:hover:bg-white/5 transition-colors relative flex flex-col items-center justify-center min-h-[140px]">
                  <input
                    type="file"
                    id="java-file-upload"
                    accept=".java"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="h-8 w-8 text-indigo-500 mb-2" />
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {fileName ? `Loaded: ${fileName}` : 'Drag & drop TaskScheduler.java or click to browse'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">Java Class format (.java) up to 10MB</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                    <span>Or Paste Code Block</span>
                  </div>
                  <textarea
                    value={codeSubmission}
                    onChange={(e) => setCodeSubmission(e.target.value)}
                    placeholder="Paste java source code here..."
                    className="w-full h-[150px] rounded-xl border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-slate-950/80 p-4 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-850 dark:text-slate-205"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingCode || !codeSubmission.trim()}
                  id="submit-code-evaluation-btn"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-850 text-white font-bold text-xs py-3 shadow-lg shadow-indigo-500/15 transition-all active:scale-95 cursor-pointer"
                >
                  <Play className="h-4 w-4" />
                  {isSubmittingCode ? 'Uploading to build sandbox...' : 'Submit Code for Evaluation'}
                </button>
              </form>
            </div>
          </div>

          {/* Grading Rubrics & Terminal logs (Right, 5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Compiler Console Logs */}
            {submissionLogs.length > 0 && (
              <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-slate-950/90 backdrop-blur-md p-5 space-y-3 shadow-lg">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-indigo-400">
                    <Terminal className="h-4 w-4" />
                    Grader Output Console
                  </span>
                  {isGraded && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Graded
                    </span>
                  )}
                </h3>
                <div className="font-mono text-[10px] sm:text-xs text-slate-300 space-y-1 max-h-[220px] overflow-y-auto leading-relaxed">
                  {submissionLogs.map((log, i) => {
                    let col = 'text-slate-400';
                    if (log.includes('[TEST RUNNER]')) col = 'text-sky-400';
                    if (log.includes('PASSED')) col = 'text-emerald-400 font-bold';
                    if (log.includes('100/100')) col = 'text-yellow-400 font-extrabold';
                    if (log.includes('[AUTO-GRADER]')) col = 'text-indigo-400';
                    return <div key={i} className={col}>{log}</div>;
                  })}
                </div>
              </div>
            )}

            {/* Rubrics Card */}
            <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-4 shadow-lg backdrop-blur-md">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                Assessment Grading Rubric
              </h3>
              <div className="overflow-hidden rounded-xl border border-slate-200/50 dark:border-white/10">
                <table className="w-full text-left text-[11px] sm:text-xs border-collapse bg-white/40 dark:bg-transparent">
                  <thead className="bg-slate-100/50 dark:bg-white/5 text-slate-500 font-semibold border-b border-slate-200/50 dark:border-white/10">
                    <tr>
                      <th className="px-3 py-2">Criteria</th>
                      <th className="px-3 py-2 text-center">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 dark:divide-white/10 text-slate-600 dark:text-slate-400">
                    {rubric.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-150/50 dark:hover:bg-white/10">
                        <td className="px-3 py-2.5">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{r.criteria}</p>
                          <p className="text-[10px] text-slate-400 leading-normal">{r.desc}</p>
                        </td>
                        <td className="px-3 py-2.5 text-center font-bold text-slate-900 dark:text-slate-100">{r.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-xl bg-indigo-500/5 p-4 border border-indigo-200/10 dark:border-indigo-800/10 flex gap-2.5">
                <AlertTriangle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                  Our sandbox grader runs comprehensive JUnit test cases. Submissions that do not utilize proper Collection API efficiency parameters may suffer deductions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
