// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { APPI_KEY } from './../constants/index';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: APPI_KEY,
  authDomain: "life-unity-efed0.firebaseapp.com",
  projectId: "life-unity-efed0",
  storageBucket: "life-unity-efed0.appspot.com",
  messagingSenderId: "470492708753",
  appId: "1:470492708753:web:83d6159ed80ae8b3d5e430",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage(app);

//function to upload a file
export async function uploadFile(file) {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;

  } catch (error) {
    return null;
  }
}
