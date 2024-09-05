import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, Mail, Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for pending meetings
const initialPendingMeetings = [
  {
    id: 1,
    startupName: "TechInnovate",
    founder: "Alice Johnson",
    dateRequested: "2023-07-15",
    timeSlot: "10:00 AM",
  },
  {
    id: 2,
    startupName: "GreenEnergy Solutions",
    founder: "Bob Smith",
    dateRequested: "2023-07-16",
    timeSlot: "2:00 PM",
  },
  {
    id: 3,
    startupName: "AI Health",
    founder: "Charlie Brown",
    dateRequested: "2023-07-17",
    timeSlot: "11:00 AM",
  },
];

// Mock data for approved meetings
const initialApprovedMeetings = [
  {
    id: 4,
    startupName: "DataViz Pro",
    founder: "Diana Prince",
    dateApproved: "2023-07-14",
    meetingDate: "2023-07-20",
    timeSlot: "3:00 PM",
  },
];

// Mock time slots for rescheduling
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export default function AdminMeetingScheduler() {
  const [pendingMeetings, setPendingMeetings] = useState(
    initialPendingMeetings
  );
  const [approvedMeetings, setApprovedMeetings] = useState(
    initialApprovedMeetings
  );
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  const handleApprove = (id: number) => {
    const meetingToApprove = pendingMeetings.find(
      (meeting) => meeting.id === id
    );
    if (meetingToApprove) {
      const newApprovedMeeting = {
        ...meetingToApprove,
        dateApproved: new Date().toISOString().split("T")[0],
        meetingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 7 days from now
      };
      setApprovedMeetings([...approvedMeetings, newApprovedMeeting]);
      setPendingMeetings(
        pendingMeetings.filter((meeting) => meeting.id !== id)
      );

      console.log(
        `Sending email confirmation to ${meetingToApprove.startupName}`
      );
    }
  };

  const handleReschedule = (id: number) => {
    if (rescheduleDate && rescheduleTime) {
      setPendingMeetings(
        pendingMeetings.map((meeting) =>
          meeting.id === id
            ? {
                ...meeting,
                dateRequested: rescheduleDate,
                timeSlot: rescheduleTime,
              }
            : meeting
        )
      );
      setRescheduleDate("");
      setRescheduleTime("");
      console.log(`Sending reschedule notification for meeting ID ${id}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Meeting Scheduler</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pending Meeting Requests</CardTitle>
          <CardDescription>
            Approve or reschedule video conference requests from startups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Startup Name</TableHead>
                <TableHead>Founder</TableHead>
                <TableHead>Date Requested</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.startupName}</TableCell>
                  <TableCell>{meeting.founder}</TableCell>
                  <TableCell>{meeting.dateRequested}</TableCell>
                  <TableCell>{meeting.timeSlot}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(meeting.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Calendar className="mr-2 h-4 w-4" />
                            Reschedule
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reschedule Meeting</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label
                                htmlFor="reschedule-date"
                                className="text-right"
                              >
                                Date
                              </label>
                              <input
                                id="reschedule-date"
                                type="date"
                                className="col-span-3"
                                value={rescheduleDate}
                                onChange={(e) =>
                                  setRescheduleDate(e.target.value)
                                }
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label
                                htmlFor="reschedule-time"
                                className="text-right"
                              >
                                Time
                              </label>
                              <Select
                                onValueChange={setRescheduleTime}
                                value={rescheduleTime}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select time slot" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                      {slot}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button onClick={() => handleReschedule(meeting.id)}>
                            Confirm Reschedule
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Approved Meetings</CardTitle>
          <CardDescription>
            List of approved video conference meetings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Startup Name</TableHead>
                <TableHead>Founder</TableHead>
                <TableHead>Date Approved</TableHead>
                <TableHead>Meeting Date</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.startupName}</TableCell>
                  <TableCell>{meeting.founder}</TableCell>
                  <TableCell>{meeting.dateApproved}</TableCell>
                  <TableCell>{meeting.meetingDate}</TableCell>
                  <TableCell>{meeting.timeSlot}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-center " />
                      Approved
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            Confirmation emails are automatically sent upon approval or
            rescheduling
          </p>
        </CardFooter>
      </Card>
      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
          © 2024 AYUSH Admin Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
