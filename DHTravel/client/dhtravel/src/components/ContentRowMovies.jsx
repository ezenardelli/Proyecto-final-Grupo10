import {useState, useEffect} from 'react';
import axios from 'axios';

export default function ContentRowMovies() {
        const [state, setState] = useState({ products: [], users: [] });

        const apiInfo = async () => {
            const jsonProducts = await axios('http://localhost:3031/api/products/');
            const jsonUsers = await axios('http://localhost:3031/api/users/');
            const dataProducts = await jsonProducts.data;
            const dataUsers = await jsonUsers.data;
            setState({ products: dataProducts, users: dataUsers });
        }

        useEffect(() => {
            apiInfo();
        }, []);
        return (

            <div className="row">



                <div className="col-md-4 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total de categorias</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{state.products.countCategory}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-film fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-md-4 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Total de productos</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{state.products.count}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-award fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-md-4 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Total de usuarios
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{state.users.count}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-user fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
