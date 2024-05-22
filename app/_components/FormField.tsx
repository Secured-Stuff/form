"use client";

import { type ComponentProps } from "react";
import { useFormContext, useController } from "react-hook-form";

interface Props {
  id: string;
  label?: string;
}

export function FormField({
  label,
  id,
  ...rest
}: Readonly<ComponentProps<"input"> & ComponentProps<"textarea"> & Props>) {
  const { control } = useFormContext();

  const { field } = useController({
    control,
    name: id,
  });

  return (
    <div className="mb-6 text-sm">
      <label htmlFor={id} className="mb-2 block">
        {label}
      </label>
      {rest.type === "textarea" ? (
        <textarea
          className="w-full rounded-lg border p-3 focus:outline-primary"
          value={field.value}
          onChange={field.onChange}
          {...rest}
        />
      ) : (
        <input
          className="w-full rounded-lg border p-3 focus:outline-primary"
          value={field.value}
          onChange={field.onChange}
          {...rest}
        />
      )}
    </div>
  );
}
