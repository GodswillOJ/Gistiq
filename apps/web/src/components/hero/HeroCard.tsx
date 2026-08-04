import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
    title: string;
    category: string;
    image: string;
}

export default function HeroCard({
    title,
    image,
    category,
} : Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl group h-full"
            >
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 p-6 z-10 text-white">
                <span className="text-xs uppercase tracking-widest text-orange-300">
                {category}
                </span>

                <h2 className="text-2xl font-bold mt-2 leading-tight">
                {title}
                </h2>
            </div>
        </motion.div>
    );

}