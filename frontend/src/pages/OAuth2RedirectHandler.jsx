import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiLoader } from "react-icons/fi";

const OAuth2RedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");
    const username = searchParams.get("username");
    const email = searchParams.get("email");
    const role = searchParams.get("role");

    if (token && userId && username && email) {
      // Store auth data
      const authData = {
        token,
        userId: parseInt(userId),
        username,
        email,
        role: role || "USER",
        emailVerified: true, // OAuth users are always verified
      };

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(authData));

      // Update auth context
      authLogin(authData);

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      // Error - redirect to login
      setTimeout(() => {
        navigate("/login?error=oauth_failed");
      }, 2000);
    }
  }, [searchParams, navigate, authLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <FiLoader className="text-6xl text-primary-500" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mt-6">
          Completing Sign In...
        </h2>
        <p className="text-gray-600 mt-2">Please wait while we log you in</p>
      </motion.div>
    </div>
  );
};

export default OAuth2RedirectHandler;
