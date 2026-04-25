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
        { name: 'coverImageAlt', label: 'Cover Image Alt Text (Accessibility)', type: 'string', localized: true },
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
        { name: 'coverImageAlt', label: 'Cover Image Alt Text (Accessibility)', type: 'string', localized: true },
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
    },
    {
      id: 'experience',
      name: 'Work Experience',
      singularName: 'Experience',
      description: 'Manage your professional work history and roles.',
      fields: [
        { name: 'company', label: 'Company Name', type: 'string', required: true },
        { name: 'jobTitle', label: 'Job Title', type: 'string', required: true, localized: true },
        { name: 'startDate', label: 'Start Year/Month', type: 'string', required: true },
        { name: 'endDate', label: 'End Year/Month (or Present)', type: 'string', required: true },
        { name: 'description', label: 'Detailed Description', type: 'text', localized: true },
        { name: 'tags', label: 'Tech Stack / Tags (comma separated)', type: 'string' },
        { name: 'website', label: 'Company Website URL', type: 'string' },
        { name: 'order', label: 'Display Order (higher = first)', type: 'number' },
      ],
    },
    {
      id: 'site_settings',
      name: 'Site Settings',
      singularName: 'Setting',
      description: 'Manage global UI text, hero content, and translations.',
      fields: [
        { name: 'settingId', label: 'Setting ID (e.g. "global")', type: 'string', required: true },
        { name: 'heroTitle', label: 'Hero Title', type: 'string', localized: true },
        { name: 'heroSubtitle', label: 'Hero Subtitle', type: 'text', localized: true },
        { name: 'heroButtonText', label: 'Hero Button Text', type: 'string', localized: true },
        { name: 'footerCopyright', label: 'Footer Copyright Text', type: 'string', localized: true },
        { name: 'newsletterTitle', label: 'Newsletter Title', type: 'string', localized: true },
        { name: 'newsletterSubtitle', label: 'Newsletter Subtitle', type: 'string', localized: true },
      ],
    },
    {
      id: 'subscribers',
      name: 'Newsletter Subscribers',
      singularName: 'Subscriber',
      description: 'View users who have subscribed to your newsletter. (Read-only for Admin)',
      fields: [
        { name: 'email', label: 'Email Address', type: 'string', required: true },
        { name: 'languagePref', label: 'Language Preference', type: 'string' },
        { name: 'subscribedAt', label: 'Date Subscribed', type: 'date' },
      ],
    }
  ],
};
