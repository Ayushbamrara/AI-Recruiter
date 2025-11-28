"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import React, { useContext, useRef, useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_component/AlertConfirmation";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useRouter, useParams } from "next/navigation";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);

  const [activeUser, setActiveUser] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const router = useRouter();
  const { interview_id } = useParams();

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

  // --------------------------
  //   INIT VAPI LISTENERS
  // --------------------------
  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    }

    const vapi = vapiRef.current;

    const onCallStart = () => {
      setCallActive(true);
      toast.success("Call Connected");
    };

    const onSpeechStart = () => setActiveUser(false);
    const onSpeechStop = () => setActiveUser(true);

    // Auto call ended by AI
    const onCallEnd = async () => {
      setCallActive(false);
      setIsRunning(false);
      toast("Call Ended");

      await GenerateFeedback();
      router.replace(`/interview/${interview_id}/completed`);
    };

    // Capture full conversation
    const onMessage = (msg) => {
      if (msg.type === "conversation-update" && msg.conversation?.length > 0) {
        setConversation(msg.conversation);
      }
    };

    const onError = (err) => {
      console.error("VAPI Error:", err);
      toast.error("Call Disconnected or Ended.");
    };

    vapi.on("call-start", onCallStart);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-stop", onSpeechStop);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);

    return () => {
      try {
        vapi.stop?.();
        vapi.removeAllListeners?.();
      } catch (e) {}
    };
  }, []);

  // --------------------------
  //     START INTERVIEW
  // --------------------------
  const startCall = async () => {
  if (!interviewInfo) {
    console.error("❌ No interviewInfo found");
    return;
  }

  try {
    console.log("🎤 Requesting microphone access...");

    await navigator.mediaDevices.getUserMedia({ audio: true });

    console.log("🎤 Mic permission granted.");

    const vapi = vapiRef.current;

    if (!vapi) {
      console.error("❌ Vapi not initialized");
      throw new Error("Vapi not initialized");
    }

    // Stop any existing call
    try {
      console.log("🛑 Stopping existing call session if any...");
      await vapi.stop();
    } catch (err) {
      console.warn("⚠ Previous call stop failed (ignored)", err);
    }

    const questionList = getQuestions().join("\n");

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
            content: `You are an AI interviewer.  
Ask the following questions one by one:
${questionList}`,
          },
        ],
      },
    };

    console.log("🚀 Starting Vapi call with options:", assistantOptions);

    await vapi.start(assistantOptions);

    console.log("✅ Interview started successfully");

    setSeconds(0);
    setIsRunning(true);
  } catch (err) {
    console.error("❌ Vapi start failed:", err);
    toast.error("Cannot start interview. Check microphone permissions or meeting status.");
  }
};


  // --------------------------
  //    GENERATE FEEDBACK
  // --------------------------
  const GenerateFeedback = async () => {
  try {
    if (!conversation || conversation.length < 3) {
      console.warn("Conversation too short - skipping feedback");
      return;
    }

    const result = await axios.post("/api/ai-feedback", {
      conversation,
    });

    let content = result.data.content;
    if (!content) return;

    content = content
      .replace("```json", "")
      .replace("```", "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("❌ AI returned invalid JSON:", content);
      return;
    }

    const { data, error } = await supabase
      .from("interview-feedback")
      .insert([
        {
          userName: interviewInfo.userName,
          userEmail: interviewInfo.userEmail,
          interview_id,
          feedback: parsed.feedback,
          recommendation: parsed.feedback?.recommendation === "Yes", 
        },
      ])
      .select();

    if (error) {
      console.error("❌ Supabase Insert Error", error);
    } else {
      console.log("✅ Feedback Saved:", data);
    }
  } catch (e) {
    console.error("❌ Feedback generation failed", e);
  }
};

  // --------------------------
  //    MANUAL END CALL
  // --------------------------
  const stopInterview = async () => {
    try {
      await vapiRef.current?.stop();
    } catch {}

    setCallActive(false);
    setIsRunning(false);

    await GenerateFeedback();

    router.replace(`/interview/${interview_id}/completed`);
  };

  // --------------------------
  //      TIMER EFFECT
  // --------------------------
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s) => {
    const hrs = String(Math.floor(s / 3600)).padStart(2, "0");
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${hrs}:${mins}:${sec}`;
  };

  // --------------------------
  //        UI
  // --------------------------
  return (
    <div className="p-28 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          {formatTime(seconds)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">

        {/* AI Box */}
        <div className="relative bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          {callActive && !activeUser && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 bg-blue-500 rounded-full opacity-30 animate-ping" />
            </div>
          )}

          <Image
            src="/ai.png"
            width={100}
            height={100}
            className="w-[60px] h-[60px] rounded-full relative z-10"
            alt="AI avatar"
          />
          <h2 className="relative z-10">AI Recruiter</h2>
        </div>

        {/* User Box */}
        <div className="relative bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          {callActive && activeUser && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 bg-blue-500 rounded-full opacity-30 animate-ping" />
            </div>
          )}

          <h2 className="text-2xl bg-primary text-white p-3 px-5 rounded-full relative z-10">
            {interviewInfo?.userName?.[0] ?? "U"}
          </h2>
          <h2 className="relative z-10">{interviewInfo?.userName}</h2>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-10 justify-center items-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full" />

        {!callActive ? (
          <button
            onClick={startCall}
            className="h-12 w-32 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md"
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
        {callActive ? "Interview in progress..." : "Click 'Start Interview' to begin"}
      </h2>
    </div>
  );
}

export default StartInterview;
