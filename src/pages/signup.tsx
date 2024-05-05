import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUpHandler = (e: any) => {
        e.preventDefault();

        const data = {
            name,
            email,
            password,
        };

        axios.post(`${import.meta.env.VITE_BASE_URL}/user/sign-up`, data)
            .then(res=>{
                console.log(res)
                toast.success(res?.data?.message)
                window.location.replace("/sign-in")
            }).catch(err=>{
                const errMsg = err?.response?.data?.message;
                toast.error(errMsg);
            })
    };


    
    return (
        <div className=" h-screen flex justify-center  items-center">
            <div className="border-[1px] p-2 rounded-md  border-gray-200">
                <form onSubmit={signUpHandler}>
                    <div className="flex flex-col gap-2">
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                required
                                className="input-box "
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                className="input-box"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                className="input-box"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className=" w-full  mt-2 bg-black text-white p-2 rounded-md">
                            Sign Up 
                        </button>
                    </div>
                    <div className="my-2 text-[16px]">
                        <p className="text-gray-600">
                            Do you have account? 
                            <Link className=" underline pl-2" to="/sign-in">
                                Sign-in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
