import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";


function ProjectShow() {
    const navigate = useNavigate();
    const [id, setId] = useState(useParams().id)
    const [project, setProject] = useState({ name: '', description: '' })

    const axiosInstance = axios.create({
        baseURL: 'https://mock-api.binaryboxtuts.com/',
    });

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }

        axiosInstance.get(`/api/projects/${id}`)
            .then(function (response) {
                setProject(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            <div className="flex">
                {/* Sidebar */}
                <div className={`w-72 bg-dark-purple h-screen p-5 pt-8 relative duration-300`}>
                    <img
                        src="./src/assets/control.png"
                        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                        border-2 rounded-full  ${!open && "rotate-180"}`}
                        onClick={() => setOpen(!open)}
                        />
                    <div className="flex gap-x-4 items-center">
                        <img
                            src="./src/assets/logo.png"
                            className={`cursor-pointer duration-500 ${
                            open && "rotate-[360deg]"
                            }`}
                        />
                        <h1
                            className={`text-white origin-left font-medium text-xl duration-200 ${
                            !open && "scale-0"
                            }`}
                        >
                            Designer
                        </h1>
                    </div>
                    <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                        key={index}
                        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                        ${Menu.gap ? "mt-9" : "mt-2"} ${
                            index === 0 && "bg-light-white"
                        } `}
                        >
                        <img src={`./src/assets/${Menu.src}.png`} />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {Menu.title}
                        </span>
                        </li>
                    ))}
                    </ul>
                </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Home Page</h1>
            </div>
                </div>


                
            <div className="flex-1 p-7">
                <h2 className="text-center mt-5 mb-3">Show Project</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/dashboard"> View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name:</b>
                        <p>{project.name}</p>
                        <b className="text-muted">Description:</b>
                        <p>{project.description}</p>
                    </div>
                </div>
            </div>
                    </Layout>);
}

export default ProjectShow;