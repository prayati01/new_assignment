import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import './Login.css'


function ProjectList() {
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState([])

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
        fetchProjectList()
    }, [])

    const axiosInstance = axios.create({
        baseURL: 'https://mock-api.binaryboxtuts.com/',
    });


    const fetchProjectList = () => {
        axiosInstance.get('/api/projects')
            .then(function (response) {
                setProjectList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/api/projects/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Project deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchProjectList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    const Logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    }
    

    return (
        <Layout>
            <div className="container">
            <div className="d-flex justify-content-center align-items-center mb-4">
          <img src='/moptro_logo-removebg-preview.png' alt="Logo" className="img-fluid" />
        </div>
                <h2 className="text-center mt-5 mb-3 specific-h2-class">Dashboard</h2>
                <div className="card">
                
                    <div className="card-header">
                        <Link className="btn btn-outline-primary" to="/create">Create New Project </Link>
                        
                       
                        <button onClick={() => Logout()} className="btn btn-outline-danger float-end"> Logout </button>
                        <div className="card-header">
                        <Link className="btn btn-outline-primary" to="/skill">Employee Progress </Link>
                        
                    </div>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectList.map((project, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{project.name}</td>
                                            <td>{project.description}</td>
                                            <td>
                                                <Link
                                                    to={`/show/${project.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${project.id}`}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
                <img
                    src="/Group_46_2x-removebg-preview.png" // Replace with the path to your image
                    alt="Corner Image"
                    style={{ position: 'absolute', bottom: '10px', right: '10px',border: '2px solid white', // Adding a white border
                    borderRadius: '50%', }}
                    />
            </div>
        </Layout>
    );
}

export default ProjectList;
