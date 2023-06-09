import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Success() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      console.log(session);
      setUser(session?.user);
    };
    getSession();
  }, []);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  const avatar = user?.user_metadata?.avatar_url;
  const userName = user?.user_metadata?.full_Name;

  async function signOutUser() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div>
      <header>
        <h1>Login Successful</h1>
        <h2>{userName}</h2>
        <img src={avatar} />
        <button onClick={() => signOutUser()}>Sign Out</button>
      </header>
    </div>
  );
}

export default Success;
