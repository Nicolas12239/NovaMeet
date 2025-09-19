import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bienvenue sur NovaMeet+, {session.user?.email}
          </h1>
          <p className="text-gray-600 mb-6">
            Votre tableau de bord est en construction. Plus de fonctionnalités bientôt !
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-pink-800">Profil</h3>
              <p className="text-pink-600">Complétez votre profil</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Découvrir</h3>
              <p className="text-blue-600">Trouver des correspondances</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Messages</h3>
              <p className="text-green-600">Discuter avec les correspondances</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
