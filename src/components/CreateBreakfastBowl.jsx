import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

const CreateBreakfastBowl = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating || ingredients.length === 0) {
      setFormError("Please fill in all of the fields.");
      return;
    }

    const { data, error } = await supabase
      .from("breakfast_bowls")
      // each object is a row in the table
      .insert([{ title, ingredients, method, rating }])
      .select();

    if (error) {
      setFormError("Please fill in all of the fields.");
    }

    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto border-2 border-blue-900 rounded-md w-1/2 flex flex-col gap-4 p-6">
        <div className="flex flex-col">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 rounded-md p-1 px-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ingredient">Ingredients:</label>
          {/* <input
            type="text"
            id="title"
            value={ingredient}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 rounded-md p-1 px-2"
          /> */}
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="border-2 rounded-md p-1 px-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="method">Method:</label>
          <textarea
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border-2 rounded-md p-1 px-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border-2 rounded-md p-1 px-2"
          />
        </div>

        <button className="my-6 bg-blue-900 text-slate-100 px-3 py-1 rounded-md">
          Submit
        </button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateBreakfastBowl;
