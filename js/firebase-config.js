// 1. Ve a console.firebase.google.com → tu proyecto → ícono de engranaje →
//    "Configuración del proyecto" → "Tus apps" → app web (</>) y copia estos valores ahí.
// 2. Reemplaza TODO lo de abajo por lo que te muestre Firebase.
// 3. Guarda este archivo y sube el proyecto a GitHub — no necesitas tocar nada más.

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
