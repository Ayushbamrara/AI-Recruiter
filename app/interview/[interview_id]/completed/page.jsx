"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function InterviewCompleted() {
  const { interview_id } = useParams();
  const router = useRouter();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from("interview-feedback")
        .select("*")
        .eq("interview_id", interview_id)
        .single();

      if (error) {
        console.error("Error fetching feedback:", error);
        return;
      }

      setFeedback(data.feedback);
    };

    fetchFeedback();
  }, [interview_id]);

  if (!feedback) {
    return (
      <div className="p-16 text-center text-gray-500">
        Loading your feedback...
      </div>
    );
  }

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-10">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h1 className="text-3xl font-bold mt-4">Interview Completed!</h1>
        <p className="text-gray-600 mt-1">
          Here is your AI-generated feedback.
        </p>
      </div>

      {/* Feedback Card */}
      <div className="bg-white shadow rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-4">Your Feedback</h2>

        {/* Ratings */}
        <div className="space-y-3">
          <Rating label="Technical Skills" value={feedback.rating?.technicalSkills} />
          <Rating label="Communication" value={feedback.rating?.communication} />
          <Rating label="Problem Solving" value={feedback.rating?.problemSolving} />
          <Rating label="Experience" value={feedback.rating?.experience} />
        </div>

        {/* Summary */}
        <div className="mt-6">
          <h3 className="font-semibold">Summary</h3>
          <p className="text-gray-700 mt-1">{feedback.summary}</p>
        </div>

        {/* Recommendation */}
        <div className="mt-6">
          <h3 className="font-semibold">Recommendation</h3>
          <p className="mt-1">
            {feedback.recommendation === "Yes" ? (
              <span className="text-green-600 font-medium">Yes ✔</span>
            ) : (
              <span className="text-red-600 font-medium">No ✘</span>
            )}
          </p>

          <p className="text-gray-700 mt-1">{feedback.recommendationMsg}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <Link href="/dashboard">
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 rounded-lg">
            ← Back to Dashboard
          </button>
        </Link>

        <Link href="/dashboard/create-interview">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            + Create New Interview
          </button>
        </Link>
      </div>
    </div>
  );
}

/* ⭐ Rating Component (Stars) */
function Rating({ label, value }) {
  const stars = "⭐".repeat(value || 0);
  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}</span>
      <span className="text-yellow-500">{stars}</span>
    </div>
  );
}
