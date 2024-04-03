import {Navbar} from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./molecules/login-mobile-aadhar-page";
import { Toaster } from "react-hot-toast";
import Components from "./components";
import OtpPage from "./molecules/otp-page";
import HistoryPage from "./pages/history-page";
 
import ComingSoonPage from "./pages/coming-soon-page";
import DowntimePage from "./pages/downtime-page";
import FAQPage from "./pages/faq-page";

import LaunchPage from "./pages/launch-page";
import HomePage from "./pages/home-page";
import FeedbackPage from "./molecules/FeedbackPage";
import ShareButtons from "./molecules/share-buttons";
 


function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <>
        <Routes>
          <Route index element={<LoginPage />} /> 
          <Route path="/login-mobile-aadhar-page" element={<LoginPage />} />
          <Route path="/otp-page" element={<OtpPage />} />
          <Route path="/history-page" element={<HistoryPage />} />
 
          <Route path="/coming-soon-page" element={<ComingSoonPage />} />
          <Route path="/downtime-page" element={<DowntimePage />} />
          <Route path="/faq-page" element={<FAQPage />} />
 
 
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/coming-soon-page" element={<ComingSoonPage />} />
          <Route path="/downtime-page" element={<DowntimePage />} />
          <Route path="/faq-page" element={<FAQPage />} />
          <Route path="/feedback-page" element={<FeedbackPage />}/>
          <Route path="/launch-page" element={<LaunchPage />} />
          <Route path='/share-buttons' element={<ShareButtons />} />
 
          <Route path="/molecules" element={<Components />}/>
        </Routes>
      </>
    </>
  );
}
export default App;
