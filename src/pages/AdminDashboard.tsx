import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Search, Eye, Filter, Users,
  Clock, CheckCircle, XCircle
} from "lucide-react";

interface KYCApplication {
  id: string;
  fullName: string;
  idNumber: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string | Date;
}

const AdminDashboard = () => {
  const [applications, setApplications] = useState<KYCApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<KYCApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const loadAndValidateApplications = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("kycApplications") || "[]");

        const validatedApplications: KYCApplication[] = stored.map((app: any) => ({
          id: String(app.id || Date.now()),
          fullName:
            typeof app.fullName === "string"
              ? app.fullName.trim()
              : String(app.fullName || "Unknown"),
          idNumber:
            typeof app.idNumber === "string"
              ? app.idNumber.trim()
              : String(app.idNumber || ""),
          email:
            typeof app.email === "string"
              ? app.email.trim().toLowerCase()
              : String(app.email || "").toLowerCase(),
          status: ["pending", "approved", "rejected"].includes(app.status)
            ? app.status
            : "pending",
          submissionDate: app.submissionDate || new Date().toISOString(),
        }));

        setApplications(validatedApplications);
        setFilteredApplications(validatedApplications);
      } catch (error) {
        console.error("Failed to load applications:", error);
        setApplications([]);
        setFilteredApplications([]);
      }
    };

    loadAndValidateApplications();
  }, []);

  useEffect(() => {
    const filterApplications = () => {
      let filtered = applications;

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter((app) =>
          String(app.fullName || "").toLowerCase().includes(term) ||
          String(app.idNumber || "").toLowerCase().includes(term) ||
          String(app.email || "").toLowerCase().includes(term)
        );
      }

      if (statusFilter !== "all") {
        filtered = filtered.filter((app) => app.status === statusFilter);
      }

      setFilteredApplications(filtered);
    };

    filterApplications();
  }, [searchTerm, statusFilter, applications]);

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
    return {
      total: applications.length,
      pending: applications.filter((app) => app.status === "pending").length,
      approved: applications.filter((app) => app.status === "approved").length,
      rejected: applications.filter((app) => app.status === "rejected").length,
    };
  };

  const counts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Review and manage KYC applications</p>
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
                {["all", "pending", "approved", "rejected"].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    onClick={() => setStatusFilter(status)}
                    size="sm"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
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
                          <h3 className="font-semibold text-slate-800">{app.fullName || "Unknown"}</h3>
                          <p className="text-sm text-slate-600">ID: {app.idNumber || "N/A"}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-sm text-slate-600">{app.email || "N/A"}</p>
                          <p className="text-sm text-slate-500">
                            {new Date(app.submissionDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(app.status)}
                      <Link to={`/admin/application/${app.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
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

export default AdminDashboard;
