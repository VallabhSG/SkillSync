import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiLoader, FiMail } from "react-icons/fi";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }

    // Verify the email
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/verification/verify?token=${token}`
        );

        if (response.data.success) {
          setStatus("success");
          setMessage(
            response.data.message ||
              "Email verified successfully! You can now access all features."
          );

          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Verification failed. The link may be expired or invalid."
        );
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const handleResendVerification = async (e) => {
    e.preventDefault();
    setResendLoading(true);
    setResendMessage("");

    try {
      const response = await axios.post(`${API_URL}/verification/resend`, {
        email: resendEmail,
      });

      if (response.data.success) {
        setResendMessage(
          response.data.message ||
            "Verification email sent! Please check your inbox."
        );
        setResendEmail("");
      }
    } catch (error) {
      setResendMessage(
        error.response?.data?.message || "Failed to resend verification email."
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {status === "verifying" && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FiLoader className="text-6xl text-primary-500" />
            </motion.div>
          )}
          {status === "success" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <FiCheckCircle className="text-6xl text-green-500" />
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <FiXCircle className="text-6xl text-red-500" />
            </motion.div>
          )}
        </div>

        {/* Status Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {status === "verifying" && "Verifying Your Email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </h2>
          <p className="text-gray-600">{message}</p>
          {status === "success" && (
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to login page...
            </p>
          )}
        </div>

        {/* Resend Verification Form (shown on error) */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.3 }}
            className="border-t pt-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FiMail className="text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Resend Verification Email
              </h3>
            </div>

            <form onSubmit={handleResendVerification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={resendLoading}
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {resendLoading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiMail />
                    Resend Verification Email
                  </>
                )}
              </button>

              {resendMessage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm text-center ${
                    resendMessage.includes("sent")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {resendMessage}
                </motion.p>
              )}
            </form>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Go to Login
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
