import React from 'react';
import { BookOpen, Code2, ShieldAlert, Award, FileText, CheckSquare, Layers, Sun, Moon, GraduationCap, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navigation({ activeTab, setActiveTab, isDark, toggleTheme }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Overview', icon: BookOpen },
    { id: 'topics', label: 'Core Topics', icon: Layers },
    { id: 'labs', label: 'Practical Labs', icon: CheckSquare },
    { id: 'playground', label: 'Sim Playground', icon: Code2 },
    { id: 'quizzes', label: 'Quizzes', icon: Award },
    { id: 'assessments', label: 'Assessments', icon: FileText },
    { id: 'resources', label: 'Cheat Sheets', icon: GraduationCap },
    { id: 'admin', label: 'Instructor Notes', icon: ShieldAlert },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/70 dark:bg-slate-950/40 backdrop-blur-xl border-slate-200/50 dark:border-white/10 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-sans text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Java Collections
              </span>
              <span className="ml-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/40 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Advanced
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-white/10 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Actions Column */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              aria-label="Toggle light and dark theme"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 shadow-sm transition-colors hover:bg-slate-100/50 dark:hover:bg-white/10"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle-btn"
              aria-label="Toggle main menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 shadow-sm transition-colors hover:bg-slate-100/50 dark:hover:bg-white/10 lg:hidden"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200/50 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 backdrop-blur-lg px-4 py-2 space-y-1 transition-colors duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-mobile-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-white/10'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
