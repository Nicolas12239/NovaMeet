"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import {
  Home,
  Search,
  MessageCircle,
  User,
  Menu,
  X,
  Heart,
  Bell,
  LogOut,
  UserPlus,
  LogIn,
  Sparkles,
  ChevronDown,
  CreditCard
} from "lucide-react"

export default function Navigation() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (session && !showWelcome) {
      const timer = setTimeout(() => setShowWelcome(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [session, showWelcome])

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleTooltip = (item: string | null) => {
    setShowTooltip(item)
  }

  const menuItems = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/#features", label: "Fonctionnalités", icon: Sparkles },
    { href: "/#payment", label: "Paiement", icon: CreditCard },
    { href: "/discover", label: "Découvrir", icon: Search },
    { href: "/messages", label: "Messages", icon: MessageCircle },
    { href: "/profile/create", label: "Profil", icon: User },
  ]

  const loggedInMenuItems = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/dashboard", label: "Tableau de bord", icon: Heart },
    { href: "/discover", label: "Découvrir", icon: Search },
    { href: "/messages", label: "Messages", icon: MessageCircle },
  ]

  const currentMenuItems = session ? loggedInMenuItems : menuItems

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-pink-100/50'
        : 'bg-pink-50/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group relative">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Heart className="w-6 h-6 text-white group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse shadow-sm"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent group-hover:from-pink-700 group-hover:to-pink-800 transition-all duration-300">
                  NovaMeet+
                </span>
                {session && showWelcome && (
                  <div className="text-xs text-pink-600 font-medium opacity-0 animate-fade-in-up">
                    Bienvenue, {session.user?.email?.split('@')[0]}! ✨
                  </div>
                )}
              </div>
              <Sparkles className="w-4 h-4 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {currentMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex items-center space-x-2 text-gray-700 hover:text-pink-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-pink-50/50 group"
                  onMouseEnter={() => handleTooltip(item.label)}
                  onMouseLeave={() => handleTooltip(null)}
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>{item.label}</span>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-pink-700 group-hover:w-full transition-all duration-300"></div>
                  {showTooltip === item.label && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-lg animate-fade-in-up z-50">
                      {`Aller à ${item.label}`}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <button
                  className="relative p-2 text-gray-600 hover:text-pink-600 rounded-xl hover:bg-pink-50/50 transition-all duration-300 group"
                  onMouseEnter={() => handleTooltip('notifications')}
                  onMouseLeave={() => handleTooltip(null)}
                >
                  <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse shadow-sm"></span>
                  {showTooltip === 'notifications' && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-lg animate-fade-in-up z-50">
                      Notifications
                    </div>
                  )}
                </button>

                {/* User Avatar */}
                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-pink-100/50 hover:border-pink-200/50 transition-all duration-300 group cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700 max-w-32 truncate">
                      {session.user?.email?.split('@')[0]}
                    </span>
                    <span className="text-xs text-pink-600 font-medium">Premium</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-pink-600 transition-colors duration-300" />
                </div>

                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white px-4 py-2 rounded-xl hover:from-pink-600 hover:to-pink-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/signin"
                  className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-pink-50/50 group"
                >
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Se connecter</span>
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white px-6 py-2 rounded-xl hover:from-pink-600 hover:to-pink-800 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Commencer</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="relative p-2 text-gray-700 hover:text-pink-600 rounded-xl hover:bg-pink-50/50 transition-all duration-300 group"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'}`} />
              </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
      }`}>
        <div className="bg-white/95 backdrop-blur-lg border-t border-pink-100/50 px-4 py-4 space-y-2 shadow-lg">
          {currentMenuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50/50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group transform ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? `${index * 100}ms` : '0ms' }}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>{item.label}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                </div>
              </Link>
            )
          })}

          <div className="border-t border-gray-200/50 pt-4 mt-4">
            {session ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-4 py-2 bg-pink-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {session.user?.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-pink-600">Membre Premium</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOut()
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white px-4 py-3 rounded-xl hover:from-pink-600 hover:to-pink-800 transition-all duration-300 text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/auth/signin"
                  className="flex items-center justify-center space-x-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50/50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white px-4 py-3 rounded-xl hover:from-pink-600 hover:to-pink-800 transition-all duration-300 text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Commencer</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
