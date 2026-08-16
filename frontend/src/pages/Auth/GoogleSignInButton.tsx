import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGoogleScript } from "../../lib/Auth/useGoogleScript";
import { useAuth } from "../../lib/Auth/AuthContext";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

export default function GoogleSignInButton() {
    const navigate = useNavigate();
    const { googleLogin } = useAuth();
    const isScriptLoaded = useGoogleScript();
    const buttonRef = useRef<HTMLDivElement>(null);
    const isProcessingRef = useRef(false);

    useEffect(() => {
        if (!isScriptLoaded || !window.google || !buttonRef.current) return;

        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            cancel_on_tap_outside: true,
            callback: async (response) => {
                if (isProcessingRef.current) return;
                isProcessingRef.current = true;

                try {
                    await googleLogin(response.credential);
                    toast.success("Logged in successfully.");
                    navigate("/dashboard");
                } catch (err) {
                    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
                    toast.error(message);
                } finally {
                    isProcessingRef.current = false;
                }
            },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
            type: "standard",
            theme: "outline",
            size: "large",
            width: 320,
        });
    }, [isScriptLoaded, googleLogin, navigate]);

    return <div ref={buttonRef} className="flex w-full justify-center" />;
}