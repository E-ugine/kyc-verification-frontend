
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle, XCircle, FileText, User, Calendar, MapPin, Mail, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [application, setApplication] = useState<any>(null);
  const [notes, setNotes] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem("kycApplications") || "[]");
    const found = applications.find((app: any) => app.id === id);
    if (found) {
      setApplication(found);
      setNotes(found.notes || "");
    }
  }, [id]);

  const updateApplicationStatus = (status: string, reason: string = "") => {
    const applications = JSON.parse(localStorage.getItem("kycApplications") || "[]");
    const updatedApplications = applications.map((app: any) => 
      app.id === id ? { ...app, status, notes: reason || notes } : app
    );
    localStorage.setItem("kycApplications", JSON.stringify(updatedApplications));
    
    setApplication((prev: any) => ({ ...prev, status, notes: reason || notes }));
    
    toast({
      title: status === "approved" ? "Application Approved" : "Application Rejected",
      description: `The application has been ${status} successfully.`
    });

    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };

  const handleApprove = () => {
    updateApplicationStatus("approved");
    setShowApproveDialog(false);
  };

  const handleReject = () => {
    if (!notes.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejecting this application.",
        variant: "destructive"
      });
      return;
    }
    updateApplicationStatus("rejected", notes);
    setShowRejectDialog(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Review</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-96 text-center">
          <CardContent className="pt-6">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Application Not Found</h2>
            <p className="text-slate-600 mb-4">The requested application could not be found.</p>
            <Link to="/admin">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Application Details</h1>
              <p className="text-slate-600">Review and manage this KYC application</p>
            </div>
            {getStatusBadge(application.status)}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Application Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">Full Name</p>
                      <p className="text-slate-800">{application.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">Date of Birth</p>
                      <p className="text-slate-800">{application.dateOfBirth}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Hash className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">ID Number</p>
                      <p className="text-slate-800">{application.idNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">Country</p>
                      <p className="text-slate-800">{application.country}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-slate-600">Email Address</p>
                    <p className="text-slate-800">{application.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-slate-600">Address</p>
                    <p className="text-slate-800">{application.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Previews */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Uploaded Documents
                </CardTitle>
                <CardDescription>Review the submitted identity documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Passport/ID Document</h4>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50">
                      <FileText className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">
                        {application.files?.passport?.name || "passport-document.jpg"}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Document preview not available in demo</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Selfie Photo</h4>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50">
                      <User className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">
                        {application.files?.selfie?.name || "selfie-photo.jpg"}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Photo preview not available in demo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>
                  Submitted on {new Date(application.submissionDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  {getStatusBadge(application.status)}
                </div>
                {application.status === "pending" && (
                  <div className="space-y-3">
                    <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Application
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Approve Application</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to approve this KYC application? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                            Approve
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Application
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject Application</DialogTitle>
                          <DialogDescription>
                            Please provide a reason for rejecting this application. This information will be shared with the applicant.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                          <Label htmlFor="rejection-reason">Rejection Reason</Label>
                          <Textarea
                            id="rejection-reason"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Explain why this application is being rejected..."
                            className="min-h-[100px]"
                          />
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleReject} variant="destructive">
                            Reject Application
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Admin Notes</CardTitle>
                <CardDescription>Internal notes and comments about this application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your notes about this application..."
                    className="min-h-[120px]"
                  />
                  <Button
                    onClick={() => {
                      const applications = JSON.parse(localStorage.getItem("kycApplications") || "[]");
                      const updatedApplications = applications.map((app: any) => 
                        app.id === id ? { ...app, notes } : app
                      );
                      localStorage.setItem("kycApplications", JSON.stringify(updatedApplications));
                      toast({
                        title: "Notes Saved",
                        description: "Your notes have been saved successfully."
                      });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Save Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
