
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-8 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full shadow-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="ml-6">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                KYC Verification
              </h1>
              <div className="flex items-center justify-center mt-2">
                <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-slate-600">Powered by AI</span>
              </div>
            </div>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Secure and efficient identity verification system designed for 
            <span className="text-blue-600 font-semibold"> modern businesses</span>
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Submit KYC Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
            <Card className="relative backdrop-blur-xl bg-white/70 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group-hover:transform group-hover:scale-[1.02] group-hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Users className="h-9 w-9 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-slate-800 font-bold mb-3">Submit KYC</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Complete your identity verification process with our streamlined workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10 pb-8">
                <Link to="/kyc-form">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn">
                    <span className="group-hover/btn:mr-2 transition-all duration-200">Start Verification</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-all duration-200 transform translate-x-1 group-hover/btn:translate-x-0" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Check Status Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
            <Card className="relative backdrop-blur-xl bg-white/70 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group-hover:transform group-hover:scale-[1.02] group-hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <CheckCircle className="h-9 w-9 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-slate-800 font-bold mb-3">Check Status</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Track your verification progress and view detailed results in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10 pb-8">
                <Link to="/status-check">
                  <Button className="w-full bg-white/90 backdrop-blur-sm border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 font-semibold py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn">
                    <span className="group-hover/btn:mr-2 transition-all duration-200">Check Status</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-all duration-200 transform translate-x-1 group-hover/btn:translate-x-0" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Admin Portal Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
            <Card className="relative backdrop-blur-xl bg-white/70 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group-hover:transform group-hover:scale-[1.02] group-hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Shield className="h-9 w-9 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-slate-800 font-bold mb-3">Admin Portal</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Review, manage, and approve KYC applications with powerful admin tools
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10 pb-8">
                <Link to="/admin">
                  <Button className="w-full bg-white/90 backdrop-blur-sm border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 font-semibold py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn">
                    <span className="group-hover/btn:mr-2 transition-all duration-200">Admin Dashboard</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-all duration-200 transform translate-x-1 group-hover/btn:translate-x-0" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-6 bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-white/20">
            <div className="flex items-center space-x-2 text-slate-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Bank-grade Security</span>
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="flex items-center space-x-2 text-slate-600">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">ISO 27001 Certified</span>
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
