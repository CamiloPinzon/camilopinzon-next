'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { cmsConfig } from '@/lib/cms/config';
import Link from 'next/link';

export default function CollectionList() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params.collectionId as string;
  
  const schema = cmsConfig.collections.find(c => c.id === collectionId);
  
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!schema) return;
    
    const fetchDocs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, schema.id));
        const docsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDocuments(docsData);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [schema]);

  if (!schema) return <div>Collection not found</div>;

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteDoc(doc(db, schema.id, id));
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  // Determine the primary field to display as the row title
  const primaryField = schema.fields[0];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#2b3674', margin: 0 }}>{schema.name}</h1>
          <p style={{ color: '#a3aed1', margin: '4px 0 0 0' }}>{schema.description}</p>
        </div>
        <Link 
          href={`/admin/collections/${schema.id}/new`}
          style={{
            backgroundColor: '#4318ff',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          + Create {schema.singularName}
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 24px rgba(112, 144, 176, 0.08)' }}>
        {loading ? (
          <p style={{ color: '#a3aed1' }}>Loading...</p>
        ) : documents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#a3aed1' }}>
            No {schema.name.toLowerCase()} found. Click the button above to create one.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e0e5f2' }}>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: '#a3aed1', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {primaryField.label}
                </th>
                <th style={{ textAlign: 'right', padding: '16px 8px', color: '#a3aed1', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => {
                // Handle localized primary field display
                const displayValue = primaryField.localized && doc.translations 
                  ? doc.translations[cmsConfig.defaultLanguage]?.[primaryField.name] 
                  : doc[primaryField.name];

                return (
                  <tr key={doc.id} style={{ borderBottom: '1px solid #f4f7fe' }}>
                    <td style={{ padding: '16px 8px', color: '#2b3674', fontWeight: 600 }}>
                      {displayValue || 'Untitled'}
                    </td>
                    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                      <Link 
                        href={`/admin/collections/${schema.id}/${doc.id}`}
                        style={{ color: '#4318ff', textDecoration: 'none', fontWeight: 600, marginRight: '16px', fontSize: '0.875rem' }}
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(doc.id)}
                        style={{ background: 'none', border: 'none', color: '#ff3b30', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
