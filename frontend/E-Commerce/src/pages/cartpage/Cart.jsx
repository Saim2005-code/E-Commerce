import "./Cart.css"
import { useState,useEffect } from 'react'
import Loading from "../../components/Loading.jsx"
export default function Cart(){

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const [msg,setMsg] = useState("")
    const [cartCountData,setCartCountData] = useState("")


    
    useEffect(()=>{ fetchCartData() },[])
    useEffect(() => {
            console.log("cartCountData:", cartCountData);
        }, [cartCountData]);
        useEffect(() => {
            if (!cartCountData) return;

            const timer = setTimeout(() => {
                setCartCountData("");
            }, 3000);
            return () => clearTimeout(timer);
        }, [cartCountData]);
    const fetchCartData = async ()=>{
        try{
            const start = Date.now()
            const res = await fetch("http://localhost:3000/user/userprofile/cart",{
                method:"GET",
                credentials:"include"
            })
        
            const result = await res.json()
            console.log("Status:", res.status)
            console.log("Result:", result)
            console.log("res.ok:", res.ok)
            const end = Date.now()
            const elapsed = end - start

            if(res.ok){
                setData(result)
                console.log("Cart Data have been fetched")
            }else{
                setMsg("No queried data found")
            }

            const remainingTime = Math.max(1000 - elapsed, 0)
            setTimeout(()=>{ setLoading(false) },remainingTime)
            }catch(err){
                setMsg(err.message)
                setLoading(false)
            }
        }
        //name,price,title,brand,image,description,category,stock,

        if(loading){
            return <Loading/>
        }
        if(!loading && data.length === 0 ){
            return <h1>{msg || "Your cart is empty"}</h1>
        }
    const handleClick = async (id)=>{
        const response = await fetch("http://localhost:3000/user/userprofile/cart/removeitem",{
            method:"DELETE",
            credentials:"include",
            headers:{ 
                "Content-Type":"application/json"
             },
            body:JSON.stringify({
                product_id:id
            })
        })
        const result = await response.json()
        console.log("Delete Status:", response.status);
        console.log("Delete Result:", result);
        console.log("Delete response.ok:", response.ok);
        if(response.ok){
            setCartCountData(result.msg)
            console.log("Message set to:", result.msg);
            fetchCartData()
        }
    }
    const handleDncrement = async (id) =>{

        const res = await fetch("http://localhost:3000/user/userprofile/decrementcount",{
            method:"PATCH",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                product_id:id
            })
        })
        if(!res.ok) console.log("No response")
        const result = await res.json()
        const filtered_count = result.cart.find( item=> item.product_id && item.product_id.toString() === id)
        setData(prev => { return prev.map( item => item.product._id === id ? { ...item,counts: filtered_count.counts } : item) })
    }
    const handleIncrement = async (id)=>{

        const res = await fetch("http://localhost:3000/user/userprofile/cart/Incrementcount",{
            method:"PATCH",
            credentials:"include",
            headers:{ 
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                product_id:id
            })
        })

        if(!res.ok) console.log("No result")
        const result = await res.json()
        const filtered_count = result.cart.find( item=> item.product_id && item.product_id.toString() === id)
        setData(prev=>{ return prev.map(item=> item.product._id === id ? {...item,counts:filtered_count.counts}:item) })
    }
    return(
        <div className="cart-container">
            {cartCountData && ( <h2 id="cart-message">{cartCountData}</h2> )}
            <div className="cart-content">
                    { data.map( item=>{
                        return(
                            <div className="cart-card" key={item.product._id}>
                                <img src={item.product.image} alt={item.product.title} />
                                    <div className="cart-card-content">
                                        <div className="cart-details">
                                            <h3>{item.product.title}</h3>
                                            <p className="name">{item.product.name}</p>
                                            <p className="stock">
                                                Stock: {item.product.stock}
                                            </p>
                                        </div>
                                        <div className="cart-price">
                                            ₹{item.product.price}
                                        </div>
                                    <div className="cart-actions">
                                        <button className="quantity-btn" onClick={()=> handleDncrement(item.product._id)}>-</button>
                                        <span className="quantity">{item.counts}</span>
                                        <button className="quantity-btn" onClick={()=>handleIncrement(item.product._id)}>+</button>
                                        <button className="remove-btn" onClick={ ()=>handleClick(item.product._id) }>
                                            Remove
                                        </button>
                                    </div>
                                </div>      
                            </div>
                        );
                     } ) }
            </div>
        </div>
    );
}