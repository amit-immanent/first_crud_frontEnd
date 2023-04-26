import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Header from '../Components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../Utils/apiFunctions'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLogedIn } from '../Redux/reducers'

const Login = () => {

    const {isLogedIn} = useSelector((state)=> state.user.value)

console.log(isLogedIn,"isLogedInisLogedIn");
const dispatch =  useDispatch()
const navigate = useNavigate()

    const [formData, setFormData] = useState({})

    const getInput = (value, name) => {
        const data = { [name]: value }
        setFormData({ ...formData, ...data })

    }

    const handleSubmit = () => {
        if (formData?.email === '' || formData.email === undefined || formData?.password === '' || formData.password === undefined) {
            toast.error('Please fill the complete form')
            return
        }
        login(formData?.email, formData?.password).then((res) => {
            if (res.status === 1) {
                toast.success(res?.message)
                dispatch(setIsLogedIn({isLogedIn: true}))
                navigate('/')
            }
            if (res.status === 2) {
                toast.error(res?.message)
            }
        })
    }

    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center mt-5 pt-5">
                <div className="row">
                    <div className="col-12">
                        <div className='card'>
                            <div className='card-body'>
                                <form className='login-form'>
                                    <h4 className='text-center mb-5'>Login</h4>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
                                            getInput(e.target.value, e.target.name)
                                        }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={(e) => {
                                            getInput(e.target.value, e.target.name)
                                        }} />
                                    </div>
                                    <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                                    <p className='mt-5'>Not Registered yet! <Link to='/signup'>Signup</Link> </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login