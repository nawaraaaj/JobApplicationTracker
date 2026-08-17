import { useEffect, useState } from "react";

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

export function useGoogleScript(): boolean {
    const [isLoaded, setIsLoaded] = useState(
        () => typeof window !== "undefined" && !!window.google?.accounts?.id
    );

    useEffect(() => {
        if (isLoaded) return;

        const existingScript = document.querySelector<HTMLScriptElement>(
            `script[src="${GOOGLE_SCRIPT_SRC}"]`
        );

        if (existingScript) {
            existingScript.addEventListener("load", () => setIsLoaded(true));
            return;
        }

        const script = document.createElement("script");
        script.src = GOOGLE_SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsLoaded(true);
        document.body.appendChild(script);
    }, [isLoaded]);

    return isLoaded;
}