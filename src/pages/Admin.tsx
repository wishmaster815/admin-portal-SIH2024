import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Video,
  ArrowRight,
} from "lucide-react";

// Mock data for startup requests
const mockRequests = [
  {
    id: 1,
    name: "TechInnovators",
    founder: "Jane Doe",
    cofounder: "John Smith",
    status: "Pending",
    description:
      "TechInnovate is revolutionizing the way we interact with smart home devices using advanced AI algorithms.",
    video: "/techInnovate_pitch.mp4",
    documents: [
      "business_plan.pdf",
      "financial_projections.xlsx",
      "team_bios.pdf",
    ],
  },
  {
    id: 2,
    name: "GreenEnergy Solutions",
    founder: "Bob Smith",
    cofounder: "Emma Davis",
    status: "Pending",
    description:
      "GreenEnergy Solutions aims to make renewable energy accessible to everyone through innovative solar panel technology.",
    video: "/greenEnergy_pitch.mp4",
    documents: [
      "product_specs.pdf",
      "market_analysis.pdf",
      "patent_application.pdf",
    ],
  },
  {
    id: 3,
    name: "AI Health",
    founder: "Charlie Brown",
    cofounder: "Fiona White",
    status: "Pending",
    description:
      "AI Health is developing a revolutionary AI-powered diagnostic tool to assist healthcare professionals.",
    video: "/aiHealth_pitch.mp4",
    documents: [
      "clinical_trials.pdf",
      "ai_model_overview.pdf",
      "regulatory_compliance.pdf",
    ],
  },
  {
    id: 4,
    name: "TechInnovate",
    founder: "Alice Johnson",
    cofounder: "David Lee",
    status: "Pending",
    description:
      "TechInnovate is revolutionizing the way we interact with smart home devices using advanced AI algorithms.",
    video: "/techInnovate_pitch.mp4",
    documents: ["business_plan.pdf", "financial_projections.xlsx"],
  },
];

export default function Component() {
  const [requests, setRequests] = useState(mockRequests);

  const handleAction = (id: number, action: string) => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status: action } : req))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Startup Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  <div>
                    <h3 className="font-semibold">{request.name}</h3>
                    <p className="text-sm text-gray-500">
                      Founder: {request.founder}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        request.status === "Pending"
                          ? "secondary"
                          : request.status === "Approved"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {request.status}
                    </Badge>
                    {request.status === "Pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(request.id, "Approved")}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(request.id, "Rejected")}
                        >
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 text-blue-500" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{request.name}</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold">Founder</h4>
                                  <p>{request.founder}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Co-founder</h4>
                                  <p>{request.cofounder}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Description</h4>
                                  <p>{request.description}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">
                                    Video Presentation
                                  </h4>
                                  <Button variant="outline" className="mt-2">
                                    <Video className="mr-2 h-4 w-4" />
                                    View Video
                                  </Button>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Documents</h4>
                                  <ul className="list-disc list-inside">
                                    {request.documents.map((doc, index) => (
                                      <li
                                        key={index}
                                        className="flex items-center"
                                      >
                                        <FileText className="mr-2 h-4 w-4" />
                                        {doc}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </ScrollArea>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button
                                variant="outline"
                                onClick={() =>
                                  handleAction(request.id, "Rejected")
                                }
                              >
                                Reject
                              </Button>
                              <Button
                                onClick={() =>
                                  handleAction(request.id, "Approved")
                                }
                              >
                                Accept
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="h-4 p-3 flex gap-4 align-center justify-center ">
          <Link to="/callrequest">
            <Button className="inline-flex items-center">
              Check for call requests
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/meetSchedule">
            <Button className="inline-flex items-center">
              Check for video conference requests
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
          © 2024 AYUSH Admin Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
