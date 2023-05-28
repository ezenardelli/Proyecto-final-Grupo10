import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3031/api/products/${id}`);
                const productData = response.data;

                setProduct(productData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Detalle del producto</h5>
                </div>
                <div className="card-body">
                    {product ? (
                        <div>
                            <div className="text-center">
                                <img
                                    className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                    src={product.image}
                                    alt={product.name}
                                />
                            </div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Origen: {product.origin}</p>
                            <p>Destino: {product.destination}</p>
                            <p>Personas: {product.person}</p>
                            <p>Fecha: {product.date}</p>
                            <p>Precio: {product.price}</p>
                        </div>
                    ) : (
                        <p>Cargando producto...</p>
                    )}
                </div>
            </div>
        </div>
    );
}