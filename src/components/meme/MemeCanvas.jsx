import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const MemeCanvas = forwardRef(({
  image,
  topText = '',
  bottomText = '',
  fontSize = 40,
  fontColor = '#ffffff',
  fontFamily = 'impact'
}, ref) => {
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    toDataURL: () => canvasRef.current.toDataURL('image/png')
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 500;
    canvas.height = 500;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = image;
      
      img.onload = () => {
        // Calculate dimensions to fit image while maintaining aspect ratio
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        // Add text
        drawText(ctx, topText, canvas.width / 2, 60);
        drawText(ctx, bottomText, canvas.width / 2, canvas.height - 30);
      };
    } else {
      // Draw placeholder
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#9ca3af';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Select an image to start', canvas.width / 2, canvas.height / 2);
    }
  }, [image, topText, bottomText, fontSize, fontColor, fontFamily]);

  const drawText = (ctx, text, x, y) => {
    if (!text) return;

    ctx.font = `${fontSize}px ${fontFamily}, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Text shadow for better readability
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    ctx.fillStyle = fontColor;
    ctx.fillText(text.toUpperCase(), x, y);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  };

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="rounded-lg shadow-md max-w-full h-auto border border-gray-200"
        style={{ maxHeight: '500px' }}
      />
    </div>
  );
});

MemeCanvas.displayName = 'MemeCanvas';

export default MemeCanvas;