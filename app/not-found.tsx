
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700 flex flex-col items-center justify-center text-center px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-white/80 mb-6">The page you're looking for doesn't exist.</p>
        <Link 
          href="/"
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-bold inline-block hover:from-red-600 hover:to-pink-700 transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
