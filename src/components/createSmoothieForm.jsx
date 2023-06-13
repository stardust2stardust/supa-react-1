import React from "react";

const createSmoothieForm = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all of the fields.");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      // each object is a row in the table
      .insert([{ title, method, rating }])
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
          <label htmlFor="method">Method:</label>
          <textarea
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border-2 rounded-md p-1 px-2"
          />
        </div>
        {/* <div className="flex flex-col">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border-2 rounded-md p-1 px-2"
          />
        </div> */}

        <button className="my-6 bg-blue-900 text-slate-100 px-3 py-1 rounded-md">
          Submit
        </button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default createSmoothieForm;
