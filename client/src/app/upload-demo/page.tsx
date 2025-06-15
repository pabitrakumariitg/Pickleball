'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PhotoUpload from '@/components/ui/PhotoUpload';
import ProfilePictureUpload from '@/components/ui/ProfilePictureUpload';
import { CloudinaryPhoto } from '@/lib/cloudinary';
import { toast } from 'sonner';

export default function UploadDemoPage() {
  const [uploadedPhotos, setUploadedPhotos] = useState<CloudinaryPhoto[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<CloudinaryPhoto | null>(null);

  const handlePhotoUpload = (photo: CloudinaryPhoto) => {
    setUploadedPhotos(prev => [...prev, photo]);
    toast.success('Photo uploaded successfully!');
  };

  const handleProfileUpload = (photo: CloudinaryPhoto) => {
    setProfilePhoto(photo);
    toast.success('Profile picture updated!');
  };

  const handleError = (error: string) => {
    toast.error(error);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Cloudinary Photo Upload Demo</h1>
        
        <Tabs defaultValue="single" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="single">Single Upload</TabsTrigger>
            <TabsTrigger value="profile">Profile Picture</TabsTrigger>
            <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Single Photo Upload</CardTitle>
                <CardDescription>
                  Upload a single photo to Cloudinary with automatic optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PhotoUpload
                  onUpload={handlePhotoUpload}
                  onError={handleError}
                  folder="demo-photos"
                  description="Demo photo upload"
                  maxSize={10 * 1024 * 1024}
                  showPreview={true}
                  previewSize="lg"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture Upload</CardTitle>
                <CardDescription>
                  Upload a profile picture with automatic cropping and optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <ProfilePictureUpload
                    onUpload={handleProfileUpload}
                    onError={handleError}
                    currentImage={profilePhoto?.url}
                    size="lg"
                  />
                  {profilePhoto && (
                    <div className="text-sm text-gray-600">
                      <p>Public ID: {profilePhoto.public_id}</p>
                      <p>Size: {Math.round(profilePhoto.size / 1024)}KB</p>
                      <p>Dimensions: {profilePhoto.width} × {profilePhoto.height}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Photo Gallery</CardTitle>
                <CardDescription>
                  View all uploaded photos with their details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedPhotos.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No photos uploaded yet.</p>
                    <p className="text-sm">Upload a photo in the "Single Upload" tab to see it here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {uploadedPhotos.map((photo, index) => (
                      <div key={photo.public_id} className="border rounded-lg p-4 space-y-2">
                        <img
                          src={photo.url}
                          alt={`Uploaded photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <div className="text-xs text-gray-600 space-y-1">
                          <p><strong>Public ID:</strong> {photo.public_id}</p>
                          <p><strong>Size:</strong> {Math.round(photo.size / 1024)}KB</p>
                          <p><strong>Dimensions:</strong> {photo.width} × {photo.height}</p>
                          <p><strong>Format:</strong> {photo.format}</p>
                          <p><strong>Uploaded:</strong> {new Date(photo.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              What makes this Cloudinary integration powerful
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Automatic Optimization</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Automatic quality optimization</li>
                  <li>• Format conversion (WebP, AVIF)</li>
                  <li>• Responsive image generation</li>
                  <li>• Thumbnail creation</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Security & Validation</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• File type validation</li>
                  <li>• File size limits</li>
                  <li>• Secure upload URLs</li>
                  <li>• Authentication required</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">User Experience</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Drag & drop upload</li>
                  <li>• Real-time preview</li>
                  <li>• Progress indicators</li>
                  <li>• Error handling</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Management</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Organized folder structure</li>
                  <li>• Metadata tracking</li>
                  <li>• Easy deletion</li>
                  <li>• URL generation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 