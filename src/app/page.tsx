'use client';

export default function Home() {
  const handleShutdown = async () => {
    await fetch('/api/shutdown', {
      method: 'POST',
      body: JSON.stringify({ command: 'shutdown_all' }),
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        className="
          px-8 py-4
          rounded-full
          bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
          text-white text-2xl font-bold shadow-lg
          hover:scale-105 hover:shadow-2xl hover:from-pink-600 hover:to-yellow-400
          transition-all duration-200
          focus:outline-none focus:ring-4 focus:ring-pink-300
          border-none
          cursor-pointer
        "
        onClick={handleShutdown}
      >
        🛑 컴퓨터 꺼죠!
      </button>
    </div>
  );
}
