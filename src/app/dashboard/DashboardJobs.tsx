// "use client";

// import { useJobs, Job } from "@/components/hooks/useJobs";
// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// export default function DashboardJobs() {
//   const queryClient = useQueryClient();
//   const { jobs, isLoading, isError } = useJobs();

//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editData, setEditData] = useState({
//     title: "",
//     company: "",
//     location: "",
//   });

//   // DELETE mutation with toast
//   const deleteMutation = useMutation({
//     mutationFn: async (id: string) => {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       return res.json(); // important
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["jobs"] });
//       toast("Job deleted successfully", {
//         style: { background: "red", color: "white" },
//       });
//     },
//   });

//   // SAVE button mutation with toast
//   const saveMutation = useMutation({
//     mutationFn: async ({ id, data }: { id: string; data: Partial<Job> }) => {
//       const res = await fetch(`/api/jobs/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const responseData = await res.json(); // parse JSON first

//       if (!res.ok) {
//         throw new Error(responseData.message || "Failed to update job");
//       }

//       return responseData;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["jobs"] }); // refresh jobs
//       setEditingId(null); // close edit form
//       toast("Job updated successfully", {
//         style: { background: "blue", color: "white" },
//         duration: 3000,
//         position: "bottom-left",
//       });
//     },
//   });

//   // CHECKBOX mutation - no toast
//   const checkboxMutation = useMutation({
//     mutationFn: async ({ id, data }: { id: string; data: Partial<Job> }) => {
//       const res = await fetch(`/api/jobs/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!res.ok) throw new Error("Failed to update job");
//       return res.json(); // important
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
//   });

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center py-10">
//         <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         <span className="ml-3 text-gray-600">Loading jobs...</span>
//       </div>
//     );

//   if (isError) return <p>Failed to load jobs.</p>;
//   if (jobs.length === 0) return <p>No jobs found.</p>;

//   return (
//     <ul className="space-y-3">
//       {jobs.map((job) => (
//         <li
//           key={job.id}
//           className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
//         >
//           {editingId === job.id ? (
//             <div className="space-y-2">
//               <input
//                 className="border border-gray-400 rounded px-3 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={editData.title}
//                 onChange={(e) =>
//                   setEditData({ ...editData, title: e.target.value })
//                 }
//               />
//               <input
//                 className="border border-gray-400 rounded px-3 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={editData.company}
//                 onChange={(e) =>
//                   setEditData({ ...editData, company: e.target.value })
//                 }
//               />
//               <input
//                 className="border border-gray-400 rounded px-3 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={editData.location}
//                 onChange={(e) =>
//                   setEditData({ ...editData, location: e.target.value })
//                 }
//               />
//               <div className="flex gap-2">
//                 <button
//                   className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                   onClick={() =>
//                     saveMutation.mutate({ id: job.id, data: editData })
//                   }
//                 >
//                   Save
//                 </button>
//                 <button
//                   className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
//                   onClick={() => setEditingId(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <p className="text-gray-800">
//                 <span className="font-semibold">Job:</span> {job.title}
//               </p>
//               <p className="text-gray-800">
//                 <span className="font-semibold">Company:</span> {job.company}
//               </p>
//               <p className="text-gray-800">
//                 <span className="font-semibold">Location:</span>{" "}
//                 {job.location || "N/A"}
//               </p>

//               {/* Checkboxes - no toast */}
//               <div className="flex gap-6 text-gray-800 mt-2">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={job.interview}
//                     onChange={() =>
//                       checkboxMutation.mutate({
//                         id: job.id,
//                         data: { interview: !job.interview },
//                       })
//                     }
//                   />
//                   <span className="text-sm">Interview</span>
//                 </label>

//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={job.offer}
//                     onChange={() =>
//                       checkboxMutation.mutate({
//                         id: job.id,
//                         data: { offer: !job.offer },
//                       })
//                     }
//                   />
//                   <span className="text-sm">Offer</span>
//                 </label>
//               </div>

//               {/* Action buttons */}
//               <div className="flex gap-6 mt-3">
//                 <button
//                   className="text-blue-600 hover:underline text-sm"
//                   onClick={() => {
//                     setEditingId(job.id);
//                     setEditData({
//                       title: job.title,
//                       company: job.company,
//                       location: job.location || "",
//                     });
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-600 hover:underline text-sm"
//                   onClick={() => {
//                     if (
//                       window.confirm(
//                         "Are you sure you want to delete this job?"
//                       )
//                     ) {
//                       deleteMutation.mutate(job.id);
//                     }
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// }

"use client";

import { useJobs, Job } from "@/components/hooks/useJobs";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function DashboardJobs() {
  const queryClient = useQueryClient();
  const { jobs, isLoading, isError } = useJobs();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: "", company: "", location: "" });

  // DELETE mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast("Job deleted successfully", {
        style: { background: "red", color: "white" },
        duration: 3000,
        position: "bottom-left",
      });
    },
  });

  // SAVE mutation
  const saveMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Job> }) => {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update job");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setEditingId(null);
      toast("Job updated successfully", {
        style: { background: "blue", color: "white" },
        duration: 3000,
        position: "bottom-left",
      });
    },
  });

  // CHECKBOX mutation
  const checkboxMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Job> }) => {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update job");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading jobs...</span>
      </div>
    );

  if (isError) return <p>Failed to load jobs.</p>;
  if (jobs.length === 0) return <p>No jobs found.</p>;

  return (
    <ul className="space-y-3">
      {jobs.map((job) => (
        <li
          key={job.id}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
        >
          {editingId === job.id ? (
            <div className="space-y-2">
              <input
                className="border border-gray-400 rounded px-3 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
              <input
                className="border border-gray-400 rounded px-3 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editData.company}
                onChange={(e) => setEditData({ ...editData, company: e.target.value })}
              />
              <input
                className="border border-gray-400 rounded px-3 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              />
              <div className="flex gap-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() => saveMutation.mutate({ id: job.id, data: editData })}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-800">
                <span className="font-semibold">Job:</span> {job.title}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Company:</span> {job.company}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Location:</span> {job.location || "N/A"}
              </p>

              <div className="flex gap-6 text-gray-800 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={job.interview}
                    onChange={() =>
                      checkboxMutation.mutate({ id: job.id, data: { interview: !job.interview } })
                    }
                  />
                  <span className="text-sm">Interview</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={job.offer}
                    onChange={() =>
                      checkboxMutation.mutate({ id: job.id, data: { offer: !job.offer } })
                    }
                  />
                  <span className="text-sm">Offer</span>
                </label>
              </div>

              <div className="flex gap-6 mt-3">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => {
                    setEditingId(job.id);
                    setEditData({ title: job.title, company: job.company, location: job.location || "" });
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this job?")) {
                      deleteMutation.mutate(job.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
