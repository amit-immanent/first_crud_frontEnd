import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { GroupAddRounded, StopCircleTwoTone, SupervisedUserCircleSharp, VerifiedUserTwoTone } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../Utils/apiFunctions'


const Dashboard = () => {

  const navigate = useNavigate()
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(()=>{
    getAllUsers().then((res)=>{
        setTotalUsers(res?.total)
    })
},[])

  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-3" style={{
            backgroundColor: "cyan",
          }}>
            <div className='d-flex justify-content-evenly align-items-center p-5'>
              <div>
                <VerifiedUserTwoTone />
                <Typography variant='p'>Verified Users</Typography>
              </div>
              <div>
                20
              </div>
            </div>
          Static
          </div>
          <div className="col-12 col-md-3" style={{
            backgroundColor: "white",

          }}>
            <div className='d-flex justify-content-evenly align-items-center p-5' style={{ cursor: "pointer" }} onClick={() => navigate('/allUsers')}>
              <div>
                <SupervisedUserCircleSharp />
                <Typography variant='p'>Total Users</Typography>
              </div>
              <div>
              {totalUsers ? totalUsers : 0} 
              </div>
              
            </div>
           <p onClick={() => navigate('/allUsers')} style={{ cursor: "pointer" }}>Click to see All Users</p> 
          </div>
          <div className="col-12 col-md-3" style={{
            backgroundColor: "yellow",

          }}>
            <div className='d-flex justify-content-evenly align-items-center p-5'>
              <div>
                <GroupAddRounded />
                <Typography variant='p'>Active Users</Typography>
              </div>
              <div>
                25
              </div>
            </div>
            Static
          </div>
          <div className="col-12 col-md-3" style={{
            backgroundColor: "lightpink",

          }}>
            <div className='d-flex justify-content-evenly align-items-center p-5'>
              <div>
                <StopCircleTwoTone />
                <Typography variant='p'>Inactive Users</Typography>
              </div>
              <div>
                20
              </div>
            </div>
            Static
          </div>
        </div>
      </div>
    </>


  )
}

export default Dashboard