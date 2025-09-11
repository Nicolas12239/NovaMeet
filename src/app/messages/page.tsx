export default function Messages() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Messages</h1>
        <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          Your conversations will appear here. Start chatting with your matches!
        </p>
        <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
          <p className="text-gray-600 text-center">No messages yet.</p>
        </div>
      </div>
    </div>
  )
}
