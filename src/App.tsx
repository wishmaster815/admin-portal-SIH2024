import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import AdminCallConference from "./pages/Adminapproval";
import Header from "./components/ui/Header";
import AdminMeetingScheduler from "./pages/AdminMeet";
const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Admin/>} ></Route>
      <Route path="/callrequest" element={<AdminCallConference/>} ></Route>
      <Route path="/meetSchedule" element={<AdminMeetingScheduler/>} ></Route>
      </Routes>
    </Router>
  )
}

export default App