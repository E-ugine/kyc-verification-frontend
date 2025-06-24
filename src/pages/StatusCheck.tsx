
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

const StatusCheck = () => {
  const [searchValue, setSearchValue] = useState("");
  const [application, setApplication] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const applications = JSON.parse(localStorage.getItem("kycApplications") || "[]");
    const found = applications.find((app: any) => 
      app.email === searchValue || app.idNumber === searchValue
    );
    
    setApplication(found || null);
    setSearched(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Check Verification Status</h1>
          <p className="text-slate-600">Enter your email or ID number to check your KYC status</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-blue-600" />
                Search Application
              </CardTitle>
              <CardDescription>Enter your email address or ID number used during registration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Email or ID Number</Label>
                  <Input
                    id="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Enter your email or ID number"
                    className="border-slate-300 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4 mr-2" />
                  Check Status
                </Button>
              </div>
            </CardContent>
          </Card>

          {searched && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
              </CardHeader>
              <CardContent>
                {application ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-lg text-slate-800">{application.fullName}</h3>
                        <p className="text-sm text-slate-600">ID: {application.idNumber}</p>
                        <p className="text-sm text-slate-600">
                          Submitted: {new Date(application.submissionDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(application.status)}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 border border-slate-200 rounded-lg">
                      {getStatusIcon(application.status)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 capitalize">
                          {application.status} Status
                        </h4>
                        <p className="text-sm text-slate-600 mt-1">
                          {application.status === "pending" && "Your application is being reviewed. You will be notified once the verification is complete."}
                          {application.status === "approved" && "Congratulations! Your identity has been verified successfully."}
                          {application.status === "rejected" && "Your application was not approved. Please see the reason below and resubmit if needed."}
                        </p>
                        {application.status === "rejected" && application.notes && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                            <h5 className="text-sm font-semibold text-red-800 mb-1">Rejection Reason:</h5>
                            <p className="text-sm text-red-700">{application.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {application.status === "rejected" && (
                      <div className="text-center">
                        <Link to="/kyc-form">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Submit New Application
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">No Application Found</h3>
                    <p className="text-slate-600 mb-4">
                      We couldn't find any application with the provided email or ID number.
                    </p>
                    <Link to="/kyc-form">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Submit New Application
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusCheck;
