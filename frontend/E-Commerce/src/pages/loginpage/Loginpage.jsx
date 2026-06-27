import "./Loginpage.css"
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react'
export default function Loginpage(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [data,setData] = useState(null)
    const handleLogin = async (e) => {
            e.preventDefault();
            const res = await fetch("http://localhost:3000/home/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials:"include",
            body: JSON.stringify({ email, password })
        });

        const result = await res.json()
        setData(result)
        if (res.ok) {
            console.log(result.msg);
            navigate("/home");
        } else{
            console.log(result.msg);
        }

        
        console.log({ email, password });
    };
    return(
    <div className="login-container">
        <div className="login-content">
             <h1>Sign in</h1>

        <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Sign in</button>
        </form>

        <p className="terms">
            By continuing, you agree to our Terms of Use & Privacy Policy.
        </p>
        <p className="terms">{data?.msg}</p>
        <button type="button" onClick={()=>{ navigate("/home/signup") }}>Sign up</button>
        </div>
    </div>);
}