import firebase from 'firebase/compat/app';

export async function uploadImage(file: File) {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const imageRef = storageRef.child('images/image.jpg');

  try {
    const snapshot = await imageRef.put(file);
    const url = await imageRef.getDownloadURL();
    console.log(url);
    return url;
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
}
