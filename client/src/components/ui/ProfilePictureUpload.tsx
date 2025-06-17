'use client';

import React, { useState, useRef } from 'react';
import { Camera, X, Loader2, User } from 'lucide-react';
import { uploadProfilePicture, validateFile, createImagePreview, CloudinaryPhoto } from '@/lib/cloudinary';
import { toast } from 'sonner';

// Default profile image URL
const DEFAULT_PROFILE_IMAGE = '/profile.jpg';

interface ProfilePictureUploadProps {
  onUpload: (photo: CloudinaryPhoto) => void;
  onError?: (error: string) => void;
  currentImage?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function ProfilePictureUpload({
  onUpload,
  onError,
  currentImage,
  size = 'md',
  className = '',
  disabled = false
}: ProfilePictureUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<CloudinaryPhoto | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file (5MB max for profile pictures)
    const validationError = validateFile(file, 5 * 1024 * 1024);
    if (validationError) {
      toast.error(validationError);
      onError?.(validationError);
      return;
    }

    // Create preview
    try {
      const previewUrl = await createImagePreview(file);
      setPreview(previewUrl);
    } catch (error) {
      console.error('Error creating preview:', error);
    }

    // Upload file
    setIsUploading(true);
    try {
      const photo = await uploadProfilePicture(file);
      setUploadedPhoto(photo);
      onUpload(photo);
      toast.success('Profile picture updated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      toast.error(errorMessage);
      onError?.(errorMessage);
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const clearUpload = () => {
    setPreview(null);
    setUploadedPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-20 w-20';
      case 'lg':
        return 'h-40 w-40';
      default:
        return 'h-32 w-32';
    }
  };

  const getCameraSize = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-6 w-6';
      default:
        return 'h-4 w-4';
    }
  };

  const displayImage = preview || currentImage || DEFAULT_PROFILE_IMAGE;

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`relative ${getSizeClasses()}`}>
        <div className={`${getSizeClasses()} rounded-full bg-primary/10 flex items-center justify-center overflow-hidden`}>
          <img
            src={displayImage}
            alt="Profile"
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = DEFAULT_PROFILE_IMAGE;
            }}
          />
        </div>

        {!disabled && (
          <label
            htmlFor="profile-picture-upload"
            className={`absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-colors ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? (
              <Loader2 className={`${getCameraSize()} animate-spin`} />
            ) : (
              <Camera className={getCameraSize()} />
            )}
          </label>
        )}

        {preview && !disabled && (
          <button
            type="button"
            onClick={clearUpload}
            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}

        <input
          ref={fileInputRef}
          id="profile-picture-upload"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={disabled || isUploading}
          className="hidden"
        />
      </div>

      {uploadedPhoto && (
        <div className="mt-2 text-xs text-green-600 text-center">
          Profile picture updated!
        </div>
      )}
    </div>
  );
} 