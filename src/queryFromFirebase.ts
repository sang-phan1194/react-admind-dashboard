import { useQuery } from 'react-query';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
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

export const useSingleQuery = (
  queryKey: string,
  firestoreCollection: string,
  id: string
) => {
  return useQuery(queryKey, async () => {
    const docRef = doc(db, firestoreCollection, id);
    const docSnap = await getDoc(docRef);
    let data: any = {};
    if (docSnap.exists()) {
      data = { ...docSnap.data() };
      console.log(data);
    } else {
      console.log('No such product!');
    }

    return data;
  });
};
