import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function GenresInDb() {
    const [state, setState] = useState([]);

    const apiInfo = async () => {
        const jsonProducts = await axios('http://localhost:3050/api/products/');
        const dataProducts = await jsonProducts.data;
        setState(dataProducts);
    }

    useEffect(() => {
        apiInfo();
    }, []);
    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Listado de productos</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {
                            state.products && state.products.map((productArray) => {
                                const product = productArray[0];
                                return (
                                    <div className="col-lg-6 mb-4" key={product.id}>
                                        <div className="card bg-dark text-white shadow">
                                            <div className="card-body">
                                            <Link to={`/products/${product.id}`}>
                                                {product.name}
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
