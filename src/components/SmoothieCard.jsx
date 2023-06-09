import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const SmoothieCard = ({ smoothie, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
  };

  return (
    <div className="border-2 p-3">
      <h3 className="text-lg font-bold text-blue-900">{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <PencilIcon className="h-6 w-6 text-blue-500">edit</PencilIcon>
        </Link>
        <TrashIcon
          onClick={handleDelete}
          className="h-6 w-6 text-blue-500">
          delete
        </TrashIcon>
      </div>
    </div>
  );
};

export default SmoothieCard;
