
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Calendar, MapPin, Mail, FileText, Camera, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import axios from "axios";

interface KYCApplication {
  id: string;
  fullName: string;
  country: string;
  id_number: string;
  email: string;
  dateOfBirth: string;
  address: string;
  passportImage?: string;
  selfieImage?: string;
  status: "pending" | "approved" | "rejected";
  submissionDate: string;
  notes?: string;
  rejection_reason?: string;
}

const AdminApplicationView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<KYCApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchApplication(id);
    }
  }, [id]);

  const fetchApplication = async (applicationId: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await axios.get(`http://localhost:8000/admin/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setApplication(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching application:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
          return;
        }
        if (error.response?.status === 404) {
          setError("Application not found");
        } else {
          setError("Failed to load application details");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!application) return;
    
    setActionLoading("approve");
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`http://localhost:8000/admin/verify/${application.id}`, {
        status: "approved"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setApplication(prev => prev ? { ...prev, status: "approved" } : null);
    } catch (error) {
      console.error("Error approving application:", error);
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!application) return;

    const reason = prompt("Please provide a reason for rejection:");
    if (!reason) return;
    
    setActionLoading("reject");
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`http://localhost:8000/admin/verify/${application.id}`, {
        status: "rejected",
        reason: reason
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setApplication(prev => prev ? { ...prev, status: "rejected", rejection_reason: reason } : null);
    } catch (error) {
      console.error("Error rejecting application:", error);
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-4 w-4 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-4 w-4 mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-4 w-4 mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-slate-600">Loading application details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Error</h2>
            <p className="text-slate-600 mb-4">{error}</p>
            <Link to="/admin">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Application Not Found</h2>
            <p className="text-slate-600 mb-4">The requested application could not be found.</p>
            <Link to="/admin">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Application Details</h1>
              <p className="text-slate-600">Review KYC application for {application.fullName}</p>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(application.status)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Full Name</label>
                <p className="text-slate-800 font-medium">{application.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Date of Birth</label>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                  <p className="text-slate-800">{new Date(application.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">ID Number</label>
                <p className="text-slate-800 font-mono">{application.id_number}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Country</label>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                  <p className="text-slate-800">{application.country}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Email Address</label>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-slate-500" />
                  <p className="text-slate-800">{application.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Address</label>
                <p className="text-slate-800">{application.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Submission Date</label>
                <p className="text-slate-800">{new Date(application.submissionDate).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2 text-blue-600" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {application.passportImage && (
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">ID Document</label>
                  <div className="border border-slate-200 rounded-lg p-2 bg-white">
                    <img
                      src={application.passportImage}
                      alt="ID Document"
                      className="w-full max-h-48 object-contain rounded"
                      onError={(e) => {
                        const img = e.currentTarget;
                        const fallback = img.nextElementSibling as HTMLElement;
                        img.style.display = 'none';
                        if (fallback) {
                          fallback.style.display = 'block';
                        }
                      }}
                    />
                    <div style={{ display: 'none' }} className="text-center py-8 text-slate-500">
                      <FileText className="h-8 w-8 mx-auto mb-2" />
                      <p>Image failed to load</p>
                    </div>
                  </div>
                </div>
              )}

              {application.selfieImage && (
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">Selfie</label>
                  <div className="border border-slate-200 rounded-lg p-2 bg-white">
                    <img
                      src={application.selfieImage}
                      alt="Selfie"
                      className="w-full max-h-48 object-contain rounded"
                      onError={(e) => {
                        const img = e.currentTarget;
                        const fallback = img.nextElementSibling as HTMLElement;
                        img.style.display = 'none';
                        if (fallback) {
                          fallback.style.display = 'block';
                        }
                      }}
                    />
                    <div style={{ display: 'none' }} className="text-center py-8 text-slate-500">
                      <User className="h-8 w-8 mx-auto mb-2" />
                      <p>Image failed to load</p>
                    </div>
                  </div>
                </div>
              )}

              {!application.passportImage && !application.selfieImage && (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="h-8 w-8 mx-auto mb-2" />
                  <p>No documents uploaded</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Status and Actions */}
        <Card className="border-0 shadow-md mt-8">
          <CardHeader>
            <CardTitle>Application Status & Actions</CardTitle>
            <CardDescription>Current status and available actions for this application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">Current Status</p>
                {getStatusBadge(application.status)}
                {application.status === "rejected" && (application.rejection_reason || application.notes) && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <h4 className="font-semibold text-red-800 mb-2">Rejection Reason:</h4>
                    <p className="text-red-700">{application.rejection_reason || application.notes}</p>
                  </div>
                )}
              </div>

              {application.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleApprove}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={actionLoading === "approve"}
                  >
                    {actionLoading === "approve" ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Approve
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="destructive"
                    disabled={actionLoading === "reject"}
                  >
                    {actionLoading === "reject" ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminApplicationView;
