import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "./firebase-config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Returns user object with email, name, etc.
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};
