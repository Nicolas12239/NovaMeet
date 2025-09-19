import Link from "next/link"
import { Heart, Shield, Users, CheckCircle, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              NovaMeet+
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connectez-vous avec des adultes partageant les mêmes idées dans un environnement sûr et respectueux.
              Trouvez des connexions significatives et construisez des relations durables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-pink-500 to-pink-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                Commencer l'aventure
              </Link>
              <Link
                href="/auth/signup"
                className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold border-2 border-pink-600 hover:bg-pink-50 transition-all duration-300 text-lg"
              >
                Se connecter
              </Link>
            </div>
            <div className="flex justify-center">
              <a href="#features" className="animate-bounce">
                <div className="w-8 h-8 border-2 border-pink-600 rounded-full flex items-center justify-center">
                  <div className="w-1 h-3 bg-pink-600 rounded-full"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fonctionnalités <span className="text-pink-600">Exceptionnelles</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez tout ce que NovaMeet+ a à offrir pour votre expérience de rencontre
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sécurité Maximale</h3>
              <p className="text-gray-600">
                Vérification des profils, modération 24/7 et protection des données personnelles pour une expérience sereine.
              </p>
            </div>

            <div className="text-center p-8 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Matching Intelligent</h3>
              <p className="text-gray-600">
                Algorithme avancé pour trouver les profils les plus compatibles selon vos préférences et intérêts.
              </p>
            </div>

            <div className="text-center p-8 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expérience Premium</h3>
              <p className="text-gray-600">
                Interface moderne, fonctionnalités exclusives et support prioritaire pour les membres premium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section id="payment" className="py-20 bg-gradient-to-br from-pink-50 to-pink-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Modes de <span className="text-pink-600">Paiement</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez le mode de paiement qui vous convient le mieux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-white rounded text-pink-600 font-bold text-xs flex items-center justify-center">MM</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Paiements Mobiles</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0" />
                  Orange Money, MTN Mobile Money
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0" />
                  Paiement rapide et sécurisé
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0" />
                  Disponible 24/7
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-white rounded text-pink-600 font-bold text-xs flex items-center justify-center">FZ</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Flooz</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0" />
                  Service de paiement mobile Togo
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0" />
                  Transactions instantanées
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0" />
                  Sécurité garantie
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-white rounded text-pink-600 font-bold text-xs flex items-center justify-center">YT</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Yas Togo</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0" />
                  Solution de paiement digitale
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0" />
                  Paiement simple et rapide
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0" />
                  Support client disponible
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Nos Offres Premium</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-pink-50 rounded-xl hover:bg-pink-100 transition-all duration-300">
                  <div className="text-4xl font-bold text-pink-600 mb-2">5 000 FCFA</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">Offre de Base</div>
                  <div className="text-gray-600 mb-4">Accès à toutes les fonctionnalités standard</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Profil personnalisé</li>
                    <li>• Matching intelligent</li>
                    <li>• Messagerie basique</li>
                  </ul>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl hover:from-pink-200 hover:to-pink-300 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <div className="text-4xl font-bold text-pink-600 mb-2">10 000 FCFA</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">Premium Client</div>
                  <div className="text-gray-600 mb-4">Référencement des filles premium</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Accès prioritaire aux profils premium</li>
                    <li>• Référencement garanti</li>
                    <li>• Support client prioritaire</li>
                    <li>• Statistiques détaillées</li>
                  </ul>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-pink-200 to-pink-300 rounded-xl hover:from-pink-300 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <div className="text-4xl font-bold text-pink-600 mb-2">20 000 FCFA</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">Premium Prostituée</div>
                  <div className="text-gray-600 mb-4">Accès premium avec recommandation</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Profil en tête de liste</li>
                    <li>• Recommandation automatique</li>
                    <li>• Visibilité maximale</li>
                    <li>• Outils de gestion avancés</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 text-sm text-gray-500">
                Tous les prix sont indiqués par mois - Paiement mensuel requis
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section id="cta" className="py-20 bg-gradient-to-br from-pink-500 to-pink-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à trouver l&apos;amour ?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de célibataires qui ont trouvé leur &apos;âme sœur sur NovaMeet+
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
            >
              Créer mon profil gratuit
            </Link>
            <Link
              href="#features"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300 text-lg"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
