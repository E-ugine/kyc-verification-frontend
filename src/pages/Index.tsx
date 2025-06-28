
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, CheckCircle, ArrowRight, Sparkles, Zap, Eye, Clock, Globe, Lock, FileCheck, UserCheck, BarChart3, Mail, Phone, MapPin } from "lucide-react";
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Powerful Features for Modern KYC
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Built specifically for African fintech companies, our platform delivers enterprise-grade verification with unmatched speed and accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20 dark:border-gray-700/30">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Real-time Verification</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete identity verification in under 60 seconds with our AI-powered document analysis and biometric matching.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20 dark:border-gray-700/30">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Multi-Country Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Support for ID documents from 15+ African countries including Nigeria, Kenya, Ghana, and South Africa.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20 dark:border-gray-700/30">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Bank-Grade Security</h3>
              <p className="text-gray-600 dark:text-gray-400">
                End-to-end encryption, SOC 2 Type II compliance, and ISO 27001 certification ensure maximum data protection.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20 dark:border-gray-700/30">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Document Authentication</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced OCR and machine learning algorithms detect fraudulent documents with 99.5% accuracy rate.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20 dark:border-gray-700/30">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Biometric Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Facial recognition technology ensures the person submitting documents matches their official ID photo.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20 dark:border-gray-700/30">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive reporting and analytics to track verification rates, fraud detection, and compliance metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                About KYC Pro
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Empowering African fintech with cutting-edge identity verification technology
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  KYC Pro was founded with a simple yet powerful mission: to democratize access to world-class identity verification technology for African fintech companies. We believe that every business, regardless of size, should have access to the same enterprise-grade KYC solutions used by global financial institutions.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Our platform is built specifically for the African market, understanding the unique challenges of operating across multiple countries with different regulatory requirements, document types, and verification standards.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Founded in 2023 by former fintech executives</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Backed by leading African venture capital funds</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Headquartered in Lagos with offices across Africa</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/20 dark:border-gray-700/30">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Why Choose KYC Pro?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">African-First Approach</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Built for African markets with local expertise and regulatory knowledge.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">Enterprise-Grade Security</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Bank-level security with SOC 2 and ISO 27001 compliance.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">Developer-Friendly APIs</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">RESTful APIs with comprehensive documentation and SDKs.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">24/7 Support</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Dedicated support team with expertise in African fintech.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Ready to streamline your KYC process? Our team is here to help you get started.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Email</h4>
                      <p className="text-gray-600 dark:text-gray-400">support@kycpro.com</p>
                      <p className="text-gray-600 dark:text-gray-400">sales@kycpro.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-400">+234 800 123 4567</p>
                      <p className="text-gray-600 dark:text-gray-400">+254 700 123 456</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Offices</h4>
                      <p className="text-gray-600 dark:text-gray-400">Lagos, Nigeria (HQ)</p>
                      <p className="text-gray-600 dark:text-gray-400">Nairobi, Kenya</p>
                      <p className="text-gray-600 dark:text-gray-400">Cape Town, South Africa</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200/30 dark:border-blue-700/30">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Business Hours</h4>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">Monday - Friday: 8:00 AM - 6:00 PM (WAT)</p>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">24/7 Technical Support Available</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/20 dark:border-gray-700/30">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your KYC requirements..."
                    ></textarea>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
