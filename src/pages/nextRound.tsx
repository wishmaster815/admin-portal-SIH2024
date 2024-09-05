import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Mail } from "lucide-react"

// Mock data for available time slots
const timeSlots = [
  { id: "1", date: "2023-07-10", time: "10:00 AM" },
  { id: "2", date: "2023-07-10", time: "2:00 PM" },
  { id: "3", date: "2023-07-11", time: "11:00 AM" },
  { id: "4", date: "2023-07-11", time: "3:00 PM" },
  { id: "5", date: "2023-07-12", time: "9:00 AM" },
]

export default function NextRoundSelection() {
  const [selectedSlot, setSelectedSlot] = useState("")
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleSlotSelection = (value: string) => {
    setSelectedSlot(value)
  }

  const handleConfirmation = () => {
    if (selectedSlot) {
      setIsConfirmed(true)
      // Here you would typically send this information to your backend
      console.log("Confirmed slot:", selectedSlot)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-green-600">
            Congratulations!
          </CardTitle>
          <CardDescription className="text-center">
            Your startup idea has been selected for the next round.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Please select a time slot for your phone call conference.
          </p>
          <Select onValueChange={handleSlotSelection} value={selectedSlot}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot.id} value={slot.id}>
                  {slot.date} at {slot.time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isConfirmed && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Slot Confirmed!</strong>
              <span className="block sm:inline"> We look forward to speaking with you.</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>You will be notified via email with further details.</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleConfirmation}
            disabled={!selectedSlot || isConfirmed}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {isConfirmed ? "Slot Confirmed" : "Confirm Slot"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}