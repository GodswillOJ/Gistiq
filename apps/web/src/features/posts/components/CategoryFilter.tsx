interface Props {
  categories: string[];
  active: string;
  onChange: (
    category: string
  ) => void;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">

      <button
        onClick={() =>
          onChange("All")
        }
        className={`px-5 py-2 rounded-full transition ${
          active === "All"
            ? "bg-black text-white"
            : "bg-white border-zinc-300 shadow-sm"
        }`}
      >
        All
      </button>

      {categories.map(
        (category) => (
          <button
            key={category}
            onClick={() =>
              onChange(category)
            }
            className={`px-5 py-2 rounded-full transition ${
              active === category
                ? "bg-black text-white"
                : "bg-white border border-zinc-700"
            }`}
          >
            {category}
          </button>
        )
      )}

    </div>
  );
}