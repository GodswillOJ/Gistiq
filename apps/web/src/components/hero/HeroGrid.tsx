"use client";

import { useNews } from "@/src/context/DemoNewsContext";
import HeroCard from "./HeroCard";

export default function HeroGrid() {
    const { posts } = useNews();

    return (
        <section className="hidden lg:grid grid-cols-4 grid-rows-2 gap-4 h-[85vh] px-6 py-6">
        <div className="col-span-2 row-span-2">
            <HeroCard {...posts[0]} />
        </div>

        <div className="col-span-1 row-span-1">
            <HeroCard {...posts[1]} />
        </div>

        <div className="col-span-1 row-span-1">
            <HeroCard {...posts[2]} />
        </div>

        <div className="col-span-2 row-span-1">
            <HeroCard {...posts[3]} />
        </div>
        </section>
    )
}
