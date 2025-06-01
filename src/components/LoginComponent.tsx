import axios from 'axios';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {Button} from './index';

type Inputs = {
  email: string;
  password: string;
};
function LoginComponent() {
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log("Form Data:", data);
    // add API call here
    axios.defaults.withCredentials = true;
    const res = await axios.post('http://localhost:8000/api/user/login',{
      email:data.email,
      password:data.password
    },{

    })
    // console.log('resss',res)
    if(res.data.success){
      navigate('/home')
    }
    
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                
                // minLength: {
                //   message: "Password must be at least 6 characters",
                // },
              })}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className={`w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </Button>
        </form>

       
      </div>
    </div>
  )
}

export default LoginComponent
