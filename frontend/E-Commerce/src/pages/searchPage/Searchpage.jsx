import "./Searchpagestyle.css";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

export default function Searchpage() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const query = searchParams.get("search");
    console.log("query: ",query)

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                setLoading(true);

                const start = Date.now();

                const res = await fetch(
                    `http://localhost:3000/home/search?search=${encodeURIComponent(query)}`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                if (res.status === 401 || res.status === 403) {
                    navigate("/home/login");
                    return;
                }

                const result = await res.json();

                setData(result);

                const elapsed = Date.now() - start;

                if (elapsed < 1000) {
                    await new Promise(resolve =>
                        setTimeout(resolve, 1000 - elapsed)
                    );
                }

                setLoading(false);

            } catch (error) {

                console.error(error);
                setLoading(false);

            }

        };

        if (query) {
            fetchData();
        } else {
            setData([]);
            setLoading(false);
        }

    }, [query, navigate]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="search-container">

            <Header />

            <div className="search-content">

                <h2>
                    Search Results for "{query}"
                </h2>

                {data.length === 0 ? (

                    <h3>No products found.</h3>

                ) : (

                    <div className="cp-content">

                        {data.map((item) => (

                            <div
                                className="product-card"
                                key={item._id}
                                onClick={() => navigate(`/home/${item._id}`)}
                            >

                                <img
                                    src={item.image}
                                    alt={item.title}
                                />

                                <div className="product-info">

                                    <h3>{item.title}</h3>

                                    <p className="brand">
                                        {item.brand}
                                    </p>

                                    <p className="brand">
                                        {item.description}
                                    </p>

                                    <p className="price">
                                        ₹{item.price}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            <Footer />

        </div>
    );
}