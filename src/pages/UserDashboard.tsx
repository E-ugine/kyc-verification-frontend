import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft, Upload, FileText, Camera, AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const countries = [
  "United States", "Kenya", "Canada", "United Kingdom", "Germany",
  "France", "Australia", "Japan", "Singapore", "India", "Brazil",
];

const UserDashboard = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    idNumber: "",
    country: "",
    address: "",
  });

  const [files, setFiles] = useState({
    passport: null as File | null,
    selfie: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [debugInfo, setDebugInfo] = useState("");

  const passportInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const handleFileChange = (type: 'passport' | 'selfie', file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file }));
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.fullName.trim()) errors.push("Full Name is required");
    if (!formData.dob) errors.push("Date of Birth is required");
    if (!formData.idNumber.trim()) errors.push("ID Number is required");
    if (!formData.country) errors.push("Country is required");
    if (!formData.address.trim()) errors.push("Address is required");

    if (formData.dob) {
      const dob = new Date(formData.dob);
      const formattedDob = dob.toISOString().split('T')[0]; 
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (age < 18 || (age === 18 && monthDiff < 0)) {
        errors.push("You must be at least 18 years old");
      }
    }

    if (!files.passport) errors.push("Passport/ID document is required");
    if (!files.selfie) errors.push("Selfie photo is required");

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (files.passport && !allowedTypes.includes(files.passport.type)) {
      errors.push("Passport/ID must be a valid image file (JPEG, PNG, GIF)");
    }
    if (files.selfie && !allowedTypes.includes(files.selfie.type)) {
      errors.push("Selfie must be a valid image file (JPEG, PNG, GIF)");
    }

    if (files.passport && files.passport.size > 5 * 1024 * 1024) {
      errors.push("Passport/ID file must be less than 5MB");
    }
    if (files.selfie && files.selfie.size > 5 * 1024 * 1024) {
      errors.push("Selfie file must be less than 5MB");
    }

    return errors;
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      dob: "",
      idNumber: "",
      country: "",
      address: "",
    });
    setFiles({ passport: null, selfie: null });
    if (passportInputRef.current) passportInputRef.current.value = "";
    if (selfieInputRef.current) selfieInputRef.current.value = "";
  };

  const handleSubmit = async () => {
  const errors = validateForm();
  if (errors.length > 0) {
    setValidationErrors(errors);
    return;
  }

  setIsSubmitting(true);
  setDebugInfo("");

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("full_name", formData.fullName);

    const dobFormatted = new Date(formData.dob).toISOString().split("T")[0];
    formDataToSend.append("dob", dobFormatted);

    formDataToSend.append("id_number", formData.idNumber);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("selfie", files.selfie!);
    formDataToSend.append("id_doc", files.passport!);

    const response = await fetch("http://localhost:8000/kyc/submit", {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${response.statusText}\n${errorText}`);
    }

    const result = await response.json();
    console.log("KYC Submission Success:", result);
    setDebugInfo(`Success! Application submitted with ID: ${result.id}`);
    resetForm();
  } catch (error: any) {
    console.error("Error submitting KYC application:", error);
    setDebugInfo(`Error: ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div
            onClick={() => navigate("/")}
            title="Go back to home"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            KYC Verification Form
          </h1>
          <p className="text-slate-600">
            Please provide accurate information for identity verification
          </p>
        </div>

        {validationErrors.length > 0 && (
          <Alert className="max-w-2xl mx-auto mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-red-700">{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Card className="max-w-2xl mx-auto shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </CardTitle>
            <CardDescription>All fields marked with * are required</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    placeholder="Enter your ID number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your full address"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Passport/ID Document *</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      ref={passportInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('passport', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 mb-2">
                      {files.passport ? (
                        <>
                          {files.passport.name}<br />
                          <span className="text-xs text-slate-500">
                            {(files.passport.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </>
                      ) : "Click to upload passport/ID"}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => passportInputRef.current?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Selfie Photo *</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      ref={selfieInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('selfie', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Camera className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 mb-2">
                      {files.selfie ? (
                        <>
                          {files.selfie.name}<br />
                          <span className="text-xs text-slate-500">
                            {(files.selfie.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </>
                      ) : "Click to upload selfie"}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => selfieInputRef.current?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit KYC Application"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {process.env.NODE_ENV === "development" && debugInfo && (
          <Card className="max-w-2xl mx-auto mt-6 bg-slate-50">
            <CardHeader>
              <CardTitle className="text-sm">Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-slate-700 whitespace-pre-wrap overflow-auto max-h-96">
                {debugInfo}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
