import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLogedIn } from '../Redux/reducers'
import { toast } from 'react-toastify'

const Header = () => {

    const {isLogedIn} = useSelector((state)=> state.user.value)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setIsLogedIn({ isLogedIn: false }))
        toast.success("Logout Successfully")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                isLogedIn ?
                                    <li className="nav-item">
                                        <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
                                    </li> : null
                            }
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {
                                    !isLogedIn ? (
                                        <>
                                            <li className="nav-item">

                                                <Link className="nav-link active text-white" aria-current="page" to="/login">Login</Link>
                                            </li>
                                            <li className="nav-item">

                                                <Link className="nav-link text-white" to="/signup">Signup</Link>
                                            </li>
                                        </>
                                    ) : <span className="nav-link active text-white" aria-current="page" onClick={handleLogout} style={{
                                        cursor: "pointer"
                                    }}>Logout</span>
                                }
                            </ul>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header