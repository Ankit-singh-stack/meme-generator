import React from 'react';
import { Heart, Download, Trash2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const MemeGallery = ({ memes, onDelete, onDownload }) => {
  if (!memes || memes.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-4"
      >
        <div className="max-w-md mx-auto">
          <img 
            src="https://illustrations.popsy.co/white/creativity.svg" 
            alt="No memes found"
            className="w-48 h-48 mx-auto mb-6 opacity-50"
          />
          <p className="text-gray-500 text-lg mb-4">No memes saved yet.</p>
          <p className="text-gray-400">Create your first meme and it will appear here!</p>
        </div>
      </motion.div>
    );
  }

  const handleDeleteClick = (memeId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this meme?')) {
      onDelete(memeId);
    }
  };

  const handleDownloadClick = (meme, e) => {
    e.stopPropagation();
    onDownload(meme);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {memes.map((meme, index) => (
        <motion.div
          key={meme.id || index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="relative">
            {/* Meme Image */}
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={meme.imageUrl}
                alt={meme.topText || 'Meme'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-3">
                <button
                  onClick={(e) => handleDownloadClick(meme, e)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition transform hover:scale-110 shadow-lg"
                  title="Download meme"
                >
                  <Download size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={(e) => handleDeleteClick(meme.id, e)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition transform hover:scale-110 shadow-lg"
                  title="Delete meme"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>

            {/* Like button on top right */}
            <button 
              className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg hover:scale-110 transform"
              onClick={(e) => e.stopPropagation()}
              title="Like meme"
            >
              <Heart size={16} className="text-gray-400 hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* Meme details */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 truncate" title={meme.topText}>
                  {meme.topText || 'Untitled Meme'}
                </h3>
                {meme.bottomText && (
                  <p className="text-sm text-gray-500 truncate" title={meme.bottomText}>
                    {meme.bottomText}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>
                  {meme.createdAt ? new Date(meme.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : 'Recent'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart size={12} />
                <span>{meme.likes || 0}</span>
              </div>
            </div>

            {/* Tags */}
            {meme.tags && meme.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {meme.tags.slice(0, 2).map((tag, i) => (
                  <span 
                    key={i}
                    className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {meme.tags.length > 2 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{meme.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MemeGallery;