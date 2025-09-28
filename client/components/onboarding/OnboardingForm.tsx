"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PreferenceRow from "./PreferenceRow";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export const preferenceSchema = z.object({
  candidateLevel: z.string().nonempty("Select a candidate level"),
  department: z.string().nonempty("Select a department"),
  priority: z.string().nonempty("Select a priority"),
});

export const onboardingSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  companyName: z.string().nonempty("Company name is required"),
  preferences: z.array(preferenceSchema).min(1, "Add at least one preference"),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

export default function OnboardingForm() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      preferences: [{ candidateLevel: "", department: "", priority: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "preferences",
  });

  useEffect(() => {
    const checkUserProfile = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        router.push("/auth/login");
        return;
      }

      const { data: userProfile } = await supabase
        .from("users")
        .select("full_name, company, preferences")
        .eq("id", authData.user.id)
        .single();

      if (
        userProfile?.full_name &&
        userProfile?.company &&
        userProfile?.preferences?.length
      ) {
        // User already completed onboarding, redirect to dashboard
        router.push("/dashboard");
        return;
      }

      // If user exists but incomplete, prefill form
      if (userProfile) {
        reset({
          fullName: userProfile.full_name ?? "",
          companyName: userProfile.company ?? "",
          preferences: userProfile.preferences ?? [
            { candidateLevel: "", department: "", priority: "" },
          ],
        });
      }

      setLoading(false);
    };

    checkUserProfile();
  }, [router, reset, supabase]);

  if (loading) return <p>Loading...</p>;

  const onSubmit = async (data: OnboardingFormData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("No authenticated user found");
      return;
    }

    const { error } = await supabase.from("users").upsert({
      id: user.id,
      full_name: data.fullName,
      company: data.companyName,
      email: user.email,
      preferences: data.preferences,
    });

    if (error) {
      console.error("Error saving user data:", error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 dark:bg-white bg-gray-900 text-white dark:text-black rounded-xl shadow-lg"
    >
      {/* Name */}
      <div>
        <label className="block font-medium mb-1">Full Name</label>
        <input
          {...register("fullName")}
          className="w-full border p-2 rounded-lg dark:bg-white bg-gray-900 text-white dark:text-black"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      {/* Company Name */}
      <div>
        <label className="block font-medium mb-1">Company Name</label>
        <input
          {...register("companyName")}
          className="w-full border p-2 rounded-lg dark:bg-white bg-gray-900 text-white dark:text-black"
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm">{errors.companyName.message}</p>
        )}
      </div>

      {/* Preferences */}
      <div>
        <label className="block font-medium mb-2 ">Preferences</label>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <PreferenceRow
              key={field.id}
              control={control}
              index={index}
              remove={remove}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            append({ candidateLevel: "", department: "", priority: "" })
          }
          className="mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          Add Preference
        </button>
        {errors.preferences && (
          <p className="text-red-500 text-sm">{errors.preferences.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-blue-50 border-2 border-black text-black font-semibold hover:bg-green-600 hover:text-white"
      >
        Submit
      </button>
    </form>
  );
}
