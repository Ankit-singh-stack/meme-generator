import React, { useState, useRef, useEffect } from 'react';
import MemeCanvas from './MemeCanvas';
import MemeControls from './MemeControls';
import { Download, RefreshCw, Save } from 'lucide-react';

const MemeGenerator = () => {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [fontSize, setFontSize] = useState(40);
  const [fontColor, setFontColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('impact');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const canvasRef = useRef(null);

  const predefinedImages = [
    'https://api.memegen.link/images/doge.png',
    'https://api.memegen.link/images/fry.png',
    'https://api.memegen.link/images/one_does_not_simply.png',
    'https://api.memegen.link/images/y_u_no.png',
    'https://api.memegen.link/images/roll_safe.png',
    'https://api.memegen.link/images/woman_yelling.png',
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredefinedImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'my-meme.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleSave = () => {
    // In a real app, this would save to user's gallery
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Meme saved to gallery!');
    }, 1500);
  };

  const handleReset = () => {
    setTopText('');
    setBottomText('');
    setFontSize(40);
    setFontColor('#ffffff');
    setFontFamily('impact');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Canvas */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Meme Preview</h2>
            <MemeCanvas
              ref={canvasRef}
              image={selectedImage}
              topText={topText}
              bottomText={bottomText}
              fontSize={fontSize}
              fontColor={fontColor}
              fontFamily={fontFamily}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleDownload}
              disabled={!selectedImage}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={20} />
              <span>Download</span>
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedImage || isGenerating}
              className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              <span>Save to Gallery</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              <RefreshCw size={20} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right Column - Controls */}
        <div>
          <MemeControls
            topText={topText}
            setTopText={setTopText}
            bottomText={bottomText}
            setBottomText={setBottomText}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontColor={fontColor}
            setFontColor={setFontColor}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            onImageUpload={handleImageUpload}
            onPredefinedImage={handlePredefinedImage}
            predefinedImages={predefinedImages}
            selectedImage={selectedImage}
          />
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;