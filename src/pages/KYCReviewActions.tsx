import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import axios from "axios";

interface KYCReviewProps {
  applicationId: number;
  currentStatus: "PENDING" | "APPROVED" | "REJECTED";
  onStatusChange: (newStatus: "PENDING" | "APPROVED" | "REJECTED") => void;
}

export const KYCReviewActions = ({ 
  applicationId, 
  currentStatus,
  onStatusChange 
}: KYCReviewProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<"approve" | "reject" | null>(null);

  const handleReview = async (action: "APPROVED" | "REJECTED", reason?: string) => {
    if (action === "REJECTED" && !reason) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(action === "APPROVED" ? "approve" : "reject");

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(
        `http://localhost:8000/kyc/admin/review/${applicationId}`,
        {
          action,
          rejection_reason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: `Application ${action}`,
        description: `The KYC application has been ${action.toLowerCase()}`,
      });

      onStatusChange(action);
      if (action === "APPROVED") {
        navigate("/admin");
      }
    } catch (error) {
      console.error(`Error ${action.toLowerCase()}ing application:`, error);
      let errorMessage = `Failed to ${action.toLowerCase()} the application`;
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.detail || errorMessage;
      }
      toast({
        title: `${action} Failed`,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleApprove = () => handleReview("APPROVED");

  const handleReject = () => {
    const reason = window.prompt("Please enter the rejection reason:");
    if (reason !== null) {
      handleReview("REJECTED", reason);
    }
  };

  if (currentStatus !== "PENDING") {
    return (
      <Badge
        variant={
          currentStatus === "APPROVED"
            ? "default"
            : currentStatus === "REJECTED"
            ? "destructive"
            : "secondary"
        }
        className={`capitalize ${
          currentStatus === "APPROVED" ? "bg-green-100 text-green-800" : ""
        }`}
      >
        {currentStatus.toLowerCase()}
      </Badge>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleApprove}
        className="bg-green-600 hover:bg-green-700"
        disabled={isLoading === "approve"}
      >
        {isLoading === "approve" ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <CheckCircle className="h-4 w-4 mr-2" />
        )}
        Approve
      </Button>
      <Button
        onClick={handleReject}
        variant="destructive"
        disabled={isLoading === "reject"}
      >
        {isLoading === "reject" ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <XCircle className="h-4 w-4 mr-2" />
        )}
        Reject
      </Button>
    </div>
  );
};