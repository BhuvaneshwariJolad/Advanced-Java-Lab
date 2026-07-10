import React from 'react';
import { Download, ExternalLink, HelpCircle, Layers, Printer, ShieldAlert, GraduationCap, Code } from 'lucide-react';

export default function Resources() {
  const complexityMaster = [
    { collection: 'ArrayList', add: 'O(1) amortized', remove: 'O(N)', get: 'O(1)', search: 'O(N)', order: 'Insertion order', duplicates: 'Allowed' },
    { collection: 'LinkedList', add: 'O(1)', remove: 'O(1) unlink', get: 'O(N)', search: 'O(N)', order: 'Insertion order', duplicates: 'Allowed' },
    { collection: 'HashSet', add: 'O(1) average', remove: 'O(1) average', get: 'N/A', search: 'O(1) contains', order: 'Undefined', duplicates: 'No duplicates' },
    { collection: 'TreeSet', add: 'O(log N)', remove: 'O(log N)', get: 'N/A', search: 'O(log N) contains', order: 'Sorted', duplicates: 'No duplicates' },
    { collection: 'HashMap', add: 'O(1) average', remove: 'O(1) average', get: 'O(1) average', search: 'O(1) key check', order: 'Undefined', duplicates: 'Keys unique, values duplicates' },
    { collection: 'TreeMap', add: 'O(log N)', remove: 'O(log N)', get: 'O(log N)', search: 'O(log N) key check', order: 'Sorted', duplicates: 'Keys unique, values duplicates' },
    { collection: 'PriorityQueue', add: 'O(log N) heap', remove: 'O(log N) poll', get: 'O(1) peek', search: 'O(N)', order: 'Heap-ordered', duplicates: 'Allowed' },
    { collection: 'ArrayDeque', add: 'O(1) circular', remove: 'O(1)', get: 'O(1) peek', search: 'O(N)', order: 'Insertion order', duplicates: 'Allowed' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const references = [
    { title: 'Official Java Docs - Collections', link: 'https://docs.oracle.com/javase/8/docs/technotes/guides/collections/index.html', desc: 'The comprehensive structural API documentation from Oracle.' },
    { title: 'Java Generics FAQ', link: 'http://www.angelikalanger.com/GenericsFAQ/JavaGenericsFAQ.html', desc: 'The ultimate deep-dive reference for Java generics type parameters.' },
    { title: 'Baeldung Collection Tutorials', link: 'https://www.baeldung.com/category/java/java-collections', desc: 'In-depth, highly visual, hands-on tutorials for collections.' },
    { title: 'ConcurrentHashMap Deep Dive', link: 'https://www.baeldung.com/java-concurrent-map', desc: 'Exploring bucket segments, CAS, and concurrent table locks.' }
  ];

  return (
    <div className="space-y-8 py-6 print:space-y-4 print:p-0">
      {/* Title Header */}
      <div className="border-b border-slate-200/50 dark:border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Cheat Sheets & Reference Libraries
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Access complexity lookup tables, print cheat sheets, and review supplementary API reference files.
          </p>
        </div>

        <button
          onClick={handlePrint}
          id="print-cheatsheet-btn"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-slate-100/50 dark:hover:bg-white/10 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-colors cursor-pointer"
        >
          <Printer className="h-4 w-4 text-indigo-500" />
          Print / PDF Cheat Sheet
        </button>
      </div>

      {/* Printable Master Cheat Sheet Container */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-6 shadow-lg backdrop-blur-md print:border-none print:p-0">
        <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/10 pb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-500" />
            Big-O Complexity reference table
          </h2>
          <span className="text-xs text-slate-400 print:hidden font-semibold">Offline Access Ready</span>
        </div>

        {/* Complexity Grid Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/50 dark:border-white/10 shadow-sm print:border-slate-300">
          <table className="w-full text-left text-xs border-collapse bg-white/40 dark:bg-transparent">
            <thead className="bg-slate-100/50 dark:bg-white/5 text-slate-500 font-semibold border-b border-slate-200/50 dark:border-white/10 print:bg-slate-100">
              <tr>
                <th className="px-4 py-3">Collection</th>
                <th className="px-4 py-3 text-center">Add (Complexity)</th>
                <th className="px-4 py-3 text-center">Remove (Complexity)</th>
                <th className="px-4 py-3 text-center">Get / Access</th>
                <th className="px-4 py-3 text-center">Contains / Search</th>
                <th className="px-4 py-3">Iteration Order</th>
                <th className="px-4 py-3 text-center">Duplicates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-white/10 text-slate-700 dark:text-slate-300">
              {complexityMaster.map((c, i) => (
                <tr key={i} className="hover:bg-slate-150/50 dark:hover:bg-white/10 transition-colors print:hover:bg-transparent">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{c.collection}</td>
                  <td className="px-4 py-3 font-mono text-center text-indigo-600 dark:text-indigo-400 font-bold">{c.add}</td>
                  <td className="px-4 py-3 font-mono text-center">{c.remove}</td>
                  <td className="px-4 py-3 font-mono text-center">{c.get}</td>
                  <td className="px-4 py-3 font-mono text-center">{c.search}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.order}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                      c.duplicates === 'Allowed'
                        ? 'bg-emerald-500/10 border-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/15 text-rose-700 dark:text-rose-400'
                    }`}>
                      {c.duplicates}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Further Reading References (Hidden during print) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:hidden">
        {/* References list */}
        <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-4 shadow-lg backdrop-blur-md">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-500" />
            Recommended Reading & references
          </h3>
          <div className="divide-y divide-slate-200/50 dark:divide-white/10 space-y-3.5">
            {references.map((r, i) => (
              <div key={i} className={`pt-3.5 ${i === 0 ? 'pt-0 border-t-0' : ''}`}>
                <a
                  href={r.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  {r.title}
                  <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected APIs cheatsheet block */}
        <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-4 shadow-lg backdrop-blur-md">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Code className="h-5 w-5 text-indigo-500" />
            Quick API Conversion Cheat Sheet
          </h3>
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 font-mono leading-relaxed bg-slate-100/50 dark:bg-slate-950/80 p-4 rounded-xl border border-slate-200/50 dark:border-white/10 shadow-inner">
            <div>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold block">// Array to List conversion</span>
              <span className="text-slate-400">List&lt;String&gt; list = Arrays.asList(arr);</span>
            </div>
            <div className="border-t border-slate-200/50 dark:border-white/10 pt-2">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold block">// List to Array conversion</span>
              <span className="text-slate-400">String[] arr = list.toArray(new String[0]);</span>
            </div>
            <div className="border-t border-slate-200/50 dark:border-white/10 pt-2">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold block">// List sorting with Comparator</span>
              <span className="text-slate-400">list.sort(Comparator.naturalOrder());</span>
            </div>
            <div className="border-t border-slate-200/50 dark:border-white/10 pt-2">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold block">// Making unmodifiable list wrapper</span>
              <span className="text-slate-400">List&lt;T&gt; rOnly = Collections.unmodifiableList(list);</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
