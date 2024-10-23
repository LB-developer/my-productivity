import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "./firebaseConfig.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

/*
 Sign-up flow:
  try {
      1. Create the user with either (email and password) OR (google popup)
      2. Generate a public ID for the user
           (to be used for urls etc...)
      3. Store user in Firestore (including publicId)
      4. Return the user object
    }
 */

const generatePublicId = () => `user_${Math.random().toString(36).substring(2, 10)}`;

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const publicId = generatePublicId();

    await setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      publicId,
      createdAt: new Date(),
    });

    return { ...user, publicId };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const publicId = generatePublicId();

    await setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      publicId,
      createdAt: new Date(),
    });


    return { ...user, publicId };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {

  if (auth.currentUser !== null)
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  if (auth.currentUser !== null)
    return sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,
    });
};
