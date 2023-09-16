import NewBowlForm from "../components/NewBowlForm";

const Create = () => {
  return (
    <section className="w-full bg-zinc-200 p-8 pt-4">
      <h1 className="my-4 text-zinc-900 text-2xl font-bold text-center">
        Add a Recipe
      </h1>
      <NewBowlForm />
    </section>
  );
};

export default Create;
