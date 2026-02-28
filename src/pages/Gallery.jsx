import React, { useState, useEffect } from 'react';
import MemeGallery from '../components/meme/MemeGallery';
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Gallery = () => {
  const [memes, setMemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load saved memes from localStorage
    const savedMemes = JSON.parse(localStorage.getItem('savedMemes') || '[]');
    setMemes(savedMemes);
  }, []);

  const handleDelete = (memeId) => {
    const updatedMemes = memes.filter(meme => meme.id !== memeId);
    setMemes(updatedMemes);
    localStorage.setItem('savedMemes', JSON.stringify(updatedMemes));
    toast.success('Meme deleted from gallery');
  };

  const handleDownload = (meme) => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.download = `meme-${Date.now()}.png`;
    link.href = meme.imageUrl;
    link.click();
    toast.success('Meme downloaded!');
  };

  const filteredMemes = memes.filter(meme => 
    meme.topText?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meme.bottomText?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          My Meme Gallery
        </h1>
        <p className="text-gray-600 mt-2">
          View and manage your created memes
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search memes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            >
              <option value="all">All Memes</option>
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Meme Gallery */}
      <MemeGallery 
        memes={filteredMemes} 
        onDelete={handleDelete}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default Gallery;