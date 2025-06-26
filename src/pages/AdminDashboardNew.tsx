import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Search,
  Eye,
  Filter,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  Loader2,
  RefreshCw
} from "lucide-react";
import axios from "axios";

interface KYCApplication {
  id: string;
  full_name: string;
  country: string;
  id_number: string;
  email: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
  address?: string;
  dob?: string;
  selfie_path?: string;
  id_doc_path?: string;
  rejection_reason?: string;
}

const AdminDashboardNew = () => {
  const [applications, setApplications] = useState<KYCApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<KYCApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, [refreshTrigger]);

  useEffect(() => {
    filterApplications();
  }, [searchTerm, statusFilter, applications]);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await axios.get("http://localhost:8000/kyc/applications", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const formattedData = response.data.map((app: any) => ({
        ...app,
        full_name: app.full_name || "Unknown",
        status: app.status || "PENDING",
        created_at: app.created_at || new Date().toISOString()
      }));

      setApplications(formattedData);
      filterApplications();
    } catch (error) {
      console.error("Error fetching applications:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
          toast({
            title: "Session expired",
            description: "Please login again",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: error.response?.data?.message || "Failed to fetch applications",
            variant: "destructive"
          });
        }
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        (app.full_name?.toLowerCase().includes(term) ||
        (app.id_number?.toLowerCase().includes(term)) ||
        (app.email?.toLowerCase().includes(term))
      ));
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(app =>
        app.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredApplications(filtered);
  };

  const refreshApplications = () => {
    setIsRefreshing(true);
    setRefreshTrigger(prev => prev + 1);
    toast({
      title: "Refreshing applications",
      description: "Fetching latest data...",
    });
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    refreshApplications();
  };

  const handleViewApplication = (id: string) => {
    navigate(`/admin/view/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
    toast({
      title: "Logged out successfully",
      description: "You have been signed out",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusCounts = () => {
    return {
      total: applications.length,
      pending: applications.filter(app => app.status === "PENDING").length,
      approved: applications.filter(app => app.status === "APPROVED").length,
      rejected: applications.filter(app => app.status === "REJECTED").length,
    };
  };

  const counts = getStatusCounts();

  if (isLoading && !isRefreshing) {
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
          <div className="flex space-x-2">
            <Button onClick={refreshApplications} variant="outline" disabled={isRefreshing}>
              {isRefreshing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
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
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                Search & Filter
              </CardTitle>
              <div className="text-sm text-slate-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
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
                  onClick={() => handleStatusFilterChange("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  onClick={() => handleStatusFilterChange("pending")}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === "approved" ? "default" : "outline"}
                  onClick={() => handleStatusFilterChange("approved")}
                  size="sm"
                >
                  Approved
                </Button>
                <Button
                  variant={statusFilter === "rejected" ? "default" : "outline"}
                  onClick={() => handleStatusFilterChange("rejected")}
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
            <CardDescription>Click "View" to see full application details</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredApplications.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No Applications Found</h3>
                <p className="text-slate-600">No applications match your current search criteria.</p>
                <Button onClick={refreshApplications} variant="ghost" className="mt-4">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
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
                          <h3 className="font-semibold text-slate-800">{app.full_name}</h3>
                          <p className="text-sm text-slate-600">ID: {app.id_number}</p>
                          <p className="text-sm text-slate-600">Country: {app.country}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-sm text-slate-600">{app.email}</p>
                          <p className="text-sm text-slate-500">
                            Submitted: {new Date(app.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(app.status)}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewApplication(app.id)}
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
      </div>
    </div>
  );
};

export default AdminDashboardNew;