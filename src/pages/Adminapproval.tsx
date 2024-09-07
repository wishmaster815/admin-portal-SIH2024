import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, CheckCircle } from "lucide-react";

// Mock data for pending requests
const initialRequests = [
  {
    id: 1,
    startupName: "TechInnovate",
    founderName: "Alice Johnson",
    status: "Pending",
    preferredDate: "2023-07-10T10:00",
    scheduledAt: "2023-07-10T12:00",
  },
  {
    id: 2,
    startupName: "GreenEnergy Solutions",
    founderName: "Bob Smith",
    status: "Pending",
    preferredDate: "2023-07-11T14:00",
    scheduledAt: "2023-07-11T16:00",
  },
];

type Request = {
  id: number;
  startupName: string;
  founderName: string;
  status: string;
  preferredDate: string;
  scheduledAt?: string; // Add this line
};

export default function AdminCallConference() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [callDateTime, setCallDateTime] = useState("");

  const handleSchedule = (request: Request) => {
    setSelectedRequest(request);
    setCallDateTime(request.preferredDate);
    setIsDialogOpen(true);
  };

  const handleConfirmSchedule = () => {
    if (selectedRequest && callDateTime) {
      setRequests(
        requests.map((req) =>
          req.id === selectedRequest.id
            ? { ...req, status: "Scheduled", scheduledAt: callDateTime }
            : req
        )
      );
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="h-screen container mx-auto p-4 flex flex-col justify-between">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Call Conference Scheduling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Startup Name</TableHead>
                <TableHead>Founder Name</TableHead>
                <TableHead>Preferred Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.startupName}</TableCell>
                  <TableCell>{request.founderName}</TableCell>
                  <TableCell>
                    {new Date(request.preferredDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.status === "Pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSchedule(request)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    )}
                    {request.status === "Scheduled" && request.scheduledAt ? (
                      <span className="text-green-500">
                        Scheduled for{" "}
                        {new Date(request.scheduledAt).toLocaleString()}
                      </span>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Schedule Call for {selectedRequest?.startupName}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <Label htmlFor="callDateTime">Date and Time for Call</Label>
              <Input
                id="callDateTime"
                type="datetime-local"
                value={callDateTime}
                onChange={(e) => setCallDateTime(e.target.value)}
                required
              />
            </div>
            <p className="text-sm text-gray-500">
              Founder's preferred date:{" "}
              {selectedRequest &&
                new Date(selectedRequest.preferredDate).toLocaleString()}
            </p>
            <Button
              type="button"
              onClick={handleConfirmSchedule}
              className="w-full"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Schedule
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
          2024 AYUSH Admin Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
