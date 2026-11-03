
interface Props {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: Props) {
  const buttonStyle = (category: string) =>
    `shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition ${
      active === category
        ? "bg-black text-white"
        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onChange("All")}
        className={buttonStyle("All")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={buttonStyle(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
