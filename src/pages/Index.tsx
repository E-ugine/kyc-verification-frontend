
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-slate-800">KYC Verification</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Secure and efficient identity verification system for users and administrators
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-slate-800">Submit KYC</CardTitle>
              <CardDescription>
                Complete your identity verification process
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/kyc-form">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Verification
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-slate-800">Check Status</CardTitle>
              <CardDescription>
                View your verification status and results
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/status-check">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Check Status
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-slate-800">Admin Portal</CardTitle>
              <CardDescription>
                Review and manage KYC applications
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/admin">
                <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                  Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
