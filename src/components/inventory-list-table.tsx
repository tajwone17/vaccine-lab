"use client";

import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileTextIcon,
  Loader2,
  PackageX, // Using PackageX for 'Out of Stock'
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { format } from "date-fns"; // For formatting dates

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// --- 1. UPDATED DATA INTERFACE & MOCK DATA ---

interface Vaccine {
  id: string;
  name: string;
  batchNumber: string;
  expiryDate: string; // Using ISO string for date
  quantity: number;
  status: "available" | "out-of-stock";
}

type VaccineActionType = "edit" | "delete" | "view";

const vaccineData: Vaccine[] = [
  {
    id: "VAC-001",
    name: "Moderna (Spikevax)",
    batchNumber: "MDRN-B-112A",
    expiryDate: "2026-10-31T00:00:00.000Z",
    quantity: 500,
    status: "available",
  },
  {
    id: "VAC-002",
    name: "Pfizer (Comirnaty)",
    batchNumber: "PFIZ-C-987B",
    expiryDate: "2026-12-31T00:00:00.000Z",
    quantity: 1200,
    status: "available",
  },
  {
    id: "VAC-003",
    name: "Sinopharm (BBIBP)",
    batchNumber: "SINO-A-45C",
    expiryDate: "2025-09-15T00:00:00.000Z",
    quantity: 0,
    status: "out-of-stock",
  },
  {
    id: "VAC-004",
    name: "AstraZeneca (Vaxzevria)",
    batchNumber: "AZ-V-77D",
    expiryDate: "2026-08-30T00:00:00.000Z",
    quantity: 350,
    status: "available",
  },
  {
    id: "VAC-005",
    name: "Johnson & Johnson",
    batchNumber: "JNJ-B-101E",
    expiryDate: "2026-11-20T00:00:00.000Z",
    quantity: 80,
    status: "available",
  },
  {
    id: "VAC-006",
    name: "Sinovac (CoronaVac)",
    batchNumber: "SINO-V-55F",
    expiryDate: "2025-10-10T00:00:00.000Z",
    quantity: 0,
    status: "out-of-stock",
  },
  {
    id: "VAC-007",
    name: "Moderna (Spikevax)",
    batchNumber: "MDRN-B-113A",
    expiryDate: "2026-11-30T00:00:00.000Z",
    quantity: 240,
    status: "available",
  },
];

// --- 2. UPDATED STATUS BADGE FUNCTION (WITH ICONS) ---

function getStatusBadge(status: Vaccine["status"]) {
  switch (status) {
    case "available":
      return (
        <Badge
          variant="outline"
          className="bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0"
        >
          <CheckCircle className="mr-1 h-3.5 w-3.5" />
          Available
        </Badge>
      );
    case "out-of-stock":
      return (
        <Badge
          variant="outline"
          className="bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 border-0"
        >
          <PackageX className="mr-1 h-3.5 w-3.5" />
          Out of Stock
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

// --- 3. THE NEW PAGINATION CONTROLS COMPONENT (Identical) ---

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// --- 4. THE MAIN VACCINE TABLE COMPONENT ---

const ITEMS_PER_PAGE = 5;

export default function VaccineTable() {
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    type: VaccineActionType;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Memoize paginated data
  const { paginatedData, totalPages } = useMemo(() => {
    const total = Math.ceil(vaccineData.length / ITEMS_PER_PAGE);
    const data = vaccineData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
    return { paginatedData: data, totalPages: total };
  }, [currentPage]);

  const isActionPending = (action: VaccineActionType, vaccineId: string) =>
    pendingAction?.id === vaccineId && pendingAction.type === action;

  const isRowBusy = (vaccineId: string) => pendingAction?.id === vaccineId;

  const handleAction = (vaccine: Vaccine, actionType: VaccineActionType) => {
    setPendingAction({ id: vaccine.id, type: actionType });
    // Simulate API call
    setTimeout(() => {
      setPendingAction(null);
      console.log(`Action "${actionType}" completed for vaccine:`, vaccine.name);
      // Here you would refetch data or update state
    }, 1000);
  };

  const renderVaccineRow = (vaccine: Vaccine) => {
    const busy = isRowBusy(vaccine.id);
    const editPending = isActionPending("edit", vaccine.id);
    const deletePending = isActionPending("delete", vaccine.id);
    const viewPending = isActionPending("view", vaccine.id);

    return (
      <TableRow key={vaccine.id} className="hover:bg-muted/50">
        {/* Vaccine Cell */}
        <TableCell className="h-10 px-4 font-medium">
          <div>{vaccine.name}</div>
          <div className="text-xs font-normal text-muted-foreground">
            Batch: {vaccine.batchNumber}
          </div>
        </TableCell>

        {/* Expiry Date Cell */}
        <TableCell className="h-10 px-4 text-sm text-muted-foreground">
          {format(new Date(vaccine.expiryDate), "MMM dd, yyyy")}
        </TableCell>

        {/* Quantity Cell */}
        <TableCell className="h-10 px-4 text-sm text-muted-foreground">
          {vaccine.quantity.toLocaleString()} units
        </TableCell>

        {/* Status Cell */}
        <TableCell className="h-10 px-4">
          {getStatusBadge(vaccine.status)}
        </TableCell>

        {/* Actions Cell */}
        <TableCell className="h-10 px-4">
          <TooltipProvider>
            <div className="flex items-center gap-1">
              {/* Edit Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAction(vaccine, "edit")}
                    disabled={busy}
                  >
                    {editPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <PencilIcon className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Stock</TooltipContent>
              </Tooltip>

              {/* Delete Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => handleAction(vaccine, "delete")}
                    disabled={busy}
                  >
                    {deletePending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2Icon className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete Batch</TooltipContent>
              </Tooltip>

              {/* View Details Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAction(vaccine, "view")}
                    disabled={busy && !viewPending}
                  >
                    {viewPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <FileTextIcon className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="rounded-lg border bg-card w-full">
      <h3 className="p-4 text-lg font-semibold">Vaccine Stock List</h3>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="h-10 px-3 font-medium">Vaccine</TableHead>
            <TableHead className="h-10 px-3 font-medium">Expiry Date</TableHead>
            <TableHead className="h-10 px-3 font-medium">Quantity</TableHead>
            <TableHead className="h-10 px-3 font-medium w-[120px]">
              Status
            </TableHead>
            <TableHead className="h-10 px-3 font-medium w-[180px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{paginatedData.map(renderVaccineRow)}</TableBody>
      </Table>

      {/* --- 5. PAGINATION COMPONENT IN USE --- */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}