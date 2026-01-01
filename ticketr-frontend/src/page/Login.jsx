import React, {useState} from "react";
import {Mail,LockKeyhole} from "lucide-react"
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const API = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        email: "",
        password: "",
    })

    function handleChange(e)
    {
        const {name, value} = e.target;
        setFormData({...formData,[name]:value})
    }

    const handleSubmit = async(e)=>
    {
        e.preventDefault();
        try
        {
            const res = await axios.post(`${API}/auth/login`, formData);
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("role",res.data.role);
            setFormData({email: "",password: "",});
            navigate("/dashboard")
        }
        catch (err)
        {
            console.error(err.response?.data||err.message);

        }


    }

    return(
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#0F0F0F] border border-orange-500/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(255,120,0,0.15)]">
                <div className="flex flex-col gap-5 text-centert">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400 mb-8">Login to continue Work</p>
                </div>
                <div className=" mx-auto text-white">
                    <form className="flex flex-col  text-md space-y-4" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                        <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 mt-1 has-focus:border-orange-500/50 transition-colors">
                            <Mail size={18} className="text-orange-500"/>
                            <input type="email" id="email" name="email" placeholder="you@gmail.com" value={formData.email} onChange={handleChange} className="bg-transparent outline-none w-full text-white placeholder-gray-600"/>
                        </div>
                        <label htmlFor="password" className="text-sm text-gray-400">Password</label>
                        <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 mt-1 has-focus:border-orange-500/50 transition-colors">
                            <LockKeyhole size={18} className="text-orange-500" />
                            <input type="password" id="password" name="password" placeholder="••••••" value={formData.password} onChange={handleChange} className="bg-transparent outline-none w-full text-white placeholder-gray-600"/>
                        </div>
                        <button type="submit" className="w-full py-3 rounded-xl font-semibold
                         bg-orange-500 text-black hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            Login
                        </button>
                    </form>
                </div>
                <p className="text-gray-400 text-sm text-center mt-6">
                    Don’t have an account? <Link to="/register" className="text-orange-500 hover:text-orange-500">Sign up</Link>
                </p>

            </div>
        </div>
    )
}
export default Login;