import { useState } from "react";
import { Button, Input } from "./index";
import { useNavigate } from "react-router";
import { useReviewLink } from "../context/LinkContext";
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "./LoadingSpinner";

function SubmitTestimonial() {
  const { link, setLink } = useReviewLink();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidLink, setIsValidLink] = useState<boolean | null>(null);

  const validateLink = (url: string) => {
    // Simple URL validation - you might want to enhance this
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleLinkChange = (value: string) => {
    setLink(value);
    setError(null);
    if (value) {
      setIsValidLink(validateLink(value));
    } else {
      setIsValidLink(null);
    }
  };

  const handleSubmit = async () => {
    if (!link) {
      setError("Please enter a testimonial link");
      return;
    }

    if (!validateLink(link)) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Here you would typically verify the link with your backend
      // For now, we'll simulate a successful verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate("/give-testimonials");
    } catch (error) {
      console.error("Error verifying link:", error);
      setError("Invalid link or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-md w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Submit Your Testimonial
        </h2>
        <p className="text-gray-600">
          Share your experience by entering the testimonial link provided to you
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="testimonial-link" className="block text-sm font-medium text-gray-700 mb-1">
            Testimonial Link
          </label>
          <div className="relative">
            <Input
              id="testimonial-link"
              placeholder="your unique link"
              value={link || ""}
              onChange={(e) => handleLinkChange(e.target.value)}
              className={`pr-10 ${isValidLink === false ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
            />
            {isValidLink === true && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
              </div>
            )}
            {isValidLink === false && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            )}
          </div>
          {isValidLink === false && (
            <p className="mt-2 text-sm text-red-600">
              Please enter a valid URL (e.g., your-link)
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading || !link || isValidLink === false}
          className="w-full flex justify-center items-center"
        >
          {loading ? (
            <>
              <LoadingSpinner className="h-5 w-5 mr-2" />
              Verifying Link...
            </>
          ) : (
            "Submit Testimonial"
          )}
        </Button>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Don't have a link? Contact the space owner to request one.</p>
        </div>
      </div>
    </div>
  );
}

export default SubmitTestimonial;