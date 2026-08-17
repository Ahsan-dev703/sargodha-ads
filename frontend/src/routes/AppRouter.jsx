import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import AppLayout from "@/layouts/AppLayout/AppLayout";

import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";

import Dashboard from "@/pages/Dashboard/Dashboard";
import MyAds from "@/pages/MyAds/MyAds";
import CreateAd from "@/pages/CreateAd/CreateAd";
import Profile from "@/pages/Profile/Profile";
import ProtectedRoute from "@/routes/ProtectedRoute";
import VerifyEmailPending from "@/pages/VerifyEmailPending/VerifyEmailPending";
import VerifyEmail from "@/pages/VerifyEmail/VerifyEmail";

function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email-pending" element={<VerifyEmailPending />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-ads" element={<MyAds />} />
          <Route path="/create-ad" element={<CreateAd />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
