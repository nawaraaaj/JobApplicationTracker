import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Loader2,
  User,
  Mail,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { register } from "../../api/authApi";
import type { RegisterRequest } from "../../types/auth.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "../Auth/AuthLayout";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): string | null => {
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email || !form.password || !form.confirmPassword) {
      return "Please fill in all fields.";
    }
    if (form.password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
      });
      toast.success("Account created successfully.");
      localStorage.setItem("accessToken", response.accessToken);
      navigate("/");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message ??
          "Unable to create your account. Please try again.")
        : "An unexpected error occurred.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      activeTab="register"
      heading="Create an Account"
      description="Register your credentials to get access the system."
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-1.5">
          <Label
            htmlFor="name"
            className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#1b1b1c]"
          >
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#44474c]" />
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              autoComplete="name"
              disabled={loading}
              className="pl-10 bg-[#fcf9f9] border-[#c5c6cc] text-[#1b1b1c] rounded-sm focus-visible:ring-0 focus-visible:border-[#835500]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#1b1b1c]"
          >
            Identification (Email)
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#44474c]" />
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

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#44474c]" />

          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            disabled={loading}
            className="pl-10 pr-10 bg-[#fcf9f9] border-[#c5c6cc] text-[#1b1b1c] rounded-sm focus-visible:ring-0 focus-visible:border-[#835500]"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#44474c] hover:text-[#1b1b1c]"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#44474c]" />

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            disabled={loading}
            className="pl-10 pr-10 bg-[#fcf9f9] border-[#c5c6cc] text-[#1b1b1c] rounded-sm focus-visible:ring-0 focus-visible:border-[#835500]"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#44474c] hover:text-[#1b1b1c]"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {error && (
          <div className="rounded-sm border border-[#ba1a1a]/30 bg-[#ffdad6] p-3 text-sm text-[#93000a] font-['IBM_Plex_Mono']">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#050e1a] hover:bg-[#1b2430] text-white font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider rounded-none border border-[#050e1a] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
            </>
          ) : (
            <>
              Create Account <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[#44474c]">
        Already have clearance?{" "}
        <Link
          to="/login"
          className="font-['IBM_Plex_Mono'] text-[#835500] hover:text-[#633f00] underline underline-offset-4"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
