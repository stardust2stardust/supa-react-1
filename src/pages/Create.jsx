import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import CreateBreakfastBowl from "../components/createBreakfastBowl";

const Create = () => {
  return (
    <div className="mt-10 create">
      <h1 className="my-4 text-blue-900 text-2xl font-bold text-center">
        Add a Recipe
      </h1>
      <CreateBreakfastBowl />
    </div>
  );
};

export default Create;
