import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl, getToken, fetchUserEnrolledCourses } = useContext(AppContext);
  const [processing, setProcessing] = useState(true);
  const [success, setSuccess] = useState(false);

  const sessionId = searchParams.get("session_id");
  const purchaseId = searchParams.get("purchase_id");

  const completePayment = async () => {
    try {
      if (!sessionId) {
        toast.error("Invalid payment session");
        navigate("/course-list");
        return;
      }

      const token = await getToken();
      
      // Call the complete-purchase endpoint that exists in your backend
      const { data } = await axios.post(
        `${backendUrl}/api/user/complete-purchase`,
        { 
          purchaseId: purchaseId || sessionId,
          sessionId: sessionId 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setSuccess(true);
        toast.success("Course enrollment successful!");
        
        // Refresh enrolled courses
        await fetchUserEnrolledCourses();
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/my-enrollments");
        }, 3000);
      } else {
        toast.error(data.message || "Payment verification failed");
        setTimeout(() => {
          navigate("/course-list");
        }, 2000);
      }
    } catch (error) {
      console.error("Payment completion error:", error);
      toast.error("Failed to complete enrollment");
      setTimeout(() => {
        navigate("/course-list");
      }, 2000);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    completePayment();
  }, []);

  if (processing) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50/30 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border-2 border-gray-200 shadow-xl p-8 text-center">
        {success ? (
          <>
            {/* Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              You've been successfully enrolled in the course. Redirecting to your learning dashboard...
            </p>

            {/* Loading Indicator */}
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          </>
        ) : (
          <>
            {/* Error Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            {/* Error Message */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Payment Failed
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn't complete your enrollment. Redirecting back to courses...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;