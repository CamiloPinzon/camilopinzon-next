'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'camilopinzon-cms' }, 
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          if (result) {
            resolve({ secure_url: result.secure_url });
          } else {
            reject(new Error('Unknown upload error'));
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    console.error('Error in uploadImageToCloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}
