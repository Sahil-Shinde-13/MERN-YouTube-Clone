import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


function Register() {

    const navigate = useNavigate();
    const [formData,setFormData] = useState({username: "", email: "", password: ""});
    const [error,setError] = useState("");

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError("");
        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            navigate("/login");
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
        }
    }

  return (
     <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input name="username" type="text" placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange} required />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Sign Up
        </button>
        <p className="text-sm mt-4 text-center">
            Already have an account?
            <span onClick={() => navigate("/login")} className="text-green-500 cursor-pointer ml-1 hover:underline">
                Login
            </span>
        </p>

      </form>
    </div>
  )
}

export default Register