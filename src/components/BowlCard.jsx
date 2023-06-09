import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const BowlCard = ({ bowl, onDelete }) => {
  const handleDelete = async () => {
    console.log("bowl id: ", bowl.id);
    const { data, error } = await supabase
      .from("breakfast_bowls")
      .delete()
      .eq("id", bowl.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log("delete data: ", data);
      onDelete(bowl.id);
    }
  };

  return (
    <div className="border-2 p-3">
      <h3 className="text-lg font-bold text-blue-900">{bowl.title}</h3>
      <p>{bowl.method}</p>
      <div className="rating">{bowl.rating}</div>
      <div className="buttons">
        <Link to={"/" + bowl.id}>
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

export default BowlCard;
