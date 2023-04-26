import React from 'react'
import Button from '@mui/material/Button'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import {signup} from '../Utils/apiFunctions'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setIsLogedIn} from '../Redux/reducers'


const Signup = () => {

    const [formData, setFormData] = useState({})
    const dispatch =  useDispatch()
    const navigate =  useNavigate()

    const getInput = (value, name)=>{
        const data = {[name]: value}
        setFormData({...formData, ...data})
    }

    const handleSubmit = ()=>{
        if(formData?.name === '' || formData?.name === undefined || formData?.email === '' || formData?.email === undefined || formData?.password === '' || formData?.password === undefined){
            toast.error("Please fill the complete form")
            return
        }
        signup(formData?.name,formData?.email, formData?.phone,formData?.password).then((res)=>{
            console.log(res,"aaa");
            if(res.status === 1){
                toast.success(res?.message)
                dispatch(setIsLogedIn({isLogedIn: true}))
                navigate('/')
            }
            if(res?.status === 2){
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
                                    <h4 className='text-center mb-5'>Signup</h4>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input type="text" name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                            onChange={(e)=> getInput(e.target.value, e.target.name)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                             onChange={(e)=> getInput(e.target.value, e.target.name)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Contact No.</label>
                                        <input type="text" name='phone' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                        value={formData?.phone}
                                             onChange={(e)=>{
                                                
                                                getInput(e.target.value
                                                    ?.replace(/[^0-9.]/, "")
                                                    .replace(/(\..?)\../g, "$1"), e.target.name)
                                             } }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" name='password' className="form-control" id="exampleInputPassword1" 
                                         onChange={(e)=> getInput(e.target.value, e.target.name)}/>
                                    </div>
                                    <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                                    <p className='mt-5'>Already Signup?  <Link to='/login'>Login</Link> </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup