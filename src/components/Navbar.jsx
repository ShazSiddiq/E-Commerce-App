import React from 'react'
import '../assets/css/mystyle.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let navigate=useNavigate()
    function logout(){
        localStorage.clear()
        navigate("/login")
    }
    return (
        <nav className="navbar navbar-expand-lg background sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand text-dark" to="/">UrbanCart</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-dark" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/shop/All/All/All">Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/admin-home">Admin</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 text-dark" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success text-dark" type="submit">Search</button>
                    </form>
                    <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                localStorage.getItem("Login") ?
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle text-dark" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {localStorage.getItem("name")}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item text-dark" to="/profile">Profile</Link></li>
                                            <li><Link className="dropdown-item text-dark" to="/cart">Cart</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><button className="dropdown-item text-dark" onClick={logout}>Logout</button></li>
                                        </ul>
                                    </li> : <li className="nav-item">
                                        <Link className="nav-link text-dark" to="/login">Login</Link>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
