import axios from "axios";
import { useState } from "react";

export default function Dashboard() {
    const [text, setText] = useState("");
    const [result, setResult] = useState<any>();
    const [loading, setLoading] = useState(false)

    const submitHandler = (e: any) => {
        e.preventDefault();
        setLoading(true)
        axios
            .post(`${import.meta.env.VITE_BASE_URL}/analyzer`, { text })
            .then((res) => {
                const resData = res?.data?.data;
                // console.log(resData)
                setResult(resData);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            });
    };


    return (
        <div className="h-screen flex flex-row justify-center">
           
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
                            disabled = {loading || text?.length < 1}
                            className="bg-black  text-white px-4 py-1 rounded-md">
                           {loading? "Analyzing...": "Analyze"} 
                            
                        </button>
                    </div>
                </form>


                {result && (
                <div>
                    <h3> Number Of Words :  {result?.numberOfWords} </h3>
                    <h3> number Of Characters :  {result?.numberOfCharacters} </h3>
                    <h3> Longest Word :  {result?.longestWord} </h3>
                </div>
            )}
            </div>

           
        </div>
    );
}
