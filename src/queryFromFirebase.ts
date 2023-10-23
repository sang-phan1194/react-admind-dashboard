import { useQuery } from 'react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.ts'; // Import your Firebase config

export const useFirebaseQuery = (
  queryKey: string,
  firestoreCollection: string
) => {
  return useQuery(queryKey, async () => {
    const querySnapshot = await getDocs(collection(db, firestoreCollection));
    const data: any = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return data;
  });
};
