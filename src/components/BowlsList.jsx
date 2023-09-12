import BowlCard from "./BowlCard";
import { supabase } from "../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Categories from "./Categories";
import {
  AllImage,
  BreakfastImage,
  LunchImage,
  DinnerImage,
  DessertImage,
} from "../assets/srcSets/imageSrcSets";

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
      // setIsMealTypeSelected(true);
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
      // setIsMealTypeSelected(false);
      setMealSelection("All");
    }
  };

  return (
    <section className="">
      <Categories
        handleShowAllBowls={handleShowAllBowls}
        handleMealSelection={handleMealSelection}
      />
      <div className="w-full relative">
        <div className="w-full h-full absolute bg-gradient-to-t from-zinc-900"></div>
        <div className="w-full h-full p-6 text-center text-zinc-50 absolute flex flex-col items-center justify-end">
          <h2 className="text-4xl md:text-6xl text-zinc-50 font-bold text-center">
            {mealSelection} Bowls
          </h2>
        </div>
        {mealSelection === "All" && <AllImage />}
        {mealSelection === "Breakfast" && <BreakfastImage />}
        {mealSelection === "Lunch" && <LunchImage />}
        {mealSelection === "Dinner" && <DinnerImage />}
        {mealSelection === "Dessert" && <DessertImage />}
      </div>

      {fetchError && <p>{fetchError}</p>}
      {bowls && (
        <div className="">
          <div className="w-full p-8 md:px-12">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bowls.map((bowl) => (
                <BowlCard
                  key={bowl.id}
                  bowl={bowl}
                  onDelete={handleDelete}
                  isAuthor={user?.id === bowl.author_id}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-1 mb-8">
            <Link to="/create">
              <PlusCircleIcon className="w-6 h-6 text-stone-50" />
            </Link>
            <p className="text-stone-50">New Bowl</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BowlsList;
