import React, {useState} from "react";
import {LockKeyhole, Mail} from "lucide-react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register()
{
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
    })

    function handleChange(e)
    {
        const{name,value} = e.target;
        setFormData({...formData, [name]:value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try
        {
            const res = await axios.post(`${API}/auth/register`, formData)
            console.log(res);
            setFormData({name:"",email:"",password:""})
            navigate("/login")
        }
        catch (err)
        {
            console.log(err);
        }
    }


    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#0F0F0F] border border-orange-500/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(255,120,0,0.15)]">
                <div className="flex flex-col gap-5 text-centert">
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400 mb-8">Join us to start</p>
                </div>

                   <div className="text-white  ">
                       <form className="flex flex-col  text-md space-y-4" onSubmit={handleSubmit}>
                           <label htmlFor="Full Name" className="text-sm text-gray-400">Full Name</label>
                           <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 mt-1 has-focus:border-orange-500/50 transition-colors">
                               <Mail size={18} className="text-orange-500"/>
                               <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} placeholder="John Doe" className="bg-transparent outline-none w-full text-white placeholder-gray-600"/>
                           </div>
                           <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                           <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 mt-1 has-focus:border-orange-500/50 transition-colors">
                               <Mail size={18} className="text-orange-500"/>
                               <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} placeholder="you@gmail.com" className="bg-transparent outline-none w-full text-white placeholder-gray-600"/>
                           </div>
                           <label htmlFor="password" className="text-sm text-gray-400">Password</label>
                           <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 mt-1 has-focus:border-orange-500/50 transition-colors">
                               <LockKeyhole size={18} className="text-orange-500" />
                               <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} placeholder="••••••" className="bg-transparent outline-none w-full text-white placeholder-gray-600"/>
                           </div>
                           <button type="submit" className="w-full py-3 rounded-xl font-semibold
                         bg-orange-500 text-black hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
                               Sign up
                           </button>
                       </form>
                   </div>

                <p className="text-gray-400 text-sm text-center mt-6">
                    Already have an account? <Link to="/login" className="text-orange-500 hover:text-orange-500">Login</Link>
                </p>

            </div>
        </div>
    )
}
export default Register;