// 1. Ve a console.firebase.google.com → tu proyecto → ícono de engranaje →
//    "Configuración del proyecto" → "Tus apps" → app web (</>) y copia estos valores ahí.
// 2. Reemplaza TODO lo de abajo por lo que te muestre Firebase.
// 3. Guarda este archivo y sube el proyecto a GitHub — no necesitas tocar nada más.

const firebaseConfig = {
  apiKey: "AIzaSyCRD15-HzvmCvt5dOnEgsGSTkE5AN-16DM",
  authDomain: "aulaactiva.lat",
  projectId: "aulaactiva-ca551",
  storageBucket: "aulaactiva-ca551.firebasestorage.app",
  messagingSenderId: "797030185664",
  appId: "1:797030185664:web:10f7634bf3feb7f1248b25",
  measurementId: "G-59W4K0K24C"
};

firebase.initializeApp(firebaseConfig);
