"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type JobFormData = {
  title: string;
  company: string;
  location?: string;
  interview?: boolean;
  offer?: boolean;
};

export default function AddJobForm() {
  const { register, handleSubmit, reset } = useForm<JobFormData>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newJob: JobFormData) => {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add job");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      reset();
    },
  });

  const onSubmit = (data: JobFormData) => {
    console.log("Submitting job:", data);
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        {...register("title", { required: true })}
        placeholder="Job Title"
        className="border border-gray-300 rounded-xl p-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
      />

      <input
        {...register("company", { required: true })}
        placeholder="Company Name"
        className="border border-gray-300 rounded-xl p-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
      />

      <input
        {...register("location")}
        placeholder="Location (optional)"
        className="border border-gray-300 rounded-xl p-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
      />

      {/* Checkboxes */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("interview")}
          className="h-5 w-5 accent-pink-500"
        />
        <span className="text-gray-700">Interview</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("offer")}
          className="h-5 w-5 accent-pink-500"
        />
        <span className="text-gray-700">Offer</span>
      </label>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl px-6 py-3 w-full transition-all duration-200 disabled:opacity-70"
      >
        {mutation.isPending ? "Adding..." : "Add Job"}
      </button>
    </form>
  );
}
