import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import './Login.css'

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('admin');
    const [password, setPassword] = useState('test123@')
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user') && localStorage.getItem('user') != null) {
            navigate("/dashboard");
        }
    }, [])

    const instance = axios.create({
        baseURL: 'https://dummyjson.com/',
    });

    const handleSave = () => {
        /* kminchelle */
        /* 0lelplR */
        setIsSaving(true);
        var em = email === 'admin' ? 'kminchelle' : email;
        var pas = password === 'test123@' ? '0lelplR' : password;

        instance.post('/auth/login', {
            username: em,
            password: pas
        })
            .then(function (response) {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("token", response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Login successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/dashboard");
                setIsSaving(false);
                setEmail('')
                setPassword('')
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="my-5 custom-card">
                            <div className="card-body p-4 p-sm-5" style={{ position: 'relative' }}>
                                
                                <form>
                                <img
                                            src="/Group_3-removebg-preview.png"
                                            alt="logo"
                                            style={{
                                                /* Layout Properties */
                                                position: 'absolute',
                                                top: '50%',  // Position the image from the top edge
                                                left: '50%', // Position the image from the left edge
                                                transform: 'translate(-50%, -50%)', // Center the image using transform
                                                width: '15%', // Adjust the width as needed
                                                maxWidth: '90px', // Limit maximum width
                                                /* UI Properties */
                                                mixBlendMode: 'normal',
                                                opacity: '1'
                                            }}
                                        />

                                    <h2
                                        style={{
                                            /* Layout Properties */
                                            position: 'absolute',
                                            top: '100%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '50%',
                                            height: '20px',
                                            fontSize: '4vw',
                                            /* UI Properties */
                                            textAlign: 'center',
                                            font: 'normal normal normal 16px/21px Mulish',
                                            letterSpacing: '0.02em',
                                            color: '#36A546CC',
                                            opacity: '1'
                                        }}
                                    >
                                        #We are Electric
                                    </h2>
                                    <div
                                        className="form-floating mb-3"
                                        style={{
                                            /* Layout Properties */
                                            position: 'absolute',
                                            top: '160%',
                                            left: '20%',
                                            width: '65%',
                                            height: '4vh',
                                            /* UI Properties */
                                            background:'#000000',        
                                            opacity: '1', 
                                            
                                        }}
                                    >
                                        <input
                                            value={email}
                                            onChange={(event) => { setEmail(event.target.value) }}
                                            type="email"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Email address"
                                            value="admin"
                                            style={{ background: '#1F191966',borderRadius: '100px',color:"whitesmoke", display:'Absolute', textAlign:"start",}}
                                        />
                                        {/* <label htmlFor="floatingInput"
                                            style={{
                                                backgroundColor: '#1F191966',
                                                height: '6vh',
                                                display: 'block',
                                                borderRadius: '100px'
                                                
                                            }}>
                                            {email ? 'E-mail' : 'email'}
                                        </label> */}
                                        
                                    </div>
                                    <div
                                        className="form-floating mb-3 rounded"
                                        style={{
                                            /* Layout Properties */
                                            position: 'absolute',
                                            top: '260%',
                                            left: '20%',
                                            width: '65%',
                                            height: '4vh',
                                            /* UI Properties */
                                            background: '#1F191966',
                                            borderRadius: '100px',
                                            
                                            opacity: '1'
                                        }}
                                    >
                                        <input
                                            value={password}
                                            onChange={(event) => { setPassword(event.target.value) }}
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Password"
                                            value="test123@"
                                            style={{ background: '#1F191966',borderRadius: '100px',color:"whitesmoke" }}
                                        
                                        />
                                        {/* <label htmlFor="floatingPassword"  style={{
                                            backgroundColor: '#1F191966', 
                                                height: '6vh',
                                                display: 'block'

                                            }}>
                                            test</label> */}
                                    </div>

                                    <div
                                        className="d-grid"
                                        style={{
                                            position: 'absolute',
                                            top: '340%',
                                            left: '20%',
                                            width: '65%',
                                            height: '6vh',
                                            background: 'transparent linear-gradient(180deg, #00FF2580 0%, #000000 100%, #36A54680 100%) 0% 0% no-repeat padding-box',
                                            mixBlendMode: 'normal',
                                            border: '2px solid #8CFF0026',
                                            opacity: '1',
                                            borderRadius: '100px'
                                        }}
                                            >
                                                <button
                                                    disabled={isSaving}
                                                    onClick={handleSave}
                                                    type="submit"
                                                    className="btn btn-primary btn-login text-uppercase fw-bold"
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        width: '100%',
                                                        height: '100%',
                                                        color: '#FFFFFF8C',
                                                        fontSize: '2.5vw',
                                                        font: 'normal normal bold 1vw/2vw Mulish'
                                                    }}
                                                >
                                                    Login
                                                </button>
                                            </div>
                                            <div className="d-grid"
                                            style={{
                                                /* Layout Properties */
                                                position: 'absolute',
                                                top: '410%',
                                                left: '51%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '50%',
                                                height: '20px',
                                                fontSize: '4vw',
                                                /* UI Properties */
                                                textAlign: 'center',
                                                font: 'normal normal normal 16px/21px Mulish',
                                                letterSpacing: '0.02em',
                                                color: '#36A546CC',
                                                opacity: '1'
                                            }}
                                            >

                                            
                                            Forgot Password?
                                            </div>
                                            

                                   
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;