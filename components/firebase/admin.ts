// import { cert, getApps, initializeApp } from "firebase-admin/app"
// import {  getAuth } from "firebase-admin/auth";
// import { getFirestore } from "firebase-admin/firestore";
// console.log({
//   FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
//   FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
//   FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? "EXISTS" : "MISSING"
// });

// const initFirebaseAdmin=()=>{
//     const  apps = getApps();
//     if(!apps.length) {
//         initializeApp({
//             credential: cert({
//                 projectId:process.env.FIREBASE_PROJECT_ID as string,
//                 clientEmail:process.env.FIREBASE_CLIENT_EMAIL as string,
//                 privateKey:process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/,"\n")
                
//             })
//         }) 


//     }
//     return{
//         auth:getAuth(),
//         db:getFirestore()

// }
// }
// export const {auth,db}= initFirebaseAdmin();
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Debug once to verify env variables are loaded
 * (You can remove this after confirming)
 */
console.log("ENV CHECK →", {
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ?? "❌ missing",
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ?? "❌ missing",
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY
    ? "✅ exists"
    : "❌ missing",
});


function initFirebaseAdmin() {
  // ✅ Prevent re-initialization in Next.js hot reload
  if (!getApps().length) {
    // ✅ Safety check (important)
    if (
      !process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_CLIENT_EMAIL ||
      !process.env.FIREBASE_PRIVATE_KEY
    ) {
      throw new Error("Firebase Admin environment variables are missing");
    }

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

// ✅ Named exports for reuse across app
export const { auth, db } = initFirebaseAdmin();
