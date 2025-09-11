import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            NovaMeet+
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with like-minded adults in a safe, respectful environment.
            Find meaningful connections and build lasting relationships.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signup"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/auth/signin"
              className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold border border-pink-600 hover:bg-pink-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
