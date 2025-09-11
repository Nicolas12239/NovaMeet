"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface Profile {
  id: string
  nickname: string
  bio?: string
  gender?: string
  city?: string
  interests?: string
  visibility?: string
  user: {
    birthYear: number
    premiumUntil?: string
    photos: Array<{ url: string; status: string }>
  }
}

export default function ProfileDetail() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (params.id) {
      fetchProfile()
    }
  }, [status, params.id, router])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/profiles/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
      } else {
        setError("Profile not found")
      }
    } catch (err) {
      setError("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const calculateAge = (birthYear: number) => {
    return new Date().getFullYear() - birthYear
  }

  const parseInterests = (interests: string | null) => {
    if (!interests) return []
    try {
      return JSON.parse(interests)
    } catch {
      return []
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/discover"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
          >
            Back to Discovery
          </Link>
        </div>
      </div>
    )
  }

  const approvedPhotos = profile.user.photos.filter(photo => photo.status === "APPROVED")
  const interests = parseInterests(profile.interests || null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Photos Section */}
          <div className="relative h-96 bg-gray-200">
            {approvedPhotos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full">
                {approvedPhotos.slice(0, 3).map((photo, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={photo.url}
                      alt={`${profile.nickname} photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No photos available
              </div>
            )}

            {profile.user.premiumUntil && new Date(profile.user.premiumUntil) > new Date() && (
              <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ Premium Member
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile.nickname}</h1>
                <p className="text-gray-600">{calculateAge(profile.user.birthYear)} years old</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                  Send Message
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                  Like Profile
                </button>
              </div>
            </div>

            {profile.city && (
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  📍 {profile.city}
                </span>
              </div>
            )}

            {profile.bio && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {profile.gender && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Gender</h2>
                <p className="text-gray-700 capitalize">{profile.gender}</p>
              </div>
            )}

            {interests.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Interests</h2>
                <div className="flex flex-wrap gap-2">
                {interests.map((interest: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/discover"
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Back to Discovery
              </Link>
              <button className="bg-red-100 text-red-800 px-6 py-2 rounded-lg hover:bg-red-200 transition-colors">
                Report Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
