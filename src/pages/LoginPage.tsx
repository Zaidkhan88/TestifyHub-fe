import { useNavigate } from "react-router";
import { LoginComponent } from "../components";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
    <LoginComponent/>
     <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don’t have an account?
            <button
              onClick={() => navigate("/signin")}
              className="ml-2 text-purple-600 font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
        </>
  );
}

export default LoginPage;
