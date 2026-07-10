# Java Collections Advanced Lab Portal

An interactive, high-fidelity learning management portal and simulator for the **Java Collection Framework (JCF)**. Built with React, TypeScript, and Tailwind CSS, this offline-first portal bridges theoretical computer science complexity with concrete physical memory layout simulations.

---

## 🚀 Features

1. **Module Topics Browser**: Detailed explanations of 9 primary collection framework modules (List, Set, Queue, Deque, Map, Sorted/Navigable, Concurrent Collections, Iterators, and Stream integration) featuring custom Big-O complexity tables and copyable code blocks.
2. **12 Practical Hands-On Labs**: Complete laboratory exercises spanning ArrayList vs LinkedList performance profiling, Comparator custom object sorting, HashMap collision analytics, PriorityQueue FCFS tie-breakers, ListIterator cursor operations, Deque stacks emulation, custom circular collections implementation, and debugging hashing contract violations.
3. **Downloadable Starter Code**: Students can download fully commented starter `.java` files directly from the browser context to begin work locally.
4. **Interactive Memory & Code Simulator**: Fully client-side visual simulation representing internal data-structure RAM layers. Let students add/remove/search elements and watch backing contiguous array slots double, linked nodes adjust pointer links, hash indexes collide inside bucket nodes, or binary priority heaps re-align!
5. **Evaluation Quizzes**: 12 modular multiple-choice questions matching each lab, featuring immediate grade scoring, correct/wrong flags, and complete academic discussion explanations. High scores are persisted in client-side `localStorage`.
6. **Theoretical & Practical Exams**: Auto-graded multi-choice baseline exams alongside manual `.java` submittal drag-and-drop simulators which trace mock compiler, linting, stress-tests, and JUnit checks inside a visual console.
7. **Printable Cheat Sheets**: Printable PDF-ready big-O complexity index, useful conversion shortcuts, and reference links.
8. **Instructor Security Gateway**: Authorised gateway (token code `admin123`) revealing reference solutions keys, classroom debate guides, and student submittals reviewer boards.

---

## 📁 File Structure

```text
/
├── .env.example          # Environment declarations
├── index.html            # Main HTML wrapper entry point
├── metadata.json         # Platform application settings
├── package.json          # Node scripts and dependencies manifests
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configurations
└── src/
    ├── App.tsx           # Main App structure wrapping page views
    ├── main.tsx          # Application entry point binding index.css
    ├── index.css         # Tailwind global style bindings
    ├── types.ts          # Consolidated TypeScript interface declarations
    ├── data/
    │   ├── topics.ts     # Curated modules data
    │   ├── labs.ts       # Detailed labs instructions, starter codes & keys
    │   └── quizzes.ts    # 12 MCQ assessments & explanations data
    └── components/
        ├── Navigation.tsx   # Sticky navbar + mobile drawer + theme switcher
        ├── Home.tsx         # Course dashboard overview + contact form
        ├── Topics.tsx       # Core topics detailed browser
        ├── Labs.tsx         # 12 Labs steps, code viewers & downloads
        ├── Playground.tsx   # Interactive visual memory & JVM consoles
        ├── Quizzes.tsx      # Evaluative quizzes with localStorage scores
        ├── Assessments.tsx  # Autograded MCQ and manual code submit pipelines
        ├── Resources.tsx    # Big-O complexity matrices & printable files
        └── Admin.tsx        # Solutions, debate prompts & student rosters
```

---

## 💻 Local Setup & Development

To run this application locally, you must have [Node.js](https://nodejs.org/) installed on your computer.

### 1. Install Dependencies
Navigate to the root directory in your terminal and install node packages:
```bash
npm install
```

### 2. Launch Development Server
Launch the local dev server (default port binds to `3000`):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the interactive portal.

### 3. Build & Produce Static Assets
Compile the React source code and bundle it into high-performance, minified static elements inside `dist/`:
```bash
npm run build
```

---

## ⚙️ How to Customize and Extend

### 1. Adding a New Practical Lab
Open `/src/data/labs.ts` and append a new object inside the `labsData` array complying with the `Lab` interface:
```typescript
{
  id: 13,
  title: 'My Custom Lab',
  topic: 'Set',
  objective: 'Demo custom features...',
  problemStatement: 'Detail instructions...',
  tasks: ['Step 1', 'Step 2'],
  expectedOutput: 'Desired console outputs...',
  sampleInputOutput: { input: 'Query', output: 'Result' },
  starterCode: 'public class Main { ... }',
  solutionCode: 'public class Solution { ... }',
  instructorHints: ['Hint 1'],
  testCases: ['Verification 1']
}
```
*Note: The navbar selector, linter, solutions gateway, and quizzes will auto-align to render the new lab dynamically.*

### 2. Modifying Quiz Questions
Edit `/src/data/quizzes.ts` and modify or add objects conforming to the `QuizQuestion` interface. To preserve correct tracking alignment, ensure `labId` matches the corresponding lab's ID.

### 3. Exporting Lab Starter ZIPs or Code Files
In this portal, starter code is exported as raw `.java` files on demand! To customize files or export format:
1. Open `/src/components/Labs.tsx`.
2. Locate the `handleDownloadFile()` function.
3. This function constructs a local memory Blob and downloads the raw template string as an independent `.java` compilation unit directly on client click. You can easily adjust the blob type or wrap multiple files if needed!
