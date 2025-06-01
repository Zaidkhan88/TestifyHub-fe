import { Button } from "../components";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios';

function SigninPage() {
  type Inputs = {
    username:string;
    email: string;
    password: string;
    verifypass: string;
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data, "data");
    axios.defaults.withCredentials = true;
    axios
    .post('http://localhost:8000/api/user/signin',{
      username:data.username,
      email:data.email,
      password:data.password
    })
    .then((res)=>{
      if(res.data.success){
        // localStorage.setItem("token", res.data.token);

        navigate('/home')
      }
    })
    .catch((error) => {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error Response:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
      } else {
        // Error setting up the request
        console.error('Axios config error:', error.message);
      }
    });
    // Backend integration logic goes here
  };

  // To watch password for matching
  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
          <input
              type="text"
              placeholder="Enter a username"
              {...register("username", {
                required: "username is required",
               
              })}
              className={`border p-3 mb-3 w-full rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? "border-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <input
              type="password"
              placeholder="Re-enter your password"
              {...register("verifypass", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 ${
                errors.verifypass ? "border-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.verifypass && (
              <p className="text-red-500 text-sm mt-1">{errors.verifypass.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?
            <button
              onClick={() => navigate("/")}
              className="ml-2 text-purple-600 font-medium hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
