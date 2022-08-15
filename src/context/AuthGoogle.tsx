import { createContext, ReactNode, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { useRouter } from "next/router";
const provider = new GoogleAuthProvider();

type UserType = {
  apiKey: string;
  appName: string;
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  photoURL: string;
  providerData: [
    {
      displayName: string;
      email: string;
      phoneNumber: number | null;
      photoURL: string;
      providerId: string;
      uid: string;
    }
  ];
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  uid: string;
};

type AuthGoogleContextType = {
  signInWithGoogle: () => void;
  signOut: () => void;
  signed: boolean;
  user: UserType;
};
export const AuthGoogleContext = createContext<AuthGoogleContextType>({
  signInWithGoogle: () => null,
  signOut: () => null,
  signed: false,
  user: {
    apiKey: "",
    appName: "",
    createdAt: "",
    displayName: "",
    email: "",
    emailVerified: false,
    isAnonymous: false,
    lastLoginAt: "",
    photoURL: "",
    providerData: [
      {
        displayName: "",
        email: "",
        phoneNumber: null,
        photoURL: "",
        providerId: "",
        uid: "115866940527114039404",
      },
    ],
    stsTokenManager: { accessToken: "", expirationTime: 0, refreshToken: "" },
    uid: "",
  },
});

type AuthGoogleProviderType = {
  children: ReactNode;
};

export const AuthGoogleProvider = ({ children }: AuthGoogleProviderType) => {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadStoreAuth = () => {
      const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
      const sessionUser = sessionStorage.getItem("@AuthFirebase:user");

      if (sessionToken && sessionUser) {
        setUser(JSON.parse(sessionUser));
      }
    };

    loadStoreAuth();
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token as string);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const signOut = () => {
    sessionStorage.clear();
    setUser(null);

    router.replace("/");
  };

  return (
    <AuthGoogleContext.Provider
      value={{ signInWithGoogle, user, signed: !!user, signOut }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};
