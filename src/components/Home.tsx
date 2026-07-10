import React, { useState } from 'react';
import { BookOpen, HelpCircle, Code, ShieldCheck, Mail, Send, CheckCircle2, ChevronRight, Award } from 'lucide-react';

interface HomeProps {
  onStartCourse: () => void;
  quizScoresCount: number;
}

export default function Home({ onStartCourse, quizScoresCount }: HomeProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const objectives = [
    { title: 'Algorithmic Mastery', desc: 'Identify the exact Big-O complexity for core operations across lists, sets, queues, and maps.' },
    { title: 'Mechanics & Internal Layouts', desc: 'Understand array dynamic resizing, doubly-linked nodes, hash code hashing contracts, and self-balancing BSTs.' },
    { title: 'Safe Multi-Threading', desc: 'Leverage concurrent collections like ConcurrentHashMap to prevent data race corruption.' },
    { title: 'Functional Integration', desc: 'Connect traditional datasets into modern Stream pipelines with complex reductions and collectors.' }
  ];

  return (
    <div className="space-y-12 py-6">
      {/* Hero Banner section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/80 p-8 sm:p-12 text-white shadow-xl border border-white/10 backdrop-blur-md">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
            <Award className="h-3.5 w-3.5 text-indigo-400" />
            Advanced Java Core Series
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            The Java Collection Framework
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Bridge theoretical complexity with physical memory layouts. Master the algorithms, concurrency models, and stream integration powering modern Java applications.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onStartCourse}
              id="start-course-hero-btn"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              Get Started
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/5 backdrop-blur-sm px-5 py-3 text-sm font-semibold border border-white/10">
              12 High-fidelity Labs
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-12 opacity-10 pointer-events-none hidden lg:block">
          <Code className="h-96 w-96 text-indigo-500" />
        </div>
      </div>

      {/* Grid: Course Progress, Prerequisites, and Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core details column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Objectives */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Learning Objectives
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {objectives.map((obj, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-lg">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{obj.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 space-y-4 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-500" />
              Course Prerequisites
            </h2>
            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
              <p>This is an <strong>advanced course</strong> designed for students who possess a strong foundation in Java basics. We assume prior mastery of:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400 text-xs">
                <li>Object-Oriented Programming principles (Classes, Inheritances, Interfaces)</li>
                <li>Basic Java generics semantics (e.g., <code className="font-mono bg-slate-100/80 dark:bg-white/10 border border-slate-200/50 dark:border-white/10 px-1 py-0.5 rounded text-indigo-600 dark:text-indigo-400">{"List<T>"}</code>)</li>
                <li>Exception Handling syntax (try-catch, throws statements)</li>
                <li>Simple loops and execution blocks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar: Progress & Contact Form */}
        <div className="space-y-8">
          {/* Quick Stats Widget */}
          <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 space-y-4 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Your Progress
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Quizzes Completed</span>
                <span className="text-slate-900 dark:text-white">{quizScoresCount} / 12</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${(quizScoresCount / 12) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Complete a quiz for each of the practical lab exercises to track your score in local cache.
              </p>
            </div>
          </div>

          {/* Contact Instructor */}
          <div className="rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 space-y-4 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-indigo-500" />
              Contact Instructor
            </h3>
            {submitted ? (
              <div className="rounded-lg bg-emerald-500/10 p-4 text-center border border-emerald-500/20">
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">Message sent successfully!</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">We will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-instructor-form" className="space-y-3">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="Your Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">Message</label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="How can we help?"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-slate-200/50 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 py-2.5 text-xs font-semibold text-white transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Send className="h-3 w-3" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
