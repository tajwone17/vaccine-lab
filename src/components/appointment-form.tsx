"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarDays, Loader2, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // shadcn er default helper

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// --- 1. Zod Schema (CORRECTED) ---
const appointmentFormSchema = z.object({
  patient_name: z.string().min(2, "Patient name is required."),
  patient_phone: z
    .string()
    .min(10, "A valid 10 or 11 digit phone number is required.")
    .max(11, "Phone number cannot be more than 11 digits."),
  patient_email: z.string().email("Invalid email address.").optional().or(z.literal("")),
  doctor_name: z.string().min(1, "Please select a doctor."),
  appointment_date: z.date().refine((val) => !!val, {
    message: "An appointment date is required.",
  }),
  appointment_time: z.string().min(1, "Please select a time slot."),
  // FIX 2: .refine() is called on the Zod object returned by z.enum(...)
  status: z.enum(["Scheduled", "Pending", "Cancelled"]).refine((val) => !!val, {
    message: "Please select a status.",
  }),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

// --- Helper: Red & White Theme (Apnar deya style) ---
const labelClass = "text-sm font-medium text-gray-700 dark:text-gray-300";
const inputClass =
  "bg-white focus-visible:ring-red-500 dark:bg-gray-900 dark:focus-visible:ring-red-300";
const buttonClass =
  "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 dark:text-white cursor-pointer";

// --- 2. Main Form Component ---
export default function AppointmentEntryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AppointmentFormValues>({
    // Removed 'as any' cast, which is often unnecessary after fixing schema
    resolver: zodResolver(appointmentFormSchema), 
    defaultValues: {
      patient_name: "",
      patient_phone: "",
      patient_email: "",
      notes: "",
      status: "Scheduled", // Default status
    },
  });

  async function onSubmit(data: AppointmentFormValues) {
    setIsSubmitting(true);
    console.log("Appointment Data:", data);
    // Format date for API submission if needed
    const apiData = {
      ...data,
      appointment_date: format(data.appointment_date, "yyyy-MM-dd"), // Example formatting
    };
    console.log("Formatted API Data:", apiData);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    form.reset();
  }

  return (
    // --- Card Styling (Apnar deya style) ---
    <div className="w-full max-w-4xl mx-auto p-8 my-10 bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
      <div className="mb-6 text-center">
        <CalendarDays className="mx-auto h-12 w-12 text-red-600" />
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Book New Appointment
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Fill in the details to schedule a new appointment.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Field: Patient Name */}
            <FormField
              control={form.control}
              name="patient_name"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className={labelClass}>Patient Name*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Mr. Rahim Islam"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Field: Patient Phone */}
            <FormField
              control={form.control}
              name="patient_phone"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Patient Phone*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 01700..."
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Field: Patient Email */}
            <FormField
              control={form.control}
              name="patient_email"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>
                    Patient Email (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="e.g., rahim@example.com"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* --- Full Width Divider --- */}
            <div className="md:col-span-2 pt-2">
              <hr className="border-gray-200 dark:border-gray-700" />
            </div>

            {/* Field: Doctor Name */}
            <FormField
              control={form.control}
              name="doctor_name"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Doctor / Provider*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-gray-900">
                      <SelectItem value="Dr. Abul Kalam">
                        Dr. Abul Kalam (Cardiology)
                      </SelectItem>
                      <SelectItem value="Dr. Fatima Begum">
                        Dr. Fatima Begum (Medicine)
                      </SelectItem>
                      <SelectItem value="Dr. Shahidul Islam">
                        Dr. Shahidul Islam (Pediatrics)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Field: Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>
                    Appointment Status*
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-gray-900">
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Field: Appointment Date */}
            <FormField
              control={form.control}
              name="appointment_date"
              render={({ field }) => (
                <FormItem className="md:col-span-1 flex flex-col pt-2">
                  <FormLabel className={labelClass}>Appointment Date*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            inputClass,
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP") // "PPP" formats like "Jul 2, 2024"
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white dark:bg-gray-900"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} // Disable past dates
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Field: Appointment Time */}
            <FormField
              control={form.control}
              name="appointment_time"
              render={({ field }) => (
                <FormItem className="md:col-span-1 flex flex-col pt-2">
                  <FormLabel className={labelClass}>Time Slot*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-gray-900">
                      <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                      <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                      <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Field: Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className={labelClass}>
                    Reason for Visit / Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Annual check-up, follow-up, fever..."
                      className={inputClass}
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* --- Submit Button --- */}
          <div className="pt-4 text-right">
            <Button
              type="submit"
              className={`${buttonClass} w-full md:w-auto px-10 py-6 text-lg font-semibold`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              {isSubmitting ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}