import { GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';

// Interface for Auth Context
export interface IAuth {
  user: User | null
  loading: boolean
  userLoggedIn: boolean
  isEmailUser: boolean
  isGoogleUser: boolean
}

// Initialize AuthContext
const AuthContext = createContext<IAuth | null>(null);

// function for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  const authValues: IAuth = {
    user: currentUser,
    loading: isLoading,
    userLoggedIn: userLoggedIn,
    isEmailUser: isEmailUser,
    isGoogleUser: isGoogleUser
  };

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        // is the user signing up with email
        const isEmail = user.providerData.some(
          (provider) => provider.providerId === "password"
        );
        setIsEmailUser(isEmail)

        // is the user signing up via google
        const isGoogle = user.providerData.some(
          (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
        );
        setIsGoogleUser(isGoogle);

        // user has successfully logged in
        setUserLoggedIn(true);
      } else {
        // user failed to log in
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      // when the user has completed the sign in process
      // after either outcome loading has stopped
      setIsLoading(false);
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  // TODO: create loading component
  if (isLoading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

