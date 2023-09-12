import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { useState, useEffect } from "react";
import {
  PencilIcon,
  TrashIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthProvider";

const SingleRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState("");
  const [meal, setMeal] = useState("");
  const [image, setImage] = useState("");

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
        setImage(data.img);
      }
    };

    fetchBowl();
  }, [id, navigate]);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("bowls")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log("delete data: ", data);
      // onDelete(id);
      navigate("/");
    }
  };

  const handleGoToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="pt-6 pl-6 text-zinc-900 flex items-center gap-2 cursor-pointer">
        <ArrowLeftCircleIcon
          className="w-7 h-7"
          onClick={handleGoToPreviousPage}
        />

        <span>back to recipes</span>
      </div>
      <section className="w-full p-8 md:p-12 bg-zinc-100">
        <div className="container mx-auto w-[85%] max-w-[600px] bg-stone-100 text-stone-700 flex flex-col gap-6 p-4 md:p-8 rounded-md">
          <img
            src={image}
            alt=""
          />
          <div>
            <h1 className="text-2xl text-center font-bold">{title}</h1>
          </div>

          <div>
            <h2 className="font-bold">Ingredients:</h2>
            <ul>
              {ingredients.map((ing) => (
                <li
                  key={ing}
                  className="text-orange-700">
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold">Instructions:</h2>
            <p>{method}</p>
          </div>

          <div className="flex items-center justify-end gap-2 ">
            <Link to={"/edit/" + id}>
              <PencilIcon
                className={
                  authorId === user?.id
                    ? "h-6 w-6 text-blue-900"
                    : "h-6 w-6 text-gray-300 cursor-not-allowed"
                }>
                edit
              </PencilIcon>
            </Link>
            <TrashIcon
              onClick={handleDelete}
              className={
                authorId === user?.id
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
