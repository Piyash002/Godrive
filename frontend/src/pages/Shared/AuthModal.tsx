import { useState } from "react";
import Login from "@/pages/Shared/Login";
import Register from "@/pages/Shared/Register";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal = ({ onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true); // toggle state

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-600"
        >
          &times;
        </button>

        {isLogin ? (
          <>
            <Login />
            <p className="text-sm text-center mt-3 text-gray-700">
              Don’t have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p className="text-sm text-center mt-3 text-gray-700">
              Already have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
