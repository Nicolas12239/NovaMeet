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
  LogIn
} from "lucide-react"

export default function Navigation() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/discover", label: "Discover", icon: Search },
    { href: "/messages", label: "Messages", icon: MessageCircle },
    { href: "/profile/create", label: "Profile", icon: User },
  ]

  const loggedInMenuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: Heart },
    { href: "/discover", label: "Discover", icon: Search },
    { href: "/messages", label: "Messages", icon: MessageCircle },
  ]

  const currentMenuItems = session ? loggedInMenuItems : menuItems

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-pink-100/50'
        : 'bg-gradient-to-r from-pink-50/80 to-purple-50/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-700 group-hover:to-purple-700 transition-all duration-200">
                NovaMeet+
              </span>
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
                  className="relative flex items-center space-x-2 text-gray-700 hover:text-pink-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-pink-50/50 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>{item.label}</span>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-200"></div>
                </Link>
              )
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <button className="relative p-2 text-gray-600 hover:text-pink-600 rounded-xl hover:bg-pink-50/50 transition-all duration-200 group">
                  <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
                </button>

                {/* User Avatar */}
                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-pink-100/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-32 truncate">
                    {session.user?.email?.split('@')[0]}
                  </span>
                </div>

                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/signin"
                  className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-pink-50/50 group"
                >
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-pink-600 rounded-xl hover:bg-pink-50/50 transition-all duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6 transform rotate-0 hover:rotate-90 transition-transform duration-200" />
              ) : (
                <Menu className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-lg border-t border-pink-100/50 px-4 py-4 space-y-2">
          {currentMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50/50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 group"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="border-t border-gray-200/50 pt-4 mt-4">
            {session ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-4 py-2 bg-pink-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {session.user?.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-gray-500">Premium Member</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOut()
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 text-base font-medium shadow-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
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
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 text-base font-medium shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
