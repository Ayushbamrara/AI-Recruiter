import moment from "moment";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Copy, Send } from "lucide-react";

const InterviewCard = ({ interview , viewDetail = false}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
   const interviewLink = `${baseUrl}/interview/${interview?.interview_id}`;
  return (
    <div className="p-5 mt-5 bg-white rounded-lg border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 bg-primary rounded-full"></div>
        <h2 className="text-sm text-gray-600">
          {moment(interview?.created_at).format("DD MMM YYYY")}
        </h2>
      </div>

      {/* Job Info */}
      <h2 className="mt-3 font-bold text-lg">{interview?.jobPosition}</h2>
      <h2 className="text-gray-600 flex justify-between">{interview?.duration} 
      <span className='text-green-700'>{interview['interview-feedback']?.length} Candidates</span> </h2>
      {/* Buttons */}
      {!viewDetail? <div className="mt-4 space-y-2">
        <Button
          variant="outline"
          className="w-full flex gap-2 items-center"
          onClick={() => navigator.clipboard.writeText(interviewLink)}
        >
          <Copy size={16} /> Copy Link
        </Button>

        <Button
          variant="outline"
          className="w-full flex gap-2 items-center"
          onClick={() => window.open(`mailto:?body=${interviewLink}`)}
        >
          <Send size={16} /> Send
        </Button>
      </div>
      :
      <Link href={`/scheduled-interview/${interview?.interview_id}/details`}>
      <Button className='mt-5 w-full' variant='outline'> View Detail <ArrowRight /></Button>
      </Link> 
        }
    </div>
    
  );
};

export default InterviewCard;
