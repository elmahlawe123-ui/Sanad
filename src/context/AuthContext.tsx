import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isDemoMode = auth.app.options.apiKey === "demo-mode" || auth.app.options.apiKey === "YOUR_API_KEY";
    const isDemoUser = localStorage.getItem('demo_user') === 'true';

    if (isDemoMode) {
      if (isDemoUser) {
        setUser({
          uid: 'demo-123',
          email: 'demo@sanad.tech',
          displayName: 'عميل تجريبي (Demo)',
          emailVerified: true,
        } as any);
      } else {
        setUser(null);
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
