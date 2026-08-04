"use client";

import {
    createContext,
    useContext,
    ReactNode,
} from "react";
import { demoNews } from "@/src/data/demoNews";
import { NewsPost } from "@/src/types/news";

interface NewsContextType {
    posts: NewsPost[];
}

const NewsContext = createContext<NewsContextType | null>(null);

export function DemoNewsProvider({
    children,
} : {
    children: ReactNode;
}) {
    return (
        <NewsContext.Provider value={{
            posts: demoNews,
        }}>
            {children}
        </NewsContext.Provider>
    );
};

export function useNews() {
    const context = useContext(NewsContext);

    if (!context) {
        throw new Error("useNews must be used within a NewsProvider");
    }

    return context;
}