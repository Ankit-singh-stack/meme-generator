import React from 'react';
import { Upload, Type, Palette, Image as ImageIcon } from 'lucide-react';

const MemeControls = ({
  topText,
  setTopText,
  bottomText,
  setBottomText,
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
  fontFamily,
  setFontFamily,
  onImageUpload,
  onPredefinedImage,
  predefinedImages,
  selectedImage
}) => {
  const fontFamilies = [
    { value: 'impact', label: 'Impact' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Comic Sans MS', label: 'Comic Sans' },
    { value: 'Times New Roman', label: 'Times New Roman' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Customize Your Meme</h2>
      
      {/* Image Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700">
          <ImageIcon size={20} />
          <h3 className="font-medium">Choose Image</h3>
        </div>
        
        {/* Upload Button */}
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center space-x-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-purple-500 transition-colors"
          >
            <Upload size={20} />
            <span>Upload your image</span>
          </label>
        </div>

        {/* Predefined Images */}
        <div>
          <p className="text-sm text-gray-600 mb-3">Or choose from templates:</p>
          <div className="grid grid-cols-3 gap-2">
            {predefinedImages.map((img, index) => (
              <button
                key={index}
                onClick={() => onPredefinedImage(img)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === img ? 'border-purple-600 scale-105' : 'border-transparent hover:border-purple-400'
                }`}
              >
                <img
                  src={img}
                  alt={`Template ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Text Controls */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700">
          <Type size={20} />
          <h3 className="font-medium">Add Text</h3>
        </div>

        {/* Top Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Top Text
          </label>
          <input
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            placeholder="Enter top text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Bottom Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bottom Text
          </label>
          <input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder="Enter bottom text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Styling Controls */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700">
          <Palette size={20} />
          <h3 className="font-medium">Styling</h3>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size: {fontSize}px
          </label>
          <input
            type="range"
            min="20"
            max="80"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Font Family */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          >
            {fontFamilies.map(font => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Color
          </label>
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MemeControls;