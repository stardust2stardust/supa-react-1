import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const signOut = () => supabase.auth.signOut();

const register = (email, password) => supabase.auth.signUp({ email, password });

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.log("error from get session: ", error);
      }
      if (data.session === null) {
        console.log("user is not signed in");
        setUser(null);
        setAuth(false);
      } else if (data.session) {
        setUser(data.session.user);
        setAuth(true);
      }
    };
    getSession();
  }, []);

  // useEffect(() => {
  //   const { data } = supabase.auth.onAuthStateChange((event, session) => {
  //     console.log("event: ", event);
  //     console.log("session: ", session);
  //     if (event === "SIGNED_IN") {
  //       setUser(session.user);
  //       console.log("session.user: ", session.user);
  //       setAuth(true);
  //     } else if (event === "SIGNED_OUT") {
  //       setUser(null);
  //       console.log("signed out");
  //       setAuth(false);
  //     }
  //   });

  //   return () => {
  //     data.subscription.unsubscribe();
  //   };
  // }, []);

  return (
    <AuthContext.Provider
      value={{ user, auth, login, signOut, setAuth, setUser, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
