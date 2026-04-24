// Define the types for our schema
export type FieldType = 'string' | 'text' | 'richtext' | 'number' | 'boolean' | 'image' | 'date';

export interface FieldConfig {
  name: string; // The database key, e.g., 'title'
  label: string; // Human readable label, e.g., 'Post Title'
  type: FieldType;
  required?: boolean;
  localized?: boolean; // If true, this field will have different values per language
}

export interface CollectionConfig {
  id: string; // collection name in firestore
  name: string; // Human readable name
  singularName: string;
  description?: string;
  fields: FieldConfig[];
}

export interface CMSConfig {
  languages: { code: string; label: string }[];
  defaultLanguage: string;
  collections: CollectionConfig[];
}

// ==========================================
// THE ACTUAL CONFIGURATION FOR YOUR SITE
// ==========================================
export const cmsConfig: CMSConfig = {
  // Define supported languages
  languages: [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
  ],
  defaultLanguage: 'en',

  // Define collections (tables) in the CMS
  collections: [
    {
      id: 'posts',
      name: 'Blog Posts',
      singularName: 'Post',
      description: 'Manage your blog articles and publications.',
      fields: [
        { name: 'title', label: 'Title', type: 'string', required: true, localized: true },
        { name: 'slug', label: 'URL Slug', type: 'string', required: true }, // Not localized so URLs remain consistent if you want, or you can localize it.
        { name: 'coverImage', label: 'Cover Image', type: 'image' },
        { name: 'excerpt', label: 'Short Excerpt (TL;DR)', type: 'text', localized: true },
        { name: 'content', label: 'Content', type: 'richtext', localized: true },
        { name: 'publishedAt', label: 'Publish Date', type: 'date' },
        { name: 'isPublished', label: 'Published?', type: 'boolean' }
      ],
    },
    {
      id: 'projects',
      name: 'Portfolio Projects',
      singularName: 'Project',
      description: 'Manage your portfolio projects.',
      fields: [
        { name: 'title', label: 'Project Name', type: 'string', required: true, localized: true },
        { name: 'client', label: 'Client / Company', type: 'string' },
        { name: 'description', label: 'Description', type: 'text', localized: true },
        { name: 'techStack', label: 'Tech Stack (comma separated)', type: 'string' },
        { name: 'liveUrl', label: 'Live URL', type: 'string' },
        { name: 'githubUrl', label: 'GitHub Repository', type: 'string' },
        { name: 'coverImage', label: 'Cover Image', type: 'image' },
      ],
    },
    {
      id: 'services',
      name: 'Services',
      singularName: 'Service',
      description: 'Manage the services you offer clients.',
      fields: [
        { name: 'name', label: 'Service Name', type: 'string', required: true, localized: true },
        { name: 'description', label: 'Description', type: 'text', localized: true },
        { name: 'basePrice', label: 'Base Price', type: 'number' },
      ],
    }
  ],
};
