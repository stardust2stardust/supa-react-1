import BowlCard from "./BowlCard";
import { supabase } from "../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const BowlsList = () => {
  const [fetchError, setFetchError] = useState(null);
  const [bowls, setBowls] = useState(null);
  const [mealSelection, setMealSelection] = useState("");

  const { user } = useAuth();

  const handleDelete = (id) => {
    setBowls((prevBowls) => {
      return prevBowls.filter((bowl) => bowl.id !== id);
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
    <div className="">
      {fetchError && <p>{fetchError}</p>}
      {bowls && (
        <div className="flex flex-col gap-5">
          <div>
            <div className="w-full flex justify-center bg-pink-600 ">
              <button
                onClick={handleShowAllBowls}
                className="text-white px-3 py-2 focus:bg-gray-100 focus:text-blue-900">
                All
              </button>
              <button
                value="Breakfast"
                onClick={handleMealSelection}
                className="text-white px-3 py-2 focus:bg-gray-100 focus:text-blue-900">
                Breakfast
              </button>
              <button
                value="Lunch"
                onClick={handleMealSelection}
                className="text-white px-3 py-2 focus:bg-gray-100 focus:text-blue-900">
                Lunch
              </button>
              <button
                value="Dinner"
                onClick={handleMealSelection}
                className="text-white px-3 py-2 focus:bg-gray-100 focus:text-blue-900">
                Dinner
              </button>
              <button
                value="Dessert"
                onClick={handleMealSelection}
                className="text-white px-3 py-2 focus:bg-gray-100 focus:text-blue-900">
                Dessert
              </button>
            </div>
          </div>

          <h2 className="text-2xl text-blue-900 font-bold text-center mt-3">
            {mealSelection} Bowls
          </h2>

          <div className="px-3 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bowls.map((bowl) => (
              <BowlCard
                key={bowl.id}
                bowl={bowl}
                onDelete={handleDelete}
                isAuthor={user?.id === bowl.author_id}
              />
            ))}
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <Link to="/create">
              <PlusCircleIcon className="w-6 h-6 text-green-700" />
            </Link>
            <p>New Bowl</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BowlsList;
