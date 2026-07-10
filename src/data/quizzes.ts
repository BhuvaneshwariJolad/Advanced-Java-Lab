import { QuizQuestion } from '../types';

export const quizzesData: QuizQuestion[] = [
  {
    id: 1,
    labId: 1,
    topic: 'List',
    question: 'What is the worst-case time complexity of inserting an element at index 0 in an ArrayList of size N, assuming it doesn\'t trigger a resize?',
    options: [
      'O(1)',
      'O(log N)',
      'O(N)',
      'O(N log N)'
    ],
    correctAnswer: 2,
    explanation: 'Even without resizing, inserting at index 0 requires shifting all existing elements one position to the right, which takes linear O(N) time.'
  },
  {
    id: 2,
    labId: 2,
    topic: 'List',
    question: 'Which of the following approaches is most appropriate if you want to sort a List of elements using a transient rule without modifying the source class?',
    options: [
      'Implement Comparable<T> inside the source class.',
      'Pass a custom Comparator<T> lambda or instance to the List.sort() method.',
      'Wrap the List in a TreeSet.',
      'Cast the elements to Comparable and call Collections.sort().'
    ],
    correctAnswer: 1,
    explanation: 'Comparators represent external, interchangeable sorting strategies, allowing you to define transient sorting rules without editing the source class.'
  },
  {
    id: 3,
    labId: 3,
    topic: 'Map',
    question: 'What happens if you insert a custom class key into a TreeMap that does NOT implement Comparable, and you didn\'t provide an external Comparator to the TreeMap constructor?',
    options: [
      'It compiles and runs successfully, sorting keys by their memory address hashCode.',
      'It triggers a compile-time error.',
      'It throws a runtime ClassCastException during key insertion.',
      'It silently places the entry in a collision bucket list.'
    ],
    correctAnswer: 2,
    explanation: 'TreeMap requires keys to be comparable. If keys are not Comparable and no Comparator is supplied, inserting an element throws a ClassCastException at runtime.'
  },
  {
    id: 4,
    labId: 4,
    topic: 'Queue & Deque',
    question: 'What is the order of elements traversed when using a standard Iterator (or for-each loop) over a populated PriorityQueue?',
    options: [
      'Elements are traversed in strict ascending priority order.',
      'Elements are traversed in strict descending priority order.',
      'Elements are traversed in the order they were inserted.',
      'No guaranteed sorted order is maintained; elements are traversed in arbitrary order matching the underlying heap array.'
    ],
    correctAnswer: 3,
    explanation: 'The Iterator for PriorityQueue does NOT guarantee any specific traversal order. To retrieve elements in sorted priority order, you must call poll() repeatedly.'
  },
  {
    id: 5,
    labId: 5,
    topic: 'Concurrent Collections',
    question: 'Given a ConcurrentHashMap map, why is the code "map.put(key, map.get(key) + 1)" considered thread-unsafe in concurrent environments?',
    options: [
      'ConcurrentHashMap is not synchronized and does not block concurrent thread writes.',
      'This is a compound read-modify-write operation (check-then-act) which is not atomic as a whole, allowing race conditions between the get and put operations.',
      'The put method throws a ConcurrentModificationException if run concurrently.',
      'The values inside ConcurrentHashMap are immutable and cannot be incremented.'
    ],
    correctAnswer: 1,
    explanation: 'While individual ConcurrentHashMap methods are atomic, compound statements like get-and-put are NOT. Threads can interleave between get() and put(), causing lost updates. Use map.merge() or map.compute() for atomic updates.'
  },
  {
    id: 6,
    labId: 6,
    topic: 'Iterators',
    question: 'Which of the following iterators allows you to traverse elements in both directions and edit/insert items safely during traversal?',
    options: [
      'java.util.Iterator',
      'java.util.ListIterator',
      'java.util.Spliterator',
      'java.util.Enumeration'
    ],
    correctAnswer: 1,
    explanation: 'ListIterator is a specialized iterator that supports bidirectional navigation (hasPrevious(), previous()) and safe modifications (add(), set(), remove()) in-flight.'
  },
  {
    id: 7,
    labId: 7,
    topic: 'Queue & Deque',
    question: 'Why is ArrayDeque preferred over the classic java.util.Stack for implementing LIFO stacks in modern Java?',
    options: [
      'java.util.Stack is synchronized and extends Vector, incurring unnecessary locking overhead in single-threaded contexts.',
      'ArrayDeque has a fixed capacity and prevents StackOverflowErrors.',
      'java.util.Stack does not support objects, only primitive types.',
      'ArrayDeque allows duplicate elements while Stack does not.'
    ],
    correctAnswer: 0,
    explanation: 'Stack is a legacy collection that extends Vector. Because Vector synchronizes all of its methods, it incurs significant synchronization overhead. ArrayDeque is unsynchronized and much faster.'
  },
  {
    id: 8,
    labId: 8,
    topic: 'Navigable & Sorted Collections',
    question: 'Which NavigableSet method returns the greatest element in this set less than or equal to the given element, or null if there is no such element?',
    options: [
      'lower(e)',
      'floor(e)',
      'ceiling(e)',
      'higher(e)'
    ],
    correctAnswer: 1,
    explanation: 'The floor(e) method returns the greatest element <= e. The lower(e) method is strict, returning the greatest element < e.'
  },
  {
    id: 9,
    labId: 9,
    topic: 'List',
    question: 'What happens to a read-only list returned by Collections.unmodifiableList(list) if the original "list" reference is modified afterward?',
    options: [
      'The unmodifiable wrapper list retains a copy and does not change.',
      'The unmodifiable wrapper list automatically reflects the changes, since it is a read-only view, not a structural copy.',
      'Modifying the original list throws an UnsupportedOperationException immediately.',
      'The unmodifiable list becomes corrupted and throws NullPointerExceptions.'
    ],
    correctAnswer: 1,
    explanation: 'Collections.unmodifiableList() returns a structural *view* of the original list. If the underlying original list is modified, those updates will be visible through the unmodifiable view.'
  },
  {
    id: 10,
    labId: 10,
    topic: 'Streams Integration',
    question: 'Which java.util.stream.Collector partitions stream items into two distinct groups (represented by List values) keyed by Boolean (true/false) values?',
    options: [
      'Collectors.groupingBy()',
      'Collectors.toMap()',
      'Collectors.partitioningBy()',
      'Collectors.reducing()'
    ],
    correctAnswer: 2,
    explanation: 'Collectors.partitioningBy() splits elements into two categories (true and false) based on a Predicate, returning a Map<Boolean, List<T>>.'
  },
  {
    id: 11,
    labId: 11,
    topic: 'List',
    question: 'In a circular array-backed bounded queue of capacity C, how is the "tail" pointer advanced when enqueuing a new element?',
    options: [
      'tail = tail + 1',
      'tail = (tail + 1) % C',
      'tail = tail - 1',
      'tail = (tail * 2) % C'
    ],
    correctAnswer: 1,
    explanation: 'Modulo arithmetic (tail + 1) % C wraps the index back to 0 when it exceeds the array boundaries, allowing efficient circular buffer usage.'
  },
  {
    id: 12,
    labId: 12,
    topic: 'Set',
    question: 'If two distinct object instances are equal according to equals(), but return different values for hashCode(), what happens when both are inserted into a HashSet?',
    options: [
      'The second object overrides the first one in the set.',
      'The set rejects the second object, throwing an exception.',
      'The set contains both objects as duplicate elements because they map to different bucket hashes, violating Set uniqueness.',
      'The HashSet automatically corrects the hash and merges them.'
    ],
    correctAnswer: 2,
    explanation: 'A HashSet first uses hashCode() to locate the storage bucket. If the hash codes are different, the set assumes they are completely different items and places them in separate buckets without checking equals(), leading to duplicates.'
  }
];
