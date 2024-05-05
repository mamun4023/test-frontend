import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../utils/axios";

export default function Dashboard() {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [result, setResult] = useState<any>();
    const [loading, setLoading] = useState(false);

    const submitHandler = (e: any) => {
        e.preventDefault();
        setLoading(true);
        Axios.post(`/analyzer`, { text })
            .then((res) => {
                const resData = res?.data?.data;
                // console.log(resData)
                setResult(resData);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("/sign-in");
    };

    return (
        <div className="h-screen">
            <div className="flex justify-end">
                <button
                    onClick={logoutHandler}
                    className="m-4 p-2 border-[1px] rounded-md hover:bg-gray-200 border-gray-500"
                >
                    Logout
                </button>
            </div>
            <div className=" flex flex-row justify-center">
                <div>
                    <h1 className="text-center m-2 text-[40px]">Analyze your Text</h1>
                    <form onSubmit={submitHandler}>
                        <div className="w-[500px]">
                            <textarea
                                className="input-box"
                                rows={5}
                                placeholder="Enter your text"
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                disabled={loading || text?.length < 1}
                                className={`bg-black  text-white px-4 py-1 rounded-md ${
                                    loading || text?.length < 1
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : null
                                }`}
                            >
                                Analyze
                            </button>
                        </div>
                    </form>

                    {result && (
                        <div>
                            <h3> Number Of Words : {result?.numberOfWords} </h3>
                            <h3> number Of Characters : {result?.numberOfCharacters} </h3>
                            <h3> Longest Word : {result?.longestWord} </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
