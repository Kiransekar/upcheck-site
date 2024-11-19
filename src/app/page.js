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

// Announcement Ticker Component
function AnnouncementTicker({ translations, language }) {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Collect announcements from translations
  const announcements = [
    translations[language].announcement || "📱 The android version of Upcheck is set to release soon!",
    translations[language].secondAnnouncement || " 📖 You can soon check articles and content in this website!",
    translations[language].thirdAnnouncement || "🤖 Our AI models keep improving for you!",
    translations[language].fourthAnnouncement || "✨ Your feedback and suggestion is our first priority!",
    translations[language].fifthAnnouncement || "🤝 Connecting India means being multilingual and user friendly!",
    translations[language].sixthAnnouncement || "🚀 Our team is set to launch the first ever affordable multi-lingual aquatech solution",
    // Add more announcements as needed
  ]

  useEffect(() => {
    const announcementCycle = setInterval(() => {
      // First, fade out the current announcement
      setIsVisible(false)

      // After fade-out, change the announcement and fade back in
      setTimeout(() => {
        setCurrentAnnouncementIndex((prev) => 
          (prev + 1) % announcements.length
        )
        setIsVisible(true)
      }, 1000) // Match this with fade-out duration
    }, 6000) // Total cycle time (fade out + pause + fade in)

    return () => clearInterval(announcementCycle)
  }, [announcements.length, language])

  return (
    <div className="announcement-container">
      <div className="updates-badge">
        Updates
      </div>
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
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg">
              <Fish className="h-8 w-8 text-[#7DD3E1]" />
            </div>
            <span className="text-2xl font-bold text-white">Upcheck</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.keys(translations).map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)}>
                  {lang.toUpperCase()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
    </div>
  )
}