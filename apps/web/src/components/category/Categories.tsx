const categories = [
  "Technology",
  "Politics",
  "Business",
  "Sports",
  "Culture",
  "Entertainment",
  "Education",
  "AI",
];

export default function Categories() {
  return (
    <section className="flex flex-wrap gap-3 px-6 py-6">
      {categories.map((category) => (
        <button
          key={category}
          className="px-5 py-2 rounded-full border border-zinc-700 hover:bg-zinc-900 transition text-sm"
        >
          {category}
        </button>
      ))}
    </section>
  );
}