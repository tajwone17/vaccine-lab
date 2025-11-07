"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Phone,
  CreditCard,
  Calendar,
  Clock,
  User,
  MapPin,
  Syringe,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

// Mock data - replace with actual API call
const mockAppointments = [
  {
    id: "APT-001",
    cardNumber: "VAC-2024-001",
    patientName: "John Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    appointmentDate: "2025-11-20",
    appointmentTime: "10:30 AM",
    vaccine: "COVID-19 Pfizer-BioNTech",
    doseNumber: "2nd Dose",
    location: "Main Health Center - Room 202",
    status: "confirmed",
  },
  {
    id: "APT-002",
    cardNumber: "VAC-2024-002",
    patientName: "Jane Smith",
    phone: "+1987654321",
    email: "jane.smith@example.com",
    appointmentDate: "2025-11-22",
    appointmentTime: "2:00 PM",
    vaccine: "Influenza Vaccine",
    doseNumber: "Annual Dose",
    location: "Community Clinic - Room 101",
    status: "pending",
  },
];

type Appointment = (typeof mockAppointments)[0];

const getStatusBadge = (status: string) => {
  const config = {
    confirmed: { color: "bg-green-500", text: "Confirmed", icon: CheckCircle },
    pending: { color: "bg-yellow-500", text: "Pending", icon: Clock },
    cancelled: { color: "bg-red-500", text: "Cancelled", icon: AlertCircle },
  };

  const statusConfig = config[status as keyof typeof config] || config.pending;
  const Icon = statusConfig.icon;

  return (
    <Badge className={`${statusConfig.color} text-white hover:${statusConfig.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {statusConfig.text}
    </Badge>
  );
};

const PageVerify = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [searchResult, setSearchResult] = useState<Appointment | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setSearchResult(null);
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      const result = mockAppointments.find(
        (apt) =>
          apt.phone === phoneNumber || apt.cardNumber.toLowerCase() === cardNumber.toLowerCase()
      );

      if (result) {
        setSearchResult(result);
      } else {
        setError("No appointment found with the provided information. Please check and try again.");
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleReset = () => {
    setPhoneNumber("");
    setCardNumber("");
    setSearchResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-red-600 mb-4">
            Verify Appointment
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Search and verify your vaccination appointment using your phone number or appointment
            card number
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Search Form */}
          <Card className="border-red-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-red-600">
                <Search className="w-5 h-5" />
                Search Appointment
              </CardTitle>
              <CardDescription>
                Enter your phone number or appointment card number to find your appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-red-500" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-red-200 focus:border-red-400"
                  />
                </div>

                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-red-500" />
                    Appointment Card Number
                  </Label>
                  <Input
                    id="card"
                    type="text"
                    placeholder="VAC-2024-001"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="border-red-200 focus:border-red-400"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleSearch}
                  disabled={!phoneNumber && !cardNumber}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white"
                  size="lg"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? "Searching..." : "Search Appointment"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full sm:w-auto border-red-400 text-red-500 hover:bg-red-50"
                  size="lg"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="border-red-300 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900">Appointment Not Found</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search Result */}
          {searchResult && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <Separator />

              {/* Appointment Details */}
              <Card className="border-red-100">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="text-xl text-red-600">Appointment Details</CardTitle>
                    {getStatusBadge(searchResult.status)}
                  </div>
                  <CardDescription>
                    Appointment ID: {searchResult.id} • Card: {searchResult.cardNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Patient Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Patient Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Full Name</p>
                        <p className="font-medium">{searchResult.patientName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone Number</p>
                        <p className="font-medium">{searchResult.phone}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium">{searchResult.email}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Appointment Schedule */}
                  <div>
                    <h3 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Appointment Schedule
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-100 rounded-lg shrink-0">
                          <Calendar className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="font-medium">
                            {new Date(searchResult.appointmentDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-100 rounded-lg shrink-0">
                          <Clock className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="font-medium">{searchResult.appointmentTime}</p>
                        </div>
                      </div>
                      <div className="sm:col-span-2 flex items-start gap-3">
                        <div className="p-2 bg-red-100 rounded-lg shrink-0">
                          <MapPin className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-medium">{searchResult.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Vaccination Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                      <Syringe className="w-4 h-4" />
                      Vaccination Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Vaccine</p>
                        <p className="font-medium">{searchResult.vaccine}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Dose Number</p>
                        <p className="font-medium">{searchResult.doseNumber}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Information */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-base text-red-900 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-red-800 space-y-2">
                  <p>• Please arrive 15 minutes before your scheduled appointment time</p>
                  <p>• Bring a valid ID and your appointment card number</p>
                  <p>• Wear a mask and maintain social distancing</p>
                  <p>• If you need to reschedule, please contact us at least 24 hours in advance</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white"
                  size="lg"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download Appointment Card
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-red-400 text-red-500 hover:bg-red-50"
                  size="lg"
                >
                  Request Reschedule
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageVerify;
