'use client';

import { useState } from 'react';
import Modal from './components/modal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* 메인 컨테이너 */}
      <div className="bg-white p-8 rounded-2xl shadow-xl space-y-8">
        {/* 볼륨 컨트롤 섹션 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            🎵 시스템 볼륨 제어
          </h2>
          <div className="flex gap-4">
            <button
              className="
                flex-1 px-6 py-4
                rounded-xl
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
                flex-1 px-6 py-4
                rounded-xl
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
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* 시스템 종료 섹션 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            💻 시스템 제어
          </h2>
          <button
            className="
              w-full px-8 py-4
              rounded-xl
              bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
              text-white text-2xl font-bold shadow-lg
              hover:scale-105 hover:shadow-2xl hover:from-pink-600 hover:to-yellow-400
              transition-all duration-200
              focus:outline-none focus:ring-4 focus:ring-pink-300
              border-none
              cursor-pointer
            "
            onClick={() => setIsModalOpen(true)}
          >
            🛑 컴퓨터 끄기
          </button>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleShutdown}
          closeButtonText="취소"
          confirmButtonText="종료하기"
          title="⚠️ 시스템 종료 확인"
          message="정말로 컴퓨터를 종료하시겠습니까?"
        />
      )}
    </div>
  );
}
