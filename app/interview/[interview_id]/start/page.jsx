"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_component/AlertConfirmation";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const [callActive, setCallActive] = useState(false);

  // Build the questions list
  const getQuestions = () => {
    if (!interviewInfo?.interviewData?.questionList?.length)
      return [
        "1. Tell me about yourself",
        "2. What are your strengths",
        "3. Why do you want this position",
      ];
    return interviewInfo.interviewData.questionList.map(
      (q, i) => `${i + 1}. ${q.question}`
    );
  };

  const startCall = async () => {
    if (!interviewInfo) return;

    try {
      // ✅ Check microphone permissions before starting
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // ✅ Initialize Vapi once
      if (!vapiRef.current) {
        vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
      }

      // ✅ Stop any active session to prevent Krisp duplication
      try {
        await vapiRef.current.stop();
      } catch (e) {
        console.log("ℹ️ No active session to stop, continuing...");
      }

      const questionList = getQuestions().join("\n");

      // ✅ Start with minimal assistantOptions
      const assistantOptions = {
        name: "AI Recruiter",
        firstMessage: `Hi ${interviewInfo.userName}, ready for your ${interviewInfo.interviewData.jobPosition} interview?`,
        voice: {
          provider: "11labs",
          voiceId: "EXAVITQu4vr4xnSDxMaL",
        },
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are an AI interviewer. Ask the following questions one by one:\n${questionList}`,
            },
          ],
        },
      };

      await vapiRef.current.start(assistantOptions);
      setCallActive(true);
      console.log("✅ Vapi started successfully");

      // ✅ Attach listeners only once
      vapiRef.current.on("message", (msg) =>
        console.log("🤖 AI:", msg.content || msg.text)
      );
      vapiRef.current.on("speech", (data) =>
        console.log("🎙️ Candidate said:", data)
      );
      vapiRef.current.on("error", (err) => {
        console.error("❌ Vapi error (raw):", err);
        console.error("Stringified:", JSON.stringify(err, null, 2));
      });
      vapiRef.current.on("end", () => {
        console.warn("⚠️ Interview ended by Vapi");
        setCallActive(false);
      });
    } catch (err) {
      console.error("❌ Failed to start Vapi call:", err);
    }
  };

  const stopInterview = async () => {
    if (vapiRef.current) {
      try {
        await vapiRef.current.stop();
      } catch (e) {
        console.warn("⚠️ No active session to stop");
      }
      setCallActive(false);
    }
  };

  return (
    <div className="p-28 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <Image
            src={"/ai.png"}
            alt="ai-avatar"
            width={100}
            height={100}
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <h2>AI Recruiter</h2>
        </div>
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <h2 className="text-2xl bg-primary text-white p-3 px-5 rounded-full">
            {interviewInfo?.userName[0]}
          </h2>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex gap-10 justify-center items-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />

        {!callActive ? (
          <button
            onClick={startCall}
            className="h-12 w-32 bg-green-500 text-white rounded-full cursor-pointer"
          >
            Start Interview
          </button>
        ) : (
          <AlertConfirmation stopInterview={stopInterview}>
            <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
          </AlertConfirmation>
        )}
      </div>

      <h2 className="text-sm text-gray-500 text-center mt-5">
        {callActive
          ? "Interview in progress...."
          : "Click 'Start Interview' to begin"}
      </h2>
    </div>
  );
}

export default StartInterview;
