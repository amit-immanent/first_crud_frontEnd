import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { DataGrid } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { Autorenew, Delete } from '@mui/icons-material';
import { removeUser } from '../Utils/apiFunctions'
import { toast } from 'react-toastify';
import { Box, Button, IconButton, Modal } from '@mui/material';
import { getAllUsers,updateUser } from '../Utils/apiFunctions'

const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200, disableColumnMenu: true, sortable: false },
    { field: 'phone', headerName: 'Mobile', width: 200, disableColumnMenu: true, sortable: false },
    { field: 'date', headerName: 'Date of Joining', width: 200, valueFormatter: params => new Date(params.value).toLocaleString() }

];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
};

const AllUsers = () => {
    const [userId, setUserId] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({})

    const handleDelete = () => {
        if (userId.length > 0) {
            removeUser(userId).then((res) => {
                if (res?.status === 1) {
                    toast.success(res?.message)
                    getAllUsers().then((res) => { setAllUsers(res?.data) })
                }
            })
        } else {
            toast.error("No User Selected")
        }
    }
    const handleClose = () => {
        setOpen(false)
    }
    const getInput = (value, name) => {
        const data = { [name]: value }
        setFormData({ ...formData, ...data })
    }
    useEffect(() => {
        getAllUsers().then((res) => { setAllUsers(res?.data) })
    }, [])

    return (
        <>
            <Header />
            <div className="container">
                <div className='text-center'><h3 className='heading-text'>All Users</h3> </div>
                <div>
                    <IconButton variant='contained' startIcon={<Delete />} onClick={handleDelete}><Delete sx={{
                        color: "#C34A36"
                    }} /></IconButton>
                </div>
                <div style={{ height: 450, width: '100%', backgroundColor: '#00C9A7' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={allUsers}
                        columns={[...columns, {
                            field: 'Action', width: 200, disableColumnMenu: true, sortable: false, renderCell: (params) => (
                                <LoadingButton variant='contained' size='small' startIcon={<Autorenew />} onClick={(row) => {
                                    setOpen(true)
                                    console.log(params?.row);
                                    setFormData(params?.row)
                                }}>Update</LoadingButton>
                            )
                        }]}
                        checkboxSelection
                        disableRowSelectionOnClick
                       
                        onRowSelectionModelChange={(e) => setUserId(e)}
                    />
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className='login-form'>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                value={formData?.name}
                                onChange={(e) => getInput(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                value={formData?.email}
                                onChange={(e) => getInput(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Contact No.</label>
                            <input type="text" name='phone' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                value={formData?.phone}
                                onChange={(e) => {

                                    getInput(e.target.value
                                        ?.replace(/[^0-9.]/, "")
                                        .replace(/(\..?)\../g, "$1"), e.target.name)
                                }}
                            />
                        </div>
                        <Button variant='contained' onClick={()=>{
                            updateUser(formData).then((res)=>{
                                if(res.status === 1){
                                    toast.success(res?.message)
                                    getAllUsers().then((res) => { setAllUsers(res?.data) })
                                    setOpen(false)
                                }
                            })
                        }}>Update</Button>
                    </form>
                </Box>
            </Modal>
        </>

    )
}

export default AllUsers