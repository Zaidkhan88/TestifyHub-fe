import { createContext, useContext, useState, ReactNode } from "react";

interface LinkContextType {
    link: string | null;
    setLink: React.Dispatch<React.SetStateAction<string | null>>;
}

// 1. Properly typed context
const LinkContext = createContext<LinkContextType | undefined>(undefined);

// 2. Provider component
export const LinkProvider = ({ children }: { children: ReactNode }) => {
    const [link, setLink] = useState<string | null>(null);

    return (
        <LinkContext.Provider value={{ link, setLink }}>
            {children}
        </LinkContext.Provider>
    );
};

// 3. Custom hook to use context
export const useReviewLink = () => {
    const context = useContext(LinkContext);
    if (!context) throw new Error("useReviewLink must be used within a LinkProvider.");
    return context;
};
