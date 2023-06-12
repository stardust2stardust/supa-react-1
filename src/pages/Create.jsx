import NewBowlForm from "../components/NewBowlForm";

const Create = () => {
  return (
    <div className="mt-10 create">
      <h1 className="my-4 text-blue-900 text-2xl font-bold text-center">
        Add a Recipe
      </h1>
      <NewBowlForm />
    </div>
  );
};

export default Create;
