
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import api from "@/lib/api";

interface KYCReviewActionsProps {
  applicationId: number;
  currentStatus: "PENDING" | "APPROVED" | "REJECTED";
  onStatusChange: (newStatus: "PENDING" | "APPROVED" | "REJECTED") => void;
}

export const KYCReviewActions = ({ 
  applicationId, 
  currentStatus, 
  onStatusChange 
}: KYCReviewActionsProps) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAction = async (action: "APPROVED" | "REJECTED") => {
    setIsLoading(action);
    
    try {
      let requestData: any = { action };
      
      if (action === "REJECTED") {
        const reason = window.prompt("Please provide a reason for rejection:");
        if (!reason) {
          setIsLoading(null);
          return;
        }
        requestData.rejection_reason = reason;
      }

      const response = await api.patch(`/kyc/admin/review/${applicationId}`, requestData);
      
      onStatusChange(response.data.status);
      
      toast({
        title: `Application ${action.toLowerCase()}`,
        description: `The KYC application has been ${action.toLowerCase()} successfully`,
        variant: "default"
      });
    } catch (error) {
      console.error(`Error ${action.toLowerCase()} application:`, error);
      let errorMessage = `Failed to ${action.toLowerCase()} the application`;
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.detail || errorMessage;
      }
      toast({
        title: `${action.charAt(0) + action.slice(1).toLowerCase()} Failed`,
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (currentStatus !== "PENDING") {
    return getStatusBadge(currentStatus);
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={() => handleAction("APPROVED")}
        className="bg-green-600 hover:bg-green-700"
        disabled={isLoading === "APPROVED"}
      >
        {isLoading === "APPROVED" ? (
          <Loader2 className="h-3 w-3 animate-spin mr-1" />
        ) : (
          <CheckCircle className="h-3 w-3 mr-1" />
        )}
        Approve
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => handleAction("REJECTED")}
        disabled={isLoading === "REJECTED"}
      >
        {isLoading === "REJECTED" ? (
          <Loader2 className="h-3 w-3 animate-spin mr-1" />
        ) : (
          <XCircle className="h-3 w-3 mr-1" />
        )}
        Reject
      </Button>
    </div>
  );
};
