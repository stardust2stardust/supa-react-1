import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  AllImage,
  BreakfastImage,
  LunchImage,
  DinnerImage,
  DessertImage,
} from "../assets/srcSets/imageSrcSets";

const SingleRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState("");
  const [meal, setMeal] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchBowl = async () => {
      const { data, error } = await supabase
        .from("bowls")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
        console.log("error getting data. ");
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setIngredients(data.ingredients);
        setMeal(data.meal);
        // setAuthorId(data.author_id);
      }
    };

    fetchBowl();
  }, [id, navigate]);

  return (
    <>
      <section className="w-full relative">
        <div className="w-full h-full absolute bg-green-900 opacity-30"></div>
        {meal === "All" && <AllImage />}
        {meal === "Breakfast" && <BreakfastImage />}
        {meal === "Lunch" && <LunchImage />}
        {meal === "Dinner" && <DinnerImage />}
        {meal === "Dessert" && <DessertImage />}
      </section>
      <section className="w-full p-8">
        <div className="bg-stone-100 text-stone-700 flex flex-col gap-4 p-3 rounded-md">
          <h1 className="text-2xl text-center font-bold">{title}</h1>
          <h2 className="text-green-600 text-center">{meal}</h2>
          <div>
            <h2 className="font-bold">Ingredients:</h2>
            <ul>
              {ingredients.map((ing) => (
                <li className="text-orange-700">{ing}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold">Instructions:</h2>
            <p>{method}</p>
          </div>

          <div className="flex items-center justify-end gap-2 ">
            <Link to={"/" + id}>
              <PencilIcon
                className={
                  isAuthor
                    ? "h-6 w-6 text-blue-900"
                    : "h-6 w-6 text-gray-300 cursor-not-allowed"
                }>
                edit
              </PencilIcon>
            </Link>
            <TrashIcon
              // onClick={handleDelete}
              className={
                isAuthor
                  ? "h-6 w-6 text-blue-900"
                  : "h-6 w-6 text-gray-300 cursor-not-allowed"
              }>
              delete
            </TrashIcon>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleRecipe;
