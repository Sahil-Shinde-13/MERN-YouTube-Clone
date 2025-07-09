import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";


function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: "", password: ""});
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch(login({ user: res.data.user, token: res.data.token }));
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }finally{
            setLoading(false);
        }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <input name="email" type="email" placeholder="Enter your Email"
            className="w-full p-2 mb-4 border rounded"
            onChange={handleChange} required />

            <input name="password" type="password" placeholder="Enter your Password"
            className="w-full p-2 mb-4 border rounded"
            onChange={handleChange} required />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
            </button>
            <p className="text-sm mt-4 text-center">
                Don't have an account?
                <span onClick={() => navigate("/register")} className="text-blue-500 cursor-pointer ml-1 hover:underline">
                    Register
                </span>
            </p>
        </form>
    </div>
  )
}

export default Login