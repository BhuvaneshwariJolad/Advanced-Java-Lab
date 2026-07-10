import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Topics from './components/Topics';
import Labs from './components/Labs';
import Playground from './components/Playground';
import Quizzes from './components/Quizzes';
import Assessments from './components/Assessments';
import Resources from './components/Resources';
import Admin from './components/Admin';

import { topicsData } from './data/topics';
import { labsData } from './data/labs';
import { quizzesData } from './data/quizzes';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('java_collections_theme');
    return saved === 'dark';
  });

  const [quizScoresCount, setQuizScoresCount] = useState(0);

  // Sync dark class with document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('java_collections_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('java_collections_theme', 'light');
    }
  }, [isDark]);

  // Read quiz completions
  const updateQuizCount = () => {
    const saved = localStorage.getItem('java_collections_quiz_scores');
    if (saved) {
      try {
        const scores = JSON.parse(saved);
        setQuizScoresCount(Object.keys(scores).length);
      } catch (e) {
        console.error(e);
      }
    } else {
      setQuizScoresCount(0);
    }
  };

  useEffect(() => {
    updateQuizCount();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onStartCourse={() => setActiveTab('topics')} quizScoresCount={quizScoresCount} />;
      case 'topics':
        return <Topics topics={topicsData} />;
      case 'labs':
        return <Labs labs={labsData} />;
      case 'playground':
        return <Playground />;
      case 'quizzes':
        return <Quizzes questions={quizzesData} onScoresChange={updateQuizCount} />;
      case 'assessments':
        return <Assessments />;
      case 'resources':
        return <Resources />;
      case 'admin':
        return <Admin labs={labsData} />;
      default:
        return <Home onStartCourse={() => setActiveTab('topics')} quizScoresCount={quizScoresCount} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background glowing decorations for Frosted Glass theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[30%] -right-[10%] w-[45%] h-[45%] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[15%] w-[40%] h-[40%] bg-emerald-500/5 dark:bg-emerald-600/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-6">
          {renderActiveComponent()}
        </main>

        {/* Styled Footer */}
        <footer className="border-t border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-slate-900/10 backdrop-blur-md mt-12 py-8 transition-colors duration-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-500 dark:text-slate-500 text-xs font-medium">
              &copy; 2026 Advanced Java Courseware &bull; Collection Framework Portal. All Rights Reserved.
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-600">
              <span>Built offline-first</span>
              <span>&bull;</span>
              <span>WCAG AAA Compliant</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
