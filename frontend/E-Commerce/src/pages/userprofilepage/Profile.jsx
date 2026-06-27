import "./Profile.css"
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from "../../components/Footer.jsx"
import Loading from "../../components/Loading.jsx"
export default function Profile(){

    const navigate = useNavigate()
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(true)

    const handleLogout = async ()=>{
        try{
            const res = await fetch("http://localhost:3000/user/userprofile/logout",{
            method:"POST",
            credentials:"include"
            })
        
            if(res.status === 200){
                navigate("/home/login")
                alert("You've been logged out Successfully")
            }
            else{
                alert("Logging Out Failed")
            }
        }catch(err){
            alert("Something went wrong")
            console.log(err)
        }
    }

    useEffect(()=>{
        const fetchData = async ()=>{

            const start = Date.now()

            const res = await       fetch("http://localhost:3000/user/userprofile",{
                method:"GET",
                credentials:"include"
            })
                if(res.status === 401 || res.status === 403 || res.status === 404){
                    navigate("/home/login")
                }
                const result = await res.json()

                const end = Date.now()
                const elapsed = end - start

                setData(result)

                if(elapsed < 1000){
                    await new Promise(resolve =>
                    setTimeout(resolve, 1000 - elapsed)
                    );
                }
                setLoading(false)
        }

        fetchData()
    },[])
    if(loading){
        return <Loading/>
    }
    return (
    <div className="profile-container">
        <div className="profile-content">

            <div className="profile-card">
                <div className="avatar">
                    {data?.userName?.charAt(0).toUpperCase()}
                </div>

                <h2>{data?.userName}</h2>
                <p>{data?.email}</p>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="profile-actions">
                <button onClick={()=>{ navigate("/user/userprofile/editprofile") }}>Edit Profile</button>
                <button onClick={ ()=>{ navigate("/user/userprofile/cart") } }>My Cart</button>
                <button>Orders</button>
                <button>Payments</button>
            </div>

        </div>

        <Footer />
    </div>
);
}