import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (city.trim()) {
      router.push(`/city/${encodeURIComponent(city.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">MagicBricks Project Finder</h1>
        <input
          type="text"
          placeholder="Enter City (e.g. Indore)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 px-4 py-2 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search Projects
        </button>
      </div>
    </div>
  );
}
