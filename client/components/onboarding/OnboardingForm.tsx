"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PreferenceRow from "./PreferenceRow";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
  const router = useRouter();
  const supabase = createClient();
  const {
    register,
    control,
    handleSubmit,
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
      className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      {/* Name */}
      <div>
        <label className="block font-medium mb-1">Full Name</label>
        <input
          {...register("fullName")}
          className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-white"
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
          className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm">{errors.companyName.message}</p>
        )}
      </div>

      {/* Preferences */}
      <div>
        <label className="block font-medium mb-2">Preferences</label>
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
        className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
}
