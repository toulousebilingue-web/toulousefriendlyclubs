'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, DocumentData, Query, collectionGroup } from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useCollection(path: string | null) {
  const db = useFirestore();
  const [data, setData] = useState<DocumentData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db || !path) {
      setLoading(false);
      return;
    }

    const colRef = collection(db, path);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(items);
        setLoading(false);
      },
      async (error) => {
        const permissionError = new FirestorePermissionError({
          path: colRef.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, path]);

  return { data, loading };
}
