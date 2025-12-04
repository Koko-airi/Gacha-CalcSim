import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { figtree } from "@/lib/fonts";
import ReturnHome from "@/components/ReturnHome";

export default function LoginSuccessPage() {
  return (
    <div className="min-h-screen p-4 py-8 md:p-8 fade-in" id="login-success">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="relative">
          <ReturnHome componentId="login-success" />
          <h1
            className={`text-4xl font-semibold drop-shadow-emerald-600 drop-shadow-xs text-emerald-200 ${figtree.className} text-center`}
          >
            Check your email
          </h1>
        </div>
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>We sent you an email!</CardTitle>
            <CardDescription>
              You should receive an email with a login link shortly. If you
              don&apos;t see it, please check your spam folder.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
