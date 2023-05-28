import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LastMovieInDb() {
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3050/api/products/');
                const products = response.data.products;

                if (products && products.length > 0) {
                    const lastProduct = products[products.length - 1][0];
                    setLatestProduct(lastProduct);
                    console.log(lastProduct);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto creado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            src='' />
                    </div>
                    {latestProduct && (
                        <div>
                            <h3>{latestProduct.name}</h3>
                            <p>{latestProduct.description}</p>
                        </div>
                    )}
                    <p></p>
                    <Link to={`/products/${latestProduct.id}`} className="btn btn-danger">
                        Ver detalle del producto
                    </Link>
                </div>
            </div>
        </div>
    )
}
