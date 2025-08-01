'use client';

export default function Home() {
  const handleShutdown = async () => {
    await fetch('/api/shutdown', {
      method: 'POST',
      body: JSON.stringify({ command: 'shutdown_all' }),
    });
  };
  return (
    <div>
      <button className="text-lg" onClick={handleShutdown}>
        꺼져
      </button>
    </div>
  );
}
