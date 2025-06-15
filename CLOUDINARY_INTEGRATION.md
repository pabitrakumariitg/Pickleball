# Cloudinary Photo Upload Integration

This document describes the Cloudinary integration for photo upload and retrieval in the Pickleball application.

## Overview

The application now uses Cloudinary for all photo uploads, providing:
- Automatic image optimization
- Secure file storage
- Responsive image generation
- Easy photo management

## Setup

### Environment Variables

Add the following environment variables to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Dependencies

The following dependencies are already installed:
- `cloudinary` (server-side)
- All client-side dependencies are included in the existing setup

## Server-Side Implementation

### Cloudinary Utility (`server/utils/cloudinary.js`)

Enhanced utility functions for Cloudinary operations:

```javascript
const { 
  uploadPhoto, 
  uploadMultiplePhotos, 
  deletePhoto, 
  getPhotoInfo, 
  getOptimizedUrl, 
  getThumbnailUrl, 
  getResponsiveUrls 
} = require('../utils/cloudinary');
```

#### Functions Available:

- **`uploadPhoto(file, folder, options)`**: Upload a single photo
- **`uploadMultiplePhotos(files, folder, options)`**: Upload multiple photos
- **`deletePhoto(publicId)`**: Delete a photo from Cloudinary
- **`getPhotoInfo(publicId)`**: Get photo metadata
- **`getOptimizedUrl(publicId, options)`**: Generate optimized URL
- **`getThumbnailUrl(publicId, width, height)`**: Generate thumbnail URL
- **`getResponsiveUrls(publicId)`**: Generate responsive image URLs

### Upload Controller (`server/controllers/upload.controller.js`)

Handles all photo upload operations:

- `uploadPhoto`: Single photo upload
- `uploadMultiplePhotos`: Multiple photos upload
- `uploadProfilePicture`: Profile picture upload with cropping
- `uploadCourtImages`: Court-specific image upload
- `deletePhoto`: Photo deletion
- `getPhotoInfo`: Get photo information
- `getResponsiveUrls`: Get responsive URLs

### Routes (`server/routes/upload.routes.js`)

API endpoints for photo operations:

```
POST   /api/v1/upload/photo              - Upload single photo
POST   /api/v1/upload/photos             - Upload multiple photos
POST   /api/v1/upload/profile-picture    - Upload profile picture
POST   /api/v1/upload/court-images       - Upload court images
GET    /api/v1/upload/photo/:publicId    - Get photo info
GET    /api/v1/upload/photo/:publicId/urls - Get responsive URLs
DELETE /api/v1/upload/photo/:publicId    - Delete photo
```

## Client-Side Implementation

### Cloudinary Utility (`client/src/lib/cloudinary.ts`)

TypeScript utilities for client-side operations:

```typescript
import { 
  uploadPhoto, 
  uploadProfilePicture, 
  uploadCourtImages, 
  validateFile, 
  createImagePreview 
} from '@/lib/cloudinary';
```

#### Functions Available:

- **`uploadPhoto(file, folder, description)`**: Upload single photo
- **`uploadMultiplePhotos(files, folder, description)`**: Upload multiple photos
- **`uploadProfilePicture(file)`**: Upload profile picture
- **`uploadCourtImages(files, courtId)`**: Upload court images
- **`deletePhoto(publicId)`**: Delete photo
- **`getPhotoInfo(publicId)`**: Get photo info
- **`getResponsiveUrls(publicId)`**: Get responsive URLs
- **`validateFile(file, maxSize)`**: Validate file before upload
- **`createImagePreview(file)`**: Create preview URL

### Components

#### PhotoUpload Component (`client/src/components/ui/PhotoUpload.tsx`)

Reusable component for general photo uploads:

```tsx
<PhotoUpload
  onUpload={handleUpload}
  onError={handleError}
  folder="pickleball"
  description="Photo description"
  maxSize={10 * 1024 * 1024}
  showPreview={true}
  previewSize="md"
/>
```

#### ProfilePictureUpload Component (`client/src/components/ui/ProfilePictureUpload.tsx`)

Specialized component for profile pictures:

```tsx
<ProfilePictureUpload
  onUpload={handleProfileUpload}
  onError={handleError}
  currentImage={user.profilePicture}
  size="lg"
/>
```

## Usage Examples

### Profile Picture Upload

```tsx
import ProfilePictureUpload from '@/components/ui/ProfilePictureUpload';
import { CloudinaryPhoto } from '@/lib/cloudinary';

const handleProfileUpload = async (photo: CloudinaryPhoto) => {
  // Update user profile with new image URL
  await updateProfile({ profilePicture: photo.url });
};

<ProfilePictureUpload
  onUpload={handleProfileUpload}
  onError={(error) => toast.error(error)}
  currentImage={user.profilePicture}
/>
```

### Court Image Upload

```tsx
import PhotoUpload from '@/components/ui/PhotoUpload';

const handleCourtImageUpload = (photo: CloudinaryPhoto) => {
  setFormData(prev => ({ ...prev, imageUrl: photo.url }));
};

<PhotoUpload
  onUpload={handleCourtImageUpload}
  onError={handleError}
  folder="court-images"
  description="Court image"
  maxSize={10 * 1024 * 1024}
/>
```

### Multiple Photos Upload

```tsx
import { uploadMultiplePhotos } from '@/lib/cloudinary';

const handleMultipleUpload = async (files: File[]) => {
  try {
    const photos = await uploadMultiplePhotos(files, 'event-photos', 'Event photos');
    setPhotos(photos);
  } catch (error) {
    toast.error('Upload failed');
  }
};
```

## Features

### Automatic Optimization

- **Quality Optimization**: Automatic quality adjustment for optimal file size
- **Format Conversion**: Automatic conversion to WebP/AVIF for better compression
- **Responsive Images**: Multiple sizes generated automatically
- **Thumbnail Generation**: Automatic thumbnail creation

### Security

- **File Type Validation**: Only image files allowed
- **File Size Limits**: Configurable size limits (5MB for profile, 10MB for others)
- **Authentication Required**: All uploads require valid JWT token
- **Secure URLs**: HTTPS URLs for all images

### User Experience

- **Drag & Drop**: Intuitive drag and drop interface
- **Real-time Preview**: Immediate preview of uploaded images
- **Progress Indicators**: Visual feedback during upload
- **Error Handling**: Comprehensive error messages
- **Responsive Design**: Works on all device sizes

### Organization

- **Folder Structure**: Organized by type (profile-pictures, court-images, etc.)
- **Metadata Tracking**: File size, dimensions, format, upload date
- **Easy Management**: Simple deletion and retrieval operations
- **URL Generation**: Automatic URL generation for different use cases

## File Structure

```
server/
├── utils/
│   └── cloudinary.js          # Cloudinary utility functions
├── controllers/
│   └── upload.controller.js   # Upload controller
└── routes/
    └── upload.routes.js       # Upload routes

client/src/
├── lib/
│   └── cloudinary.ts          # Client-side utilities
└── components/ui/
    ├── PhotoUpload.tsx        # General photo upload component
    └── ProfilePictureUpload.tsx # Profile picture upload component
```

## Demo Page

Visit `/upload-demo` to see the Cloudinary integration in action. The demo page includes:

- Single photo upload
- Profile picture upload
- Photo gallery with metadata
- Feature showcase

## Best Practices

1. **Always validate files** before upload using `validateFile()`
2. **Use appropriate folders** for different types of images
3. **Handle errors gracefully** with user-friendly messages
4. **Show loading states** during upload operations
5. **Clean up old images** when replacing profile pictures or court images
6. **Use responsive URLs** for optimal performance
7. **Store public IDs** for future reference and deletion

## Troubleshooting

### Common Issues

1. **Upload fails**: Check Cloudinary credentials and file size limits
2. **Images not displaying**: Verify CORS settings and URL generation
3. **Authentication errors**: Ensure JWT token is valid and included
4. **File type errors**: Check allowed file types in validation

### Debug Tips

- Check browser console for client-side errors
- Check server logs for upload errors
- Verify Cloudinary dashboard for successful uploads
- Test with smaller files first

## API Reference

### Upload Endpoints

All endpoints require authentication via JWT token in Authorization header.

#### POST /api/v1/upload/photo
Upload a single photo.

**Body:**
- `photo` (file): Image file
- `folder` (string, optional): Cloudinary folder
- `description` (string, optional): Photo description

**Response:**
```json
{
  "status": "success",
  "data": {
    "photo": {
      "public_id": "folder/image_id",
      "url": "https://res.cloudinary.com/...",
      "width": 1920,
      "height": 1080,
      "format": "jpg",
      "size": 1024000,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### POST /api/v1/upload/profile-picture
Upload a profile picture with automatic cropping.

**Body:**
- `photo` (file): Image file

**Response:** Same as single photo upload

#### DELETE /api/v1/upload/photo/:publicId
Delete a photo from Cloudinary.

**Response:**
```json
{
  "status": "success",
  "data": {
    "message": "Photo deleted successfully",
    "result": { ... }
  }
}
```

## Security Considerations

1. **File Validation**: All files are validated for type and size
2. **Authentication**: All upload endpoints require authentication
3. **Rate Limiting**: Implemented at the server level
4. **Secure URLs**: All Cloudinary URLs use HTTPS
5. **Access Control**: Users can only delete their own uploads

## Performance Optimization

1. **Automatic Compression**: Cloudinary automatically optimizes images
2. **CDN Delivery**: Images are served from Cloudinary's global CDN
3. **Responsive Images**: Multiple sizes generated for different devices
4. **Lazy Loading**: Implement lazy loading for image galleries
5. **Caching**: Leverage browser and CDN caching

This integration provides a robust, secure, and user-friendly solution for photo uploads in the Pickleball application. 