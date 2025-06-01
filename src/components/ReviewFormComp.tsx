import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, Button } from './index';
import axios from 'axios';
import { useNavigate } from 'react-router';

interface FormData {
  rating: number;
  name: string;
  testimonialMsg: string;
  testimonialVideo?: string;
  spaceId: string;
}

interface Space {
  spaceName: string;
  customMsg: string;
  uniqueLink: string;
  questions: string[];
  userId: string;
  _id: string;
}

interface ReviewFormProps {
  reviewLink: string | null;
}

function ReviewFormComp({ reviewLink }: ReviewFormProps) {
  const [retrievedData, setData] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate()
  const submit: SubmitHandler<FormData> = async (data) => {
    if (!retrievedData) {
      
    console.log('retrie',retrievedData)
    return
  }
  console.log(retrievedData,'regs')

    try {
      const { name, testimonialMsg, testimonialVideo, rating } = data;
      const spaceId = retrievedData?._id;

      axios.defaults.withCredentials = true;
      await axios.post('http://localhost:8000/api/testimonials/submitTestimonials', {
        testimonialMsg,
        testimonialVideo,
        name,
        rating,
        spaceId,
      });
      navigate('/home')

     
    } catch (err) {
      console.error('ReviewForm Err', err);
    }
  };

  useEffect(() => {
    async function fetchSpace() {
      if (reviewLink) {
        try {
          axios.defaults.withCredentials = true;
          const response = await axios.get<{ space: Space }>(
            `http://localhost:8000/api/spaces/getSpace/${reviewLink}`
          );
          setData(response.data.space);
        } catch (error) {
          console.error("Error fetching space:", error);
        } finally {
          setLoading(false); // ✅   Done loading
        }
      } else {
        console.log('Link is not provided');
        setLoading(false); // ✅ Prevent infinite spinner
      }
    }

    fetchSpace();
  }, [reviewLink]);

  // ✅ Render loading spinner or message
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">Loading form...</p>
      </div>
    );
  }

  // ✅ If still no data
  if (!retrievedData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-600">Failed to load form data.</p>
      </div>
    );
  }

  // ✅ Form rendering when data is ready
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Review Form</h1>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <p className="text-lg text-gray-600">Write a Text Testimonial for</p>
          <h4 className="text-2xl font-semibold text-gray-800">{retrievedData.spaceName}</h4>

          <div className="mb-4">
            <h4 className="text-lg text-gray-600">Rate this on a scale of</h4>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              {...register('rating')}
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <h5 className="text-lg text-gray-600">Questions</h5>
            <ul className="list-disc pl-5 space-y-2">
              {retrievedData.questions.map((question, index) => (
                <li key={index} className="text-gray-700">{question}</li>
              ))}
            </ul>
          </div>

          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            placeholder="Your feedback"
            {...register('testimonialMsg')}
          />

          <Input
            label="Your Name"
            type="text"
            className="mt-2 w-full"
            {...register('name')}
          />

          <Button type="submit" className="w-full bg-red-500 text-white p-3 rounded-md mt-4">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ReviewFormComp;
