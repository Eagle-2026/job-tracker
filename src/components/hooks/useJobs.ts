"use client";
import { useQuery } from "@tanstack/react-query";

export type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  interview?: boolean;
  offer?: boolean;
};

export function useJobs() {
  const { data: jobs = [], isLoading, isError, refetch } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async (): Promise<Job[]> => {
      const res = await fetch("/api/jobs", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return res.json();
    },
  });

  const total = jobs.length;
  const interview = jobs.filter((j) => j.interview).length;
  const offer = jobs.filter((j) => j.offer).length;
  const pending = jobs.filter((j) => !j.interview && !j.offer).length;

  return { jobs, total, pending, interview, offer, isLoading, isError, refetch };
}
