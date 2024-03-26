import { ReactNode, createContext, useState, useEffect } from "react";
import app from "../../firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { User } from "firebase/auth/web-extension";

interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContext {
  user: User | undefined;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<undefined | User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const auth = getAuth(app);
    try {
      const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
      setUser(firebaseUser?.user);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setUser(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserPersistence = (currentUser: any) => {
    setUser(currentUser);
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = getAuth(app).onAuthStateChanged(handleUserPersistence);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, isLoading, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
