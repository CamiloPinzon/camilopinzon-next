'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { cmsConfig } from '@/lib/cms/config';
import Link from 'next/link';
import { uploadImageToCloudinary } from '@/lib/actions/uploadImage';
import Image from 'next/image';

// --- Cloudinary Uploader Component ---
function CloudinaryUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const data = await uploadImageToCloudinary(formData) as { secure_url: string };
      if (data && data.secure_url) {
        onChange(data.secure_url);
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {value ? (
        <div style={{ position: 'relative', width: '200px', height: '120px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e0e5f2' }}>
          <img src={value} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button
            onClick={() => onChange('')}
            style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,59,48,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
          >
            ×
          </button>
        </div>
      ) : (
        <div style={{ width: '100%', padding: '24px', border: '2px dashed #e0e5f2', borderRadius: '12px', textAlign: 'center', backgroundColor: '#f4f7fe', position: 'relative' }}>
          <p style={{ margin: 0, color: '#a3aed1', fontWeight: 500 }}>
            {uploading ? 'Uploading...' : 'Click to select or drag an image here'}
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: uploading ? 'not-allowed' : 'pointer' }}
          />
        </div>
      )}
      <input
        type="text"
        placeholder="Or paste an image URL directly"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e0e5f2', outline: 'none', boxSizing: 'border-box' }}
      />
    </div>
  );
}

export default function DocumentEditor() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params.collectionId as string;
  const docId = params.docId as string;
  const isNew = docId === 'new';
  
  const schema = cmsConfig.collections.find(c => c.id === collectionId);
  const [activeLang, setActiveLang] = useState(cmsConfig.defaultLanguage);
  const [formData, setFormData] = useState<Record<string, any>>({ translations: {} });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew || !schema) return;
    
    const fetchDoc = async () => {
      try {
        const docSnap = await getDoc(doc(db, schema.id, docId));
        if (docSnap.exists()) {
          const data = docSnap.data() as Record<string, any>;
          if (!data.translations) data.translations = {};
          setFormData(data);
        } else {
          alert('Document not found');
          router.push(`/admin/collections/${schema.id}`);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [schema, docId, isNew, router]);

  if (!schema) return <div>Collection not found</div>;

  const handleFieldChange = (name: string, value: unknown, localized: boolean) => {
    setFormData((prev: Record<string, any>) => {
      const newData = { ...prev };
      if (localized) {
        if (!newData.translations) newData.translations = {};
        if (!newData.translations[activeLang]) newData.translations[activeLang] = {};
        newData.translations[activeLang][name] = value;
      } else {
        newData[name] = value;
      }
      return newData;
    });
  };

  const getFieldValue = (name: string, localized: boolean) => {
    if (localized) {
      return (formData.translations as Record<string, any>)?.[activeLang]?.[name] || '';
    }
    return formData[name] || '';
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isNew) {
        await addDoc(collection(db, schema.id), formData);
      } else {
        await setDoc(doc(db, schema.id, docId), formData, { merge: true });
      }
      router.push(`/admin/collections/${schema.id}`);
    } catch (error) {
      console.error("Error saving document:", error);
      alert('Failed to save document');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Link href={`/admin/collections/${schema.id}`} style={{ color: '#a3aed1', textDecoration: 'none', fontSize: '0.875rem' }}>
            ← Back to {schema.name}
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#2b3674', margin: '8px 0 0 0' }}>
            {isNew ? `Create New ${schema.singularName}` : `Edit ${schema.singularName}`}
          </h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{
            backgroundColor: '#4318ff',
            color: 'white',
            border: 'none',
            padding: '12px 32px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Language Switcher for Localized Fields */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {cmsConfig.languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => setActiveLang(lang.code)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: activeLang === lang.code ? '2px solid #4318ff' : '1px solid #e0e5f2',
              backgroundColor: activeLang === lang.code ? '#eef2ff' : 'white',
              color: activeLang === lang.code ? '#4318ff' : '#a3aed1',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(112, 144, 176, 0.08)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {schema.fields.map((field) => {
            const val = getFieldValue(field.name, !!field.localized);
            
            return (
              <div key={field.name}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#2b3674', marginBottom: '8px' }}>
                  {field.label} {field.required && <span style={{ color: '#ff3b30' }}>*</span>}
                  {field.localized && <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#a3aed1', fontWeight: 400 }}>[{activeLang.toUpperCase()}]</span>}
                </label>
                
                {field.type === 'image' ? (
                  <CloudinaryUploader 
                    value={val as string} 
                    onChange={(newUrl) => handleFieldChange(field.name, newUrl, !!field.localized)} 
                  />
                ) : field.type === 'text' || field.type === 'richtext' ? (
                  <textarea
                    value={val as string}
                    onChange={(e) => handleFieldChange(field.name, e.target.value, !!field.localized)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #e0e5f2',
                      outline: 'none',
                      boxSizing: 'border-box',
                      minHeight: '150px',
                      fontFamily: 'inherit'
                    }}
                  />
                ) : field.type === 'boolean' ? (
                  <input
                    type="checkbox"
                    checked={!!val}
                    onChange={(e) => handleFieldChange(field.name, e.target.checked, !!field.localized)}
                    style={{ width: '20px', height: '20px' }}
                  />
                ) : (
                  <input
                    type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                    value={val as string}
                    onChange={(e) => handleFieldChange(field.name, e.target.value, !!field.localized)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #e0e5f2',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
