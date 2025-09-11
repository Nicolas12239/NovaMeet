import Link from "next/link"

export default function Discover() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Discover</h1>
        <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          Explore profiles and find your perfect match.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder profiles */}
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-white rounded-lg shadow p-6 text-center">
              <div className="h-24 w-24 bg-pink-200 rounded-full mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">User {id}</h2>
              <p className="text-gray-600 mb-4">Brief bio or description here.</p>
              <Link
                href={`/profile/${id}`}
                className="inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
