import { Lab } from '../types';

export const labsData: Lab[] = [
  {
    id: 1,
    title: 'ArrayList vs LinkedList Operations Profiling',
    topic: 'List',
    objective: 'Measure and compare execution times for adding, searching, and removing elements at different positions in ArrayList and LinkedList.',
    problemStatement: 'Develop a benchmarking utility that measures and outputs the time taken in nanoseconds or milliseconds for insertion at the beginning, middle, and end of lists of size 100,000.',
    tasks: [
      'Create an ArrayList and a LinkedList and populate both with 100,000 Integer objects.',
      'Measure the time taken to insert 1,000 elements at the head (index 0) of both lists.',
      'Measure the time taken to insert 1,000 elements in the exact middle of both lists.',
      'Measure the time taken to insert 1,000 elements at the end (append) of both lists.',
      'Print a tabular report of the performance benchmarks.'
    ],
    expectedOutput: 'Table showing insertion speed: Head insertion is significantly faster in LinkedList; End/random access insertion is significantly faster in ArrayList.',
    sampleInputOutput: {
      input: 'Run benchmark with size=100000',
      output: 'ArrayList Insert Head: 45ms\nLinkedList Insert Head: 1ms\nArrayList Get Middle: 0ms\nLinkedList Get Middle: 120ms'
    },
    starterCode: `import java.util.*;

public class ListBenchmark {
    public static void main(String[] args) {
        int SIZE = 100000;
        List<Integer> arrayList = new ArrayList<>();
        List<Integer> linkedList = new LinkedList<>();
        
        // TODO: Populate lists with SIZE elements
        
        // TODO: Profile insert at head (index 0)
        long start = System.nanoTime();
        // Insert 1000 items at index 0 for arrayList...
        long end = System.nanoTime();
        
        // TODO: Profile insert at head for linkedList...
        
        // TODO: Print formatted output
    }
}`,
    solutionCode: `import java.util.*;

public class ListBenchmarkSolution {
    public static void main(String[] args) {
        int SIZE = 100000;
        List<Integer> arrayList = new ArrayList<>();
        List<Integer> linkedList = new LinkedList<>();
        
        for (int i = 0; i < SIZE; i++) {
            arrayList.add(i);
            linkedList.add(i);
        }
        
        // Profile ArrayList Head Insertion
        long start = System.currentTimeMillis();
        for (int i = 0; i < 5000; i++) {
            arrayList.add(0, -i);
        }
        long alHeadTime = System.currentTimeMillis() - start;
        
        // Profile LinkedList Head Insertion
        start = System.currentTimeMillis();
        for (int i = 0; i < 5000; i++) {
            linkedList.add(0, -i);
        }
        long llHeadTime = System.currentTimeMillis() - start;
        
        System.out.printf("ArrayList Head Insert (5000 items): %d ms\\n", alHeadTime);
        System.out.printf("LinkedList Head Insert (5000 items): %d ms\\n", llHeadTime);
    }
}`,
    instructorHints: [
      'Remind students that ArrayList elements are stored in contiguous memory, meaning inserting at index 0 forces all subsequent items to slide forward in memory.',
      'Explain that LinkedList merely updates pointer references when inserting at head, giving it constant O(1) performance here.'
    ],
    testCases: [
      'Verify ArrayList head insertion scales quadratically O(N^2) for many elements.',
      'Verify LinkedList head insertion stays strictly O(1) regardless of starting list size.'
    ]
  },
  {
    id: 2,
    title: 'Custom Sorting with Comparators & Comparable',
    topic: 'List',
    objective: 'Implement Comparable and multiple custom Comparator instances to sort an Employee collection.',
    problemStatement: 'Sort employees first by natural ordering (ID), then write custom comparators to sort by Salary (descending) and Name (alphabetical).',
    tasks: [
      'Create an Employee class with fields: id (int), name (String), salary (double), and department (String).',
      'Implement Comparable<Employee> based on ID.',
      'Write an external Comparator to sort employees by Salary in descending order.',
      'Write a multi-field Comparator that sorts by Department alphabetically, then by Salary (descending).',
      'Sort a populated list and print results.'
    ],
    expectedOutput: 'Employees sorted cleanly across multiple specifications as defined by the comparators.',
    sampleInputOutput: {
      input: 'List containing Bob ($50k, IT), Alice ($90k, IT), Charlie ($90k, HR)',
      output: 'Sorted by Dept & Salary: Charlie (HR, 90k) -> Alice (IT, 90k) -> Bob (IT, 50k)'
    },
    starterCode: `import java.util.*;

class Employee implements Comparable<Employee> {
    private int id;
    private String name;
    private double salary;
    private String department;

    public Employee(int id, String name, double salary, String department) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    @Override
    public int compareTo(Employee other) {
        // TODO: Implement natural sorting by ID
        return 0;
    }

    // Getters and toString()
}

public class EmployeeSorter {
    public static void main(String[] args) {
        List<Employee> list = new ArrayList<>();
        // TODO: Add employees, sort using custom comparators, and print
    }
}`,
    solutionCode: `import java.util.*;

class Employee implements Comparable<Employee> {
    int id;
    String name;
    double salary;
    String department;

    public Employee(int id, String name, double salary, String department) {
        this.id = id; this.name = name; this.salary = salary; this.department = department;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.id, other.id);
    }

    @Override
    public String toString() {
        return String.format("[%d] %s (%s, $%.0f)", id, name, department, salary);
    }
}

public class EmployeeSorterSolution {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>(Arrays.asList(
            new Employee(3, "Bob", 50000, "IT"),
            new Employee(1, "Alice", 90000, "IT"),
            new Employee(2, "Charlie", 90000, "HR")
        ));

        // Multi-level sort: Dept alphabetical, then Salary desc
        employees.sort(Comparator
            .comparing((Employee e) -> e.department)
            .thenComparing(Comparator.comparingDouble((Employee e) -> e.salary).reversed())
        );

        employees.forEach(System.out::println);
    }
}`,
    instructorHints: [
      'Highlight the difference between internal natural ordering (Comparable) and external configurable strategies (Comparator).',
      'Show students how Java 8+ lambda expressions and Comparator.comparing() chaining simplify nested comparators.'
    ],
    testCases: [
      'Ensure the sorting stays stable (elements with equal sorting keys retain original relative position).',
      'Check that double comparisons do not suffer from floating point truncation issues (use Double.compare()).'
    ]
  },
  {
    id: 3,
    title: 'HashMap vs TreeMap Keys & Collisions',
    topic: 'Map',
    objective: 'Analyze how HashMap and TreeMap handle key insertion, ordering, and collisions.',
    problemStatement: 'Add custom elements into a HashMap and TreeMap. Show how HashMap performance changes with key collisions, and how TreeMap requires keys to be Comparable.',
    tasks: [
      'Create a custom class BadKey that generates identical hashCode() values for different items (causing full collisions).',
      'Measure lookup times of BadKey keys inside a HashMap as size scales.',
      'Insert BadKey into a TreeMap and note why it fails unless BadKey implements Comparable or a Comparator is provided.'
    ],
    expectedOutput: 'HashMap search slows to O(N) or O(log N) due to collisions. TreeMap triggers ClassCastException unless key is Comparable.',
    sampleInputOutput: {
      input: 'Insert 5000 BadKey elements with duplicate hashCode',
      output: 'HashMap lookup: slow. TreeMap insert: ClassCastException (or O(log N) sorting if Comparable).'
    },
    starterCode: `import java.util.*;

class BadKey {
    private String val;
    public BadKey(String val) { this.val = val; }
    
    @Override
    public int hashCode() {
        return 42; // Collides absolutely!
    }
    
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof BadKey)) return false;
        return this.val.equals(((BadKey)o).val);
    }
}

public class CollisionAnalysis {
    public static void main(String[] args) {
        // TODO: Try placing BadKey inside HashMap and TreeMap.
    }
}`,
    solutionCode: `import java.util.*;

class BadKey implements Comparable<BadKey> {
    String val;
    public BadKey(String val) { this.val = val; }
    @Override public int hashCode() { return 42; }
    @Override public boolean equals(Object o) {
        return o instanceof BadKey && this.val.equals(((BadKey)o).val);
    }
    @Override public int compareTo(BadKey other) {
        return this.val.compareTo(other.val);
    }
}

public class CollisionSolution {
    public static void main(String[] args) {
        Map<BadKey, String> hashMap = new HashMap<>();
        Map<BadKey, String> treeMap = new TreeMap<>(); // Safe now with Comparable
        
        long start = System.nanoTime();
        for (int i = 0; i < 5000; i++) {
            hashMap.put(new BadKey("k" + i), "v" + i);
        }
        long insertTime = System.nanoTime() - start;
        System.out.println("HashMap populated in " + (insertTime / 1_000_000) + " ms");
    }
}`,
    instructorHints: [
      'Ensure students understand that TreeMap relies strictly on compareTo() or compare() to establish key uniqueness, completely bypassing equals() and hashCode().',
      'Explain Java 8 treeification: HashMap buckets turn from Node lists into TreeNode balanced Red-Black trees to cap search times at O(log N).'
    ],
    testCases: [
      'Verify that key lookup still operates correctly (returns the exact associated value) despite colliding hashes.',
      'Check that TreeMap key comparison returns 0 for equal keys, otherwise separate entries are created.'
    ]
  },
  {
    id: 4,
    title: 'PriorityQueue Dynamic Task Scheduler',
    topic: 'Queue & Deque',
    objective: 'Use a PriorityQueue with custom priorities and dynamic comparator updates to scheduler system jobs.',
    problemStatement: 'Build a scheduler queue where tasks are extracted based on priority level. If priorities are equal, extract the oldest task (FCFS).',
    tasks: [
      'Design a Task class with details: name (String), priority (int), and submissionTime (long).',
      'Write a PriorityQueue comparator comparing priority (high to low) and submission time (old to new).',
      'Simulate adding and polling tasks to verify correct extraction sequence.'
    ],
    expectedOutput: 'PriorityQueue retrieves tasks in strict descending priority order, resolving ties with submission timestamps.',
    sampleInputOutput: {
      input: 'Add: JobA(P=1, t=100), JobB(P=5, t=101), JobC(P=5, t=99)',
      output: 'Poll order: JobC -> JobB -> JobA'
    },
    starterCode: `import java.util.*;

class Job {
    String name;
    int priority;
    long submitTime;
    // TODO: Constructor and fields
}

public class JobScheduler {
    public static void main(String[] args) {
        // TODO: Build and test PriorityQueue
    }
}`,
    solutionCode: `import java.util.*;

class Job {
    String name;
    int priority;
    long submitTime;

    public Job(String name, int priority) {
        this.name = name;
        this.priority = priority;
        this.submitTime = System.nanoTime();
    }

    @Override
    public String toString() {
        return name + "(P=" + priority + ")";
    }
}

public class JobSchedulerSolution {
    public static void main(String[] args) {
        PriorityQueue<Job> pq = new PriorityQueue<>(
            Comparator.comparingInt((Job j) -> j.priority).reversed()
                      .thenComparingLong(j -> j.submitTime)
        );

        pq.offer(new Job("Fix UI", 2));
        pq.offer(new Job("Crash Fix", 10));
        pq.offer(new Job("Database Indexing", 10));

        while (!pq.isEmpty()) {
            System.out.println(pq.poll()); // Crash Fix -> Database Indexing -> Fix UI
        }
    }
}`,
    instructorHints: [
      'Remind students that PriorityQueue does not guarantee a sorted order when iterated directly with for-each; they must pull elements using poll() to see elements in sorted order.',
      'Explain that priority queues are binary min/max heaps under the hood, maintaining heap structure in O(log N) time.'
    ],
    testCases: [
      'Confirm ties on priority extract elements in FIFO/FCFS order using timestamps.',
      'Confirm adding a super-high priority job mid-queue immediately moves it to the front of the next poll.'
    ]
  },
  {
    id: 5,
    title: 'Word Frequency Analyzer with ConcurrentHashMap',
    topic: 'Concurrent Collections',
    objective: 'Implement a thread-safe word counter running on multiple parallel threads using ConcurrentHashMap.',
    problemStatement: 'Develop a system where multiple threads count occurrences of words from separate files simultaneously and update a shared thread-safe Map.',
    tasks: [
      'Create a shared ConcurrentHashMap<String, Integer> instance.',
      'Create task threads that read sections of text and update the map.',
      'Use atomic operations like compute(), merge(), or LongAdder to prevent thread interference or lost updates.',
      'Verify correctness of totals compared to a single-threaded execution.'
    ],
    expectedOutput: 'Accurate word counts without thread race conditions, utilizing highly performant lock-free reads.',
    sampleInputOutput: {
      input: 'Thread 1: "apple banana", Thread 2: "banana apple apple"',
      output: 'Final stock map: {apple=3, banana=2}'
    },
    starterCode: `import java.util.concurrent.*;

public class ConcurrentWordCounter {
    public static void main(String[] args) throws InterruptedException {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        // TODO: Launch multiple threads updating map using atomic actions.
    }
}`,
    solutionCode: `import java.util.concurrent.*;
import java.util.*;

public class ConcurrentWordCounterSolution {
    public static void main(String[] args) throws InterruptedException {
        ConcurrentHashMap<String, Integer> wordCounts = new ConcurrentHashMap<>();
        ExecutorService executor = Executors.newFixedThreadPool(4);

        String[] doc1 = {"apple", "banana", "cherry", "apple"};
        String[] doc2 = {"banana", "apple", "date", "banana"};

        Runnable r1 = () -> {
            for (String w : doc1) {
                wordCounts.merge(w, 1, Integer::sum);
            }
        };

        Runnable r2 = () -> {
            for (String w : doc2) {
                wordCounts.merge(w, 1, Integer::sum);
            }
        };

        executor.execute(r1);
        executor.execute(r2);
        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);

        System.out.println(wordCounts); // {apple=3, banana=3, cherry=1, date=1}
    }
}`,
    instructorHints: [
      'Warn students that although ConcurrentHashMap itself is thread-safe, external compound operations (e.g., check-then-act via get() and put()) are NOT atomic unless using compute(), merge(), or computeIfAbsent().'
    ],
    testCases: [
      'Verify word totals match exactly even under extreme thread contention (e.g., 50 threads incrementing the same key).'
    ]
  },
  {
    id: 6,
    title: 'Bidirectional Navigation with ListIterator',
    topic: 'Iterators',
    objective: 'Explore and utilize ListIterator to traverse and safely modify a list in both forward and backward directions.',
    problemStatement: 'Navigate a sequence of historical undo actions. Travel forward, replace specific elements, and backtrack to print elements in reverse.',
    tasks: [
      'Initialize an ArrayList populated with custom actions.',
      'Obtain a ListIterator and traverse forward, replacing any "Deprecated" action.',
      'Once at the end, backtrack to the beginning, printing items and inserting an "Insert-Undo" marker after specific indices.'
    ],
    expectedOutput: 'A modified action list printed in reverse order using the bi-directional iterator methods.',
    sampleInputOutput: {
      input: '["Write", "Deprecated", "Format"]',
      output: 'Traverse forward, replace Deprecated with Update. Traverse backward: ["Format", "Update", "Write"]'
    },
    starterCode: `import java.util.*;

public class IteratorExercise {
    public static void main(String[] args) {
        List<String> actions = new ArrayList<>(Arrays.asList("Commit", "Deprecated", "Push", "Revert"));
        // TODO: Get ListIterator, edit Deprecated -> Fixed, and print reverse.
    }
}`,
    solutionCode: `import java.util.*;

public class IteratorSolution {
    public static void main(String[] args) {
        List<String> actions = new ArrayList<>(Arrays.asList("Commit", "Deprecated", "Push", "Revert"));
        ListIterator<String> lit = actions.listIterator();

        while (lit.hasNext()) {
            String act = lit.next();
            if ("Deprecated".equals(act)) {
                lit.set("Patched"); // Safe replacement in-flight
            }
        }

        // Now print in reverse order
        while (lit.hasPrevious()) {
            System.out.println(lit.previousIndex() + ": " + lit.previous());
        }
    }
}`,
    instructorHints: [
      'Note that listIterator() can be started at any index (e.g., list.listIterator(list.size())).',
      'Explain that the cursor of ListIterator sits *between* elements.'
    ],
    testCases: [
      'Ensure list holds "Patched" instead of "Deprecated".',
      'Verify indexes match expected positions during bidirectional cursor shifts.'
    ]
  },
  {
    id: 7,
    title: 'Stack & Queue emulation with ArrayDeque',
    topic: 'Queue & Deque',
    objective: 'Implement a thread stack visualizer and task pipeline using ArrayDeque as both a LIFO Stack and a FIFO Queue.',
    problemStatement: 'Create a program that handles task execution. First, push call scopes onto a Stack, then queue results into a circular buffer FIFO queue.',
    tasks: [
      'Initialize an ArrayDeque instance.',
      'Use the ArrayDeque as a LIFO stack (push, pop, peek). Compare performance to legacy java.util.Stack.',
      'Use another ArrayDeque as a FIFO queue (addLast, removeFirst).'
    ],
    expectedOutput: 'LIFO execution scopes pop first, followed by FIFO task queuing results. ArrayDeque outperforms Stack.',
    sampleInputOutput: {
      input: 'Push A, B, Pop -> Enqueue to Queue',
      output: 'Stack Pop: B. Queue Poll: B.'
    },
    starterCode: `import java.util.*;

public class DequeStructure {
    public static void main(String[] args) {
        Deque<String> stack = new ArrayDeque<>();
        Deque<String> queue = new ArrayDeque<>();
        // TODO: Demonstrate LIFO stack and FIFO queue mechanics
    }
}`,
    solutionCode: `import java.util.*;

public class DequeSolution {
    public static void main(String[] args) {
        // Stack mode (LIFO)
        Deque<String> callStack = new ArrayDeque<>();
        callStack.push("main()");
        callStack.push("calculate()");
        callStack.push("printResult()");

        System.out.println("Popping stack: " + callStack.pop()); // printResult()

        // Queue mode (FIFO)
        Deque<String> printerQueue = new ArrayDeque<>();
        printerQueue.offer("Invoice.pdf");
        printerQueue.offer("Report.csv");

        System.out.println("Polling queue: " + printerQueue.poll()); // Invoice.pdf
    }
}`,
    instructorHints: [
      'Explain why legacy java.util.Stack is obsolete (it extends Vector, meaning all operations are synchronized, incurring high performance overhead even in single-threaded environments).'
    ],
    testCases: [
      'Validate empty checks do not throw exceptions when calling poll() or peek() (unlike remove() and pop()).'
    ]
  },
  {
    id: 8,
    title: 'NavigableSet Boundary Grade Slicer',
    topic: 'Navigable & Sorted Collections',
    objective: 'Apply TreeSet range slicing APIs (subSet, ceiling, floor) to build a grading threshold utility.',
    problemStatement: 'Represent grading boundaries using a NavigableSet. Write a lookup function that queries the closest matching passing boundaries for scores.',
    tasks: [
      'Populate a TreeSet with boundary scores (e.g. 50, 60, 70, 80, 90).',
      'For any student score, return the floor boundary (grade passed) and ceiling boundary (next tier targets).',
      'Extract subset slices of passing scores cleanly.'
    ],
    expectedOutput: 'Clean bounds classification without complex loop boundaries, using TreeSet ceiling and floor.',
    sampleInputOutput: {
      input: 'Score: 78. Boundaries: [50, 60, 70, 80, 90]',
      output: 'Current Tier: 70. Next Tier Target: 80.'
    },
    starterCode: `import java.util.*;

public class GradeBoundary {
    public static void main(String[] args) {
        NavigableSet<Integer> thresholds = new TreeSet<>(Arrays.asList(50, 60, 70, 80, 90));
        // TODO: Implement tier queries
    }
}`,
    solutionCode: `import java.util.*;

public class GradeBoundarySolution {
    public static void main(String[] args) {
        NavigableSet<Integer> thresholds = new TreeSet<>(Arrays.asList(50, 60, 70, 80, 90));
        int studentScore = 78;

        Integer currentGrade = thresholds.floor(studentScore);
        Integer nextGrade = thresholds.ceiling(studentScore);

        System.out.println("Current Grade Tier: " + currentGrade); // 70
        System.out.println("Next Grade Target: " + nextGrade);       // 80
        
        // Slicing passing grades
        System.out.println("Passing tiers: " + thresholds.tailSet(60, true)); // [60, 70, 80, 90]
    }
}`,
    instructorHints: [
      'Treeset searches use binary search tree logic under the hood, running in O(log N) time.'
    ],
    testCases: [
      'Validate that scores exactly matching boundary values return that exact value for both floor and ceiling.'
    ]
  },
  {
    id: 9,
    title: 'Collections Utility Mastery',
    topic: 'List',
    objective: 'Leverage the java.util.Collections class helper methods to perform search, synchronization, and secure wrappers.',
    problemStatement: 'Demonstrate the utility of Collections methods by making lists unmodifiable, creating synchronized wrappers, shuffling, and performing efficient binary searches.',
    tasks: [
      'Initialize an ArrayList and populate with integers.',
      'Perform binarySearch on sorted list.',
      'Wrap lists inside Collections.unmodifiableList() and verify UnsupportedOperationException on modifications.',
      'Shuffle list and extract min/max.'
    ],
    expectedOutput: 'Successful search, shuffle, and security exceptions thrown when attempting to edit read-only lists.',
    sampleInputOutput: {
      input: 'Wrap a List, then attempt add("Forbidden")',
      output: 'UnsupportedOperationException thrown successfully.'
    },
    starterCode: `import java.util.*;

public class CollectionsHelper {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("Red", "Green", "Blue"));
        // TODO: Binary search, shuffle, unmodifiable wrapper
    }
}`,
    solutionCode: `import java.util.*;

public class CollectionsHelperSolution {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("Alpha", "Beta", "Gamma", "Delta"));
        Collections.sort(list);

        int index = Collections.binarySearch(list, "Beta");
        System.out.println("Beta found at: " + index); // 1

        List<String> readOnly = Collections.unmodifiableList(list);
        try {
            readOnly.add("Epsilon");
        } catch (UnsupportedOperationException e) {
            System.out.println("Unmodifiable list blocked write!");
        }
    }
}`,
    instructorHints: [
      'Remind students that Collections.unmodifiableList() is a read-only VIEW. If the backing list changes, the unmodifiable wrapper reflects those updates!'
    ],
    testCases: [
      'Assert modification of unmodifiable wrapper always fails.',
      'Check binarySearch requires prior sorting to output accurate indices.'
    ]
  },
  {
    id: 10,
    title: 'Functional Stream Collectors & Grouping',
    topic: 'Streams Integration',
    objective: 'Collect stream items into grouped Maps, custom partitions, and summary statistics objects.',
    problemStatement: 'Read a stream of sales orders. Group orders by region, compute revenue sums, and partition orders into large-vs-small sales.',
    tasks: [
      'Create an Order class with fields: id, region, amount.',
      'Group orders by region returning Map<String, List<Order>>.',
      'Sum amounts by region using Collectors.summingDouble().',
      'Partition orders into high value (> $500) vs standard value.'
    ],
    expectedOutput: 'Orders collected into structured Map summaries using stream reduction collectors.',
    sampleInputOutput: {
      input: 'Orders: NY($600), NY($200), LA($900)',
      output: 'Grouped Sales: NY=$800, LA=$900. High Value: [NY($600), LA($900)]'
    },
    starterCode: `import java.util.*;
import java.util.stream.*;

class Order {
    String region;
    double amount;
    // TODO: Constructor and getters
}

public class StreamOrders {
    public static void main(String[] args) {
        // TODO: Build sales pipeline
    }
}`,
    solutionCode: `import java.util.*;
import java.util.stream.*;

class Order {
    String id;
    String region;
    double amount;

    public Order(String id, String region, double amount) {
        this.id = id; this.region = region; this.amount = amount;
    }
    public String getRegion() { return region; }
    public double getAmount() { return amount; }
}

public class StreamOrdersSolution {
    public static void main(String[] args) {
        List<Order> orders = Arrays.asList(
            new Order("1", "East", 600.0),
            new Order("2", "East", 150.0),
            new Order("3", "West", 800.0)
        );

        // Grouping by region with total amount
        Map<String, Double> salesByRegion = orders.stream()
            .collect(Collectors.groupingBy(Order::getRegion, Collectors.summingDouble(Order::getAmount)));

        // Partitioning into large orders
        Map<Boolean, List<Order>> partitioned = orders.stream()
            .collect(Collectors.partitioningBy(o -> o.getAmount() > 500.0));

        System.out.println("Sales by Region: " + salesByRegion); // {East=750.0, West=800.0}
        System.out.println("High Value Count: " + partitioned.get(true).size()); // 2
    }
}`,
    instructorHints: [
      'Demonstrate groupingBy with downstream collectors to perform aggregations (like averaging, counting, or summing) within nested maps.'
    ],
    testCases: [
      'Verify summing outputs match mathematical calculations exactly.',
      'Check empty lists do not throw NullPointerExceptions on terminal collections.'
    ]
  },
  {
    id: 11,
    title: 'Custom Collection Implementation (Circular Queue)',
    topic: 'List',
    objective: 'Implement a custom, bounded, circular buffer array collection from scratch implementing standard iterator capabilities.',
    problemStatement: 'Create a CircularQueue class of fixed capacity. Avoid using Java collections to build storage. Implement element push/pop and a custom Iterator.',
    tasks: [
      'Define array storage and head, tail pointers.',
      'Write enqueue and dequeue methods using circular modulo logic: (tail + 1) % capacity.',
      'Write an Iterator class inside CircularQueue implementing hasNext() and next().',
      'Prevent overflows and underflows throwing exceptions.'
    ],
    expectedOutput: 'A fully functional circular buffer collection that works with the enhanced for-each loop traversal.',
    sampleInputOutput: {
      input: 'Queue capacity=3. Enqueue: A, B, C. Dequeue -> Enqueue: D',
      output: 'Queue state: [B, C, D]'
    },
    starterCode: `import java.util.*;

public class CircularQueue<E> implements Iterable<E> {
    private E[] elements;
    private int head = 0;
    private int tail = 0;
    private int size = 0;

    @SuppressWarnings("unchecked")
    public CircularQueue(int capacity) {
        elements = (E[]) new Object[capacity];
    }

    public void enqueue(E item) {
        // TODO: Implement circular enqueue
    }

    public E dequeue() {
        // TODO: Implement circular dequeue
        return null;
    }

    @Override
    public Iterator<E> iterator() {
        // TODO: Implement circular iterator
        return null;
    }
}`,
    solutionCode: `import java.util.*;

public class CircularQueueSolution<E> implements Iterable<E> {
    private E[] elements;
    private int head = 0;
    private int tail = 0;
    private int size = 0;
    private int capacity;

    @SuppressWarnings("unchecked")
    public CircularQueueSolution(int capacity) {
        this.capacity = capacity;
        elements = (E[]) new Object[capacity];
    }

    public void enqueue(E item) {
        if (size == capacity) throw new IllegalStateException("Queue Full");
        elements[tail] = item;
        tail = (tail + 1) % capacity;
        size++;
    }

    public E dequeue() {
        if (size == 0) throw new NoSuchElementException("Queue Empty");
        E item = elements[head];
        elements[head] = null;
        head = (head + 1) % capacity;
        size--;
        return item;
    }

    @Override
    public Iterator<E> iterator() {
        return new Iterator<E>() {
            private int currIdx = head;
            private int count = 0;

            @Override
            public boolean hasNext() {
                return count < size;
            }

            @Override
            public E next() {
                if (!hasNext()) throw new NoSuchElementException();
                E item = elements[currIdx];
                currIdx = (currIdx + 1) % capacity;
                count++;
                return item;
            }
        };
    }
}`,
    instructorHints: [
      'Remind students that custom Iterable components must return an Iterator where hasNext() does NOT mutate collection state, and next() retrieves items and advances iteration indexes.'
    ],
    testCases: [
      'Verify enqueue throws IllegalStateException on full queue.',
      'Verify Iterator traverses exactly matching insertion order even when indices wrap around boundary edges.'
    ]
  },
  {
    id: 12,
    title: 'Debugging Hashing Contract & Equals',
    topic: 'Set',
    objective: 'Investigate, diagnose, and resolve a duplicate element bug in a HashSet caused by overriding equals() without hashCode().',
    problemStatement: 'Observe why a User object is added multiple times into a HashSet despite matching usernames, and patch the hashing bug.',
    tasks: [
      'Analyze a flawed User class with overridden equals() but missing/flawed hashCode() method.',
      'Add User elements to a HashSet and print size (noting duplicate occurrences).',
      'Patch the class with a robust hashCode() and verify Set blocks duplicates.'
    ],
    expectedOutput: 'HashSet contains distinct entries once equals and hashCode are aligned in the User class.',
    sampleInputOutput: {
      input: 'Add two Users both with username "sysadmin" into HashSet',
      output: 'Flawed: Set size is 2 (duplicates present). Patched: Set size is 1.'
    },
    starterCode: `import java.util.*;

class User {
    private String username;
    public User(String username) { this.username = username; }

    @Override
    public boolean equals(Object o) {
        if (o instanceof User) {
            return this.username.equals(((User) o).username);
        }
        return false;
    }
    
    // TODO: Why does HashSet duplicate users? Add missing contract piece.
}

public class BugDemo {
    public static void main(String[] args) {
        Set<User> set = new HashSet<>();
        set.add(new User("devops"));
        set.add(new User("devops"));
        System.out.println("Set size (should be 1): " + set.size());
    }
}`,
    solutionCode: `import java.util.*;

class User {
    private String username;
    public User(String username) { this.username = username; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o instanceof User) {
            return this.username.equals(((User) o).username);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(username); // Aligns equals/hashCode contract
    }
}

public class BugDemoSolution {
    public static void main(String[] args) {
        Set<User> set = new HashSet<>();
        set.add(new User("devops"));
        set.add(new User("devops"));
        System.out.println("Set size: " + set.size()); // Size: 1
    }
}`,
    instructorHints: [
      'Remind students that a HashSet first uses key.hashCode() to locate a bucket. If buckets differ (due to different hashes), equals() is never called, and duplicates arise!'
    ],
    testCases: [
      'Verify equals() returns true for matching usernames.',
      'Verify hashCode() returns matching hash values for equals() identical objects.'
    ]
  }
];
