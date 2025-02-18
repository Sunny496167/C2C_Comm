import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./Components/hero";
import Dashboard from "./Components/dashboard";
import Navigation from "./Components/navigation";
import Messages from "./Components/messages";
import Forums from "./Components/forums";
import Events from "./Components/events";
import Footer from "./Components/footer";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <div>
      <Router>
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/events" element={<Events />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forget-password" element={<SignUpPage />} />
          <Route path="/very-email" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;


// import { Navigate, Route, Routes } from "react-router-dom";
// import FloatingShape from "./components/FloatingShape";

// import SignUpPage from "./pages/SignUpPage";
// import LoginPage from "./pages/LoginPage";
// import EmailVerificationPage from "./pages/EmailVerificationPage";
// import DashboardPage from "./pages/DashboardPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";

// import LoadingSpinner from "./components/LoadingSpinner";

// import { Toaster } from "react-hot-toast";
// import { useAuthStore } from "./store/authStore";
// import { useEffect } from "react";

// protect routes that require authentication
// const ProtectedRoute = ({ children }) => {
// 	const { isAuthenticated, user } = useAuthStore();

// 	if (!isAuthenticated) {
// 		return <Navigate to='/login' replace />;
// 	}

// 	if (!user.isVerified) {
// 		return <Navigate to='/verify-email' replace />;
// 	}

// 	return children;
// };

// redirect authenticated users to the home page
// const RedirectAuthenticatedUser = ({ children }) => {
// 	const { isAuthenticated, user } = useAuthStore();

// 	if (isAuthenticated && user.isVerified) {
// 		return <Navigate to='/' replace />;
// 	}

// 	return children;
// };

// function App() {
// 	const { isCheckingAuth, checkAuth } = useAuthStore();

// 	useEffect(() => {
// 		checkAuth();
// 	}, [checkAuth]);

// 	if (isCheckingAuth) return <LoadingSpinner />;

// 	return (
// 		<div
// 			className='min-h-screen bg-gradient-to-br
//     from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
// 		>
// 			<FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
// 			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
// 			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

// 			<Routes>
// 				<Route
// 					path='/'
// 					element={
// 						<ProtectedRoute>
// 							<DashboardPage />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/signup'
// 					element={
// 						<RedirectAuthenticatedUser>
// 							<SignUpPage />
// 						</RedirectAuthenticatedUser>
// 					}
// 				/>
// 				<Route
// 					path='/login'
// 					element={
// 						<RedirectAuthenticatedUser>
// 							<LoginPage />
// 						</RedirectAuthenticatedUser>
// 					}
// 				/>
// 				<Route path='/verify-email' element={<EmailVerificationPage />} />
// 				<Route
// 					path='/forgot-password'
// 					element={
// 						<RedirectAuthenticatedUser>
// 							<ForgotPasswordPage />
// 						</RedirectAuthenticatedUser>
// 					}
// 				/>

// 				<Route
// 					path='/reset-password/:token'
// 					element={
// 						<RedirectAuthenticatedUser>
// 							<ResetPasswordPage />
// 						</RedirectAuthenticatedUser>
// 					}
// 				/>
// 				{/* catch all routes */}
// 				<Route path='*' element={<Navigate to='/' replace />} />
// 			</Routes>
// 			<Toaster />
// 		</div>
// 	);
// }

// export default App;
