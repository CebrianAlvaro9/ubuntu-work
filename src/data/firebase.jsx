  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore/lite';

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBATPRfMYyiv1AOfxkvhm1zRvCVY0Tb4Kg",
    authDomain: "cameras-4070f.firebaseapp.com",
    projectId: "cameras-4070f",
    storageBucket: "cameras-4070f.appspot.com",
    messagingSenderId: "633689129426",
    appId: "1:633689129426:web:da73ed1b645044ec0fc80b",
    measurementId: "G-VHG1B9JZ2C"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  export const db = getFirestore(app);
 

  //function that parse the info from the database into an array

  export async function getCameras(db) {
    const camerasCol = collection(db, 'cameras');
    const camerasSnapshot = await getDocs(camerasCol);
    const camerasList = camerasSnapshot.docs.map(doc => {

      //adding the id in order to can update 
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    return camerasList;
  }


  //function to update de cameras from the data base
  
  export async function updateCamera(db, cameraId, newData) {
    const cameraRef = doc(db, 'cameras', cameraId);
    await updateDoc(cameraRef, newData);
  }

 
