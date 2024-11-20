'use client'

import React, { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import { Timer, BarChart2, Bot, Apple, SmartphoneIcon as Android, Fish } from 'lucide-react'
import { WaveBackground } from './components/WaveBackground'
import { FeatureCard } from './components/FeatureCard'
import { StatCard } from './components/StatCard'
import { translations } from './translations'
import Script from 'next/script'

// Announcement Ticker Component
function AnnouncementTicker({ translations, language }) {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const announcements = [
    translations[language].announcement || "📱 The android version of Upcheck is set to release soon!",
    translations[language].secondAnnouncement || " 📖 You can soon check articles and content in this website!",
    translations[language].thirdAnnouncement || "🤖 Our AI models keep improving for you!",
    translations[language].fourthAnnouncement || "✨ Your feedback and suggestion is our first priority!",
    translations[language].fifthAnnouncement || "🤝 Connecting India means being multilingual and user friendly!",
    translations[language].sixthAnnouncement || "🚀 Our team is set to launch the first ever affordable multi-lingual aquatech solution",
  ]

  useEffect(() => {
    const announcementCycle = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length)
        setIsVisible(true)
      }, 1000)
    }, 6000)

    return () => clearInterval(announcementCycle)
  }, [announcements.length, language])

  return (
    <div className="announcement-container">
      <div className="updates-badge">Updates</div>
      <div 
        className={`announcement-text ${isVisible ? 'fade-in' : 'fade-out'}`}
        style={{
          animationName: isVisible ? 'slide-right-to-updates' : 'fade-out-to-updates'
        }}
      >
        {announcements[currentAnnouncementIndex]}
      </div>
    </div>
  )
}

export default function Home() {
  const [language, setLanguage] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language)
    }
  }, [language, mounted])

  const t = translations[language]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E5F7FA]">
      <WaveBackground />

      <header className="bg-gradient-to-r from-[#7DD3E1] to-[#5BC0DE] p-4 relative">
  <div className="container mx-auto flex items-center justify-between">
    {/* Logo Section */}
    <div className="flex items-center space-x-2">
      <div className="bg-white p-2 rounded-lg">
        <Fish className="h-8 w-8 text-[#7DD3E1]" />
      </div>
      <span className="text-2xl font-bold text-white">Upcheck</span>
    </div>

    {/* Navigation Links */}
    <div className="flex items-center space-x-6">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 px-4 py-2 rounded-md flex items-center"
          >
            <span className="mr-2">{language.toUpperCase()}</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white rounded-md shadow-lg border border-gray-200">
          {Object.keys(translations).map((lang) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => setLanguage(lang)}
              className="text-gray-700 hover:bg-[#E5F7FA] px-4 py-2 cursor-pointer"
            >
              {lang.toUpperCase()}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Buttons for About Us, Resources, Contact Us */}
      <a
        href="#about"
        className="text-white text-lg hover:text-[#E5F7FA] transition duration-200"
      >
        About Us
      </a>
      <a
        href="#resources"
        className="text-white text-lg hover:text-[#E5F7FA] transition duration-200"
      >
        Resources
      </a>
      <a
        href="#contact"
        className="text-white text-lg hover:text-[#E5F7FA] transition duration-200"
      >
        Contact Us
      </a>
    </div>

    {/* Mobile Menu Button */}
    <div className="md:hidden flex items-center">
      <button className="text-white focus:outline-none">
        {/* Hamburger Icon */}
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
  </div>
</header>

      {/* Announcement Ticker */}
      <AnnouncementTicker translations={translations} language={language} />

      <main className="container mx-auto px-4 py-12 relative">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {t.title}
              <span className="block text-[#7DD3E1]">{t.subtitle}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#7DD3E1]/20">
            {Object.values(t.stats).map((value, index) => (
              <StatCard key={index} value={value} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="bg-[#7DD3E1] hover:bg-[#6BC1CF] text-white flex items-center gap-2 px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Android className="h-6 w-6" />
              {t.downloadAndroid}
            </Button>
            <Button variant="outline" className="border-2 border-[#7DD3E1] text-[#7DD3E1] hover:bg-[#7DD3E1] hover:text-white flex items-center gap-2 px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Apple className="h-6 w-6" />
              {t.downloadIOS}
            </Button>
          </div>

          <p className="text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full">
            {t.demoRelease}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 w-full">
            {[{ Icon: Timer, title: t.features.realtime },
            { Icon: BarChart2, title: t.features.analytics },
            { Icon: Bot, title: t.features.ai }].map(({ Icon, title }, index) => (
              <FeatureCard key={index} Icon={Icon} title={title} />
            ))}
          </div>
        </div>
      </main>

      {/* Brevo Conversations Chat Widget */}
      <Script
        id="brevo-conversations"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
          (function(d, w, c) {
            w.BrevoConversationsID = '673ce31e5cfa8310a8073180';
            w[c] = w[c] || function() {
              (w[c].q = w[c].q || []).push(arguments);
            };
            var s = d.createElement('script');
            s.async = true;
            s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
            if (d.head) d.head.appendChild(s);
          })(document, window, 'BrevoConversations');
        `,
        }}
      />
    </div>
  )
}