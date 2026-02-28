import React from 'react';
import MemeGenerator from '../components/meme/MemeGenerator';

const CreateMeme = () => {
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create Your Meme
        </h1>
        <p className="text-gray-600 mt-2">
          Upload an image or choose a template to get started
        </p>
      </div>
      <MemeGenerator />
    </div>
  );
};

export default CreateMeme;