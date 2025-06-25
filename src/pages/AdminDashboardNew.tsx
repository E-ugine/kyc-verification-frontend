import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Search, Eye, Filter, Users, Clock, CheckCircle, XCircle, LogOut, Loader2 } from "lucide-react";
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
}

const AdminDashboardNew = () => {
  const [applications, setApplications] = useState<KYCApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<KYCApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<KYCApplication | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, applications]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await axios.get("http://localhost:8000/admin/all", {
        headers: {
          Authorization:`Bearer ${token}`
        }
      });
      setApplications(response.data);
      setFilteredApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      // If token is invalid, redirect to login
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }
      // Fallback to localStorage data if API fails
      const stored = JSON.parse(localStorage.getItem("kycApplications") || "[]");
      setApplications(stored);
      setFilteredApplications(stored);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`http://localhost:8000/admin/verify/${id}`, {
        status: "approved"
      }, {
        headers: {
          Authorization: token
        }
      });
      
      // Update local state
      const updated = applications.map(app => 
        app.id === id ? { ...app, status: "approved" as const } : app
      );
      setApplications(updated);
      setSelectedApp(null);
    } catch (error) {
      console.error("Error approving application:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!selectedApp || !rejectReason.trim()) return;
    
    setActionLoading(selectedApp.id);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`http://localhost:8000/admin/verify/${selectedApp.id}`, {
        status: "rejected",
        reason: rejectReason
      }, {
        headers: {
          Authorization: token
        }
      });
      
      // Update local state
      const updated = applications.map(app => 
        app.id === selectedApp.id ? { ...app, status: "rejected" as const, notes: rejectReason } : app
      );
      setApplications(updated);
      setSelectedApp(null);
      setShowRejectDialog(false);
      setRejectReason("");
    } catch (error) {
      console.error("Error rejecting application:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusCounts = () => {
    const counts = {
      total: applications.length,
      pending: applications.filter(app => app.status === "pending").length,
      approved: applications.filter(app => app.status === "approved").length,
      rejected: applications.filter(app => app.status === "rejected").length,
    };
    return counts;
  };

  const counts = getStatusCounts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-slate-600">Loading applications...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Review and manage KYC applications</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Total Applications</p>
                  <p className="text-2xl font-bold text-slate-800">{counts.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="text-2xl font-bold text-slate-800">{counts.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Approved</p>
                  <p className="text-2xl font-bold text-slate-800">{counts.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center">
                <XCircle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Rejected</p>
                  <p className="text-2xl font-bold text-slate-800">{counts.rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-blue-600" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  onClick={() => setStatusFilter("pending")}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === "approved" ? "default" : "outline"}
                  onClick={() => setStatusFilter("approved")}
                  size="sm"
                >
                  Approved
                </Button>
                <Button
                  variant={statusFilter === "rejected" ? "default" : "outline"}
                  onClick={() => setStatusFilter("rejected")}
                  size="sm"
                >
                  Rejected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
            <CardDescription>Click on any application to view details and take action</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredApplications.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No Applications Found</h3>
                <p className="text-slate-600">No applications match your current search criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-slate-800">{app.fullName}</h3>
                          <p className="text-sm text-slate-600">ID: {app.id_number}</p>
                          <p className="text-sm text-slate-600">Country: {app.country}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-sm text-slate-600">{app.email}</p>
                          <p className="text-sm text-slate-500">
                            {new Date(app.submissionDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(app.status)}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedApp(app)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Application Detail Dialog */}
        {selectedApp && (
          <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Application Details - {selectedApp.fullName}</DialogTitle>
                <DialogDescription>
                  Review the submitted information and documents
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Personal Information</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Full Name</label>
                      <p className="text-slate-800">{selectedApp.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Date of Birth</label>
                      <p className="text-slate-800">{selectedApp.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">ID Number</label>
                      <p className="text-slate-800">{selectedApp.id_number}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Country</label>
                      <p className="text-slate-800">{selectedApp.country}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Email</label>
                      <p className="text-slate-800">{selectedApp.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Address</label>
                      <p className="text-slate-800">{selectedApp.address}</p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Documents</h3>
                  {selectedApp.passportImage && (
                    <div>
                      <label className="text-sm font-medium text-slate-600">Passport/ID</label>
                      <img
                        src={selectedApp.passportImage}
                        alt="Passport/ID"
                        className="mt-2 max-w-full h-48 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  {selectedApp.selfieImage && (
                    <div>
                      <label className="text-sm font-medium text-slate-600">Selfie</label>
                      <img
                        src={selectedApp.selfieImage}
                        alt="Selfie"
                        className="mt-2 max-w-full h-48 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
              </div>

              {selectedApp.status === "rejected" && selectedApp.notes && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <h4 className="font-semibold text-red-800 mb-2">Rejection Reason:</h4>
                  <p className="text-red-700">{selectedApp.notes}</p>
                </div>
              )}

              <DialogFooter className="flex gap-2">
                {selectedApp.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleApprove(selectedApp.id)}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={actionLoading === selectedApp.id}
                    >
                      {actionLoading === selectedApp.id ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Approve
                    </Button>
                    <Button
                      onClick={() => setShowRejectDialog(true)}
                      variant="destructive"
                      disabled={actionLoading === selectedApp.id}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                <Button variant="outline" onClick={() => setSelectedApp(null)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this application.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                variant="destructive"
                disabled={!rejectReason.trim() || actionLoading === selectedApp?.id}
              >
                {actionLoading === selectedApp?.id ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Reject Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboardNew;
