import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { login } from "../../api/authApi";
import type { LoginRequest } from "../../types/auth.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      toast.success("Logged in successfully.");
      localStorage.setItem("accessToken", response.accessToken);
      navigate("/");
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ?? "Login failed. Please try again."
        : "An unexpected error occurred.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <section className="flex flex-1 items-center justify-center p-6">
          <Card className="w-full max-w-md border-border bg-card shadow-2xl shadow-black/40">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">
                  Welcome Back
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Log in to keep tracking your job applications.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full bg-emerald-600 hover:bg-emerald-500"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging In ...
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-zinc-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                  Register
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}