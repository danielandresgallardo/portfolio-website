'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Project {
  id: string;
  title: string;
  date: string;
  icon: string;
  description: string;
  tags: string[];
  order_by: number;
}

interface Experience {
  id: string;
  title: string;
  organization: string;
  description: string;
  icon: string;
  order_by: number;
}

export default function Home() {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(dark);
    if (dark) document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark, mounted]);

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_by', { ascending: true });

        if (error) {
          console.error('Error fetching projects:', error);
        } else if (data) {
          setProjects(data);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchProjects();
  }, []);

  // Fetch experience from Supabase
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('order_by', { ascending: true });

        if (error) {
          console.error('Error fetching experience:', error);
        } else if (data) {
          setExperience(data);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchExperience();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('daniel-gallardo@live.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const bgClass = isDark ? 'bg-zinc-950' : 'bg-amber-50';
  const textClass = isDark ? 'text-zinc-50' : 'text-zinc-900';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} relative overflow-hidden transition-colors duration-300`}>
      {/* Stars Background */}
      <div className="fixed inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20 dark:opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <circle cx="15%" cy="10%" r="1.5" fill="currentColor" className="text-blue-400" />
          <circle cx="25%" cy="8%" r="1" fill="currentColor" className="text-blue-300" />
          <circle cx="35%" cy="12%" r="1.2" fill="currentColor" className="text-blue-400" />
          <circle cx="55%" cy="5%" r="1" fill="currentColor" className="text-blue-300" />
          <circle cx="75%" cy="10%" r="1.5" fill="currentColor" className="text-blue-400" />
          <circle cx="85%" cy="7%" r="1.2" fill="currentColor" className="text-blue-300" />
          <circle cx="92%" cy="12%" r="1" fill="currentColor" className="text-blue-400" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${isDark ? 'bg-zinc-950/90' : 'bg-white/90'} backdrop-blur-md border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} z-50 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center w-full">
          <h2 className="text-xl font-bold tracking-tight">⛺ Daniel Andres Gallardo</h2>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-4 sm:gap-8 text-sm items-center">
            <a href="#projects" className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>Projects</a>
            <a href="#experience" className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>Experience</a>
            <a href="#contact" className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>Contact</a>
            <a href="/marketplace" className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>🛍️ Marketplace</a>
            <LanguageSwitcher isDark={isDark} />
            <button
              onClick={() => {
                setIsDark(!isDark);
              }}
              className={`p-2 rounded-lg transition ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'}`}
              aria-label="Toggle dark mode"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden gap-3 items-center">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'}`}
              aria-label="Toggle dark mode"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'}`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`sm:hidden ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} border-t px-6 py-4 transition-colors duration-300`}>
            <div className="flex flex-col gap-4 text-sm">
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>Projects</a>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)} className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>Experience</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>Contact</a>
              <a href="/marketplace" onClick={() => setMobileMenuOpen(false)} className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>🛍️ Marketplace</a>
              <div className="pt-2 border-t border-zinc-700">
                <LanguageSwitcher isDark={isDark} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Campfire decoration */}
      <div className="fixed bottom-20 left-10 text-5xl opacity-30 dark:opacity-50 pointer-events-none hidden sm:block animate-pulse">
        🔥
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block mb-4">
                <span className="text-5xl">🏕️</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 dark:from-amber-200 dark:via-yellow-200 dark:to-orange-200 bg-clip-text text-transparent">
                {t('hero.title')}
              </h1>
              <p className={`text-lg sm:text-xl max-w-2xl leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                {t('hero.subtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-700 dark:bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-800 dark:hover:bg-amber-500 transition"
              >
                Get in Touch
              </a>
              <a
                href="https://github.com/danielandresgallardo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-amber-700 dark:border-amber-600 text-amber-700 dark:text-amber-200 rounded-lg font-semibold hover:bg-amber-50 dark:hover:bg-zinc-900 transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mountain decoration */}
      <svg className="absolute right-0 top-96 w-32 h-32 opacity-10 dark:opacity-20 pointer-events-none" viewBox="0 0 200 200">
        <polygon points="50,150 100,50 150,150" fill="currentColor" className="text-slate-700" />
        <polygon points="70,150 110,80 150,150" fill="currentColor" className="text-slate-600" />
      </svg>

      {/* Bio Section */}
      <section className={`py-20 px-6 ${isDark ? 'bg-zinc-900/50' : 'bg-amber-50/40'} relative z-10 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span>🌲</span> About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`space-y-4 text-lg leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              <p>
                Master's student in Computer Science & Software Engineering with 2+ years of industry experience across backend development, computer vision, and multi-agent AI systems. Proficient in Python, C++, React, and Flask, with hands-on deployment of LLM pipelines and automated testing frameworks.
              </p>
              <p>
                Particularly interested in backend infrastructure, AI integration, and developer tooling. I'm passionate about building robust, scalable solutions that push engineering to the next level. Winner of the Constructor X BMW Group GenAI Hackathon 2026.
              </p>
            </div>
            <div className="space-y-4">
              <div className={`${isDark ? 'bg-zinc-800/70' : 'bg-white/70'} backdrop-blur-sm p-6 rounded-lg border ${isDark ? 'border-amber-900/30' : 'border-amber-200'} transition-colors duration-300`}>
                <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>
                  <span>🎓</span> Education
                </h3>
                <p className="text-sm font-semibold">MS Computer Science & Software Engineering</p>
                <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Constructor University, Germany (2024-Present)</p>
                <p className="text-sm font-semibold mt-2">BS Computer Science & Information Engineering</p>
                <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>National Ilan University, Taiwan (GPA: 3.46/4.3)</p>
              </div>
              <div className={`${isDark ? 'bg-zinc-800/70' : 'bg-white/70'} backdrop-blur-sm p-6 rounded-lg border ${isDark ? 'border-amber-900/30' : 'border-amber-200'} transition-colors duration-300`}>
                <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>
                  <span>⚡</span> Tech Stack
                </h3>
                <p className="text-sm">Python, C++, React, Flask, Docker, YOLO, OpenAI/Gemini</p>
                <p className={`text-sm mt-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Specializations: AI, Backend Infrastructure, DevOps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <span>📍</span> Featured Projects
          </h2>
          <div className="space-y-8">
            {projects.length === 0 ? (
              <div className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Loading projects...</div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className={`border-2 ${isDark ? 'border-amber-900/50 bg-zinc-900/50' : 'border-amber-200 bg-white/70'} backdrop-blur-sm rounded-lg p-8 hover:border-amber-400 dark:hover:border-amber-700 hover:shadow-xl transition`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <span>{project.icon}</span> {project.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{project.date}</p>
                    </div>
                  </div>
                  <p className={`mb-4 leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className={`${isDark ? 'bg-amber-900/30 text-amber-200' : 'bg-amber-100 text-amber-800'} px-3 py-1 rounded text-xs font-medium`}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-6 ${isDark ? 'bg-zinc-900/30' : 'bg-amber-50/40'} relative z-10 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <span>🎒</span> Work Experience
          </h2>
          <div className="space-y-6">
            {experience.length === 0 ? (
              <div className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Loading experience...</div>
            ) : (
              experience.map((exp) => (
                <div key={exp.id} className={`border-l-4 ${isDark ? 'border-amber-500' : 'border-amber-600'} pl-6 pb-6`}>
                  <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                    <span>{exp.icon}</span> {exp.title}
                  </h3>
                  <p className={`text-sm mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{exp.organization}</p>
                  <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>{exp.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <span>🔥</span> Let's Connect <span>🏕️</span>
            </h2>
            <p className={`text-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              I'm always open to discussing AI, machine learning, and exciting opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={`${isDark ? 'bg-zinc-900/50 border-amber-900/50' : 'bg-white/70 border-amber-200'} backdrop-blur-sm border-2 rounded-lg p-8 text-center hover:${isDark ? 'border-amber-700' : 'border-amber-400'} hover:shadow-xl transition`}>
              <div className="text-4xl mb-4">📧</div>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>Email</h3>
              <div className="flex flex-col gap-3">
                <p className={`text-sm font-mono ${isDark ? 'text-zinc-300 bg-zinc-800/70' : 'text-zinc-700 bg-zinc-100'} p-3 rounded break-all`}>
                  daniel-gallardo@live.com
                </p>
                <button
                  onClick={copyEmail}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    emailCopied
                      ? isDark ? 'bg-green-900/30 text-green-200' : 'bg-green-200 text-green-800'
                      : isDark ? 'bg-amber-900/30 text-amber-200 hover:bg-amber-900/50' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {emailCopied ? '✓ Copied!' : 'Copy Email'}
                </button>
              </div>
            </div>

            <a href="https://github.com/danielandresgallardo" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'bg-zinc-900/50 border-amber-900/50' : 'bg-white/70 border-amber-200'} backdrop-blur-sm border-2 rounded-lg p-8 text-center hover:${isDark ? 'border-amber-700' : 'border-amber-400'} hover:shadow-xl transition`}>
              <div className="text-4xl mb-4">💻</div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>GitHub</h3>
              <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Check out my projects</p>
            </a>

            <a href="https://www.linkedin.com/in/daniel-andres-gallardo/" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'bg-zinc-900/50 border-amber-900/50' : 'bg-white/70 border-amber-200'} backdrop-blur-sm border-2 rounded-lg p-8 text-center hover:${isDark ? 'border-amber-700' : 'border-amber-400'} hover:shadow-xl transition`}>
              <div className="text-4xl mb-4">🔗</div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>LinkedIn</h3>
              <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Professional profile</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'border-amber-900/30 bg-slate-900/30' : 'border-amber-200 bg-amber-50/30'} py-8 px-6 relative z-10 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>© 2026 Daniel Andres Gallardo. Built with Next.js, React & Tailwind. ⛺</p>
        </div>
      </footer>
    </div>
  );
}
