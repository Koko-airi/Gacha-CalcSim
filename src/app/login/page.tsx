import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { figtree } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ReturnHome from "@/components/ReturnHome";
import emailLogin from "@/actions/emailLogin";

export default function LoginPage() {
  return (
    <div className="min-h-screen p-4 py-8 md:p-8 fade-in" id="login-page">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="relative">
          <ReturnHome componentId="login-page" />
          <h1
            className={`text-4xl font-semibold drop-shadow-emerald-600 drop-shadow-xs text-emerald-200 ${figtree.className} text-center`}
          >
            Log into your account
          </h1>
        </div>
        <form action={emailLogin}>
          <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>Continue with email</CardTitle>
              <CardDescription>
                Enter your email below to login to your account, or create a new
                one. You&apos;ll receive an email with a login link.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full cursor-pointer">
                Continue
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
