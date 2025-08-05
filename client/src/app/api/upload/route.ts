// To fix the TypeScript error, run: npm install --save-dev @types/cloudinary
// Or alternatively: npm install cloudinary @types/cloudinary
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = "day5qkt75";
const CLOUDINARY_UPLOAD_PRESET = "ml_default"; // Using Cloudinary's default unsigned preset

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  try {
    console.log("Upload API called");
    
    // Parse form data from the incoming request
    const formData = await request.formData();
    const photo = formData.get("photo") as File;
    
    if (!photo) {
      console.log("No photo in request");
      return NextResponse.json(
        { status: "error", message: "No photo uploaded" },
        { status: 400 }
      );
    }

    // Log file info for debugging
    console.log("File received:", photo.name, photo.type, photo.size);

    // Verify the file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(photo.type)) {
      console.log("Invalid file type:", photo.type);
      return NextResponse.json(
        { status: "error", message: "Invalid file type. Only JPEG, PNG, and WebP images are allowed." },
        { status: 400 }
      );
    }

    // Convert file to base64
    const fileBuffer = await photo.arrayBuffer();
    const fileBase64 = Buffer.from(fileBuffer).toString('base64');
    const fileData = `data:${photo.type};base64,${fileBase64}`;
    
    // Generate a unique ID
    const uniqueId = uuidv4().substring(0, 8);
    const timestamp = new Date().getTime();
    
    console.log("Uploading to Cloudinary...");
    
    // Use signed upload with cloudinary SDK instead of unsigned upload with axios
    const uploadResult = await cloudinary.uploader.upload(fileData, {
      folder: "pickleball",
      public_id: `upload_${timestamp}_${uniqueId}`
    });
    
    console.log("Upload successful!");
    
    // Return success response
    return NextResponse.json({
      status: "success",
      data: {
        photo: {
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
          width: uploadResult.width,
          height: uploadResult.height,
          format: uploadResult.format,
          resourceType: uploadResult.resource_type,
          created_at: uploadResult.created_at
        }
      }
    });
    
  } catch (error: any) {
    console.error("Error in upload API:", error);
    
    // Detailed error logging
    if (error.response) {
      console.error("Response error status:", error.response.status);
      console.error("Response error data:", error.response.data);
    }
    
    return NextResponse.json(
      { 
        status: "error", 
        message: error.response?.data?.error?.message || 
                (error instanceof Error ? error.message : "Unknown upload error")
      },
      { status: 500 }
    );
  }
}

export async function uploadFile(request: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'pickleball';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64 for Cloudinary
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder,
      resource_type: 'auto',
    });

    return NextResponse.json({
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
