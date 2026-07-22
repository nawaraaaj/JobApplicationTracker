import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { login } from "../../api/authApi";
import type { LoginRequest } from "../../types/auth.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "../Auth/AuthLayout";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password) {
      const message = "Please enter both email and password.";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const response = await login({ email, password });

      localStorage.setItem("accessToken", response.accessToken);

      toast.success("Logged in successfully.");
      navigate("/");
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? "Login failed. Please try again.")
        : "An unexpected error occurred.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      activeTab="login"
      heading="Welcome Back"
      description="Enter your credentials to access the system."
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#1b1b1c]"
          >
            Identification (Email)
          </Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#44474c]" />

            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="user@domain.com"
              autoComplete="email"
              disabled={loading}
              className="pl-10 bg-[#fcf9f9] border-[#c5c6cc] text-[#1b1b1c] rounded-sm focus-visible:ring-0 focus-visible:border-[#835500]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-end justify-between">
            <Label
              htmlFor="password"
              className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#1b1b1c]"
            >
              Passcode
            </Label>

            <a
              href="#"
              className="font-['IBM_Plex_Mono'] text-[11px] text-[#835500] transition-colors hover:text-[#633f00]"
            >
              FORGOT?
            </a>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#44474c]" />

            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              disabled={loading}
              className="pl-10 pr-10 bg-[#fcf9f9] border-[#c5c6cc] text-[#1b1b1c] rounded-sm focus-visible:ring-0 focus-visible:border-[#835500]"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#44474c] hover:text-[#1b1b1c]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-sm border border-[#ba1a1a]/30 bg-[#ffdad6] p-3 font-['IBM_Plex_Mono'] text-sm text-[#93000a]">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-none border border-[#050e1a] bg-[#050e1a] font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white hover:bg-[#1b2430]"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              Authenticate
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[#44474c]">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-['IBM_Plex_Mono'] text-[#835500] underline underline-offset-4 hover:text-[#633f00]"
        >
          Register
        </Link>
      </div>
    </AuthLayout>
  );
}
