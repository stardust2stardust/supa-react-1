import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../context/AuthProvider";

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
    <div className="">
      {!user && (
        <div>
          <h2>You must be logged into make edits</h2>
        </div>
      )}

      {user?.id !== authorId && <p>Only author of the recipe can update it.</p>}
      {user.id === authorId && (
        <form
          onSubmit={handleSubmit}
          className="mx-auto border-2 border-blue-900 rounded-md w-4/5 flex flex-col gap-4 p-6">
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
            <h2>Select Meal</h2>
            <div>
              <input
                type="radio"
                name="meal"
                value="Breakfast"
                id="breakfast"
                onChange={onOptionChange}
              />
              <label htmlFor="breakfast">Breakfast</label>
            </div>
            <div>
              <input
                type="radio"
                name="meal"
                value="Lunch"
                id="lunch"
                onChange={onOptionChange}
              />
              <label htmlFor="lunch">Lunch</label>
            </div>
            <div>
              <input
                type="radio"
                name="meal"
                value="Dinner"
                id="dinner"
                onChange={onOptionChange}
              />
              <label htmlFor="dinner">Dinner</label>
            </div>
            <div>
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

          <div className="flex flex-col">
            <label htmlFor="ingredient">Ingredients:</label>
            {ingredients.map((ingredient, index) => (
              <div key={index}>
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

          <button className="my-6 bg-blue-900 text-slate-100 px-3 py-1 rounded-md">
            Submit
          </button>

          {formError && <p className="error">{formError}</p>}
        </form>
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
