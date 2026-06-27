import "./Homepage.css"
import image from "../.././assets/pexels-leeloothefirst-8938663.jpg"
import { useNavigate } from 'react-router-dom'
export default function Homepage(){

    const navigate = useNavigate()

    return(
    <div className="main-container-homepage"
        style={{ backgroundImage: `url(${image})` }}>
       <div className="page-content">
            <h1 id="greet-title">greetings from <span className="ayat">AYAT</span> </h1>
            <button id="start-btn" onClick={()=>{ navigate("/home")}}>Get Started</button>
       </div>
    </div>)
}