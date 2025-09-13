import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Contacts from "./pages/Contacts";
import Cloud from "./pages/Cloud";
import Messages from "./pages/Messages";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GetPremium from "./pages/GetPremium";
import VerifyEmail from "./pages/VerifyEmail";
import Feed from "./pages/Feed";
import { useState, useEffect } from "react";
import ProfileInfo from "./pages/ProfileInfo";
import Navbar1 from "./components/Navbar1";
import LawyerProfile from "./pages/LawyerProfile ";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
  };

  const [isAuth, setIsAuth] = useState(isAuthenticated());

  const ProtectedRoute = () => {
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
  };

  const PublicRoute = () => {
    return isAuth ? <Navigate to="/home" replace /> : <Outlet />;
  };

  useEffect(() => {
    const checkAuth = () => setIsAuth(isAuthenticated());
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar1 />

        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            <Route
              path="/verify-email/:confirmationCode"
              element={<VerifyEmail />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<LandingPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              path="/home"
              element={
                <>
                  <Navbar setIsAuth={setIsAuth} />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/profile-info"
              element={
                <>
                  <Navbar setIsAuth={setIsAuth} />
                  <ProfileInfo />
                  <Footer />
                </>
              }
            />
            <Route
              path="/feed"
              element={
                <>
                  <Navbar setIsAuth={setIsAuth} />
                  <Feed />
                  <Footer />
                </>
              }
            />
            <Route
              path="/getpremium"
              element={
                <>
                  <Navbar setIsAuth={setIsAuth} />
                  <GetPremium />
                  <Footer />
                </>
              }
            />
            // Change from :name to :userId
            <Route
              path="/lawyer/:userId"
              element={
                <>
                  <Navbar setIsAuth={setIsAuth} />
                  <LawyerProfile />
                  <Footer />
                </>
              }
            />
            <Route
              path="/contacts/:userId"
              element={
                <>
                  <Navbar setIsAuth={setIsAuth} />
                  <Contacts />
                  <Footer />
                </>
              }
            />
            <Route
              path="/cloud"
              element={
                <>
                  <Navbar setIsAuth={setIsAuth} />
                  <Cloud />
                  <Footer />
                </>
              }
            />
            <Route
              path="/messages"
              element={
                <>
                  <Navbar setIsAuth={setIsAuth} />
                  <Messages />
                </>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to={isAuth ? "/home" : "/"} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
