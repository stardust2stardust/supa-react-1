import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const signOut = () => supabase.auth.signOut();

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("event: ", event);
      console.log("session: ", session);
      if (event === "SIGNED_IN") {
        setUser(session.user);
        console.log("session.user: ", session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        console.log("signed out");
        setAuth(false);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, auth, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
