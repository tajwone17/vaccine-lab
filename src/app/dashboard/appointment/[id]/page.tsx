import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Syringe,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Download,
  Building2,
} from "lucide-react";
import Link from "next/link";

// Mock data - aligned with database schemas
const getAppointmentData = (id: string) => {
  return {
    // Appointment table fields
    id,
    regNo: `REG-2024-${id}`,
    status: "scheduled", // scheduled, completed, cancelled, no-show
    createdAt: "2024-01-10T09:30:00Z",
    updatedAt: "2024-01-12T14:20:00Z",
    createdBy: "usr_dr_sarah_wilson",
    vaccinator: "usr_dr_sarah_wilson",
    patient: "pat_john_doe_001",
    facility: "fac_city_medical_center",
    address: "123 Healthcare Avenue, Gulshan-1",
    city: "Dhaka",
    state: "Dhaka Division",
    zip: "1212",
    country: "Bangladesh",

    // Related patient data (from patient table)
    patientData: {
      id: "pat_john_doe_001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+8801712345678",
      dob: "1985-03-15T00:00:00Z",
      gender: "Male",
      fatherName: "Robert Doe",
      motherName: "Mary Doe",
      nationalId: "1234567890123",
      birthCertificateId: "BC-2024-001",
      address: "House 123, Road 5, Block C, Dhanmondi",
      city: "Dhaka",
      state: "Dhaka Division",
      zip: "1205",
      country: "Bangladesh",
      createdAt: "2024-01-08T10:00:00Z",
      updatedAt: "2024-01-08T10:00:00Z",
    },

    // Related facility data (from facility table)
    facilityData: {
      id: "fac_city_medical_center",
      name: "City Medical Center",
      type: "Hospital",
      address: "123 Healthcare Avenue, Gulshan-1",
      city: "Dhaka",
      state: "Dhaka Division",
      zip: "1212",
      country: "Bangladesh",
      phone: "+8802-9876543210",
      email: "info@citymedical.com",
      capacity: 500,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },

    // Related vaccinator data (from user table)
    vaccinatorData: {
      id: "usr_dr_sarah_wilson",
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@citymedical.com",
      emailVerified: true,
      image: null,
      createdAt: "2023-12-15T08:00:00Z",
      updatedAt: "2024-01-10T09:00:00Z",
    },

    notes: "Patient has no known allergies. Appointment scheduled for COVID-19 vaccination.",
  };
};

const getStatusBadge = (status: string) => {
  const statusConfig = {
    scheduled: { variant: "default" as const, icon: Calendar, text: "Scheduled", className: "" },
    completed: {
      variant: "default" as const,
      icon: CheckCircle,
      text: "Completed",
      className: "bg-green-500 hover:bg-green-600",
    },
    cancelled: { variant: "destructive" as const, icon: XCircle, text: "Cancelled", className: "" },
    "no-show": { variant: "secondary" as const, icon: AlertCircle, text: "No Show", className: "" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={config.className || ""}>
      <Icon className="w-3 h-3 mr-1" />
      {config.text}
    </Badge>
  );
};

const PageAppointmentDetails = ({ params }: { params: { id: string } }) => {
  const appointment = getAppointmentData(params.id);

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            Appointment Details
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-all">
            Appointment ID: {appointment.id}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Edit className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button variant="destructive" size="sm" className="flex-1 sm:flex-none">
            <Trash2 className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Cancel</span>
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <User className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Patient Information
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Personal details of the patient
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium text-sm sm:text-base">{appointment.patientData.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium text-sm sm:text-base">
                    {appointment.patientData.gender}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium text-sm sm:text-base">
                    {new Date(appointment.patientData.dob).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">National ID</p>
                  <p className="font-medium text-sm sm:text-base">
                    {appointment.patientData.nationalId}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm sm:text-base flex items-center gap-2 break-all">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    {appointment.patientData.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-sm sm:text-base flex items-center gap-2">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    {appointment.patientData.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Father's Name</p>
                  <p className="font-medium text-sm sm:text-base">
                    {appointment.patientData.fatherName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Mother's Name</p>
                  <p className="font-medium text-sm sm:text-base">
                    {appointment.patientData.motherName}
                  </p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">Patient Address</p>
                  <p className="font-medium text-sm sm:text-base flex items-start gap-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span>
                      {appointment.patientData.address}, {appointment.patientData.city},{" "}
                      {appointment.patientData.state} {appointment.patientData.zip},{" "}
                      {appointment.patientData.country}
                    </span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Birth Certificate ID</p>
                  <p className="font-medium text-sm sm:text-base">
                    {appointment.patientData.birthCertificateId}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Registration No.</p>
                  <p className="font-medium text-sm sm:text-base">{appointment.regNo}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facility & Appointment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Facility & Appointment Details
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Information about the facility and appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Facility Name</p>
                  <p className="font-medium text-sm sm:text-base">
                    {appointment.facilityData.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Facility Type</p>
                  <p className="font-medium text-sm sm:text-base">
                    {appointment.facilityData.type}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Facility Phone</p>
                  <p className="font-medium text-sm sm:text-base flex items-center gap-2">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    {appointment.facilityData.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Capacity</p>
                  <p className="font-medium text-sm sm:text-base">
                    {appointment.facilityData.capacity} patients
                  </p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">Facility Address</p>
                  <p className="font-medium text-sm sm:text-base flex items-start gap-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span>
                      {appointment.facilityData.address}, {appointment.facilityData.city},{" "}
                      {appointment.facilityData.state} {appointment.facilityData.zip},{" "}
                      {appointment.facilityData.country}
                    </span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Vaccinator</p>
                  <p className="font-medium text-sm sm:text-base">
                    {appointment.vaccinatorData.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Vaccinator Email</p>
                  <p className="font-medium text-sm sm:text-base flex items-center gap-2 break-all">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    {appointment.vaccinatorData.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Additional Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm leading-relaxed">{appointment.notes}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">{getStatusBadge(appointment.status)}</div>
            </CardContent>
          </Card>

          {/* Appointment Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Timestamps</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Appointment creation and update times
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Created At</p>
                  <p className="font-medium text-sm sm:text-base">
                    {new Date(appointment.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Updated At</p>
                  <p className="font-medium text-sm sm:text-base">
                    {new Date(appointment.updatedAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full text-sm" variant="outline">
                Send Reminder
              </Button>
              <Button className="w-full text-sm" variant="outline">
                Reschedule
              </Button>
              <Button className="w-full text-sm" variant="outline">
                Mark as Completed
              </Button>
              <Button className="w-full text-sm" variant="outline">
                Print Details
              </Button>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm">
              <div>
                <p className="text-muted-foreground">Appointment ID</p>
                <p className="font-medium font-mono text-xs">{appointment.id}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Registration No.</p>
                <p className="font-medium">{appointment.regNo}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Created By</p>
                <p className="font-medium">{appointment.vaccinatorData.name}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Patient ID</p>
                <p className="font-medium font-mono text-xs">{appointment.patientData.id}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Facility ID</p>
                <p className="font-medium font-mono text-xs">{appointment.facilityData.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-start pt-2 md:pt-4">
        <Link href="/dashboard/appointment">
          <Button variant="ghost" size="sm" className="text-sm">
            ← Back to Appointments
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageAppointmentDetails;
