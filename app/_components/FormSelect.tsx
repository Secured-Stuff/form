"use client";
import { Option } from "@/app/_types/types";

interface Props {
  id: string;
  label: string;
  options: Option[];
  form: any;
}

export function FormSelect({ id, label, options, form }: Readonly<Props>) {
  return (
    <div className="mb-6 text-sm">
      <label htmlFor={id} className="mb-2 block">
        {label}
      </label>
      <select
        id={id}
        className="w-full rounded-lg border p-3 focus:outline-primary"
        {...form}
      >
        {options.map((option: Option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
