import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const BowlCard = ({ bowl, onDelete, isAuthor }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("bowls")
      .delete()
      .eq("id", bowl.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      onDelete(bowl.id);
    }
  };

  return (
    <div className="border-2 p-3 flex flex-col bg-stone-100">
      <h3 className="text-xl font-bold text-stone-700">{bowl.title}</h3>
      <h4 className="text-lg text-green-600">{bowl.meal}</h4>
      <div className="text-orange-700">{bowl.ingredients.join(", ")}</div>
      <p className="text-stone-700">{bowl.method}</p>
      <div className="flex justify-end items-center mt-auto">
        <div className="flex items-center gap-2 ">
          <Link to={"/" + bowl.id}>
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
            onClick={handleDelete}
            className={
              isAuthor
                ? "h-6 w-6 text-blue-900"
                : "h-6 w-6 text-gray-300 cursor-not-allowed"
            }>
            delete
          </TrashIcon>
        </div>
      </div>
    </div>
  );
};

export default BowlCard;
