"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Syringe,
  Package,
  AlertTriangle,
  TrendingUp,
  Clock,
  Activity,
  BarChart3,
  PieChart,
} from "lucide-react";
import { useState, useEffect } from "react";

// Mock data based on schema structure - replace with actual API calls
const mockAnalyticsData = {
  appointments: {
    total: 1247,
    successful: 1089,
    wasted: 158,
    byStatus: {
      confirmed: 856,
      pending: 233,
      completed: 1089,
      cancelled: 125,
      noShow: 33,
    },
    recentTrend: {
      thisMonth: 324,
      lastMonth: 298,
      growth: 8.7,
    },
  },
  vaccinations: {
    total: 1089,
    used: 1089,
    expired: 45,
    avgDailyConsumption: 36.3,
    byVaccine: {
      "COVID-19 (Pfizer)": 456,
      "COVID-19 (Moderna)": 298,
      Influenza: 234,
      "Hepatitis B": 67,
      MMR: 34,
    },
    stockStatus: {
      inStock: 2340,
      lowStock: 156,
      outOfStock: 12,
    },
  },
  facilities: {
    active: 15,
    totalCapacity: 1500,
    utilizationRate: 72.6,
  },
  patients: {
    total: 892,
    newThisMonth: 67,
    fullyVaccinated: 634,
  },
};

const PageAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(mockAnalyticsData);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">
            Comprehensive overview of appointments, vaccinations, and system performance
          </p>
        </div>

        {/* Appointment Analytics */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Appointment Analytics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Appointments */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-600">
                  Total Appointments
                </CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900">
                  {data.appointments.total.toLocaleString()}
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <p className="text-xs text-green-600">
                    +{data.appointments.recentTrend.growth}% from last month
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Successful Appointments */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-600">
                  Successful Appointments
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900">
                  {data.appointments.successful.toLocaleString()}
                </div>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {((data.appointments.successful / data.appointments.total) * 100).toFixed(1)}%
                    Success Rate
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Wasted Appointments */}
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-600">
                  Wasted Appointments
                </CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-900">
                  {data.appointments.wasted.toLocaleString()}
                </div>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {((data.appointments.wasted / data.appointments.total) * 100).toFixed(1)}% Waste
                    Rate
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Status Breakdown */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-600">
                  Status Breakdown
                </CardTitle>
                <PieChart className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Confirmed</span>
                    <span className="font-medium">{data.appointments.byStatus.confirmed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-medium">{data.appointments.byStatus.pending}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cancelled</span>
                    <span className="font-medium text-red-600">
                      {data.appointments.byStatus.cancelled}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Vaccination Analytics */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Syringe className="h-6 w-6 text-emerald-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Vaccination Analytics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Vaccinations */}
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-600">
                  Total Vaccinations
                </CardTitle>
                <Syringe className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-900">
                  {data.vaccinations.total.toLocaleString()}
                </div>
                <p className="text-xs text-emerald-600 mt-2">
                  Administered across {data.facilities.active} facilities
                </p>
              </CardContent>
            </Card>

            {/* Used Vaccines */}
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-teal-600">Used Vaccines</CardTitle>
                <CheckCircle className="h-4 w-4 text-teal-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-teal-900">
                  {data.vaccinations.used.toLocaleString()}
                </div>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                    100% Utilization
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Expired Vaccines */}
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-600">
                  Expired Vaccines
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-900">
                  {data.vaccinations.expired}
                </div>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {(
                      (data.vaccinations.expired /
                        (data.vaccinations.used + data.vaccinations.expired)) *
                      100
                    ).toFixed(1)}
                    % Waste
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Average Daily Consumption */}
            <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-indigo-600">
                  Avg Daily Consumption
                </CardTitle>
                <Activity className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-indigo-900">
                  {data.vaccinations.avgDailyConsumption}
                </div>
                <p className="text-xs text-indigo-600 mt-2">vaccines per day</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Breakdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vaccine Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Vaccine Distribution
              </CardTitle>
              <CardDescription>Breakdown of vaccines administered by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(data.vaccinations.byVaccine).map(([vaccine, count]) => (
                  <div key={vaccine} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{vaccine}</span>
                      <span className="text-sm text-gray-600">{count} doses</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(count / data.vaccinations.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {((count / data.vaccinations.total) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stock Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                Stock Status
              </CardTitle>
              <CardDescription>Current vaccine inventory status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-green-800">In Stock</p>
                    <p className="text-2xl font-bold text-green-900">
                      {data.vaccinations.stockStatus.inStock.toLocaleString()}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {data.vaccinations.stockStatus.lowStock}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-red-800">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-900">
                      {data.vaccinations.stockStatus.outOfStock}
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              System Overview
            </CardTitle>
            <CardDescription>Overall system statistics and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-900">{data.patients.total}</div>
                <div className="text-sm text-purple-600">Total Patients</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">{data.facilities.active}</div>
                <div className="text-sm text-blue-600">Active Facilities</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900">
                  {data.patients.fullyVaccinated}
                </div>
                <div className="text-sm text-green-600">Fully Vaccinated</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-900">
                  {data.facilities.utilizationRate}%
                </div>
                <div className="text-sm text-orange-600">Facility Utilization</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageAnalytics;
