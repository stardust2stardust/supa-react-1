import SmoothieCard from "./SmoothieCard";
import { supabase } from "../supabase/supabaseClient";
import { useState, useEffect } from "react";

const Smoothies = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((sm) => sm.id !== id);
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the smoothies");
        console.log("error: ", error);
        setSmoothies(null);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="p-8">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="flex flex-col mt-5 gap-5">
          <div className="flex gap-3">
            <button
              onClick={() => setOrderBy("created-at")}
              className="bg-pink-600 text-slate-100 px-3 py-1 rounded-lg">
              Time Created
            </button>
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
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Smoothies;
