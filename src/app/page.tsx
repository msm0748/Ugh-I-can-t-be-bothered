'use client';

export default function Home() {
  const handleShutdown = async () => {
    await fetch('/api/shutdown', {
      method: 'POST',
      body: JSON.stringify({ command: 'shutdown_all' }),
    });
  };

  const handleSound = async (action: 'up' | 'down') => {
    try {
      const response = await fetch('/api/sound', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();
      console.log('현재 볼륨:', data.currentVolume);
    } catch (error) {
      console.error('볼륨 조절 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="flex gap-4">
        <button
          className="
            px-6 py-3
            rounded-full
            bg-gradient-to-r from-blue-500 to-cyan-500
            text-white text-xl font-bold shadow-lg
            hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-cyan-600
            transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-blue-300
            border-none
            cursor-pointer
          "
          onClick={() => handleSound('up')}
        >
          🔊 볼륨 올리기
        </button>
        <button
          className="
            px-6 py-3
            rounded-full
            bg-gradient-to-r from-purple-500 to-indigo-500
            text-white text-xl font-bold shadow-lg
            hover:scale-105 hover:shadow-2xl hover:from-purple-600 hover:to-indigo-600
            transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-purple-300
            border-none
            cursor-pointer
          "
          onClick={() => handleSound('down')}
        >
          🔉 볼륨 내리기
        </button>
      </div>

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
