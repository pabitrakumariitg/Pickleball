'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadPhoto, validateFile, createImagePreview, CloudinaryPhoto } from '@/lib/cloudinary';
import { toast } from 'sonner';

interface PhotoUploadProps {
  onUpload: (photo: CloudinaryPhoto) => void;
  onError?: (error: string) => void;
  folder?: string;
  description?: string;
  maxSize?: number;
  className?: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  showPreview?: boolean;
  previewSize?: 'sm' | 'md' | 'lg';
}

export default function PhotoUpload({
  onUpload,
  onError,
  folder = 'pickleball',
  description,
  maxSize = 10 * 1024 * 1024, // 10MB
  className = '',
  disabled = false,
  multiple = false,
  accept = 'image/*',
  showPreview = true,
  previewSize = 'md'
}: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<CloudinaryPhoto | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file
    const validationError = validateFile(file, maxSize);
    if (validationError) {
      toast.error(validationError);
      onError?.(validationError);
      return;
    }

    // Create preview
    if (showPreview) {
      try {
        const previewUrl = await createImagePreview(file);
        setPreview(previewUrl);
      } catch (error) {
        console.error('Error creating preview:', error);
      }
    }

    // Upload file
    setIsUploading(true);
    try {
      const photo = await uploadPhoto(file, folder, description);
      setUploadedPhoto(photo);
      onUpload(photo);
      toast.success('Photo uploaded successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      toast.error(errorMessage);
      onError?.(errorMessage);
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled || isUploading) return;

    const files = event.dataTransfer.files;
    if (files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Simulate file input change
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      await handleFileSelect({ target: { files: dataTransfer.files } } as any);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const clearUpload = () => {
    setPreview(null);
    setUploadedPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getPreviewSizeClasses = () => {
    switch (previewSize) {
      case 'sm':
        return 'h-20 w-20';
      case 'lg':
        return 'h-40 w-40';
      default:
        return 'h-32 w-32';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          disabled || isUploading
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-primary cursor-pointer'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled || isUploading}
          className="hidden"
        />

        <div className="text-center">
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : preview ? (
            <div className="flex flex-col items-center space-y-2">
              <div className={`relative ${getPreviewSizeClasses()}`}>
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-md"
                />
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearUpload();
                    }}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              {uploadedPhoto && (
                <p className="text-xs text-green-600">Uploaded successfully!</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <ImageIcon className="h-12 w-12 text-gray-400" />
              <div className="text-sm text-gray-600">
                <p className="font-medium">Click to upload or drag and drop</p>
                <p className="text-xs">
                  PNG, JPG, GIF, WebP up to {Math.round(maxSize / 1024 / 1024)}MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {uploadedPhoto && (
        <div className="text-xs text-gray-500">
          <p>Public ID: {uploadedPhoto.public_id}</p>
          <p>Size: {Math.round(uploadedPhoto.size / 1024)}KB</p>
          <p>Dimensions: {uploadedPhoto.width} × {uploadedPhoto.height}</p>
        </div>
      )}
    </div>
  );
} 