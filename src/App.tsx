import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  SigninPage,
  LoginPage,
  CreateSpacePage,
  HomePage,
  TestimonialFormPage,
  AllTestimonials,
} from './pages/index';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/" element={<LoginPage />} />

        {/* All protected routes wrapped with Layout */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/createSpace"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateSpacePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/give-testimonials"
          element={
            <ProtectedRoute>
              <Layout>
                <TestimonialFormPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/testimonials/:spaceId"
          element={
            <ProtectedRoute>
              <Layout>
                <AllTestimonials />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
