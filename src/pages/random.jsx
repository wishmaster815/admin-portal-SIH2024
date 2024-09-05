import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, CheckCircle } from "lucide-react"

// Mock data for pending requests
const initialRequests = [
  { id: 1, startupName: "TechInnovate", founderName: "Alice Johnson", status: "Pending", preferredDate: "2023-07-10T10:00" },
  { id: 2, startupName: "GreenEnergy Solutions", founderName: "Bob Smith", status: "Pending", preferredDate: "2023-07-11T14:00" },
  { id: 3, startupName: "AI Health", founderName: "Charlie Brown", status: "Pending", preferredDate: "2023-07-12T11:00" },
  { id: 4, startupName: "SpaceX Clone", founderName: "David Miller", status: "Pending", preferredDate: "2023-07-13T09:00" },
  { id: 5, startupName: "Crypto Revolution", founderName: "Eva Williams", status: "Pending", preferredDate: "2023-07-14T16:00" },
]

export default function AdminCallConference() {
  const [requests, setRequests] = useState(initialRequests)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [callDateTime, setCallDateTime] = useState("")

  const handleSchedule = (request) => {
    setSelectedRequest(request)
    setCallDateTime(request.preferredDate)
    setIsDialogOpen(true)
  }

  const handleConfirmSchedule = (e) => {
    e.preventDefault()
    if (selectedRequest && callDateTime) {
      setRequests(requests.map(req => 
        req.id === selectedRequest.id ? { ...req, status: "Scheduled", scheduledAt: callDateTime } : req
      ))
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Call Conference Scheduling</CardTitle>
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
                  <TableCell>{new Date(request.preferredDate).toLocaleString()}</TableCell>
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
                    {request.status === "Scheduled" && (
                      <span className="text-green-500">Scheduled for {new Date(request.scheduledAt).toLocaleString()}</span>
                    )}
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
            <DialogTitle>Schedule Call for {selectedRequest?.startupName}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleConfirmSchedule} className="space-y-4">
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
              Founder's preferred date: {selectedRequest && new Date(selectedRequest.preferredDate).toLocaleString()}
            </p>
            <Button type="submit" className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Schedule
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}