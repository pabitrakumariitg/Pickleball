const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/**
 * Upload file to Cloudinary
 * @param {string} filePath - Path to file to upload
 * @param {string} folder - Folder in Cloudinary to upload to
 * @returns {Promise<Object>} - Cloudinary upload response
 */
exports.uploadToCloudinary = async (filePath, folder = 'pickleball/payments') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto'
    });
    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

/**
 * Upload base64 data to Cloudinary
 * @param {string} base64Data - Base64 encoded image data
 * @param {string} folder - Folder in Cloudinary to upload to
 * @returns {Promise<Object>} - Cloudinary upload response
 */
exports.uploadBase64ToCloudinary = async (base64Data, folder = 'pickleball/payments') => {
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder,
      resource_type: 'auto'
    });
    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

/**
 * Delete file from Cloudinary
 * @param {string} publicId - Public ID of file to delete
 * @returns {Promise<Object>} - Cloudinary delete response
 */
exports.deleteFromCloudinary = async (publicId) => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

module.exports = cloudinary;
