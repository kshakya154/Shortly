import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { BrowserRouter, Route, Routes } from "react-router";
import UrlPage from "./components/pages/UrlPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import ProtectedRoute from "./ProtectedRoutes";
import Layout from "./components/Layout";
import SplashCursor from "./components/ui/SplashCursor";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                <HomePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <Layout>
                <AboutPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Layout>
                <ContactPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/url"
            element={
              <ProtectedRoute>
                <Layout>
                <UrlPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Layout>
                <AnalyticsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
