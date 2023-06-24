import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../context/AuthProvider";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const Update = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState("");
  const [meal, setMeal] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [formError, setFormError] = useState("");

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

    if (!title || !method || ingredients.length === 0 || !meal) {
      setFormError("Please fill in all of the fields.");
      return;
    }
    const { data, error } = await supabase
      .from("bowls")
      .update({ title, method, ingredients, meal })
      .eq("id", id)
      .select();

    if (error) {
      setFormError("Please fill in all fields");
    }

    if (data) {
      setFormError(null);
      navigate("/");
    }
  };

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
        setAuthorId(data.author_id);
      }
    };

    fetchBowl();
  }, [id, navigate]);

  return (
    <div className="bg-green-700 p-8">
      {!user && (
        <div>
          <h2>You must be logged into make edits</h2>
        </div>
      )}

      {user?.id !== authorId && <p>Only author of the recipe can update it.</p>}
      {user.id === authorId && (
        <section>
          <h1 className="text-center text-2xl text-stone-100 mb-4">
            Update your recipe
          </h1>
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
                className="border-2 rounded-md p-1 px-2"
              />
            </div>

            <div className="w-full flex flex-col">
              <h2>Select Meal</h2>
              <div className="flex gap-1 items-center">
                <input
                  type="radio"
                  name="meal"
                  value="Breakfast"
                  id="breakfast"
                  onChange={onOptionChange}
                />
                <label htmlFor="breakfast">Breakfast</label>
              </div>
              <div className="flex gap-1 items-center">
                <input
                  type="radio"
                  name="meal"
                  value="Lunch"
                  id="lunch"
                  onChange={onOptionChange}
                />
                <label htmlFor="lunch">Lunch</label>
              </div>
              <div className="flex gap-1 items-center">
                <input
                  type="radio"
                  name="meal"
                  value="Dinner"
                  id="dinner"
                  onChange={onOptionChange}
                />
                <label htmlFor="dinner">Dinner</label>
              </div>
              <div className="flex gap-1 items-center">
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
                  className="flex items-center">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    className="border-2 rounded-md p-1 px-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}>
                    <MinusCircleIcon className="w-8 h-8 text-red-700" />
                  </button>
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
                rows={8}
              />
            </div>

            <button className="my-6 bg-green-700 text-slate-100 px-4 py-2 rounded-md">
              Submit
            </button>

            {formError && <p className="error">{formError}</p>}
          </form>
        </section>
      )}

      {/* {user && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="method">Method:</label>
          <textarea
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />

          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button>Update Smoothie Recipe</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      )}  */}
    </div>
  );
};

export default Update;
