import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function SignIn() {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signInHandler = (e: any) => {
        e.preventDefault();

        const data = {
            email,
            password,
        };

        axios.post( `${import.meta.env.VITE_BASE_URL}/user/sign-in`, data)
            .then(res=>{
                const resData = res?.data?.data;
                localStorage.setItem('token', resData?.token)
                window.location.replace("/dashboard")
            }).catch(err=>{
                console.log(err)
            })
    };


    return (
        <div className="h-screen flex justify-center  items-center">
            <div className="border-[1px] p-2 shadow-lg rounded-md border-gray-300">
                <form onSubmit={signInHandler}>
                    <div className="flex flex-col gap-2">
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
                            Sign In
                        </button>
                    </div>
                    <div className="my-2 text-[16px]">
                        <p className="text-gray-600">
                            Don't you have account?
                            <Link className=" underline pl-2" to="/sign-up">
                                Sign-Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
