import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCwfxoTw9_NY4NayFicnI9nZHQkWbSCk3A',
  authDomain: 'ukol-tf.firebaseapp.com',
  projectId: 'ukol-tf',
  storageBucket: 'ukol-tf.appspot.com',
  messagingSenderId: '615268158226',
  appId: '1:615268158226:web:305697c6c8f1aee48241cb',
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
