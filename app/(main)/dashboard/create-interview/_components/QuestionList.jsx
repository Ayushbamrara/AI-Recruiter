import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { QuestionListConatiner } from "./QuestionListConatiner";
import { useUser } from "@/app/Provider";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/services/supabaseClient";

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionsList] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (formData) {
      console.log("formData updated:", formData);
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      console.log("RAW AI RESPONSE:", result.data.content);

      const Content = result.data.content?.trim() || "";

      // remove all code fences like ```json ... ```
      const FINAL_CONTENT = Content.replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      console.log("CLEANED JSON STRING:", FINAL_CONTENT);

      let parsed = [];
      try {
        const jsonData = JSON.parse(FINAL_CONTENT);
        parsed = jsonData?.interviewQuestions || [];
        console.log("PARSED QUESTIONS:", parsed);
      } catch (err) {
        console.error("❌ JSON Parse Error:", err.message);
        toast.error("Failed to parse AI response");
      }

      setQuestionsList(parsed);
      setLoading(false);
    } catch (e) {
      console.error("❌ API Error:", e);
      toast.error("Server Error Try Again !!");
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();

    if (error) {
      console.error("❌ Supabase Insert Error:", error.message);
      toast.error("Error saving interview!");
    }

    setSaveLoading(false);
    onCreateLink(interview_id);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-2xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className=" font-medium">Generating interview question</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions according to job
              description
            </p>
          </div>
        </div>
      )}

      {Array.isArray(questionList) && questionList.length > 0 && (
        <div>
          <QuestionListConatiner questionList={questionList} />
        </div>
      )}

      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
          {saveLoading && <Loader2 className="animate-spin" />}
          Create Interview Link & Finish
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;
