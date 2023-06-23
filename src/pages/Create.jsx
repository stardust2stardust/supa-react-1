import NewBowlForm from "../components/NewBowlForm";

const Create = () => {
  return (
    <section className="w-full bg-green-700 p-8">
      <h1 className="my-4 text-stone-100 text-2xl font-bold text-center">
        Add a Recipe
      </h1>
      <NewBowlForm />
    </section>
  );
};

export default Create;
