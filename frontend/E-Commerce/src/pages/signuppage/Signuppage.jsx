import "./Signuppage.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Signuppage(){
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [data, setData] = useState(null)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const res = await fetch("http://localhost:3000/home/signup", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials:"include",
            body: JSON.stringify({ userName, email, password })

        })

        const result = await res.json()
        setData(result)
        navigate("/home/login")
    }

    return(
        <div className = "up-container">
            <div className = "up-content">
                <h1>Create Account</h1>
                <form onSubmit={ handleSubmit }>
                    <label>Username</label>
                    <input name = "userName" 
                       type="text"
                       placeholder="Enter your username"
                       value={ userName }
                       onChange={ (e)=>{ setUserName(e.target.value) }}
                
                    />
                    <label>Email</label>
                    <input 
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        value={ email }
                        onChange = { (e)=>{ setEmail(e.target.value) }}
                    />
                    <label>Password</label>
                    <input
                        name="password"
                        type="text"
                        placeholder="Create a password"
                        value = { password }
                        onChange = { (e)=>{ setPassword(e.target.value) } }
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p>{ data?.msg }</p>
            </div>
        </div>
    );
}