/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Volume2,
  HelpCircle,
  ListChecks,
  Sparkles,
  Search,
  Eye,
  EyeOff,
  Flame,
  CheckCircle2,
  X,
  Shuffle,
  ChevronRight,
  Layers,
  ArrowRightLeft,
  VolumeX,
  GraduationCap,
  Home,
  Copy,
  Check,
  Star
} from 'lucide-react';
import {
  UNIT_INFO,
  HOME_OVERVIEW_DATA,
  IMPORTANT_SECTION_DATA,
  EXAM_TEXT_PARAGRAPHS,
  DETAILED_SECTIONS,
  VOCABULARY_LIST,
  QA_LIST,
  SUMMARY_INFO,
} from './data';
import { speakSpanish, stopSpeech } from './speech';

type TabType = 'home' | 'important' | 'exam' | 'detail' | 'qa' | 'vocab' | 'summary';
type ViewMode = 'click-to-reveal' | 'both' | 'arm-first';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [copiedType, setCopiedType] = useState<'es' | 'arm' | null>(null);
  const [activeHomeParagraph, setActiveHomeParagraph] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('click-to-reveal');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<{
    es: string;
    arm: string;
    context?: string;
  } | null>(null);

  // Memorized items tracker (saved in local memory)
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  // Flashcard mode for Q&A and Vocab
  const [qaIndex, setQaIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showQaArm, setShowQaArm] = useState(false);

  // Flashcard mode for Important Q&A
  const [impQaIndex, setImpQaIndex] = useState(0);
  const [impShowAnswer, setImpShowAnswer] = useState(false);
  const [impShowQaArm, setImpShowQaArm] = useState(false);

  // Vocab card state
  const [vocabIndex, setVocabIndex] = useState(0);
  const [vocabFlipped, setVocabFlipped] = useState(false);

  // Toggle reveal for individual sentence/item
  const toggleReveal = (id: string, es: string, arm: string, context?: string) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
    // Open the active translation bar/drawer
    setSelectedItem({ es, arm, context });
  };

  const handleSpeech = (text: string) => {
    if (speakingText === text) {
      stopSpeech();
      setSpeakingText(null);
      return;
    }
    setSpeakingText(text);
    speakSpanish(text, () => {
      setSpeakingText(null);
    });
  };

  const handleCopy = (text: string, type: 'es' | 'arm') => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  const toggleAll = (show: boolean) => {
    if (!show) {
      setRevealedIds({});
    } else {
      const all: Record<string, boolean> = {};
      EXAM_TEXT_PARAGRAPHS.forEach(p => {
        all[`p-${p.id}`] = true;
        p.sentences.forEach((_, sIdx) => {
          all[`p-${p.id}-s-${sIdx}`] = true;
        });
      });
      DETAILED_SECTIONS.forEach(sec => {
        sec.items.forEach((_, idx) => {
          all[`sec-${sec.id}-i-${idx}`] = true;
        });
        if (sec.importantWord) {
          all[`sec-${sec.id}-imp`] = true;
        }
        if (sec.bullets) {
          sec.bullets.forEach((_, bIdx) => {
            all[`sec-${sec.id}-b-${bIdx}`] = true;
          });
        }
      });
      QA_LIST.forEach(q => {
        all[`qa-q-${q.number}`] = true;
        all[`qa-a-${q.number}`] = true;
      });
      VOCABULARY_LIST.forEach(v => {
        all[`vocab-${v.id}`] = true;
      });
      IMPORTANT_SECTION_DATA.texts.forEach(t => {
        all[`imp-t-${t.id}`] = true;
      });
      IMPORTANT_SECTION_DATA.qa.forEach(q => {
        all[`imp-qa-q-${q.id}`] = true;
        all[`imp-qa-a-${q.id}`] = true;
      });
      all['summary-main'] = true;
      setRevealedIds(all);
    }
  };

  const toggleCompleted = (id: string) => {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered lists for search
  const filteredVocab = useMemo(() => {
    if (!searchQuery) return VOCABULARY_LIST;
    const q = searchQuery.toLowerCase();
    return VOCABULARY_LIST.filter(
      v => v.es.toLowerCase().includes(q) || v.arm.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredQA = useMemo(() => {
    if (!searchQuery) return QA_LIST;
    const q = searchQuery.toLowerCase();
    return QA_LIST.filter(
      item =>
        item.questionEs.toLowerCase().includes(q) ||
        item.questionArm.toLowerCase().includes(q) ||
        item.answerEs.toLowerCase().includes(q) ||
        item.answerArm.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredImportantQA = useMemo(() => {
    if (!searchQuery) return IMPORTANT_SECTION_DATA.qa;
    const q = searchQuery.toLowerCase();
    return IMPORTANT_SECTION_DATA.qa.filter(
      item =>
        item.questionEs.toLowerCase().includes(q) ||
        item.questionArm.toLowerCase().includes(q) ||
        item.answerEs.toLowerCase().includes(q) ||
        item.answerArm.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredImportantTexts = useMemo(() => {
    if (!searchQuery) return IMPORTANT_SECTION_DATA.texts;
    const q = searchQuery.toLowerCase();
    return IMPORTANT_SECTION_DATA.texts.filter(
      item =>
        item.es.toLowerCase().includes(q) ||
        item.arm.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#0c0e12] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Banner & Header */}
      <header className="border-b border-amber-950/40 bg-gradient-to-b from-[#181512] to-[#0f1115] sticky top-0 z-40 backdrop-blur-md shadow-lg shadow-black/40">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-md shadow-amber-900/50 border border-amber-500/30 text-2xl">
                🪨
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {UNIT_INFO.unit}
                  </span>
                  <span className="text-xs text-amber-300/60 font-armenian hidden md:inline">
                    {UNIT_INFO.unitArm}
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight font-serif-title text-amber-100 flex items-center gap-2">
                  EL PALEOLÍTICO <span className="text-amber-500 text-sm font-normal">/</span>{' '}
                  <span className="font-armenian font-medium text-amber-200 text-base sm:text-lg">
                    ՊԱԼԵՈԼԻԹ
                  </span>
                </h1>
              </div>
            </div>

            {/* Quick Actions & Mode Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex p-1 bg-black/40 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setViewMode('click-to-reveal')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'click-to-reveal'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Սեղմեք իսպաներենի վրա՝ հայերեն թարգմանությունը բացելու համար"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Կտտացրու թարգմանության համար</span>
                </button>
                <button
                  onClick={() => setViewMode('both')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'both'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Ցուցադրել միանգամից երկու լեզուներով"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Զուգահեռ (Երկուսն էլ)</span>
                </button>
                <button
                  onClick={() => setViewMode('arm-first')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'arm-first'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Սկզբում հայերեն՝ իսպաներենը ստուգելու համար"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Հայ ➔ Իսպ</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleAll(true)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition"
                  title="Բացել բոլոր թարգմանությունները"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleAll(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition"
                  title="Թաքցնել թարգմանությունները (ինքնաստուգում)"
                >
                  <EyeOff className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none border-t border-white/5 pt-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Գլխավոր (Главная)</span>
              <span className="text-[11px] opacity-75">/ Inicio</span>
            </button>

            <button
              onClick={() => setActiveTab('important')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'important'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Star className="w-4 h-4 text-amber-300 fill-amber-300/30" />
              <span>Կարևորը (О важном)</span>
              <span className="text-[11px] opacity-75">/ 2. Lo Importante</span>
            </button>

            <button
              onClick={() => setActiveTab('exam')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'exam'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Պատմելու տեքստ</span>
              <span className="text-[11px] opacity-75">/ Texto para contar</span>
            </button>

            <button
              onClick={() => setActiveTab('detail')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'detail'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Թեման մանրամասն</span>
              <span className="text-[11px] opacity-75">/ Tema en Detalle (8)</span>
            </button>

            <button
              onClick={() => setActiveTab('qa')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'qa'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>15 Հարց ու պատասխան</span>
              <span className="text-[11px] opacity-75">/ Preguntas (15)</span>
            </button>

            <button
              onClick={() => setActiveTab('vocab')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'vocab'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ListChecks className="w-4 h-4" />
              <span>Բառապաշար</span>
              <span className="text-[11px] opacity-75">/ Vocabulario (18)</span>
            </button>

            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'summary'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Արագ ամփոփում</span>
              <span className="text-[11px] opacity-75">/ Resumen</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {/* Search bar when inside Q&A, Vocab, or Important */}
        {(activeTab === 'qa' || activeTab === 'vocab' || activeTab === 'important') && (
          <div className="mb-6 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Փնտրել իսպաներեն կամ հայերեն բառեր / Buscar palabras o preguntas..."
              className="w-full bg-[#13171e] border border-amber-900/30 rounded-xl pl-11 pr-10 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 0: HOME / GLAVNAYA (Գլխավոր բաժին)                     */}
        {/* ======================================================== */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Introductory Top Banner */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border border-amber-700/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    Գլխավոր բաժին • Главная
                  </span>
                  <span className="text-xs text-slate-400 font-armenian">
                    Ամբողջական տեքստ իսպաներեն և ներքևում հայերեն
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif-title mt-1.5">
                  El Paleolítico — Պալեոլիթ
                </h2>
                <p className="text-sm text-amber-200/80 mt-1 font-armenian">
                  Սկզբում տեքստն ամբողջությամբ իսպաներեն է, իսկ ներքևում՝ առանձին հայերեն։
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => handleSpeech(HOME_OVERVIEW_DATA.fullTextEs)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition ${
                    speakingText
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {speakingText ? (
                    <>
                      <VolumeX className="w-4 h-4 text-red-400" />
                      <span>Դադարեցնել ձայնը</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span>Լսել իսպաներեն տեքստը</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* BLOCK 1: ESPAÑOL (All text in Spanish first) */}
            <div className="rounded-2xl border-2 border-amber-500/40 bg-[#12151b] shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇪🇸</span>
                  <div>
                    <h3 className="text-xl font-bold text-amber-100 font-serif-title flex items-center gap-2">
                      <span>El Paleolítico</span>
                    </h3>
                    <span className="text-xs text-amber-300/80">
                      Texto completo en español (Սեղմեք պարբերության վրա՝ լսելու կամ թարգմանելու համար)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeech(HOME_OVERVIEW_DATA.fullTextEs)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-white/10 transition"
                    title="Լսել իսպաներեն արտասանությունը"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopy(HOME_OVERVIEW_DATA.fullTextEs, 'es')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white border border-white/10 transition"
                    title="Պատճենել իսպաներեն տեքստը"
                  >
                    {copiedType === 'es' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Պատճենված է</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Պատճենել իսպաներենը</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Spanish Paragraphs */}
              <div className="p-6 sm:p-8 space-y-5">
                {HOME_OVERVIEW_DATA.paragraphs.map((para) => {
                  const isHovered = activeHomeParagraph === para.id;
                  const isRevealed = revealedIds[`home-p-${para.id}`];

                  return (
                    <div
                      key={para.id}
                      onMouseEnter={() => setActiveHomeParagraph(para.id)}
                      onMouseLeave={() => setActiveHomeParagraph(null)}
                      onClick={() =>
                        toggleReveal(`home-p-${para.id}`, para.es, para.arm, `Գլխավոր • Պարբերություն ${para.id}`)
                      }
                      className={`cursor-pointer group relative p-4 sm:p-5 rounded-xl transition-all duration-200 border ${
                        isHovered
                          ? 'bg-amber-500/10 border-amber-500/40 translate-x-1'
                          : 'bg-black/30 border-white/5 hover:border-amber-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-lg sm:text-xl text-slate-100 font-medium leading-relaxed">
                          {para.es}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeech(para.es);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/10 transition"
                            title="Լսել այս նախադասությունը"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Immediate Armenian preview if clicked */}
                      {isRevealed && (
                        <div className="mt-3 pt-3 border-t border-amber-500/30 text-amber-300 font-armenian text-base animate-in fade-in duration-150">
                          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                            <span>🇦🇲 Հայերեն թարգմանություն․</span>
                          </div>
                          <p>{para.arm}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Divider pointing down to Armenian */}
            <div className="flex items-center justify-center gap-3 my-4 text-slate-400 text-xs font-armenian uppercase tracking-wider">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent flex-1" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181c24] border border-amber-500/30 text-amber-300 font-semibold">
                <span>⬇️ Հայերեն տեքստն ամբողջությամբ ներքևում</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent flex-1" />
            </div>

            {/* BLOCK 2: ARMENIAN (All text in Armenian below) */}
            <div className="rounded-2xl border-2 border-amber-600/30 bg-[#12151b] shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-amber-600/15 via-amber-600/5 to-transparent border-b border-amber-600/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇦🇲</span>
                  <div>
                    <h3 className="text-xl font-bold text-amber-200 font-armenian flex items-center gap-2">
                      <span>Պալեոլիթը</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-armenian">
                      Ամբողջական տեքստ հայերենով (Texto completo en armenio)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(HOME_OVERVIEW_DATA.fullTextArm, 'arm')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white border border-white/10 transition"
                    title="Պատճենել հայերեն տեքստը"
                  >
                    {copiedType === 'arm' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Պատճենված է</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Պատճենել հայերենը</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Armenian Paragraphs */}
              <div className="p-6 sm:p-8 space-y-5">
                {HOME_OVERVIEW_DATA.paragraphs.map((para) => {
                  const isHovered = activeHomeParagraph === para.id;

                  return (
                    <div
                      key={para.id}
                      onMouseEnter={() => setActiveHomeParagraph(para.id)}
                      onMouseLeave={() => setActiveHomeParagraph(null)}
                      onClick={() =>
                        toggleReveal(`home-arm-${para.id}`, para.es, para.arm, `Գլխավոր • Պարբերություն ${para.id}`)
                      }
                      className={`cursor-pointer group relative p-4 sm:p-5 rounded-xl transition-all duration-200 border ${
                        isHovered
                          ? 'bg-amber-500/10 border-amber-500/40 translate-x-1'
                          : 'bg-black/30 border-white/5 hover:border-amber-500/30'
                      }`}
                    >
                      <p className="text-lg sm:text-xl text-slate-100 font-armenian font-normal leading-relaxed">
                        {para.arm}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                        <span className="group-hover:text-amber-400 transition">
                          🇪🇸 Իսպաներեն համապատասխան տողը՝ {para.es.slice(0, 48)}...
                        </span>
                        <span className="text-[11px] text-amber-500/70 group-hover:text-amber-400">
                          կտտացրու ➔
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Explore Section Cards */}
            <div className="rounded-2xl p-6 bg-black/40 border border-white/10">
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Անցնել մյուս բաժիններին • Explorar otras secciones</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setActiveTab('important')}
                  className="p-4 rounded-xl bg-[#181d26] hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500 text-left transition group"
                >
                  <div className="font-bold text-amber-200 group-hover:text-amber-100 text-sm mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>2. Կարևորը (О важном)</span>
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition text-amber-400" />
                  </div>
                  <p className="text-xs text-slate-400 font-armenian">Տեքստ՝ անգիր սովորելու համար + 12 հարց</p>
                </button>

                <button
                  onClick={() => setActiveTab('exam')}
                  className="p-4 rounded-xl bg-[#151922] hover:bg-amber-500/15 border border-white/5 hover:border-amber-500/40 text-left transition group"
                >
                  <div className="font-bold text-amber-100 group-hover:text-amber-300 text-sm mb-1 flex items-center justify-between">
                    <span>Պատմելու տեքստ</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-xs text-slate-400">8 պարբերություն ինտերակտիվ թարգմանությամբ</p>
                </button>

                <button
                  onClick={() => setActiveTab('detail')}
                  className="p-4 rounded-xl bg-[#151922] hover:bg-amber-500/15 border border-white/5 hover:border-amber-500/40 text-left transition group"
                >
                  <div className="font-bold text-amber-100 group-hover:text-amber-300 text-sm mb-1 flex items-center justify-between">
                    <span>Թեման մանրամասն</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-xs text-slate-400">8 խորացված ենթաբաժիններ և բառեր</p>
                </button>

                <button
                  onClick={() => setActiveTab('qa')}
                  className="p-4 rounded-xl bg-[#151922] hover:bg-amber-500/15 border border-white/5 hover:border-amber-500/40 text-left transition group"
                >
                  <div className="font-bold text-amber-100 group-hover:text-amber-300 text-sm mb-1 flex items-center justify-between">
                    <span>15 Հարց ու պատասխան</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-xs text-slate-400">Բոլոր 15 հարցերը և վարժիչ քարտերը</p>
                </button>

                <button
                  onClick={() => setActiveTab('vocab')}
                  className="p-4 rounded-xl bg-[#151922] hover:bg-amber-500/15 border border-white/5 hover:border-amber-500/40 text-left transition group"
                >
                  <div className="font-bold text-amber-100 group-hover:text-amber-300 text-sm mb-1 flex items-center justify-between">
                    <span>Բառապաշար (18)</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-xs text-slate-400">18 հիմնական բառեր և քարտեր</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB: IMPORTANT (Կարևորի մասին / 2. El Paleolítico)        */}
        {/* ======================================================== */}
        {activeTab === 'important' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header Banner */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-amber-950/50 via-amber-900/25 to-transparent border border-amber-600/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Կարևորը • О важном</span>
                  </span>
                  <span className="text-xs text-amber-300/80 font-armenian">
                    Անգիր սովորելու համար + 12 Հարց ու պատասխան
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif-title mt-1.5 flex items-center gap-2 flex-wrap">
                  <span>{IMPORTANT_SECTION_DATA.headerEs}</span>
                  <span className="text-amber-500 font-normal">—</span>
                  <span className="font-armenian text-amber-300 font-semibold">{IMPORTANT_SECTION_DATA.headerArm}</span>
                </h2>
                <p className="text-sm text-slate-300 mt-1 font-armenian">
                  Այս բաժինը ներառում է առանցքային նյութը՝ ընդգծված հասկացություններով և 12 գլխավոր հարցուպատասխաններով։
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => {
                    const fullText = IMPORTANT_SECTION_DATA.texts.map(t => t.es).join(' ');
                    handleSpeech(fullText);
                  }}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition ${
                    speakingText
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {speakingText ? (
                    <>
                      <VolumeX className="w-4 h-4 text-red-400" />
                      <span>Դադարեցնել</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span>Լսել ամբողջ տեքստը</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* PART 1: Texto para memorizar — Տեքստ՝ անգիր սովորելու համար */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                    📖
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-100 font-serif-title">
                      {IMPORTANT_SECTION_DATA.subHeaderEs}
                    </h3>
                    <p className="text-xs text-amber-300/80 font-armenian">
                      {IMPORTANT_SECTION_DATA.subHeaderArm} (6 պարբերություն)
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-armenian hidden sm:block">
                  👉 Կտտացրեք իսպաներենի վրա՝ հայերենը բացելու համար
                </div>
              </div>

              <div className="space-y-4">
                {filteredImportantTexts.map((item, idx) => {
                  const itemId = `imp-t-${item.id}`;
                  const isRevealed = viewMode === 'both' || revealedIds[itemId];
                  const isCompleted = completedItems[itemId];

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border transition-all duration-200 bg-[#12151b] overflow-hidden ${
                        isCompleted
                          ? 'border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                          : isRevealed
                          ? 'border-amber-500/40 shadow-lg shadow-amber-500/5'
                          : 'border-white/10 hover:border-amber-500/30'
                      }`}
                    >
                      {/* Top Bar for item */}
                      <div className="px-5 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-bold border border-amber-500/20">
                            #{idx + 1}
                          </span>
                          <span className="font-medium text-slate-300">
                            Կետ {idx + 1} / Punto {idx + 1}
                          </span>
                          {item.highlightEs && (
                            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-950/40 text-amber-400 text-[11px] border border-amber-500/20">
                              ⭐ {item.highlightEs}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleCompleted(itemId)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition text-xs ${
                              isCompleted
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'hover:bg-white/10 text-slate-400'
                            }`}
                            title="Նշել որպես սովորած"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isCompleted ? 'Սովորած է' : 'Նշել'}</span>
                          </button>

                          <button
                            onClick={() => handleSpeech(item.es)}
                            className="p-1.5 rounded-lg hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 transition"
                            title="Լսել իսպաներեն"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 space-y-4">
                        {viewMode === 'arm-first' ? (
                          <div className="space-y-3">
                            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                              <div className="text-xs font-semibold text-amber-400 mb-1">
                                🇦🇲 Հայերեն (մտածեք իսպաներեն ձևակերպումը)․
                              </div>
                              <p className="text-slate-100 font-armenian leading-relaxed text-base sm:text-lg">
                                {item.arm}
                              </p>
                            </div>

                            <div
                              onClick={() => toggleReveal(itemId, item.es, item.arm, `Կարևոր կետ #${item.id}`)}
                              className="cursor-pointer group rounded-xl p-4 bg-black/30 border border-white/10 hover:border-amber-500/40 transition"
                            >
                              <div className="flex items-center justify-between text-xs text-amber-400/80 mb-1">
                                <span>🇪🇸 Իսպաներեն (Սեղմեք ստուգելու համար)</span>
                                <Sparkles className="w-3.5 h-3.5 group-hover:scale-110 transition" />
                              </div>
                              {isRevealed ? (
                                <p className="text-amber-100 font-medium text-lg leading-relaxed">
                                  {item.es}
                                </p>
                              ) : (
                                <div className="text-slate-500 italic text-sm">
                                  🔒 Կտտացրեք իսպաներենը տեսնելու համար
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {/* Spanish Block (Clickable) */}
                            <div
                              onClick={() => toggleReveal(itemId, item.es, item.arm, `Կարևոր կետ #${item.id}`)}
                              className="cursor-pointer group relative p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-500/[0.08] to-transparent hover:from-amber-500/[0.15] border border-amber-500/20 hover:border-amber-500/50 transition-all duration-200"
                            >
                              <div className="flex items-center justify-between text-xs text-amber-400 mb-2 font-medium">
                                <span className="flex items-center gap-1.5 font-bold">
                                  <span>🇪🇸 Español (Կտտացրու հայերենի համար)</span>
                                </span>
                                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 group-hover:bg-amber-500/20 transition">
                                  {isRevealed ? 'Թաքցնել' : 'Ցուցադրել հայերենը ➔'}
                                </span>
                              </div>
                              <p className="text-slate-100 font-medium text-lg sm:text-xl leading-relaxed tracking-wide">
                                {item.es}
                              </p>
                            </div>

                            {/* Armenian Translation Box */}
                            {isRevealed && (
                              <div className="rounded-xl p-4 sm:p-5 bg-[#181c24] border border-amber-500/35 text-amber-100 animate-in fade-in slide-in-from-top-1 duration-200">
                                <div className="flex items-center justify-between text-xs text-amber-400 mb-2 font-armenian font-semibold">
                                  <span>🇦🇲 Հայերեն թարգմանություն</span>
                                  {item.highlightArm && (
                                    <span className="text-amber-300/80 font-mono text-[11px]">
                                      Առանցքային՝ {item.highlightArm}
                                    </span>
                                  )}
                                </div>
                                <p className="font-armenian text-slate-200 leading-relaxed text-base sm:text-lg">
                                  {item.arm}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PART 2: Preguntas y respuestas — Հարցեր և պատասխաններ (12 Q&A) */}
            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border border-amber-700/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    <HelpCircle className="w-4 h-4" />
                    <span>{IMPORTANT_SECTION_DATA.qaHeaderEs}</span>
                  </div>
                  <h3 className="text-xl font-bold text-amber-100 font-serif-title mt-0.5">
                    {IMPORTANT_SECTION_DATA.qaHeaderArm} (12 Հարց)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Սեղմեք ցանկացած հարցի կամ պատասխանի վրա՝ հայերենը բացելու կամ լսելու համար։
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const rnd = Math.floor(Math.random() * IMPORTANT_SECTION_DATA.qa.length);
                      setImpQaIndex(rnd);
                      setImpShowAnswer(false);
                      setImpShowQaArm(false);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>Պատահական հարց (Մարզիչ)</span>
                  </button>
                </div>
              </div>

              {/* Flashcard Practice Box for the 12 Important Questions */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181d26] to-[#12151b] border-2 border-amber-500/35 shadow-xl">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-4 border-b border-white/5 pb-2">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Ինտերակտիվ վարժիչ • Հարց #{IMPORTANT_SECTION_DATA.qa[impQaIndex].id} / 12</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setImpQaIndex((impQaIndex - 1 + IMPORTANT_SECTION_DATA.qa.length) % IMPORTANT_SECTION_DATA.qa.length);
                        setImpShowAnswer(false);
                        setImpShowQaArm(false);
                      }}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      ◀ Նախորդ
                    </button>
                    <button
                      onClick={() => {
                        setImpQaIndex((impQaIndex + 1) % IMPORTANT_SECTION_DATA.qa.length);
                        setImpShowAnswer(false);
                        setImpShowQaArm(false);
                      }}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      Հաջորդ ▶
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Question */}
                  <div
                    onClick={() => setImpShowQaArm(!impShowQaArm)}
                    className="cursor-pointer p-4 rounded-xl bg-black/40 border border-amber-500/20 hover:border-amber-500/40 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-amber-400 font-bold block mb-1">
                          ՀԱՐՑ (Pregunta #{IMPORTANT_SECTION_DATA.qa[impQaIndex].id}):
                        </span>
                        <p className="text-lg sm:text-xl font-bold text-amber-100">
                          {IMPORTANT_SECTION_DATA.qa[impQaIndex].questionEs}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeech(IMPORTANT_SECTION_DATA.qa[impQaIndex].questionEs);
                        }}
                        className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 ml-2"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    {impShowQaArm ? (
                      <div className="mt-3 pt-3 border-t border-white/10 text-amber-300 font-armenian text-base">
                        🇦🇲 {IMPORTANT_SECTION_DATA.qa[impQaIndex].questionArm}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 mt-2">
                        👉 Կտտացրեք հարցի վրա՝ հայերենը տեսնելու համար
                      </div>
                    )}
                  </div>

                  {/* Answer Trigger */}
                  {!impShowAnswer ? (
                    <button
                      onClick={() => setImpShowAnswer(true)}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Բացել պատասխանը (Mostrar respuesta)</span>
                    </button>
                  ) : (
                    <div
                      onClick={() =>
                        toggleReveal(
                          `imp-qa-card-ans-${IMPORTANT_SECTION_DATA.qa[impQaIndex].id}`,
                          IMPORTANT_SECTION_DATA.qa[impQaIndex].answerEs,
                          IMPORTANT_SECTION_DATA.qa[impQaIndex].answerArm,
                          `Պատասխան #${IMPORTANT_SECTION_DATA.qa[impQaIndex].id}`
                        )
                      }
                      className="cursor-pointer p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-100 animate-in fade-in duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs text-emerald-400 font-bold block mb-1">
                            ՊԱՏԱՍԽԱՆ (Respuesta):
                          </span>
                          <p className="text-lg font-semibold text-white">
                            {IMPORTANT_SECTION_DATA.qa[impQaIndex].answerEs}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeech(IMPORTANT_SECTION_DATA.qa[impQaIndex].answerEs);
                          }}
                          className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 ml-2"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="mt-2 pt-2 border-t border-emerald-500/20 text-amber-300 font-armenian text-base">
                        🇦🇲 {IMPORTANT_SECTION_DATA.qa[impQaIndex].answerArm}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Full List of 12 Questions */}
              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-wider text-slate-400 font-semibold px-1">
                  Բոլոր 12 հարցերը հերթականությամբ
                </h4>

                {filteredImportantQA.map((qa) => {
                  const qId = `imp-qa-q-${qa.id}`;
                  const aId = `imp-qa-a-${qa.id}`;
                  const isQRevealed = viewMode === 'both' || revealedIds[qId];
                  const isARevealed = viewMode === 'both' || revealedIds[aId];

                  return (
                    <div
                      key={qa.id}
                      className="rounded-2xl border border-white/5 hover:border-amber-500/30 bg-[#12151b] p-5 transition space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          Հարց #{qa.id}
                        </span>
                        <button
                          onClick={() => handleSpeech(`${qa.questionEs} ... ${qa.answerEs}`)}
                          className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Լսել երկուսն էլ</span>
                        </button>
                      </div>

                      {/* Question Item */}
                      <div
                        onClick={() => toggleReveal(qId, qa.questionEs, qa.questionArm, `Հարց #${qa.id}`)}
                        className="cursor-pointer group p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-amber-500/40 transition"
                      >
                        <div className="flex items-start justify-between">
                          <div className="font-bold text-amber-100 text-base sm:text-lg group-hover:text-amber-300 transition">
                            🇪🇸 {qa.questionEs}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeech(qa.questionEs);
                            }}
                            className="p-1 rounded text-slate-400 hover:text-amber-300 shrink-0 ml-2"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        {isQRevealed ? (
                          <div className="mt-2 text-sm text-amber-300 font-armenian pl-2 border-l-2 border-amber-500/40">
                            🇦🇲 {qa.questionArm}
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-500 mt-1">
                            👉 Կտտացրեք հայերեն թարգմանության համար
                          </div>
                        )}
                      </div>

                      {/* Answer Item */}
                      <div
                        onClick={() => toggleReveal(aId, qa.answerEs, qa.answerArm, `Պատասխան #${qa.id}`)}
                        className="cursor-pointer group p-3.5 rounded-xl bg-[#161a22] border border-white/5 hover:border-emerald-500/40 transition"
                      >
                        <div className="flex items-start justify-between">
                          <div className="font-semibold text-slate-100 text-base group-hover:text-emerald-300 transition">
                            🇪🇸 {qa.answerEs}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeech(qa.answerEs);
                            }}
                            className="p-1 rounded text-slate-400 hover:text-emerald-300 shrink-0 ml-2"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        {isARevealed ? (
                          <div className="mt-2 text-sm text-emerald-300/90 font-armenian pl-2 border-l-2 border-emerald-500/40">
                            🇦🇲 {qa.answerArm}
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-500 mt-1">
                            👉 Կտտացրեք հայերեն պատասխանի համար
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: EXAM TEXT (Texto para contar en el examen)        */}
        {/* ======================================================== */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            {/* Introductory Banner */}
            <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border border-amber-700/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Sección Principal • Հիմնական տեքստ
                </span>
                <h2 className="text-xl font-bold text-amber-100 font-serif-title mt-0.5">
                  {UNIT_INFO.subtitleEs}
                </h2>
                <p className="text-sm text-amber-200/80 font-armenian">
                  {UNIT_INFO.subtitleArm}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  💡 <span className="text-amber-300 font-medium">Հուշում․</span> Սեղմեք ցանկացած իսպաներեն նախադասության կամ պարբերության վրա՝ հայերեն թարգմանությունը տեսնելու համար։ Սեղմեք 🔊 լսելու ճիշտ արտասանությունը։
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    const fullText = EXAM_TEXT_PARAGRAPHS.map(p => p.es).join(' ');
                    handleSpeech(fullText);
                  }}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition ${
                    speakingText
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {speakingText ? (
                    <>
                      <VolumeX className="w-4 h-4 text-red-400" />
                      <span>Դադարեցնել ձայնը</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span>Լսել ամբողջ տեքստը</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Paragraphs List */}
            <div className="space-y-4">
              {EXAM_TEXT_PARAGRAPHS.map((item, index) => {
                const isRevealed = viewMode === 'both' || revealedIds[`p-${item.id}`];
                const isCompleted = completedItems[`p-${item.id}`];

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-200 bg-[#12151b] overflow-hidden ${
                      isCompleted
                        ? 'border-emerald-500/30 shadow-sm shadow-emerald-500/5'
                        : isRevealed
                        ? 'border-amber-500/40 shadow-lg shadow-amber-500/5'
                        : 'border-white/5 hover:border-amber-500/30'
                    }`}
                  >
                    {/* Paragraph Header */}
                    <div className="px-5 py-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                          #{index + 1}
                        </span>
                        <span>Պարբերություն {index + 1} / Párrafo {index + 1}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCompleted(`p-${item.id}`)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition text-xs ${
                            isCompleted
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'hover:bg-white/10 text-slate-400'
                          }`}
                          title="Նշել որպես սովորած"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isCompleted ? 'Սովորած է' : 'Նշել'}</span>
                        </button>

                        <button
                          onClick={() => handleSpeech(item.es)}
                          className="p-1.5 rounded-lg hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 transition"
                          title="Լսել իսպաներեն արտասանությունը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      {/* If in arm-first mode, show Armenian first */}
                      {viewMode === 'arm-first' ? (
                        <div className="space-y-3">
                          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                            <div className="text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
                              <span>🇦🇲 Հայերեն (մտածեք իսպաներեն տարբերակը)</span>
                            </div>
                            <p className="text-slate-200 font-armenian leading-relaxed text-base">
                              {item.arm}
                            </p>
                          </div>

                          <div
                            onClick={() => toggleReveal(`p-${item.id}`, item.es, item.arm, `Պարբերություն ${item.id}`)}
                            className="cursor-pointer group rounded-xl p-3.5 bg-black/30 border border-white/10 hover:border-amber-500/40 transition"
                          >
                            <div className="flex items-center justify-between text-xs text-amber-400/80 mb-1">
                              <span>🇪🇸 Իսպաներեն (Սեղմեք ստուգելու համար)</span>
                              <Sparkles className="w-3.5 h-3.5 group-hover:scale-110 transition" />
                            </div>
                            {isRevealed ? (
                              <p className="text-amber-100 font-medium text-lg leading-relaxed">
                                {item.es}
                              </p>
                            ) : (
                              <div className="text-slate-500 italic text-sm flex items-center gap-2">
                                <span>🔒 Կտտացրեք իսպաներեն տեքստը տեսնելու համար</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Standard & Both Modes: Spanish shown, clicking reveals Armenian */
                        <div className="space-y-3">
                          {/* Spanish text block (Clickable!) */}
                          <div
                            onClick={() => toggleReveal(`p-${item.id}`, item.es, item.arm, `Պարբերություն ${item.id}`)}
                            className="cursor-pointer group relative p-4 rounded-xl bg-gradient-to-r from-amber-500/[0.07] to-transparent hover:from-amber-500/[0.14] border border-amber-500/20 hover:border-amber-500/50 transition-all duration-200"
                          >
                            <div className="flex items-center justify-between text-xs text-amber-400 mb-2 font-medium">
                              <span className="flex items-center gap-1.5">
                                <span>🇪🇸 Español (Սեղմեք թարգմանության համար)</span>
                              </span>
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 group-hover:bg-amber-500/20 transition">
                                {isRevealed ? 'Թաքցնել թարգմանությունը' : 'Ցուցադրել հայերենը ➔'}
                              </span>
                            </div>
                            <p className="text-slate-100 font-medium text-lg sm:text-xl leading-relaxed tracking-wide">
                              {item.es}
                            </p>
                          </div>

                          {/* Armenian Translation Box */}
                          {isRevealed && (
                            <div className="rounded-xl p-4 bg-[#181c24] border border-amber-500/30 text-amber-100 animate-in fade-in slide-in-from-top-1 duration-200">
                              <div className="flex items-center justify-between text-xs text-amber-400 mb-1 font-armenian font-semibold">
                                <span className="flex items-center gap-1.5">
                                  <span>🇦🇲 Հայերեն թարգմանություն</span>
                                </span>
                                <span className="text-slate-400 text-[11px]">Համապատասխան իմաստը</span>
                              </div>
                              <p className="font-armenian text-slate-200 leading-relaxed text-base sm:text-lg">
                                {item.arm}
                              </p>
                            </div>
                          )}

                          {/* Sentence-by-sentence Breakdown Toggle */}
                          <div className="pt-2 border-t border-white/5">
                            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                              Նախադասություն առ նախադասություն (Առանձին կտտացրեք)։
                            </span>
                            <div className="space-y-2">
                              {item.sentences.map((sent, sIdx) => {
                                const sId = `p-${item.id}-s-${sIdx}`;
                                const sRevealed = viewMode === 'both' || revealedIds[sId];

                                return (
                                  <div
                                    key={sIdx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleReveal(sId, sent.es, sent.arm, `Նախադասություն ${sIdx + 1}`);
                                    }}
                                    className="cursor-pointer p-2.5 rounded-lg bg-black/20 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 transition text-sm"
                                  >
                                    <div className="flex items-center justify-between text-slate-200">
                                      <span className="font-medium text-amber-100">
                                        • {sent.es}
                                      </span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSpeech(sent.es);
                                        }}
                                        className="p-1 rounded text-slate-400 hover:text-amber-300 ml-2 shrink-0"
                                      >
                                        <Volume2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    {sRevealed && (
                                      <div className="mt-1.5 pl-3 border-l-2 border-amber-500 text-amber-300/90 font-armenian text-xs sm:text-sm">
                                        {sent.arm}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DETAILED SECTIONS (Tema en detalle 1-8)           */}
        {/* ======================================================== */}
        {activeTab === 'detail' && (
          <div className="space-y-6">
            <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border border-amber-700/30">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Խորացված ուսուցում • Estudio Temático
              </span>
              <h2 className="text-xl font-bold text-amber-100 font-serif-title mt-0.5">
                Tema explicada en detalle
              </h2>
              <p className="text-sm text-amber-200/80 font-armenian">
                Թեման մանրամասն՝ 8 առանցքային ենթաբաժիններ
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Կտտացրեք ցանկացած տողի կամ կետի վրա՝ հայերեն թարգմանությունն ու բացատրությունը տեսնելու համար։
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {DETAILED_SECTIONS.map((sec) => (
                <div
                  key={sec.id}
                  className="rounded-2xl border border-white/10 bg-[#12151b] overflow-hidden shadow-md hover:border-amber-500/30 transition"
                >
                  {/* Section Title */}
                  <div className="px-6 py-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-amber-100 font-serif-title">
                        {sec.titleEs}
                      </h3>
                      <p className="text-sm font-armenian text-amber-300 font-medium">
                        {sec.titleArm}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const allEs = sec.items.map(i => i.es).join('. ');
                        handleSpeech(allEs);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/20 transition self-start sm:self-auto"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Լսել բաժինը</span>
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Sentences in this section */}
                    <div className="space-y-3">
                      {sec.items.map((item, idx) => {
                        const itemId = `sec-${sec.id}-i-${idx}`;
                        const isRevealed = viewMode === 'both' || revealedIds[itemId];

                        return (
                          <div
                            key={idx}
                            onClick={() => toggleReveal(itemId, item.es, item.arm, sec.titleEs)}
                            className="cursor-pointer group p-3.5 rounded-xl bg-black/20 hover:bg-amber-500/[0.08] border border-white/5 hover:border-amber-500/40 transition"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <div className="text-slate-100 font-medium text-base group-hover:text-amber-100 transition flex items-center gap-2">
                                  <span className="text-amber-500 text-xs">🇪🇸</span>
                                  <span>{item.es}</span>
                                </div>
                                {isRevealed ? (
                                  <div className="text-amber-300 font-armenian text-sm pt-1 pl-5 border-l-2 border-amber-500/50">
                                    🇦🇲 {item.arm}
                                  </div>
                                ) : (
                                  <div className="text-slate-500 text-xs pl-5 flex items-center gap-1">
                                    <span>👉 Կտտացրեք հայերեն թարգմանության համար</span>
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSpeech(item.es);
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/5 shrink-0"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Special section: Important Word (e.g., nómada) */}
                    {sec.importantWord && (
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-black/40 border border-amber-500/30">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                          <Sparkles className="w-4 h-4" />
                          <span>Palabra importante • Կարևոր բառ</span>
                        </div>
                        <div
                          onClick={() =>
                            toggleReveal(
                              `sec-${sec.id}-imp`,
                              `${sec.importantWord?.wordEs} = ${sec.importantWord?.descEs}`,
                              `${sec.importantWord?.wordArm} = ${sec.importantWord?.descArm}`,
                              'Palabra importante'
                            )
                          }
                          className="cursor-pointer group p-3 rounded-lg bg-black/40 border border-amber-500/20 hover:border-amber-500/40 transition"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-base font-semibold text-amber-200">
                              🇪🇸 <span className="font-bold underline decoration-amber-500">{sec.importantWord.wordEs}</span> = {sec.importantWord.descEs}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeech(`${sec.importantWord?.wordEs}: ${sec.importantWord?.descEs}`);
                              }}
                              className="p-1 rounded text-slate-400 hover:text-amber-300"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          {(viewMode === 'both' || revealedIds[`sec-${sec.id}-imp`]) ? (
                            <div className="mt-2 text-sm text-amber-300 font-armenian border-t border-white/5 pt-2">
                              🇦🇲 <span className="font-bold">{sec.importantWord.wordArm}</span> = {sec.importantWord.descArm}
                            </div>
                          ) : (
                            <div className="text-xs text-slate-500 mt-1">
                              👉 Կտտացրեք հայերեն սահմանման համար
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Bullets (e.g., El fuego servía para:) */}
                    {sec.bullets && sec.bulletHeader && (
                      <div className="mt-4 p-4 rounded-xl bg-black/30 border border-white/5">
                        <div className="mb-3">
                          <div className="text-sm font-semibold text-amber-300 flex items-center gap-2">
                            <Flame className="w-4 h-4 text-orange-500" />
                            <span>{sec.bulletHeader.es}</span>
                          </div>
                          <div className="text-xs text-slate-400 font-armenian">
                            {sec.bulletHeader.arm}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {sec.bullets.map((bullet, bIdx) => {
                            const bId = `sec-${sec.id}-b-${bIdx}`;
                            const isRevealed = viewMode === 'both' || revealedIds[bId];

                            return (
                              <div
                                key={bIdx}
                                onClick={() =>
                                  toggleReveal(bId, bullet.es, bullet.arm, sec.bulletHeader?.es)
                                }
                                className="cursor-pointer group p-3 rounded-lg bg-[#161a22] hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 transition"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="font-medium text-slate-200 group-hover:text-amber-200 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    <span>{bullet.es}</span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSpeech(bullet.es);
                                    }}
                                    className="p-1 rounded text-slate-400 hover:text-amber-300"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                {isRevealed ? (
                                  <div className="mt-1 text-xs text-amber-300 font-armenian pl-3.5">
                                    {bullet.arm}
                                  </div>
                                ) : (
                                  <div className="text-[11px] text-slate-500 pl-3.5">
                                    կտտացրու ➔
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: 15 EXAM QUESTIONS & ANSWERS (Preguntas y respuestas) */}
        {/* ======================================================== */}
        {activeTab === 'qa' && (
          <div className="space-y-6">
            <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border border-amber-700/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  15 Հարց • 15 Preguntas Clave
                </span>
                <h2 className="text-xl font-bold text-amber-100 font-serif-title mt-0.5">
                  Preguntas y respuestas
                </h2>
                <p className="text-sm text-amber-200/80 font-armenian">
                  Հարցեր և պատասխաններ (ամբողջական 15 հարցերը)
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Կտտացրեք հարցի կամ պատասխանի վրա՝ հայերեն թարգմանությունը տեսնելու համար։
                </p>
              </div>

              {/* Flashcard Practice Mode Trigger */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const rnd = Math.floor(Math.random() * QA_LIST.length);
                    setQaIndex(rnd);
                    setShowAnswer(false);
                    setShowQaArm(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Պատահական հարց (Մարզում)</span>
                </button>
              </div>
            </div>

            {/* Interactive Flashcard Trainer Card for Q&A */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181d26] to-[#12151b] border-2 border-amber-500/30 shadow-xl">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-4 border-b border-white/5 pb-2">
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Ինտերակտիվ վարժիչ • Հարց #{QA_LIST[qaIndex].number} / 15</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setQaIndex((qaIndex - 1 + QA_LIST.length) % QA_LIST.length);
                      setShowAnswer(false);
                      setShowQaArm(false);
                    }}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    ◀ Նախորդ
                  </button>
                  <button
                    onClick={() => {
                      setQaIndex((qaIndex + 1) % QA_LIST.length);
                      setShowAnswer(false);
                      setShowQaArm(false);
                    }}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    Հաջորդ ▶
                  </button>
                </div>
              </div>

              {/* Flashcard Question */}
              <div className="space-y-4">
                <div
                  onClick={() => setShowQaArm(!showQaArm)}
                  className="cursor-pointer p-4 rounded-xl bg-black/40 border border-amber-500/20 hover:border-amber-500/40 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-amber-400 font-bold block mb-1">
                        ՀԱՐՑ (Pregunta):
                      </span>
                      <p className="text-lg sm:text-xl font-bold text-amber-100">
                        {QA_LIST[qaIndex].questionEs}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeech(QA_LIST[qaIndex].questionEs);
                      }}
                      className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {showQaArm ? (
                    <div className="mt-3 pt-3 border-t border-white/10 text-amber-300 font-armenian text-base">
                      🇦🇲 {QA_LIST[qaIndex].questionArm}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 mt-2">
                      👉 Կտտացրեք հարցի վրա՝ հայերենը տեսնելու համար
                    </div>
                  )}
                </div>

                {/* Reveal Answer Button */}
                {!showAnswer ? (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Բացել պատասխանը (Mostrar respuesta)</span>
                  </button>
                ) : (
                  <div
                    onClick={() =>
                      toggleReveal(
                        `qa-card-ans-${QA_LIST[qaIndex].number}`,
                        QA_LIST[qaIndex].answerEs,
                        QA_LIST[qaIndex].answerArm,
                        `Պատասխան #${QA_LIST[qaIndex].number}`
                      )
                    }
                    className="cursor-pointer p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-100 animate-in fade-in duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-emerald-400 font-bold block mb-1">
                          ՊԱՏԱՍԽԱՆ (Respuesta):
                        </span>
                        <p className="text-lg font-semibold text-white">
                          {QA_LIST[qaIndex].answerEs}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeech(QA_LIST[qaIndex].answerEs);
                        }}
                        className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-2 pt-2 border-t border-emerald-500/20 text-amber-300 font-armenian text-base">
                      🇦🇲 {QA_LIST[qaIndex].answerArm}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Full 1-15 List Accordion */}
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold px-1">
                Բոլոր 15 հարցերը հերթականությամբ
              </h3>

              {filteredQA.map((qa) => {
                const qId = `qa-q-${qa.number}`;
                const aId = `qa-a-${qa.number}`;
                const isQRevealed = viewMode === 'both' || revealedIds[qId];
                const isARevealed = viewMode === 'both' || revealedIds[aId];

                return (
                  <div
                    key={qa.number}
                    className="rounded-2xl border border-white/5 hover:border-amber-500/30 bg-[#12151b] p-5 transition space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        Հարց #{qa.number}
                      </span>
                      <button
                        onClick={() => handleSpeech(`${qa.questionEs} ... ${qa.answerEs}`)}
                        className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Լսել երկուսն էլ</span>
                      </button>
                    </div>

                    {/* Question Item */}
                    <div
                      onClick={() => toggleReveal(qId, qa.questionEs, qa.questionArm, `Հարց #${qa.number}`)}
                      className="cursor-pointer group p-3 rounded-xl bg-black/30 border border-white/5 hover:border-amber-500/40 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="font-bold text-amber-100 text-base sm:text-lg group-hover:text-amber-300 transition">
                          🇪🇸 {qa.questionEs}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeech(qa.questionEs);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-amber-300 shrink-0 ml-2"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      {isQRevealed ? (
                        <div className="mt-1.5 text-sm text-amber-300 font-armenian pl-2 border-l border-amber-500/40">
                          🇦🇲 {qa.questionArm}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 mt-1">
                          👉 Կտտացրեք հայերեն թարգմանության համար
                        </div>
                      )}
                    </div>

                    {/* Answer Item */}
                    <div
                      onClick={() => toggleReveal(aId, qa.answerEs, qa.answerArm, `Պատասխան #${qa.number}`)}
                      className="cursor-pointer group p-3 rounded-xl bg-[#161a22] border border-white/5 hover:border-emerald-500/40 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="font-semibold text-slate-100 text-base group-hover:text-emerald-300 transition">
                          🇪🇸 {qa.answerEs}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeech(qa.answerEs);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-emerald-300 shrink-0 ml-2"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      {isARevealed ? (
                        <div className="mt-1.5 text-sm text-emerald-300/90 font-armenian pl-2 border-l border-emerald-500/40">
                          🇦🇲 {qa.answerArm}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 mt-1">
                          👉 Կտտացրեք հայերեն պատասխանի համար
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: VOCABULARY (Vocabulario importante)                */}
        {/* ======================================================== */}
        {activeTab === 'vocab' && (
          <div className="space-y-6">
            <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border border-amber-700/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Բառապաշար • Vocabulario Clave (18)
                </span>
                <h2 className="text-xl font-bold text-amber-100 font-serif-title mt-0.5">
                  Vocabulario importante
                </h2>
                <p className="text-sm text-amber-200/80 font-armenian">
                  Կարևոր բառապաշար՝ բոլոր 18 տերմինները
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Կտտացրեք ցանկացած իսպաներեն բառի վրա՝ հայերեն թարգմանությունն ու արտասանությունը բացելու համար։
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const rnd = Math.floor(Math.random() * VOCABULARY_LIST.length);
                    setVocabIndex(rnd);
                    setVocabFlipped(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Բառի քարտեր (Ֆլեշքարտ)</span>
                </button>
              </div>
            </div>

            {/* Flashcard Single Word Reviewer */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181d26] to-[#12151b] border-2 border-amber-500/30 shadow-xl max-w-lg mx-auto text-center">
              <div className="text-xs text-amber-400 font-semibold mb-3 flex items-center justify-between">
                <span>Քարտ #{vocabIndex + 1} / 18</span>
                <span className="text-slate-400">{VOCABULARY_LIST[vocabIndex].category}</span>
              </div>

              <div
                onClick={() => setVocabFlipped(!vocabFlipped)}
                className="cursor-pointer min-h-[170px] flex flex-col items-center justify-center p-6 rounded-xl bg-black/40 border border-amber-500/20 hover:border-amber-500/40 transition group"
              >
                <div className="text-4xl mb-3">{VOCABULARY_LIST[vocabIndex].icon}</div>
                <div className="text-2xl font-bold text-amber-100 group-hover:text-amber-300 transition">
                  {VOCABULARY_LIST[vocabIndex].es}
                </div>
                {vocabFlipped ? (
                  <div className="mt-3 text-xl font-bold text-amber-400 font-armenian animate-in zoom-in-95 duration-150">
                    {VOCABULARY_LIST[vocabIndex].arm}
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 mt-3">
                    👉 Կտտացրեք հայերեն թարգմանությունը տեսնելու համար
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setVocabIndex((vocabIndex - 1 + VOCABULARY_LIST.length) % VOCABULARY_LIST.length);
                    setVocabFlipped(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300"
                >
                  ◀ Նախորդ
                </button>
                <button
                  onClick={() => handleSpeech(VOCABULARY_LIST[vocabIndex].es)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Արտասանել</span>
                </button>
                <button
                  onClick={() => {
                    setVocabIndex((vocabIndex + 1) % VOCABULARY_LIST.length);
                    setVocabFlipped(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300"
                >
                  Հաջորդ ▶
                </button>
              </div>
            </div>

            {/* Interactive Vocabulary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredVocab.map((word) => {
                const wId = `vocab-${word.id}`;
                const isRevealed = viewMode === 'both' || revealedIds[wId];

                return (
                  <div
                    key={word.id}
                    onClick={() => toggleReveal(wId, word.es, word.arm, word.category)}
                    className={`cursor-pointer group p-4 rounded-xl border transition-all duration-200 bg-[#12151b] flex flex-col justify-between ${
                      isRevealed
                        ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/[0.08] to-transparent shadow-md'
                        : 'border-white/5 hover:border-amber-500/30 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{word.icon}</span>
                        <div>
                          <div className="text-base font-bold text-amber-100 group-hover:text-amber-300 transition">
                            {word.es}
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {word.category}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeech(word.es);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-amber-300 hover:bg-white/5"
                        title="Լսել"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/5 min-h-[30px] flex items-center">
                      {isRevealed ? (
                        <div className="text-sm font-semibold text-amber-300 font-armenian">
                          🇦🇲 {word.arm}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <span>Կտտացրու թարգմանության համար</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: SHORT SUMMARY FOR MEMORIZING (Resumen muy corto)   */}
        {/* ======================================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border border-amber-700/30">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Արագ ամփոփիչ • Resumen Express
              </span>
              <h2 className="text-xl font-bold text-amber-100 font-serif-title mt-0.5">
                {SUMMARY_INFO.titleEs}
              </h2>
              <p className="text-sm text-amber-200/80 font-armenian">
                {SUMMARY_INFO.titleArm}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Սա ամենակարևոր նախադասությունն է, որը պարունակում է Պալեոլիթի մասին բոլոր առանցքային փաստերը։
              </p>
            </div>

            {/* Main Interactive Summary Card */}
            <div className="rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-[#181d26] to-[#12151b] p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  Resumen de oro • Ոսկե ամփոփում
                </span>
                <button
                  onClick={() => handleSpeech(SUMMARY_INFO.es)}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition shadow"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Լսել ամփոփումը</span>
                </button>
              </div>

              {/* Spanish Block (Clickable) */}
              <div
                onClick={() =>
                  toggleReveal('summary-main', SUMMARY_INFO.es, SUMMARY_INFO.arm, 'Շատ կարճ ամփոփում')
                }
                className="cursor-pointer group p-5 rounded-xl bg-black/40 border border-amber-500/20 hover:border-amber-500/50 transition"
              >
                <div className="flex items-center justify-between text-xs text-amber-400 mb-2">
                  <span>🇪🇸 Español (Սեղմեք թարգմանության համար)</span>
                  <span className="text-[11px] underline">
                    {revealedIds['summary-main'] || viewMode === 'both'
                      ? 'Թաքցնել'
                      : 'Բացել հայերենը ➔'}
                  </span>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-amber-100 leading-relaxed tracking-wide">
                  {SUMMARY_INFO.es}
                </p>
              </div>

              {/* Armenian Block */}
              {(revealedIds['summary-main'] || viewMode === 'both') && (
                <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 animate-in fade-in duration-200">
                  <div className="text-xs font-semibold text-amber-400 mb-2 font-armenian">
                    🇦🇲 Հայերեն թարգմանություն
                  </div>
                  <p className="font-armenian text-base sm:text-xl leading-relaxed text-slate-100 font-medium">
                    {SUMMARY_INFO.arm}
                  </p>
                </div>
              )}

              {/* 6 Essential Key Pillars */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 block">
                  6 առանցքային կետերը (Սեղմեք յուրաքանչյուրի վրա)։
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SUMMARY_INFO.keyPoints.map((pt, pIdx) => {
                    const ptId = `sum-pt-${pIdx}`;
                    const isRevealed = viewMode === 'both' || revealedIds[ptId];

                    return (
                      <div
                        key={pIdx}
                        onClick={() => toggleReveal(ptId, pt.es, pt.arm, 'Հիմնական կետ')}
                        className="cursor-pointer p-3 rounded-xl bg-black/30 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 transition text-center"
                      >
                        <div className="font-bold text-amber-200 text-sm">{pt.es}</div>
                        {isRevealed ? (
                          <div className="text-xs text-amber-400 font-armenian mt-1">
                            {pt.arm}
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-500 mt-1">կտտացրու ➔</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Active Translation Drawer / Popover at bottom */}
      {selectedItem && (
        <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-50 animate-in slide-in-from-bottom-4 duration-200">
          <div className="rounded-2xl p-4 bg-[#181d26] border-2 border-amber-500 shadow-2xl shadow-black/80 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-2 pb-1.5 border-b border-white/10">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Թարգմանություն / Traducción {selectedItem.context ? `(${selectedItem.context})` : ''}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeech(selectedItem.es)}
                  className="p-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300"
                  title="Լսել իսպաներեն"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-[11px] text-slate-400 font-mono">🇪🇸 Español:</span>
                <p className="text-sm sm:text-base font-semibold text-amber-100">
                  {selectedItem.es}
                </p>
              </div>
              <div className="pt-1.5 border-t border-white/5">
                <span className="text-[11px] text-amber-400 font-armenian font-semibold">🇦🇲 Հայերեն:</span>
                <p className="text-sm sm:text-base font-medium text-amber-300 font-armenian leading-relaxed">
                  {selectedItem.arm}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-6 bg-black/40 text-center text-xs text-slate-500">
        <p className="font-serif-title text-slate-400">
          UNIT 1: PREHISTORY • EL PALEOLÍTICO • ՊԱԼԵՈԼԻԹՅԱՆ ԺԱՄԱՆԱԿԱՇՐՋԱՆԸ
        </p>
        <p className="text-slate-600 mt-1 font-armenian">
          Բոլոր նյութերը, բառարանն ու 15 հարցերը հեշտ յուրացման համար
        </p>
      </footer>
    </div>
  );
}
