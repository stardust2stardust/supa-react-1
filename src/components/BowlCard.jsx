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
    <div className="rounded-md p-4 flex flex-col gap-3 bg-zinc-50 shadow-md">
      <h3 className="text-xl font-bold text-zinc-900 text-center">
        {bowl.title}
      </h3>

      <div className="w-full relative">
        <img
          src={bowl.img}
          alt={bowl.title}
          className="w-full  object-cover"
        />
        <div className="absolute top-0 right-0 bg-amber-400 p-2 py-1 text-sm">
          {bowl.meal}
        </div>
      </div>
      <div className="text-zinc-900 flex justify-end">
        <Link to={"/" + bowl.id}>{"View recipe >>"}</Link>
      </div>
    </div>
  );
};

export default BowlCard;
