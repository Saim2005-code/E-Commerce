import './Itempagestyle.css'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
import Header from "../../components/Header.jsx"
import Loading from "../../components/Loading.jsx"
import Footer from "../../components/Footer.jsx"
import AddToCartToast from '../../components/AddToCartToast';
//name,brand,price,title,description,category,stock,image
export default function Itempage(){

    const [ data,setData ] = useState(null);
    const [ adding,setAdding ] = useState(false)
    const { id } = useParams()

    const [addTocart,setAddToCart] = useState(false)

    const handleAddToCart = async (id)=>{
        if(adding) return
        setAdding(true)
        try{
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
        finally{
            setAdding(false)
        }
    }


    const fetchItemData = async ()=>{
        try{
                const res = await fetch(`http://localhost:3000/product/${id}`,{
                method:"GET",
                credentials:"include",
            })
            if(!res.ok){
                console.log("An error Occured in Fetching the Data")
                return
            }
            const itemdata = await res.json();
            setData(itemdata)
            console.log("Data successfully fetched")
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{ fetchItemData() },[id])

    if(!data){
        return <Loading/>
    }
    return(
        <div className="Itempage-container">
            <Header />
            <div className="Itempage-content">
            <img
                src={data.image}
                alt={data.title}
            />
            <div className="product-details">
                <h1 className="product-title">{data.title}</h1>
                <h3 className="product-name">{data.name}</h3>
                <h2 className="product-price">₹ {data.price}</h2>
                <hr />
                    <p className="product-info">
                        <span>Brand:</span> {data.brand}
                    </p>
                    <p className="product-info">
                        <span>Category:</span> {data.category}
                    </p>
                    <p className="product-info">
                        <span>Stock:</span> {data.stock}
                    </p>
                    <h3 className="section-title">Description</h3>
                    <p className="product-description">
                        {data.description}
                    </p>
                <div className="button-group">
                    <button className="add-cart"
                    disabled = { adding }
                    onClick={ ()=>{ handleAddToCart(id) } }>
                        { adding ? "Adding..." : "Add To Cart" }
                    </button>
                    <button className="buy-now">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
        <AddToCartToast show = { addTocart }/>
        <Footer/>
    </div>
    );
}