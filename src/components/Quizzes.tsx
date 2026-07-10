import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuizScore } from '../types';
import { Award, HelpCircle, CheckCircle, XCircle, RotateCcw, Flame, Check, ShieldCheck } from 'lucide-react';

interface QuizzesProps {
  questions: QuizQuestion[];
  onScoresChange: () => void;
}

export default function Quizzes({ questions, onScoresChange }: QuizzesProps) {
  const [selectedLabId, setSelectedLabId] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: number }>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<{ [questionId: number]: boolean }>({});
  const [quizScores, setQuizScores] = useState<{ [labId: number]: QuizScore }>({});

  const activeQuestion = questions.find((q) => q.labId === selectedLabId) || questions[0];

  // Load scores from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('java_collections_quiz_scores');
    if (saved) {
      try {
        setQuizScores(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (submittedQuestions[questionId]) return; // already answered
    setUserAnswers({ ...userAnswers, [questionId]: optionIndex });
  };

  const handleSubmitAnswer = (q: QuizQuestion) => {
    if (submittedQuestions[q.id] || userAnswers[q.id] === undefined) return;

    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    const scoreVal = isCorrect ? 1 : 0;

    const newSubmitted = { ...submittedQuestions, [q.id]: true };
    setSubmittedQuestions(newSubmitted);

    // Save Score
    const newScore: QuizScore = {
      labId: q.labId,
      topic: q.topic,
      score: scoreVal,
      total: 1,
      completedAt: new Date().toLocaleDateString()
    };

    const updatedScores = { ...quizScores, [q.labId]: newScore };
    setQuizScores(updatedScores);
    localStorage.setItem('java_collections_quiz_scores', JSON.stringify(updatedScores));
    onScoresChange(); // Notify parent
  };

  const handleResetQuiz = (labId: number) => {
    const updatedSubmitted = { ...submittedQuestions };
    delete updatedSubmitted[activeQuestion.id];
    setSubmittedQuestions(updatedSubmitted);

    const updatedAnswers = { ...userAnswers };
    delete updatedAnswers[activeQuestion.id];
    setUserAnswers(updatedAnswers);

    const updatedScores = { ...quizScores };
    delete updatedScores[labId];
    setQuizScores(updatedScores);
    localStorage.setItem('java_collections_quiz_scores', JSON.stringify(updatedScores));
    onScoresChange();
  };

  const handleClearAllScores = () => {
    if (window.confirm('Are you sure you want to reset all your quiz scores? This cannot be undone.')) {
      setQuizScores({});
      setUserAnswers({});
      setSubmittedQuestions({});
      localStorage.removeItem('java_collections_quiz_scores');
      onScoresChange();
    }
  };

  const getAccuracyRate = () => {
    const scores = Object.values(quizScores) as QuizScore[];
    if (scores.length === 0) return 0;
    const correct = scores.reduce((sum, s) => sum + s.score, 0);
    return Math.round((correct / scores.length) * 100);
  };

  const completedCount = Object.keys(quizScores).length;

  return (
    <div className="space-y-8 py-6">
      {/* Quiz Header & Metrics */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-slate-200/50 dark:border-white/10 pb-6 gap-6">
        <div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Lab Evaluation Quizzes
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Test your understanding with 12 targeted multiple-choice assessments synced to each practical lab module.
          </p>
        </div>

        {/* Global Stats Board */}
        <div className="flex flex-wrap gap-4 bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-xl p-4 w-full lg:w-auto shadow-lg backdrop-blur-md">
          <div className="px-4 border-r border-slate-200/50 dark:border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Accuracy Rate</span>
            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{getAccuracyRate()}%</span>
          </div>
          <div className="px-4 border-r border-slate-200/50 dark:border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Evaluations</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{completedCount} / 12</span>
          </div>
          <button
            onClick={handleClearAllScores}
            id="clear-all-quiz-scores-btn"
            className="flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg border border-transparent hover:border-rose-500/20 my-auto transition-all cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Grid
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Selector drawer */}
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 mb-2">
            Module Selector
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-3 gap-1.5">
            {Array.from({ length: 12 }).map((_, idx) => {
              const labNum = idx + 1;
              const hasScore = quizScores[labNum] !== undefined;
              const wasCorrect = hasScore && quizScores[labNum].score === 1;

              return (
                <button
                  key={labNum}
                  id={`quiz-select-${labNum}`}
                  onClick={() => setSelectedLabId(labNum)}
                  className={`flex flex-col items-center justify-center border rounded-xl py-3 px-2 transition-all text-center relative cursor-pointer ${
                    selectedLabId === labNum
                      ? 'bg-indigo-500/10 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/35 dark:border-white/20 shadow-md backdrop-blur-sm shadow-indigo-500/5'
                      : 'bg-white/40 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200/50 dark:border-white/10 hover:bg-slate-100/50 dark:hover:bg-white/10 backdrop-blur-sm'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 font-semibold mb-0.5">Quiz</span>
                  <span className="text-sm font-black">{labNum}</span>
                  {hasScore && (
                    <div className="absolute top-1 right-1">
                      {wasCorrect ? (
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-rose-500" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question board */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 space-y-6 shadow-lg backdrop-blur-md">
            {/* Header metadata */}
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/10 pb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/50 dark:bg-white/10 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/10">
                Evaluation #{selectedLabId} &bull; {activeQuestion.topic} Category
              </span>
              {quizScores[selectedLabId] && (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  Score Registered
                </span>
              )}
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-start gap-2.5 leading-relaxed">
                <HelpCircle className="h-5 w-5 shrink-0 text-indigo-500 mt-1" />
                <span>{activeQuestion.question}</span>
              </h3>

              {/* Options lists */}
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {activeQuestion.options.map((option, idx) => {
                  const isSelected = userAnswers[activeQuestion.id] === idx;
                  const isSubmitted = submittedQuestions[activeQuestion.id];
                  const isCorrectAnswer = idx === activeQuestion.correctAnswer;

                  let optionClass = 'border-slate-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-slate-100/50 dark:hover:bg-white/10 backdrop-blur-sm';
                  if (isSelected && !isSubmitted) {
                    optionClass = 'border-indigo-500 bg-indigo-500/10 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-bold';
                  } else if (isSubmitted) {
                    if (isCorrectAnswer) {
                      optionClass = 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/15 text-emerald-800 dark:text-emerald-400 font-bold';
                    } else if (isSelected) {
                      optionClass = 'border-rose-500 bg-rose-500/10 dark:bg-rose-950/15 text-rose-800 dark:text-rose-400 font-bold';
                    } else {
                      optionClass = 'border-slate-200/30 dark:border-white/5 bg-white/20 dark:bg-white/5 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${activeQuestion.id}-${idx}`}
                      onClick={() => handleSelectOption(activeQuestion.id, idx)}
                      disabled={isSubmitted}
                      className={`w-full text-left rounded-xl p-4 text-xs sm:text-sm font-semibold border flex items-center justify-between transition-all leading-relaxed cursor-pointer ${optionClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isSubmitted && isCorrectAnswer && (
                        <Check className="h-5 w-5 text-emerald-500 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submission controllers / Reset controllers */}
            <div className="flex items-center justify-between border-t border-slate-200/50 dark:border-white/10 pt-4">
              {!submittedQuestions[activeQuestion.id] ? (
                <button
                  onClick={() => handleSubmitAnswer(activeQuestion)}
                  disabled={userAnswers[activeQuestion.id] === undefined}
                  id="submit-answer-btn"
                  className="rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold text-xs px-5 py-2.5 shadow-lg shadow-indigo-500/15 ml-auto active:scale-95 transition-all cursor-pointer"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={() => handleResetQuiz(selectedLabId)}
                  id="reset-quiz-btn"
                  className="rounded-lg border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 px-4 py-2 flex items-center gap-1 shadow-sm transition-colors ml-auto cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  Try Again
                </button>
              )}
            </div>

            {/* Explanations drawer */}
            {submittedQuestions[activeQuestion.id] && (
              <div className="rounded-xl border border-dashed border-slate-200/50 dark:border-white/10 bg-slate-100/10 dark:bg-white/5 p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Flame className="h-4 w-4 text-indigo-500" />
                  Academic Discussion & Explanation
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
                  {activeQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
