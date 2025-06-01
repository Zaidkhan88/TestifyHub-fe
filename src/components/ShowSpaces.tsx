import axios from "axios";
import { useEffect, useState } from "react";
import SpaceCard from "./SpaceCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

interface Space {
  _id: string;
  spaceName: string;
  uniqueLink: string;
  questions: string[];
  userId: string;
  customMsg: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface APIResponse {
  success: boolean;
  msg: string;
  spaces: Space[];
}

function ShowSpaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        setLoading(true);
        const res = await axios.get<APIResponse>(
          'http://localhost:8000/api/spaces/getAllSpaces',
          { withCredentials: true }
        );
        
        if (res.data.success) {
          setSpaces(res.data.spaces);
        } else {
          setError(res.data.msg || 'Failed to fetch spaces');
        }
      } catch (error) {
        console.error('Failed to fetch spaces:', error);
        setError(
          axios.isAxiosError(error) 
            ? error.response?.data?.msg || error.message 
            : 'An unexpected error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="flex flex-col items-center p-4">
      {spaces.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No spaces found
          </h3>
          <p className="mt-1 text-gray-500">
            Get started by creating your first testimonial space.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {spaces.slice(0, visibleCount).map((space) => (
              <SpaceCard key={space._id} space={space} />
            ))}
          </div>

          {visibleCount < spaces.length && (
            <button
              onClick={handleShowMore}
              className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Load More Spaces
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ShowSpaces;