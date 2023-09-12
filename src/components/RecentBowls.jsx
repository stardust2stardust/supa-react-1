// import RecentBowlCard from "./RecentBowlCard";
import { supabase } from "../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import BowlCard from "./BowlCard";

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
      const { data, error } = await supabase
        .from("bowls")
        .select()
        .order("created_at", { ascending: false })
        .limit(6);

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
    <section className="w-full p-8 text">
      <div className="container mx-auto">
        <h2 className="text-2xl text-center mb-4">Recently Added </h2>
        {fetchError && <p>{fetchError}</p>}
        {bowls && (
          <div className="max-w-[1024px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bowls.map((bowl) => (
              <BowlCard
                key={bowl.id}
                bowl={bowl}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentBowls;
