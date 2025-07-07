import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "../layout/Header/Header";
import ProtectedRoute from "../auth/ProtectedRoute";
import Footer from "../layout/Footer/Footer";

// Lazy-loaded components
const Home = lazy(() => import("../components/Home/Home"));
const Menu = lazy(() => import("../components/Menu/Menu"));
const CartPage = lazy(() => import("../components/Cart/CartPage"));
const ProfilePage = lazy(() => import("../components/Authentication/profile/ProfilePage"));
const ResetPasswordForm = lazy(() => import("../components/Authentication/ResetPasswordForm"));
const RestaurentsList = lazy(() => import("../components/Restaurents/RestaurentsList"));
const RestaurentWiseMenus = lazy(() => import("../components/Restaurents/RestaurentWiseMenus"));
const NotFoundPage = lazy(() => import("../components/Not_found/NotFoundPage"));
const TermsAndConditions = lazy(() => import("../components/T&C/TermsAndConditions "));
const PrivacyPolicy = lazy(() => import("../components/T&C/PrivacyPolicy"));

 
import AboutPage from "../components/About/About";
import ContactPage from "../components/Contact/Contact";
import LoadingSpinner from "../components/LoadingScreen/LoadingSpinner";

const Routing = () => {
  return (
    <Router>
      <Header />
       <Suspense fallback={ 
 
      <LoadingSpinner/>
       }
      >

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          
          {/* Protected Route for Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

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
          <Route path="/Menu" element={<Menu />} />

          {/* T&C */}
          <Route path="/t&c" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* About & Contact */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default Routing;