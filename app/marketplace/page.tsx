'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Item {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  created_at: string;
}

interface Message {
  name: string;
  email: string;
  message: string;
}

export default function Marketplace() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageForm, setMessageForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Theme setup
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

  // Load items from Supabase
  useEffect(() => {
    const loadItems = async () => {
      try {
        const { data, error } = await supabase
          .from('marketplace_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading items:', error);
          // Load sample items if no data
          setItems(SAMPLE_ITEMS);
        } else if (data) {
          setItems(data);
        }
      } catch (err) {
        console.error('Error:', err);
        setItems(SAMPLE_ITEMS);
      }
    };

    loadItems();
  }, []);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setLoading(true);
    try {
      // Save message to Supabase
      const { error: dbError } = await supabase
        .from('marketplace_messages')
        .insert([
          {
            name: messageForm.name,
            email: messageForm.email,
            message: messageForm.message,
            item_id: selectedItem.id,
            item_title: selectedItem.title,
          },
        ]);

      if (dbError) {
        console.error('Database error:', dbError);
        alert('Error saving message. Please try again.');
        return;
      }


      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowMessageForm(false);
        setSelectedItem(null);
        setMessageForm({ name: '', email: '', message: '' });
      }, 2000);
    } catch (err) {
      console.error('Error:', err);
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const bgClass = isDark ? 'bg-zinc-950' : 'bg-amber-50';
  const textClass = isDark ? 'text-zinc-50' : 'text-zinc-900';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} relative overflow-hidden transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${isDark ? 'bg-zinc-950/90' : 'bg-white/90'} backdrop-blur-md border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} z-50 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center w-full">
          <a href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition">⛺ Daniel Andres</a>

          <div className="flex sm:hidden gap-3 items-center">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'}`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'}`}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          <div className="hidden sm:flex gap-4 sm:gap-8 text-sm items-center">
            <a href="/" className={isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}>Home</a>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'}`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`sm:hidden ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} border-t px-6 py-4 transition-colors duration-300`}>
            <a href="/" className={`block ${isDark ? 'hover:text-amber-200' : 'hover:text-amber-700'}`}>Home</a>
          </div>
        )}
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">🛍️ Marketplace</h1>
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Browse and buy items.</p>
        </div>
      </section>

      {/* Items Grid */}
      <section className="pb-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {items.length === 0 ? (
            <div className={`text-center py-12 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p>No items available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setCurrentImageIndex(0);
                  }}
                  className={`cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition ${
                    isDark ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="aspect-square bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold truncate">{item.title}</h3>
                    <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Item Detail Modal */}
      {selectedItem && !showMessageForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div
            className={`${isDark ? 'bg-zinc-900' : 'bg-white'} rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Slideshow */}
            <div className="relative aspect-square bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              {selectedItem.images && selectedItem.images.length > 0 ? (
                <>
                  <img
                    src={selectedItem.images[currentImageIndex]}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedItem.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev === 0 ? selectedItem.images.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                      >
                        ❮
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev === selectedItem.images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                      >
                        ❯
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedItem.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition ${
                              idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>
              )}
            </div>

            {/* Item Details */}
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-2">{selectedItem.title}</h2>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-4">
                ${selectedItem.price.toFixed(2)}
              </p>
              <p className={`${isDark ? 'text-zinc-300' : 'text-zinc-700'} mb-6`}>
                {selectedItem.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowMessageForm(true)}
                  className="flex-1 bg-amber-700 dark:bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 dark:hover:bg-amber-500 transition"
                >
                  Send Message
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className={`flex-1 border-2 ${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-300 hover:bg-zinc-100'} py-3 rounded-lg font-semibold transition`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Form Modal */}
      {selectedItem && showMessageForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => !submitted && setShowMessageForm(false)}>
          <div
            className={`${isDark ? 'bg-zinc-900' : 'bg-white'} rounded-lg max-w-md w-full p-6`}
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-2xl mb-2">✅</p>
                <p className="text-lg font-semibold mb-2">Message Sent!</p>
                <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>
                  Daniel will contact you soon.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-4">Contact About "{selectedItem.title}"</h3>

                <form onSubmit={handleSubmitMessage} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={messageForm.name}
                      onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border-2 ${
                        isDark
                          ? 'bg-zinc-800 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300'
                      } focus:outline-none focus:border-amber-600 transition`}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      Email or WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      value={messageForm.email}
                      onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border-2 ${
                        isDark
                          ? 'bg-zinc-800 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300'
                      } focus:outline-none focus:border-amber-600 transition`}
                      placeholder="your@email.com or +1234567890"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      Message
                    </label>
                    <textarea
                      required
                      value={messageForm.message}
                      onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border-2 ${
                        isDark
                          ? 'bg-zinc-800 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300'
                      } focus:outline-none focus:border-amber-600 transition resize-none`}
                      rows={4}
                      placeholder="Tell me about your interest..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-amber-700 dark:bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 dark:hover:bg-amber-500 transition disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMessageForm(false)}
                      className={`flex-1 border-2 ${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-300 hover:bg-zinc-100'} py-3 rounded-lg font-semibold transition`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Sample items - replace with your actual items
const SAMPLE_ITEMS: Item[] = [
  {
    id: '1',
    title: 'Vintage Camera',
    price: 45.99,
    description: 'Beautiful vintage film camera in great condition. Perfect for collectors.',
    images: ['https://images.unsplash.com/photo-1606986628025-35d57e735ae000?w=400&h=400&fit=crop'],
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Wooden Bookshelf',
    price: 120,
    description: 'Solid oak bookshelf with 5 shelves. Recently refinished.',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop'],
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Bicycle',
    price: 200,
    description: 'Mountain bike, 21-speed, excellent condition. Includes helmet.',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'],
    created_at: new Date().toISOString(),
  },
];
