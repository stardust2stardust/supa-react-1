import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../context/AuthProvider";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

const NewBowlForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [method, setMethod] = useState("");
  const [meal, setMeal] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuth();

  const navigate = useNavigate();

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const onOptionChange = (e) => {
    setMeal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const author_id = user.id;

    if (!title || !method || ingredients.length === 0 || !meal) {
      setFormError("Please fill in all of the fields.");
      return;
    }

    const { data, error } = await supabase
      .from("bowls")
      // each object is a row in the table
      .insert([{ title, ingredients, method, meal, author_id }])
      .select();

    if (error) {
      setFormError("Please fill in all of the fields.");
    }

    if (data) {
      setFormError(null);
      navigate("/");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-stone-100 text-stone-700 text-lg rounded-md flex flex-col items-center gap-8 max-w-[400px] p-5">
        <div className="w-full flex flex-col">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 rounded-md p-2 px-3"
          />
        </div>

        <div className="w-full flex flex-col">
          <h2>Select Meal:</h2>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="meal"
              value="Breakfast"
              id="breakfast"
              onChange={onOptionChange}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="meal"
              value="Lunch"
              id="lunch"
              onChange={onOptionChange}
            />
            <label htmlFor="lunch">Lunch</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="meal"
              value="Dinner"
              id="dinner"
              onChange={onOptionChange}
            />
            <label htmlFor="dinner">Dinner</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="meal"
              value="Dessert"
              id="dessert"
              onChange={onOptionChange}
            />
            <label htmlFor="breakfast">Dessert</label>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <label htmlFor="ingredient">Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="border-2 rounded-md p-1 px-2"
              />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}>
                  <MinusCircleIcon className="w-8 h-8 text-red-700" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex gap-1 items-center mt-4">
            <PlusCircleIcon
              onClick={handleAddIngredient}
              className="w-8 h-8 text-green-700"
            />

            <button
              type="button"
              onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="method">Method:</label>
          <textarea
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border-2 rounded-md p-1 px-2"
            rows={5}
          />
        </div>

        <button className="my-6 bg-green-700 text-slate-100 px-4 py-2 rounded-md">
          Submit Recipe
        </button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default NewBowlForm;
