import "./Commonpage.css"
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header.jsx"
import Footer from "../../components/Footer.jsx"
import Loading from "../../components/Loading.jsx"
import AddToCartToast from "../../components/AddToCartToast.jsx"

export default function Commonpage(){

    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const [addTocart,setAddToCart] = useState(false)

    const handleAddToCart = async (id)=>{
        const res = await fetch("http://localhost:3000/user/userprofile/cart/addtocart",{
            method:"PATCH",
            headers:{
                "Content-type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                product_id:id
            })
        })

        if(res.ok){
            setAddToCart(true)

            setTimeout(()=>{
                setAddToCart(false)
            },2000)
        }

    }

    useEffect(()=>{
        const fetchData = async () =>{
            const start = Date.now()
            const res = await fetch("http://localhost:3000/home",{
            method:"GET",
            credentials:"include"
            }) 
            const result = await res.json();

            const elapsed = Date.now() - start

            setData(result);
            if(res.status == 401 || res.status == 403){
                navigate("/home/login")
            }else{
                console.log("Successfully loaded")
            }
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
    return(
        <div className="cp-container">
            <Header/>
            <div className="cp-content">
                { data.map( item=>{
                    return (
                        <div className="product-card" key={item._id}>
                            <img
                                src={item.image}
                                alt={item.title}
                            />

                            <div className="product-info">
                                <h3>{item.title}</h3>
                                <p className="brand">{item.brand}</p>
                                <p className="brand" >{item.description}</p>
                                <p className="price">₹{item.price}</p>
                                <button onClick={()=>{ handleAddToCart(item._id) }}>Add to Cart</button>
                            </div>
                        </div>
                    );
                })}
            </div>
                <AddToCartToast show = { addTocart }/>
                <Footer/>
        </div>
    );
}