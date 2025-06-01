import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

interface Testimonial {
  _id: string;
  testimonialMsg: string;
  name: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AllTestimonials = () => {
  const { spaceId } = useParams();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `http://localhost:8000/api/testimonials/getAllTestimonials/${spaceId}`
        );
        
        if (response.data && response.data.testimonails) {
          setTestimonials(response.data.testimonails);
          calculateAverageRating(response.data.testimonails);
        } else {
          setError('No testimonials data received');
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError(
          axios.isAxiosError(error)
            ? error.response?.data?.message || 'Failed to load testimonials'
            : 'An unexpected error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    const calculateAverageRating = (testimonials: Testimonial[]) => {
      if (testimonials.length === 0) return;
      const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
      setAverageRating(parseFloat((total / testimonials.length).toFixed(1)));
    };

    fetchTestimonials();
  }, [spaceId]);

  if (loading) return <LoadingSpinner className="my-20" />;
  if (error) return <ErrorMessage message={error} className="my-10" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          Customer Testimonials
        </h1>
        
        {testimonials.length > 0 && (
          <div className="flex items-center justify-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {averageRating} out of 5 ({testimonials.length} reviews)
            </span>
          </div>
        )}
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No testimonials yet
          </h3>
          <p className="mt-1 text-gray-500">
            Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {testimonial.name}
                    </h3>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-4 w-4 ${
                            star <= testimonial.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.testimonialMsg}"</p>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTestimonials;