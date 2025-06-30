import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "../layout/Header/Header";

import ProfilePage from "../components/Authentication/profile/ProfilePage";
import ResetPasswordForm from "../components/Authentication/ResetPasswordForm";
import Home from "../components/Home/Home";
import RestaurentsList from "../components/Restaurents/RestaurentsList";
import RestaurentWiseMenus from "../components/Restaurents/RestaurentWiseMenus";
import CartPage from "../components/Cart/CartPage";
import Footer from "../layout/Footer/Footer";
   
// import NotFoundPage from './pages/NotFoundPage';
// import { useAuth } from './context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

const Routing = () => {
  return (
    <Router>
      <Header />
        <Routes>
                {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route
          path="/account/reset-password-confirm/:id/:token"
          element={<ResetPasswordForm />}
        />
        <Route path="/restaurents/:categoryId" element={<RestaurentsList />} />
        <Route
          path="restaurents/:categoryId/restaurent-wise-menus/:restaurantId"
          element={<RestaurentWiseMenus />}
        />
        <Route path="/cart" element={<CartPage />} />
 

        {/* Protected Routes
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } */}
        {/* <Route
          path="/update-password"
          element={
            <ProtectedRoute>
              <UpdatePasswordPage />
            </ProtectedRoute>
          }
        /> */}

        {/* Fallback */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <Footer/>
    </Router>
  );
};

export default Routing;
