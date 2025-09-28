"use client";

import { Control } from "react-hook-form";
import { OnboardingFormData } from "./OnboardingForm";

type PreferenceRowProps = {
  control: Control<OnboardingFormData>;
  index: number;
  remove: (index: number) => void;
};

export default function PreferenceRow({
  control,
  index,
  remove,
}: PreferenceRowProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <select
        {...control.register(`preferences.${index}.candidateLevel`)}
        className="border p-2 rounded-lg dark:bg-gray-700 dark:text-white flex-1"
      >
        <option value="">Candidate Level</option>
        <option value="Fresher">Fresher</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>

      <select
        {...control.register(`preferences.${index}.department`)}
        className="border p-2 rounded-lg dark:bg-gray-700 dark:text-white flex-1"
      >
        <option value="">Department</option>
        <option value="Engineering">Engineering</option>
        <option value="Design">Design</option>
        <option value="Product">Product</option>
        <option value="Marketing">Marketing</option>
        <option value="Architecture">Architecture</option>
      </select>

      <select
        {...control.register(`preferences.${index}.priority`)}
        className="border p-2 rounded-lg dark:bg-gray-700 dark:text-white flex-1"
      >
        <option value="">Priority</option>
        <option value="Urgent">Urgent</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <button
        type="button"
        onClick={() => remove(index)}
        className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}
