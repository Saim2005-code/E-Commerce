import './Itempagestyle.css'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
//name,brand,price,title,description,category,stock,image
export default function Itempage(){

    const [ data,setData ] = useState(null);
    const { id } = useParams()

    const fetchItemData = async (id)=>{
        const res = await fetch(`http:localhost:3000/product/${id}`,{
            method:"GET",
            credentials:"include",
        })
        const itemdata = await res.joson();
        if(res.ok){
            setData(itemdata)
            console.log("Data successfully fetched")
        }else console.log("An error occured at data fetching")
    }

    useEffect(()=>{ fetchItemData() },[])

    return(
        <div className = "Itempage-container">
            <div className="Itempage-content">
                <h1>{ id }</h1>
            </div>
        </div>
    );
}