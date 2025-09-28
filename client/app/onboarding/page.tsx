import OnboardingForm from "@/components/onboarding/OnboardingForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <OnboardingForm />
    </div>
  );
}
