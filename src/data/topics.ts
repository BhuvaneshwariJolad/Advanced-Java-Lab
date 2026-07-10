import { Topic } from '../types';

export const topicsData: Topic[] = [
  {
    id: 'list',
    title: 'List Interface (ArrayList vs LinkedList)',
    description: 'An ordered collection that can contain duplicate elements. Master contiguous vs node-linked lists, custom sorting, and resizing mechanics.',
    keyConcepts: [
      'Contiguous array resizing vs doubly-linked nodes',
      'Random access performance (O(1) vs O(N))',
      'Insertion/deletion complexity at boundaries vs arbitrary indexes',
      'Custom sorting using Comparable and Comparator interfaces'
    ],
    detailedContent: `### List Implementations in Java

The \`List\` interface represents an ordered collection (also known as a *sequence*). Users of this interface have precise control over where in the list each element is inserted.

#### 1. ArrayList
* **Internal Structure:** Uses a dynamic array under the hood. When capacity is exceeded, it increases its capacity by 50% (\`newCapacity = oldCapacity + (oldCapacity >> 1)\`).
* **Strengths:** Fast random access (\`O(1)\`) via index.
* **Weaknesses:** Costly shifts during insertions or deletions in the middle (\`O(N)\`). Resizing requires copying elements to a new array.

#### 2. LinkedList
* **Internal Structure:** Doubly-linked list implementation. Each node holds references to the next and previous elements.
* **Strengths:** Constant-time insertion and deletion (\`O(1)\`) at the list edges (first/last) once the node is located. Implements both \`List\` and \`Deque\`.
* **Weaknesses:** No random access; must traverse from the start or end to reach a specific index (\`O(N)\`). High memory overhead due to pointer storage.`,
    codeExample: `// Custom Sorting with Comparator
List<String> names = new ArrayList<>(List.of("Alice", "Bob", "Charlie", "Dan"));

// Sort by length, then alphabetically
names.sort(Comparator
    .comparingInt(String::length)
    .thenComparing(Comparator.naturalOrder())
);

System.out.println(names); // [Bob, Dan, Alice, Charlie]`,
    complexityTable: [
      { operation: 'Get (index)', arrayList: 'O(1)', linkedList: 'O(N)' },
      { operation: 'Add (end)', arrayList: 'O(1) amortized', linkedList: 'O(1)' },
      { operation: 'Add (index)', arrayList: 'O(N)', linkedList: 'O(N) search + O(1) link' },
      { operation: 'Remove (index)', arrayList: 'O(N)', linkedList: 'O(N) search + O(1) unlink' },
      { operation: 'Memory Overhead', arrayList: 'Low (just backing array padding)', linkedList: 'High (two pointers per element node)' }
    ]
  },
  {
    id: 'set',
    title: 'Set Interface (HashSet, LinkedHashSet, TreeSet)',
    description: 'A collection that contains no duplicate elements. Analyze hash functions, collision resolution, bucket chains, and self-balancing BSTs.',
    keyConcepts: [
      'The hashing contract (hashCode() and equals() alignment)',
      'HashSet buckets, linked lists, and treeification (Red-Black Trees)',
      'LinkedHashSet insertion-order preservation via doubly-linked buckets',
      'TreeSet sorted elements via TreeMap backing structures'
    ],
    detailedContent: `### Set Implementations in Java

The \`Set\` interface models the mathematical set abstraction. It does not allow duplicate values and has at most one null element (for implementations that support nulls).

#### 1. HashSet
* **Mechanism:** Backed by a \`HashMap\` instance. Elements are stored as keys in the map, with a dummy object as the value.
* **Hashing Contract:** If two objects are equal according to \`equals(Object)\`, they must return the same \`hashCode()\`. If overridden incorrectly, elements may be duplicated in the Set.
* **Buckets & Treeification:** In Java 8+, if a bucket's collision chain exceeds 8 elements and the capacity is at least 64, the linked list is converted into a Red-Black tree to maintain \`O(log N)\` worst-case performance.

#### 2. LinkedHashSet
* **Mechanism:** Backed by a \`LinkedHashMap\`. It maintains a doubly-linked list running through all of its entries, defining the iteration ordering (insertion-order).

#### 3. TreeSet
* **Mechanism:** Backed by a \`TreeMap\`. Elements are ordered using their natural ordering, or by a \`Comparator\` provided at set creation time. It guarantees \`O(log N)\` time cost for primary operations.`,
    codeExample: `// Hashing contract demo
class Student {
    int id;
    String name;

    Student(int id, String name) { this.id = id; this.name = name; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Student)) return false;
        Student student = (Student) o;
        return id == student.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

Set<Student> set = new HashSet<>();
set.add(new Student(1, "John"));
set.add(new Student(1, "Duplicate John")); // Will not be added`,
    complexityTable: [
      { operation: 'Add', hashSet: 'O(1) average', treeSet: 'O(log N)', arrayList: 'O(1) average' },
      { operation: 'Contains', hashSet: 'O(1) average', treeSet: 'O(log N)', arrayList: 'O(N)' },
      { operation: 'Remove', hashSet: 'O(1) average', treeSet: 'O(log N)', arrayList: 'O(N)' },
      { operation: 'Iteration Order', hashSet: 'Chaotic / Undefined', treeSet: 'Sorted', arrayList: 'Insertion order' }
    ]
  },
  {
    id: 'queue-deque',
    title: 'Queue & Deque (PriorityQueue, ArrayDeque)',
    description: 'Collections designed for holding elements prior to processing. Compare min/max binary heaps with double-ended array circular queues.',
    keyConcepts: [
      'FIFO (Queue) vs LIFO/FIFO (Deque) contracts',
      'Binary heap organization in PriorityQueue (min-heap by default)',
      'Circular buffer array resizing in ArrayDeque',
      'Fail-safe alternatives for work-stealing algorithms'
    ],
    detailedContent: `### Queue & Deque in Java

Queues are typically FIFO (first-in-first-out), while Deques (Double Ended Queues) support element insertion and removal at both ends.

#### 1. PriorityQueue
* **Overview:** An unbounded priority queue based on a priority heap. The elements of the priority queue are ordered according to their natural ordering, or by a \`Comparator\` provided at queue construction time.
* **Heap Property:** It is structured internally as a balanced binary heap array, where parents are smaller than or equal to their children (for a min-heap).
* **Null Constraint:** Does not permit \`null\` elements because comparison with \`null\` triggers a \`NullPointerException\`.

#### 2. ArrayDeque
* **Overview:** Resizable-array implementation of the \`Deque\` interface. It has no capacity restrictions and grows as necessary.
* **Efficiency:** Usually faster than \`Stack\` and \`LinkedList\` because it uses a circular array, avoiding reference pointer overhead and keeping elements contiguous in memory, which optimizes cache locality.`,
    codeExample: `// Custom Priority Queue for Tasks
PriorityQueue<Task> taskQueue = new PriorityQueue<>(
    Comparator.comparingInt(Task::getPriority).reversed() // Highest priority first
);

taskQueue.offer(new Task("Write Docs", 2));
taskQueue.offer(new Task("Fix Critical Bug", 10));
taskQueue.offer(new Task("Refactor CSS", 1));

while (!taskQueue.isEmpty()) {
    System.out.println(taskQueue.poll()); // Fix Critical Bug -> Write Docs -> Refactor CSS
}`,
    complexityTable: [
      { operation: 'Offer (Enqueue)', arrayDeque: 'O(1) amortized', priorityQueue: 'O(log N)' },
      { operation: 'Poll (Dequeue)', arrayDeque: 'O(1)', priorityQueue: 'O(log N)' },
      { operation: 'Peek (Examine)', arrayDeque: 'O(1)', priorityQueue: 'O(1)' },
      { operation: 'Null Elements', arrayDeque: 'Forbidden', priorityQueue: 'Forbidden' }
    ]
  },
  {
    id: 'map',
    title: 'Map Interface (HashMap vs TreeMap)',
    description: 'An object that maps keys to values. Master hashing functions, collision resolution via treeification, and sorted retrieval with tree nodes.',
    keyConcepts: [
      'Hash bucket array mapping with collision chaining',
      'Treeification threshold (8) and untreeification threshold (6)',
      'Red-Black Tree navigation in TreeMap',
      'Sub-map operations (headMap, tailMap, subMap)'
    ],
    detailedContent: `### Map Implementations in Java

A \`Map\` cannot contain duplicate keys; each key can map to at most one value.

#### 1. HashMap
* **Storage mechanics:** Consists of an array of nodes (buckets). A hash function computes the index from the key: \`hash = (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16)\`.
* **Collisions:** If multiple keys map to the same bucket, elements are chained in a Linked List. If the chain grows beyond 8 (\`TREEIFY_THRESHOLD\`) and table size is at least 64, it converts to a Red-Black Tree.
* **Load Factor:** Defaults to 0.75. When size exceeds \`capacity * load_factor\`, the backing array is doubled, and all elements are re-hashed.

#### 2. TreeMap
* **Storage mechanics:** A Red-Black tree-based \`NavigableMap\` implementation. Keys are sorted using their natural ordering or a \`Comparator\`.
* **Guarantees:** \`O(log N)\` cost for \`containsKey\`, \`get\`, \`put\` and \`remove\` operations. Can perform navigable searches like finding keys immediately above or below a threshold.`,
    codeExample: `// Map Navigation with TreeMap
TreeMap<Integer, String> grades = new TreeMap<>();
grades.put(90, "A");
grades.put(80, "B");
grades.put(70, "C");
grades.put(60, "D");

// Find the closest grade mapping
Map.Entry<Integer, String> passed = grades.ceilingEntry(75);
System.out.println("Passed entry: " + passed); // 80=B

Map.Entry<Integer, String> failed = grades.lowerEntry(70);
System.out.println("Lower than 70: " + failed); // 60=D`,
    complexityTable: [
      { operation: 'Get / Put', hashMap: 'O(1) average, O(N) or O(log N) worst', treeMap: 'O(log N)' },
      { operation: 'Ordering', hashMap: 'None', treeMap: 'Sorted' },
      { operation: 'Nulls allowed', hashMap: 'Yes (one null key, multiple null values)', treeMap: 'No null keys (throws NPE)' },
      { operation: 'Iteration speed', hashMap: 'O(capacity + size)', treeMap: 'O(size)' }
    ]
  },
  {
    id: 'concurrent',
    title: 'Concurrent Collections',
    description: 'Thread-safe structures designed for high-concurrency environments. Dive into segmented lock-stripping, volatile node variables, and copy-on-write.',
    keyConcepts: [
      'Segmented lock-stripping in early JDK vs CAS (Compare-And-Swap) in modern JDK',
      'Thread-safe reads without locking using volatile Node pointers',
      'Copy-on-write snapshot mechanics for read-heavy lists',
      'Blocking queues for Producer-Consumer designs'
    ],
    detailedContent: `### Java Concurrent Collections

In multithreaded environments, traditional collections like \`HashMap\` can enter infinite loops (during resizing) or throw \`ConcurrentModificationException\`. Concurrent collections solve this.

#### 1. ConcurrentHashMap
* **No Table-Wide Locking:** Unlike \`Hashtable\` or \`Collections.synchronizedMap()\`, which lock the entire structure, \`ConcurrentHashMap\` locks only the specific bucket head node being modified.
* **CAS (Compare-And-Swap):** Uses atomic hardware instructions for inserts in empty buckets.
* **Volatile Reads:** Table nodes hold volatile pointers, meaning reads are non-blocking and always see the latest written value.

#### 2. CopyOnWriteArrayList
* **Copy-on-Write:** Any mutative operations (\`add\`, \`set\`, \`remove\`) create a completely fresh copy of the underlying array.
* **Iterators:** Iterators operate on the snapshot array at the time of iterator creation. They never throw \`ConcurrentModificationException\` and do not support modifications. Highly performant for read-intensive, write-rare structures (e.g., event listeners).`,
    codeExample: `// Safe Concurrent Modification
ConcurrentHashMap<String, Integer> stock = new ConcurrentHashMap<>();
stock.put("Apples", 50);

// Thread-safe update using computeIfPresent
stock.computeIfPresent("Apples", (key, value) -> value - 5);
System.out.println("New Stock: " + stock.get("Apples")); // 45`,
    complexityTable: [
      { operation: 'Read Thread-Safety', concurrentHashMap: 'Non-blocking, O(1)', synchronizedMap: 'Exclusive lock, blocks other reads' },
      { operation: 'Write Thread-Safety', concurrentHashMap: 'Bucket-level lock/CAS, partial parallelism', synchronizedMap: 'Whole-table lock, zero parallelism' },
      { operation: 'CopyOnWriteArrayList', concurrentHashMap: 'Writes create fresh copy of array', synchronizedMap: 'Locks array on write, blocks reads' }
    ]
  },
  {
    id: 'iterators',
    title: 'Iterators (Fail-Fast vs Fail-Safe)',
    description: 'Traverse collections safely. Explore modCount structural modification tracking, fail-fast triggers, and safe element removal.',
    keyConcepts: [
      'modCount state tracker inside collections',
      'ConcurrentModificationException triggers during traversal',
      'ListIterator bidirectional capabilities and index operations',
      'Fail-safe Iterators operating on snapshots'
    ],
    detailedContent: `### Iterating in Java

Java collections can be iterated using \`Iterator\`, \`ListIterator\`, or the enhanced for-each loop (which compiled down to \`Iterator\` calls).

#### 1. Fail-Fast Iterators
* **Behavior:** Throws \`ConcurrentModificationException\` if the backing collection is structurally modified (elements added or removed) after the iterator is created, except through the iterator\'s own \`remove()\` method.
* **Implementation:** Backed by a structural modification counter variable called \`modCount\`. The iterator records the initial \`modCount\` and verifies it on each \`next()\` call.
* **Examples:** \`ArrayList\`, \`HashSet\`, \`HashMap\` iterators.

#### 2. Fail-Safe / Weakly-Consistent Iterators
* **Behavior:** Do not throw exception because they iterate on a clone/snapshot of the array or rely on weakly-consistent structures that reflect modifications but don\'t fail.
* **Examples:** \`CopyOnWriteArrayList\`, \`ConcurrentHashMap\` iterators.`,
    codeExample: `// Safe removal during iteration
List<String> fruits = new ArrayList<>(List.of("Apple", "Banana", "Cherry"));
Iterator<String> iterator = fruits.iterator();

while (iterator.hasNext()) {
    String fruit = iterator.next();
    if (fruit.equals("Banana")) {
        iterator.remove(); // Safe! Do not call fruits.remove() here
    }
}
System.out.println(fruits); // [Apple, Cherry]`,
    complexityTable: [
      { operation: 'Modification during traversal', failFast: 'Throws ConcurrentModificationException', failSafe: 'Allowed (no exception thrown)' },
      { operation: 'Memory Overhead', failFast: 'None (direct reads on data array)', failSafe: 'Can be high (for copy-on-write arrays)' },
      { operation: 'Data consistency', failFast: 'Always reads live data', failSafe: 'May operate on stale snapshot' }
    ]
  },
  {
    id: 'navigable-sorted',
    title: 'Navigable & Sorted Collections',
    description: 'Master sorted retrieval,range-querying APIs, and binary node comparisons. Harness NavigableSet and NavigableMap for range-sliced subsets.',
    keyConcepts: [
      'SortedSet vs NavigableSet interfaces',
      'Range queries: subSet, headSet, tailSet and their inclusive parameters',
      'Closest-match queries: ceiling, floor, higher, lower search utilities',
      'Descending iteration views without element copying'
    ],
    detailedContent: `### Navigable & Sorted Collections in Java

Java\'s \`SortedSet\` and \`SortedMap\` interfaces arrange their elements or keys in order. \`NavigableSet\` and \`NavigableMap\` extend them to add powerful search and slicing capabilities.

#### 1. NavigableSet (TreeSet)
* **What it does:** Allows you to find closest matches for a query element. For example, finding the lowest number greater than 15.
* **Search operations:**
  * \`ceiling(e)\`: Least element \`>= e\` (returns \`null\` if none).
  * \`floor(e)\`: Greatest element \`<= e\`.
  * \`higher(e)\`: Least element \`> e\`.
  * \`lower(e)\`: Greatest element \`< e\`.

#### 2. Range Slicing
* You can retrieve "views" of a collection within bounds:
  * \`subSet(fromElement, fromInclusive, toElement, toInclusive)\`: Returns a portion of the set.
  * These views are *backed* by the original collection. Modifications in the sub-set are reflected in the parent set, and vice versa!`,
    codeExample: `NavigableSet<Integer> scores = new TreeSet<>(List.of(45, 60, 75, 85, 95));

// Find closest matches
System.out.println("Ceiling of 70: " + scores.ceiling(70)); // 75
System.out.println("Lower than 60: " + scores.lower(60));   // 45

// Backed sub-set view
NavigableSet<Integer> passingScores = scores.subSet(60, true, 90, true);
System.out.println("Passing: " + passingScores); // [60, 75, 85]`,
    complexityTable: [
      { operation: 'Search (ceiling/floor)', treeSet: 'O(log N)', hashSet: 'N/A (unsorted)' },
      { operation: 'Range Sub-view creation', treeSet: 'O(1) bounds verification', hashSet: 'N/A' },
      { operation: 'Sub-view operations', treeSet: 'O(log N) checked inside bounds', hashSet: 'N/A' }
    ]
  },
  {
    id: 'streams',
    title: 'Streams Integration & Collections',
    description: 'Bridge standard collections with declarative functional processing. Deep dive into collectors, groupingBy, and custom parallel pipelines.',
    keyConcepts: [
      'Declarative iteration pipelines via streams()',
      'The Collectors class: toList, toMap, groupingBy, partitioningBy',
      'Collector execution flow: supplier, accumulator, combiner, finisher',
      'Parallel streams thread-safety and fork-join performance'
    ],
    detailedContent: `### Java Streams and Collections Integration

Streams in Java do not store data; instead, they carry elements from a source (such as a collection) through a pipeline of computational operations.

#### 1. Collecting Elements
* Reductions are often completed using terminal operations like \`Stream.collect()\`.
* **Collectors.toMap():** Converts a stream into a map. Be careful with key collisions! You must provide a merge function \`(v1, v2) -> v1\` to handle duplicate keys.
* **Collectors.groupingBy():** A multi-level map group-by classification (returns \`Map<K, List<T>>\`).

#### 2. Performance & Thread-safety
* **Parallel streams** use the common \`ForkJoinPool\`.
* Collections processed in parallel must either be stateless, thread-safe, or the reduction must use a thread-safe collector (like \`Collectors.toConcurrentMap()\`).`,
    codeExample: `// Grouping students by grade
List<Student> classroom = List.of(
    new Student(1, "Alice", "Grade-A"),
    new Student(2, "Bob", "Grade-B"),
    new Student(3, "Charlie", "Grade-A")
);

Map<String, List<Student>> studentsByGrade = classroom.stream()
    .collect(Collectors.groupingBy(Student::getGrade));

System.out.println(studentsByGrade); 
// {Grade-B=[Bob], Grade-A=[Alice, Charlie]}`,
    complexityTable: [
      { operation: 'Stream pipeline overhead', arrayList: 'Very low (index iterator)', hashSet: 'Low (bucket traversal)' },
      { operation: 'groupingBy collector', arrayList: 'O(N) grouping operations', hashSet: 'O(N) grouping operations' },
      { operation: 'Parallel stream overhead', arrayList: 'Low splitting cost', linkedList: 'High splitting cost (slow splitting)' }
    ]
  },
  {
    id: 'performance',
    title: 'Performance Considerations & Big-O',
    description: 'Establish systematic selection frameworks. Evaluate CPU caches, memory footprints, garbage collector impact, and algorithmic trade-offs.',
    keyConcepts: [
      'Big-O complexity metrics across all major structures',
      'Memory footprint: object headers, padding, and references',
      'CPU cache-line locality: contiguous arrays vs scattered node pointers',
      'Structural selection tree for matching collections to workloads'
    ],
    detailedContent: `### Systematic Collection Selection

Selecting the right data structure is a critical engineering decision. Let\'s explore the mechanical realities behind the asymptotic complexity.

#### 1. Memory Overhead & GC Pressure
* **ArrayList:** Uses a single contiguous block of memory. Very low GC pressure because there are no individual node objects.
* **LinkedList / TreeMap / HashMap:** Creates an object node for *every single entry*. This adds a 16-byte object header, 8-byte pointers, and alignment padding. Generates high GC churn when adding and removing items frequently.

#### 2. CPU Cache Locality
* Modern CPUs fetch data in 64-byte *cache lines*.
* **ArrayList** elements are adjacent in memory, meaning traversing an ArrayList loads adjacent elements into the L1/L2 cache ahead of time (spatial locality).
* **LinkedList** node objects can be scattered anywhere in the heap, causing "cache misses" on every pointer hop, which slows down iteration by orders of magnitude.`,
    codeExample: `// Quick selection flow chart:
// 1. Unique items needed? -> Yes -> Set
//    a. Must be sorted? -> Yes -> TreeSet
//    b. Keep insertion order? -> Yes -> LinkedHashSet
//    c. Speed matters, order doesn't? -> Yes -> HashSet
//
// 2. Key-Value mapping needed? -> Yes -> Map
//    a. Must keys be sorted? -> Yes -> TreeMap
//    b. Keep insertion order? -> Yes -> LinkedHashMap
//    c. Fast lookup? -> Yes -> HashMap
//
// 3. FIFO/LIFO? -> Queue/Deque
//    a. Priority sorted? -> Yes -> PriorityQueue
//    b. Fast double-ended? -> Yes -> ArrayDeque`,
    complexityTable: [
      { operation: 'Collection', hashSet: 'HashSet', treeSet: 'TreeSet', arrayList: 'ArrayList', linkedList: 'LinkedList' },
      { operation: 'Search', hashSet: 'O(1)', treeSet: 'O(log N)', arrayList: 'O(N)', linkedList: 'O(N)' },
      { operation: 'Insert at head', hashSet: 'O(1)', treeSet: 'O(log N)', arrayList: 'O(N)', linkedList: 'O(1)' },
      { operation: 'Memory usage', hashSet: 'Medium-High', treeSet: 'High', arrayList: 'Minimal', linkedList: 'Very High' }
    ]
  }
];

