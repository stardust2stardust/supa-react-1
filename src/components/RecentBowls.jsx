import RecentBowlCard from "./RecentBowlCard";
import { supabase } from "../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const RecentBowls = () => {
  const [fetchError, setFetchError] = useState(null);
  const [bowls, setBowls] = useState(null);

  const { user } = useAuth();

  const handleDelete = (id) => {
    setBowls((prevBowls) => {
      return prevBowls.filter((bowl) => bowl.id !== id);
    });
  };

  useEffect(() => {
    const fetchBowls = async () => {
      const { data, error } = await supabase.from("bowls").select().limit(4);

      if (error) {
        setFetchError("Could not fetch the bowls");
        console.log("error: ", error);
        setBowls(null);
      }

      if (data) {
        setBowls(data);
        setFetchError(null);
      }
    };

    fetchBowls();
  }, []);

  return (
    <section className="w-full bg-green-700 p-8 text-white">
      <h2 className="text-2xl text-center mb-4">Recently Added </h2>
      {fetchError && <p>{fetchError}</p>}
      {bowls && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bowls.map((bowl) => (
            <RecentBowlCard
              key={bowl.id}
              bowl={bowl}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentBowls;
