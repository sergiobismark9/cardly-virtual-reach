
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (url: string) => void;
  folder?: string;
  className?: string;
  aspectRatio?: 'square' | 'wide';
}

const ImageUpload = ({ 
  currentImage, 
  onImageChange, 
  folder,
  className = '',
  aspectRatio = 'square'
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, uploading } = useImageUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImage(file, 'images', folder);
      onImageChange(url);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const removeImage = () => {
    onImageChange('');
  };

  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 'aspect-video';

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {currentImage ? (
        <div className={`relative ${aspectClass} rounded-lg overflow-hidden border-2 border-dashed border-gray-300`}>
          <img 
            src={currentImage} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`w-full ${aspectClass} border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-gray-700`}
        >
          <Upload className="h-8 w-8 mb-2" />
          <span className="text-sm">
            {uploading ? 'Enviando...' : 'Clique para enviar imagem'}
          </span>
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
