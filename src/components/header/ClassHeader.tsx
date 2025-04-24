const ClassHeader = () => {
  return (
    <div className="flex justify-between items-center w-full my-3">
      <p className=" text-primary text-2xl font-normal"> Classes for today</p>;
      <section className=" flex justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Enter classcode"
          className=" border border-border px-4 py-2 rounded-xl"
        />
        <button className=" px-4 py-2 border border-border rounded-xl text-primary bg-primary-foreground">
          Join
        </button>
      </section>
    </div>
  );
};

export default ClassHeader;
