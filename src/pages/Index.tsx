
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, CheckCircle, ArrowRight, Sparkles, Zap, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 dark:from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-bl from-blue-200/30 dark:from-blue-800/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-indigo-200/30 dark:from-indigo-800/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Floating Security Icons */}
      <div className="absolute top-20 left-10 opacity-5 dark:opacity-10">
        <Shield className="h-16 w-16 text-blue-500 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }} />
      </div>
      <div className="absolute top-40 right-20 opacity-5 dark:opacity-10">
        <Eye className="h-12 w-12 text-indigo-500 animate-bounce" style={{ animationDelay: '4s', animationDuration: '4s' }} />
      </div>
      <div className="absolute bottom-40 left-20 opacity-5 dark:opacity-10">
        <Zap className="h-14 w-14 text-purple-500 animate-bounce" style={{ animationDelay: '6s', animationDuration: '3.5s' }} />
      </div>

      {/* Navigation */}
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 group space-y-4 sm:space-y-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-3 sm:p-4 rounded-full shadow-xl animate-pulse">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>
            <div className="sm:ml-6 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent leading-tight">
                KYC Verification
              </h1>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <Sparkles className="h-4 w-4 text-blue-500 mr-2 animate-pulse" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Powered by AI</span>
              </div>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium px-4">
            Secure and efficient identity verification system designed for 
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> modern African fintech</span>
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12 sm:mb-20">
          {/* Submit KYC Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
            <Card className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-0 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 rounded-2xl overflow-hidden group-hover:transform group-hover:scale-[1.02] group-hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 dark:from-gray-800/90 to-white/60 dark:to-gray-800/60"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Users className="h-7 w-7 sm:h-9 sm:w-9 text-white group-hover:scale-110 transition-transform duration-300 animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-slate-800 dark:text-white font-bold mb-3">Submit KYC</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  Complete your identity verification process with our streamlined workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10 pb-6 sm:pb-8">
                <Link to="/kyc-form">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 sm:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn text-sm sm:text-base">
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
            <Card className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-0 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 rounded-2xl overflow-hidden group-hover:transform group-hover:scale-[1.02] group-hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 dark:from-gray-800/90 to-white/60 dark:to-gray-800/60"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <CheckCircle className="h-7 w-7 sm:h-9 sm:w-9 text-white group-hover:scale-110 transition-transform duration-300 animate-pulse" style={{ animationDelay: '2s' }} />
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-slate-800 dark:text-white font-bold mb-3">Check Status</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  Track your verification progress and view detailed results in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10 pb-6 sm:pb-8">
                <Link to="/status-check">
                  <Button className="w-full bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border-2 border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-300 dark:hover:border-green-600 font-semibold py-4 sm:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn text-sm sm:text-base">
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
            <Card className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-0 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 rounded-2xl overflow-hidden group-hover:transform group-hover:scale-[1.02] group-hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 dark:from-gray-800/90 to-white/60 dark:to-gray-800/60"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Shield className="h-7 w-7 sm:h-9 sm:w-9 text-white group-hover:scale-110 transition-transform duration-300 animate-pulse" style={{ animationDelay: '3s' }} />
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-slate-800 dark:text-white font-bold mb-3">Admin Portal</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  Review, manage, and approve KYC applications with powerful admin tools
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10 pb-6 sm:pb-8">
                <Link to="/admin">
                  <Button className="w-full bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-300 dark:hover:border-purple-600 font-semibold py-4 sm:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn text-sm sm:text-base">
                    <span className="group-hover/btn:mr-2 transition-all duration-200">Admin Dashboard</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-all duration-200 transform translate-x-1 group-hover/btn:translate-x-0" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex flex-wrap items-center justify-center space-x-3 sm:space-x-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-lg border border-white/20 dark:border-gray-700/30">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-xs sm:text-sm font-medium">Bank-grade Security</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span className="text-xs sm:text-sm font-medium">ISO 27001 Certified</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-xs sm:text-sm font-medium">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <TrustSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
