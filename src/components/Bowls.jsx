import BowlCard from "../components/BowlCard";
import { supabase } from "../supabase/supabaseClient";
import { useState, useEffect } from "react";

const Bowls = () => {
  const [fetchError, setFetchError] = useState(null);
  const [bowls, setBowls] = useState(null);
  const [isMealTypeSelected, setIsMealTypeSelected] = useState(false);
  // const [orderBy, setOrderBy] = useState("created_at");
  const [mealSelection, setMealSelection] = useState("");

  const handleDelete = (id) => {
    setBowls((prevBowls) => {
      return prevBowls.filter((sm) => sm.id !== id);
    });
  };

  useEffect(() => {
    const fetchBowls = async () => {
      const { data, error } = await supabase.from("bowls").select();

      if (error) {
        setFetchError("Could not fetch the bowls");
        console.log("error: ", error);
        setBowls(null);
      }

      if (data) {
        setBowls(data);
        setFetchError(null);
        setMealSelection("All");
      }
    };

    fetchBowls();
  }, []);

  const handleMealSelection = async (e) => {
    console.log(e.target.value);
    const { data, error } = await supabase
      .from("bowls")
      .select()
      .eq("meal", e.target.value);
    if (error) {
      setFetchError("Could not fetch the bowls");
      console.log("error: ", error);
      setBowls(null);
    }

    if (data) {
      setBowls(data);
      setFetchError(null);
      setIsMealTypeSelected(true);
      setMealSelection(e.target.value);
    }
  };

  const handleShowAllBowls = async () => {
    const { data, error } = await supabase.from("bowls").select();

    if (error) {
      setFetchError("Could not fetch the bowls");
      console.log("error: ", error);
      setBowls(null);
    }

    if (data) {
      setBowls(data);
      setFetchError(null);
      setIsMealTypeSelected(false);
      setMealSelection("All");
    }
  };

  return (
    <div className="p-8">
      {fetchError && <p>{fetchError}</p>}
      {bowls && (
        <div className="flex flex-col mt-5 gap-5">
          <div className="flex justify-start gap-4">
            <button
              value="Breakfast"
              onClick={handleMealSelection}
              className="border-2 border-pink-600 text-blue-900 rounded-md px-3 focus:bg-pink-600 focus:text-white">
              Breakfast
            </button>
            <button
              value="Lunch"
              onClick={handleMealSelection}
              className="border-2 border-pink-600 text-blue-900 rounded-md px-3 focus:bg-pink-600 focus:text-white">
              Lunch
            </button>
            <button
              value="Dinner"
              onClick={handleMealSelection}
              className="border-2 border-pink-600 text-blue-900 rounded-md px-3 focus:bg-pink-600 focus:text-white">
              Dinner
            </button>
            <button
              value="Dessert"
              onClick={handleMealSelection}
              className="border-2 border-pink-600 text-blue-900 rounded-md px-3 focus:bg-pink-600 focus:text-white">
              Dessert
            </button>
            {isMealTypeSelected && (
              <button
                onClick={handleShowAllBowls}
                className="text-pink-600 font-bold">
                Clear
              </button>
            )}
          </div>
          <h2 className="text-3xl text-blue-900 font-bold mt-3">
            {mealSelection} Bowls
          </h2>
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
