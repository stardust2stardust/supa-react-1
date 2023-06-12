import BowlCard from "../components/BowlCard";
import { supabase } from "../supabase/supabaseClient";
import { useState, useEffect } from "react";

const Bowls = () => {
  const [fetchError, setFetchError] = useState(null);
  const [bowls, setBowls] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setBowls((prevBowls) => {
      return prevBowls.filter((sm) => sm.id !== id);
    });
  };

  useEffect(() => {
    const fetchBowls = async () => {
      const { data, error } = await supabase
        .from("bowls")
        .select()
        .order(orderBy, { ascending: false });

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
  }, [orderBy]);

  return (
    <div className="p-8">
      {fetchError && <p>{fetchError}</p>}
      {bowls && (
        <div className="flex flex-col mt-5 gap-5">
          <div className="flex gap-3">
            {/* <button
              onClick={() => setOrderBy("created-at")}
              className="bg-pink-600 text-slate-100 px-3 py-1 rounded-lg">
              Time Created
            </button> */}
            <button
              onClick={() => setOrderBy("title")}
              className="bg-pink-600 text-slate-100 px-3 py-1 rounded-lg">
              Title
            </button>
            <button
              onClick={() => setOrderBy("rating")}
              className="bg-pink-600 text-slate-100 px-3 py-1 rounded-lg">
              Rating
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bowls.map((bowl) => (
              <BowlCard
                key={bowl.id}
                bowl={bowl}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bowls;
