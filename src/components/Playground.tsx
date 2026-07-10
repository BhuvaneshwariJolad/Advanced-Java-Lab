import React, { useState, useEffect } from 'react';
import { Terminal, Play, RotateCcw, AlertTriangle, Cpu, ListCollapse, Plus, Trash2, Search, ArrowRight, Layers, LayoutGrid } from 'lucide-react';

export default function Playground() {
  const [editorCode, setEditorCode] = useState(`import java.util.*;

public class CollectionPlayground {
    public static void main(String[] args) {
        // Play with ArrayList, LinkedList, or HashMap!
        List<String> list = new ArrayList<>();
        list.add("Java");
        list.add("Collections");
        list.add("Framework");
        
        System.out.println("List: " + list);
        System.out.println("Size: " + list.size());
    }
}`);

  const [activePreset, setActivePreset] = useState<'list' | 'linked' | 'hash' | 'priority'>('list');
  const [simOutput, setSimOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Memory Simulation State
  const [elements, setElements] = useState<string[]>(['Java', 'Collections', 'Framework']);
  const [linkedNodes, setLinkedNodes] = useState<{ id: string; value: string }[]>([
    { id: 'n1', value: 'Head' },
    { id: 'n2', value: 'Java' },
    { id: 'n3', value: 'Collections' },
    { id: 'n4', value: 'Tail' }
  ]);
  const [hashMapBuckets, setHashMapBuckets] = useState<{ key: string; value: string; hash: number }[][]>([
    [],
    [{ key: 'apple', value: '1.20', hash: 1 }],
    [],
    [{ key: 'banana', value: '0.80', hash: 3 }, { key: 'orange', value: '1.50', hash: 3 }], // Collision!
    [],
    [],
    [{ key: 'grapes', value: '2.50', hash: 6 }],
    []
  ]);
  const [priorityHeap, setPriorityHeap] = useState<{ value: string; priority: number }[]>([
    { value: 'Critical Bug', priority: 10 },
    { value: 'Write Docs', priority: 5 },
    { value: 'Fix CSS', priority: 2 },
    { value: 'Refactor', priority: 1 }
  ]);

  // Input states for operations
  const [inputVal, setInputVal] = useState('');
  const [inputKey, setInputKey] = useState('');
  const [inputPriority, setInputPriority] = useState('5');
  const [searchTarget, setSearchTarget] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [searchResultText, setSearchResultText] = useState('');

  const presets = {
    list: `import java.util.*;

public class ListDemo {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        
        System.out.println("Fruits: " + fruits);
        System.out.println("Capacity is automatically doubled when capacity bound is reached.");
    }
}`,
    linked: `import java.util.*;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        list.addFirst("First Node");
        list.addLast("Second Node");
        
        System.out.println("Front: " + list.peekFirst());
        System.out.println("Back: " + list.peekLast());
    }
}`,
    hash: `import java.util.*;

public class MapDemo {
    public static void main(String[] args) {
        HashMap<String, Double> prices = new HashMap<>();
        prices.put("apple", 1.20);
        prices.put("banana", 0.80);
        prices.put("orange", 1.50); // collides in same bucket chain with banana
        
        System.out.println("Banana cost: " + prices.get("banana"));
    }
}`,
    priority: `import java.util.*;

public class PriorityQueueDemo {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(10);
        pq.offer(5);
        pq.offer(20);
        
        System.out.println("Popping highest priority (lowest value): " + pq.poll()); // 5
    }
}`
  };

  const selectPreset = (type: 'list' | 'linked' | 'hash' | 'priority') => {
    setActivePreset(type);
    setEditorCode(presets[type]);
    setSimOutput([]);
  };

  const handleRunAnalysis = () => {
    setIsRunning(true);
    setSimOutput(['[COMPILER]: Initializing sandboxed Java compiler...', '[COMPILER]: Analysing symbols & syntactical bounds...']);

    setTimeout(() => {
      const code = editorCode.toLowerCase();
      const logs: string[] = [];

      logs.push('[COMPILER]: Successfully generated Java bytecode.');
      logs.push('[RUNTIME]: JVM initialized. Loading main class...');

      if (code.includes('arraylist')) {
        logs.push('[RUNTIME]: ArrayList initialized. Default backing capacity: 10.');
        if (code.includes('.add(')) {
          logs.push('[RUNTIME]: ArrayList.add() called. Elements loaded into backing array contiguous blocks.');
        }
        if (code.includes('.remove(')) {
          logs.push('[RUNTIME]: ArrayList.remove() called. Re-aligning contiguous blocks (sliding remaining items left).');
        }
      } else if (code.includes('linkedlist')) {
        logs.push('[RUNTIME]: LinkedList initialized. Constructing node pointers.');
        logs.push('[RUNTIME]: Nodes allocation: [Head] <=> [New Node] <=> [Tail].');
      } else if (code.includes('hashmap')) {
        logs.push('[RUNTIME]: HashMap allocated. Loading bucket array of size 16.');
        if (code.includes('put(')) {
          logs.push('[RUNTIME]: HashMap.put() calculated hash values and mapped keys to index buckets.');
        }
      } else if (code.includes('priorityqueue')) {
        logs.push('[RUNTIME]: PriorityQueue allocated. Building balanced binary heap representation.');
      } else {
        logs.push('[RUNTIME]: General collections structure registered.');
      }

      logs.push('[CONSOLE]: ' + (
        code.includes('arraylist') ? 'Fruits: [Apple, Banana, Cherry]' :
        code.includes('linkedlist') ? 'Front: First Node\nBack: Second Node' :
        code.includes('hashmap') ? 'Banana cost: 0.8' :
        code.includes('priorityqueue') ? 'Popping highest priority (lowest value): 5' :
        'List: [Java, Collections, Framework]\nSize: 3'
      ));

      logs.push('[METRICS]: Execution completed successfully in 12ms. GC pressure: 0 objects leaked.');
      setSimOutput(logs);
      setIsRunning(false);
    }, 1200);
  };

  // Live Visual Interaction Actions
  const handleAddArrayList = () => {
    if (!inputVal.trim()) return;
    setElements([...elements, inputVal.trim()]);
    setInputVal('');
  };

  const handleRemoveArrayList = (index: number) => {
    const updated = [...elements];
    updated.splice(index, 1);
    setElements(updated);
  };

  const handleAddLinkedList = () => {
    if (!inputVal.trim()) return;
    const newId = 'n_' + Date.now();
    const updated = [...linkedNodes];
    // Insert before tail
    updated.splice(updated.length - 1, 0, { id: newId, value: inputVal.trim() });
    setLinkedNodes(updated);
    setInputVal('');
  };

  const handleRemoveLinkedList = (nodeId: string) => {
    if (nodeId === 'n1' || nodeId === 'n4') return; // protect head/tail
    setLinkedNodes(linkedNodes.filter((n) => n.id !== nodeId));
  };

  const handlePutHashMap = () => {
    if (!inputKey.trim() || !inputVal.trim()) return;
    const key = inputKey.trim();
    const val = inputVal.trim();
    // Simulate simple bucket hash
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    const bucketIdx = hash % 8;

    const updatedBuckets = [...hashMapBuckets];
    // Check if key already exists, update it, otherwise push to chain
    const existingIdx = updatedBuckets[bucketIdx].findIndex((item) => item.key === key);
    if (existingIdx > -1) {
      updatedBuckets[bucketIdx][existingIdx].value = val;
    } else {
      updatedBuckets[bucketIdx].push({ key, value: val, hash: bucketIdx });
    }

    setHashMapBuckets(updatedBuckets);
    setInputKey('');
    setInputVal('');
  };

  const handleRemoveHashMap = (bucketIdx: number, key: string) => {
    const updatedBuckets = [...hashMapBuckets];
    updatedBuckets[bucketIdx] = updatedBuckets[bucketIdx].filter((item) => item.key !== key);
    setHashMapBuckets(updatedBuckets);
  };

  const handleAddPriorityQueue = () => {
    if (!inputVal.trim()) return;
    const priorityNum = parseInt(inputPriority) || 5;
    const newHeap = [...priorityHeap, { value: inputVal.trim(), priority: priorityNum }];
    // Sort descending by priority value for visualization
    newHeap.sort((a, b) => b.priority - a.priority);
    setPriorityHeap(newHeap);
    setInputVal('');
  };

  const handlePollPriorityQueue = () => {
    if (priorityHeap.length === 0) return;
    const updated = [...priorityHeap];
    updated.shift(); // remove highest priority
    setPriorityHeap(updated);
  };

  const handleSearchArrayList = () => {
    if (!searchTarget.trim()) return;
    const target = searchTarget.trim().toLowerCase();
    const idx = elements.findIndex(el => el.toLowerCase() === target);
    if (idx !== -1) {
      setHighlightedIndex(idx);
      setSearchResultText(`Found at index: ${idx} (O(1) access inside array)`);
    } else {
      setHighlightedIndex(null);
      setSearchResultText('Not found in ArrayList');
    }
  };

  useEffect(() => {
    if (highlightedIndex !== null) {
      const timer = setTimeout(() => setHighlightedIndex(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedIndex]);

  return (
    <div className="space-y-8 py-6">
      {/* Title Header */}
      <div className="border-b border-slate-200/50 dark:border-white/10 pb-6">
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Interactive Code & Visual Playground
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
          Interact with actual collection mechanics. Write mock Java codes to analyze flow, or interactively trigger insertions to see memory boundaries.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Code Editor & JVM console */}
        <div className="xl:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-lg overflow-hidden flex flex-col h-[550px]">
            {/* Toolbar controllers */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 backdrop-blur-sm px-4 py-2 gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-indigo-500" />
                Java Code Editor
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => selectPreset('list')}
                  className={`rounded-md px-2 py-1 text-[10px] font-bold cursor-pointer transition-all ${
                    activePreset === 'list' ? 'bg-indigo-500/10 text-indigo-600 dark:bg-white/10 dark:text-indigo-400' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  ArrayList
                </button>
                <button
                  onClick={() => selectPreset('linked')}
                  className={`rounded-md px-2 py-1 text-[10px] font-bold cursor-pointer transition-all ${
                    activePreset === 'linked' ? 'bg-indigo-500/10 text-indigo-600 dark:bg-white/10 dark:text-indigo-400' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  LinkedList
                </button>
                <button
                  onClick={() => selectPreset('hash')}
                  className={`rounded-md px-2 py-1 text-[10px] font-bold cursor-pointer transition-all ${
                    activePreset === 'hash' ? 'bg-indigo-500/10 text-indigo-600 dark:bg-white/10 dark:text-indigo-400' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  HashMap
                </button>
                <button
                  onClick={() => selectPreset('priority')}
                  className={`rounded-md px-2 py-1 text-[10px] font-bold cursor-pointer transition-all ${
                    activePreset === 'priority' ? 'bg-indigo-500/10 text-indigo-600 dark:bg-white/10 dark:text-indigo-400' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  Heap/PQ
                </button>
              </div>
            </div>

            {/* Code editor textarea */}
            <div className="relative flex-1 bg-slate-950/85 p-4 font-mono text-xs text-slate-300">
              <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                className="w-full h-full bg-transparent resize-none border-0 p-0 focus:ring-0 focus:outline-none focus:border-transparent font-mono select-text"
                spellCheck="false"
              />
              <button
                onClick={handleRunAnalysis}
                disabled={isRunning}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-xs font-bold text-white px-4 py-2.5 shadow-lg shadow-emerald-500/15 transition-all cursor-pointer"
              >
                <Play className="h-3.5 w-3.5" />
                {isRunning ? 'Compiling...' : 'Run Simulation'}
              </button>
            </div>
          </div>

          {/* Simulated JVM Output Console */}
          <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-slate-950/80 backdrop-blur-md p-4 font-mono text-xs text-slate-400 h-[180px] overflow-y-auto space-y-1 shadow-lg">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-2 border-b border-white/5 pb-1 flex justify-between items-center">
              <span>JVM Console Sandbox</span>
              <button onClick={() => setSimOutput([])} className="hover:text-white cursor-pointer" aria-label="Clear simulation output">
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>
            {simOutput.length === 0 ? (
              <span className="text-slate-600 italic">Click "Run Simulation" above to view executed outputs, allocated Heap logs, and diagnostics...</span>
            ) : (
              simOutput.map((log, i) => {
                let colorClass = 'text-slate-400';
                if (log.startsWith('[COMPILER]')) colorClass = 'text-sky-400';
                if (log.startsWith('[RUNTIME]')) colorClass = 'text-amber-500';
                if (log.startsWith('[CONSOLE]')) colorClass = 'text-emerald-400 font-semibold';
                if (log.startsWith('[METRICS]')) colorClass = 'text-indigo-400';
                return (
                  <div key={i} className={`${colorClass} leading-relaxed`}>
                    {log}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Visualizer Stage */}
        <div className="xl:col-span-7 space-y-4">
          <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-lg p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/50 dark:border-white/10 pb-4 gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Cpu className="h-5 w-5 text-indigo-500" />
                  Visual Collections RAM Monitor
                </h2>
                <p className="text-xs text-slate-500">Live graphical simulation of actual collection operations.</p>
              </div>
              <div className="flex gap-1.5 bg-slate-100/50 dark:bg-white/5 p-1 rounded-lg border border-slate-200/50 dark:border-white/10 backdrop-blur-sm">
                <button
                  onClick={() => selectPreset('list')}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all ${
                    activePreset === 'list' ? 'bg-white/80 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/50 dark:border-white/10 backdrop-blur-sm' : 'text-slate-500'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  ArrayList
                </button>
                <button
                  onClick={() => selectPreset('linked')}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all ${
                    activePreset === 'linked' ? 'bg-white/80 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/50 dark:border-white/10 backdrop-blur-sm' : 'text-slate-500'
                  }`}
                >
                  <ListCollapse className="h-3.5 w-3.5" />
                  LinkedList
                </button>
                <button
                  onClick={() => selectPreset('hash')}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all ${
                    activePreset === 'hash' ? 'bg-white/80 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/50 dark:border-white/10 backdrop-blur-sm' : 'text-slate-500'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  HashMap
                </button>
                <button
                  onClick={() => selectPreset('priority')}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all ${
                    activePreset === 'priority' ? 'bg-white/80 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/50 dark:border-white/10 backdrop-blur-sm' : 'text-slate-500'
                  }`}
                >
                  <Cpu className="h-3.5 w-3.5" />
                  PriorityQueue
                </button>
              </div>
            </div>

            {/* Active Simulation Canvas */}
            <div className="rounded-xl border border-dashed border-slate-200/50 dark:border-white/10 p-6 min-h-[250px] flex flex-col justify-center items-center bg-slate-100/10 dark:bg-black/10">
              {/* ArrayList visualization */}
              {activePreset === 'list' && (
                <div className="w-full space-y-6">
                  <div className="flex flex-wrap gap-2.5 justify-center">
                    {elements.map((el, i) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center border rounded-xl p-3 shadow-md min-w-[70px] text-center transition-all duration-300 ${
                          highlightedIndex === i
                            ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/20'
                            : 'bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10 text-slate-950 dark:text-white'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Idx: {i}</span>
                        <span className="text-xs font-bold mt-1">{el}</span>
                        <button
                          onClick={() => handleRemoveArrayList(i)}
                          id={`list-rm-${i}`}
                          className="mt-2 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          aria-label={`Remove ${el}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    {/* Empty backing capacity slots */}
                    {Array.from({ length: Math.max(0, 10 - elements.length) }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center border border-dashed border-slate-200/30 dark:border-white/5 rounded-xl p-3 min-w-[70px] text-center opacity-40">
                        <span className="text-[10px] font-mono text-slate-400">Idx: {elements.length + i}</span>
                        <span className="text-xs font-mono italic mt-1 text-slate-400">null</span>
                      </div>
                    ))}
                  </div>

                  {/* ArrayList operations bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/50 dark:border-white/10 pt-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add Item (e.g. Cherry)"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        className="rounded-lg border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white"
                      />
                      <button
                        onClick={handleAddArrayList}
                        id="btn-add-arraylist"
                        className="flex items-center gap-1 rounded-lg bg-indigo-600 text-white font-bold text-xs px-3.5 py-1.5 hover:bg-indigo-500 shadow-md shadow-indigo-500/10 transition-all cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add Element
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Search Item..."
                        value={searchTarget}
                        onChange={(e) => setSearchTarget(e.target.value)}
                        className="rounded-lg border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white"
                      />
                      <button
                        onClick={handleSearchArrayList}
                        id="btn-search-arraylist"
                        className="flex items-center gap-1 rounded-lg border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 text-xs px-3.5 py-1.5 hover:bg-slate-100/50 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-all cursor-pointer"
                      >
                        <Search className="h-3.5 w-3.5" />
                        Search
                      </button>
                    </div>
                  </div>
                  {searchResultText && (
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold text-center mt-2">{searchResultText}</p>
                  )}
                </div>
              )}

              {/* LinkedList visualization */}
              {activePreset === 'linked' && (
                <div className="w-full space-y-6">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {linkedNodes.map((node, i) => (
                      <React.Fragment key={node.id}>
                        <div className={`flex flex-col items-center border rounded-xl p-3.5 shadow-md min-w-[90px] text-center relative ${
                          node.value === 'Head' || node.value === 'Tail'
                            ? 'bg-slate-100/50 dark:bg-white/5 border-slate-300 dark:border-white/10 font-bold opacity-75 backdrop-blur-sm'
                            : 'bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10 text-slate-950 dark:text-white'
                        }`}>
                          <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">Node Ref</span>
                          <span className="text-xs font-bold mt-1">{node.value}</span>
                          {node.value !== 'Head' && node.value !== 'Tail' && (
                            <button
                              onClick={() => handleRemoveLinkedList(node.id)}
                              id={`node-rm-${node.id}`}
                              className="mt-1 text-red-500 hover:text-red-700 text-[10px] cursor-pointer"
                            >
                              unlink
                            </button>
                          )}
                        </div>
                        {i < linkedNodes.length - 1 && (
                          <div className="flex items-center text-slate-400 font-mono text-xs font-black">
                            <span className="px-1">&lt;=&gt;</span>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* LinkedList operations bar */}
                  <div className="flex items-center gap-2 border-t border-slate-200/50 dark:border-white/10 pt-4">
                    <input
                      type="text"
                      placeholder="Node Value (e.g. Cherry)"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      className="rounded-lg border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    />
                    <button
                      onClick={handleAddLinkedList}
                      id="btn-add-linkednode"
                      className="flex items-center gap-1 rounded-lg bg-indigo-600 text-white font-bold text-xs px-3.5 py-1.5 hover:bg-indigo-500 shadow-md shadow-indigo-500/10 transition-all cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Insert Node
                    </button>
                  </div>
                </div>
              )}

              {/* HashMap visualization */}
              {activePreset === 'hash' && (
                <div className="w-full space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hashMapBuckets.map((bucket, i) => (
                      <div key={i} className="flex border border-slate-200/50 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/5 overflow-hidden shadow-md">
                        {/* Bucket index marker */}
                        <div className="bg-slate-100/50 dark:bg-black/20 font-mono text-[10px] font-bold px-3.5 py-3 border-r border-slate-200/50 dark:border-white/10 flex items-center justify-center text-slate-500 w-[50px] shrink-0">
                          [{i}]
                        </div>
                        {/* Entry nodes linked chain */}
                        <div className="p-2 flex flex-wrap items-center gap-2 overflow-x-auto min-h-[48px]">
                          {bucket.length === 0 ? (
                            <span className="text-[10px] italic text-slate-400">empty bucket</span>
                          ) : (
                            bucket.map((entry, idx) => (
                              <div key={idx} className="flex items-center bg-indigo-500/10 dark:bg-indigo-950/20 border border-indigo-200/20 dark:border-indigo-800/30 rounded-lg px-2 py-1 text-[11px]">
                                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{entry.key}: {entry.value}</span>
                                <button
                                  onClick={() => handleRemoveHashMap(i, entry.key)}
                                  id={`hash-rm-${i}-${entry.key}`}
                                  className="ml-2 text-slate-400 hover:text-red-500 text-[10px] cursor-pointer"
                                  aria-label={`Remove entry ${entry.key}`}
                                >
                                  &times;
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* HashMap inputs bar */}
                  <div className="flex flex-wrap gap-2 border-t border-slate-200/50 dark:border-white/10 pt-4">
                    <input
                      type="text"
                      placeholder="Key (e.g. pear)"
                      value={inputKey}
                      onChange={(e) => setInputKey(e.target.value)}
                      className="rounded-lg border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white w-28"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 1.80)"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      className="rounded-lg border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white w-28"
                    />
                    <button
                      onClick={handlePutHashMap}
                      id="btn-put-hashmap"
                      className="flex items-center gap-1 rounded-lg bg-indigo-600 text-white font-bold text-xs px-3.5 py-1.5 hover:bg-indigo-500 shadow-md shadow-indigo-500/10 transition-all cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      map.put()
                    </button>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 ml-auto">
                      <AlertTriangle className="h-3 w-3 text-indigo-500" />
                      Bucket index is computed as: (key.hashCode() % 8)
                    </div>
                  </div>
                </div>
              )}

              {/* PriorityQueue Heap visualization */}
              {activePreset === 'priority' && (
                <div className="w-full space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="grid grid-cols-1 gap-2.5 max-w-sm w-full">
                      {priorityHeap.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-white/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-xl p-3 shadow-md backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                              {i + 1}
                            </span>
                            <span className="text-xs font-semibold text-slate-900 dark:text-white">{item.value}</span>
                          </div>
                          <span className="rounded-full bg-red-100 dark:bg-red-950/40 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400">
                            Priority: {item.priority}
                          </span>
                        </div>
                      ))}
                      {priorityHeap.length === 0 && (
                        <p className="text-center text-slate-400 italic text-xs py-4">No tasks in scheduler queue.</p>
                      )}
                    </div>
                  </div>

                  {/* PriorityQueue inputs bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/50 dark:border-white/10 pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        placeholder="Task Name"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        className="rounded-lg border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white w-32"
                      />
                      <select
                        value={inputPriority}
                        onChange={(e) => setInputPriority(e.target.value)}
                        className="rounded-lg border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white"
                      >
                        <option value="1">1 (Low)</option>
                        <option value="5">5 (Medium)</option>
                        <option value="10">10 (Critical)</option>
                      </select>
                      <button
                        onClick={handleAddPriorityQueue}
                        id="btn-add-pq"
                        className="flex items-center gap-1 rounded-lg bg-indigo-600 text-white font-bold text-xs px-3.5 py-1.5 hover:bg-indigo-500 shadow-md shadow-indigo-500/15 transition-all cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Offer Task
                      </button>
                    </div>

                    <button
                      onClick={handlePollPriorityQueue}
                      disabled={priorityHeap.length === 0}
                      id="btn-poll-pq"
                      className="flex items-center gap-1 rounded-lg bg-slate-900 dark:bg-slate-800 disabled:bg-slate-200 hover:bg-slate-850 text-white font-bold text-xs px-3.5 py-2 transition-all cursor-pointer shadow-md disabled:cursor-not-allowed"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Poll Highest
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
