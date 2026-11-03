
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  title: string;
  category: string;
  image: string;
  size?: "large" | "medium" | "small";
}

export default function HeroCard({
  title,
  image,
  category,
  size = "medium",
}: Props) {
  const styles = {
    large: {
      padding: "p-8",
      category: "text-sm",
      title: "text-2xl xl:text-3xl",
      lines: "line-clamp-3",
    },
    medium: {
      padding: "p-5",
      category: "text-xs",
      title: "text-lg xl:text-xl",
      lines: "line-clamp-3",
    },
    small: {
      padding: "p-4",
      category: "text-[10px]",
      title: "text-base xl:text-lg",
      lines: "line-clamp-3",
    },
  };

  const style = styles[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative h-full w-full min-h-0 min-w-0 overflow-hidden rounded-3xl group"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1280px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      <div
        className={`absolute bottom-0 left-0 right-0 z-10 ${style.padding} text-white`}
      >
        <span
          className={`${style.category} uppercase tracking-widest text-orange-300`}
        >
          {category}
        </span>

        <h2
          className={`mt-2 font-bold leading-tight ${style.title} ${style.lines} break-words`}
        >
          {title}
        </h2>
      </div>
    </motion.div>
  );
}
