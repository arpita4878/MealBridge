import { Link } from 'react-router-dom';
import './Nav.css'
import { useEffect, useState } from 'react';
import Auth from '../../Auth/Auth';


function Nav() {
    const [Nav, setNav] = useState();

    useEffect(() => {

        setInterval(() => {

            if (localStorage.getItem("token") != undefined && localStorage.getItem("role") == "admin") {
                setNav(
                    <>
                        {/*  Navbar start*/}
                        <div class="container-fluid nav-bar">
                            <div class="container">
                                <nav class="navbar navbar-light navbar-expand-lg py-4">
                                    <Link to='/'>     <a class="navbar-brand">
                                        <h1 class="text-primary fw-bold mb-0">Meal<span class="text-dark">Bridge</span> </h1>
                                    </a></Link>
                                    <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                        <span class="fa fa-bars text-primary"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarCollapse">
                                        <div class="navbar-nav mx-auto">
                                            <Link to='/admin'> <a class="nav-item nav-link active">Home</a></Link>
                                          

                                          

                                                 <div class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Manage</a>
                                                <div class="dropdown-menu bg-light">
                                                    <Link to='/manage-users'><a class="dropdown-item">Manage Users</a></Link>
                                                    <Link to='/manage-donations'><a class="dropdown-item">Manage Donations</a></Link>
                                                     <Link to='/user-claims'><a class="dropdown-item">View Claims</a></Link>
                                                </div>
                                            </div>


                                            <div class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Setting</a>
                                                <div class="dropdown-menu bg-light">
                                                    <Link to='/edit-profile-admin'><a class="dropdown-item">Edit Profile</a></Link>
                                                    <Link to='/change-password-admin'><a class="dropdown-item">Change Password</a></Link>
                                                </div>
                                            </div>

                                            {/* <Link to='/contact'> <a  class="nav-item nav-link">Contact</a></Link>
                              <Link to='/register'> <a  class="nav-item nav-link">Register</a></Link> */}
                                        </div>
                                        <button class="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-none d-lg-inline-flex" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="fas fa-search"></i></button>
                                        <Link to='/logout'>   <a class="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill">Log Out</a></Link>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        {/*  Navbar End*/}

                        {/*  Modal Search Start*/}
                        <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-fullscreen">
                                <div class="modal-content rounded-0">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Search by keyword</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body d-flex align-items-center">
                                        <div class="input-group w-75 mx-auto d-flex">
                                            <input type="search" class="form-control bg-transparent p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                            <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Modal Search End*/}

                    </>
                )
            }

            else if (localStorage.getItem("token") != undefined && localStorage.getItem("role") == "user") {
                setNav(
                    <>
                        {/*  Navbar start*/}
                        <div class="container-fluid nav-bar">
                            <div class="container">
                                <nav class="navbar navbar-light navbar-expand-lg py-4">
                                    <Link to='/'>     <a class="navbar-brand">
                                        <h1 class="text-primary fw-bold mb-0">Meal<span class="text-dark">Bridge</span> </h1>
                                    </a></Link>
                                    <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                        <span class="fa fa-bars text-primary"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarCollapse">
                                        <div class="navbar-nav mx-auto">
                                            <Link to='/user'> <a class="nav-item nav-link active">Home</a></Link>
                                            {/* <Link to='/donate'>  <a class="nav-item nav-link">Donate</a></Link>
                                      <Link to='/service'> <a class="nav-item nav-link">Find</a></Link>  */}

                                            {/* <a   class="nav-item nav-link">Events</a>
                            <a  class="nav-item nav-link">Menu</a> */}

                                            <div class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Food</a>
                                                <div class="dropdown-menu bg-light">
                                                    <Link to='/donate'><a class="dropdown-item">Donate Food</a></Link>
                                                    <Link to='/findfood'><a class="dropdown-item">Find Food</a></Link>
                                                </div>
                                            </div>


                                            <div class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Setting</a>
                                                <div class="dropdown-menu bg-light">
                                                    <Link to='/editprofile'>    <a class="dropdown-item">Edit Profile</a></Link>
                                                    <Link to='/changepassword'>    <a class="dropdown-item">Change Password</a></Link>
                                                </div>
                                            </div>
                                            
                                            <Link to='/impactracking'> <a class="nav-item nav-link ">Impact tracking</a></Link>
                                            <Link to='/dashboard'> <a class="nav-item nav-link ">Badges</a></Link>

                                        </div>
                                        <button class="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-none d-lg-inline-flex" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="fas fa-search"></i></button>
                                     <br />   <Link to='/logout'>   <a class="btn btn-primary py-2 px-4 rounded-pill">Log Out</a></Link>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        {/*  Navbar End*/}

                        {/*  Modal Search Start*/}
                        <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-fullscreen">
                                <div class="modal-content rounded-0">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Search by keyword</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body d-flex align-items-center">
                                        <div class="input-group w-75 mx-auto d-flex">
                                            <input type="search" class="form-control bg-transparent p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                            <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Modal Search End*/}

                    </>
                )
            }

            else {
                setNav(
                    <>
                        {/*  Navbar start*/}
                        <div class="container-fluid nav-bar">
                            <div class="container">
                                <nav class="navbar navbar-light navbar-expand-lg py-4">
                                    <Link to='/'>     <a class="navbar-brand">
                                        <h1 class="text-primary fw-bold mb-0">Meal<span class="text-dark">Bridge</span> </h1>
                                    </a></Link>
                                    <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                        <span class="fa fa-bars text-primary"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarCollapse">
                                        <div class="navbar-nav mx-auto">
                                            <Link to='/'> <a class="nav-item nav-link active">Home</a></Link>
                                            <Link to='/about'>  <a class="nav-item nav-link">About</a></Link>
                                            <Link to='/service'> <a class="nav-item nav-link">Services</a></Link>

                                            {/* <a   class="nav-item nav-link">Events</a>
                            <a  class="nav-item nav-link">Menu</a> */}

                                            {/* <div class="nav-item dropdown">
                                <a  class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                <div class="dropdown-menu bg-light">
                                    <a  class="dropdown-item">Booking</a>
                                    <a  class="dropdown-item">Our Blog</a>
                                    <a  class="dropdown-item">Our Team</a>
                                    <a  class="dropdown-item">Testimonial</a>
                                    <a  class="dropdown-item">404 Page</a>
                                </div>
                            </div> */}

                                            <Link to='/contact'> <a class="nav-item nav-link">Contact</a></Link>
                                            <Link to='/register'> <a class="nav-item nav-link">Register</a></Link>
                                        </div>
                                        <button class="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-none d-lg-inline-flex" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="fas fa-search"></i></button>
                                        <Link to='/login'>   <a class="btn btn-primary py-2 px-4 rounded-pill">Log In</a></Link>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        {/*  Navbar End*/}

                        {/*  Modal Search Start*/}
                        <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-fullscreen">
                                <div class="modal-content rounded-0">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Search by keyword</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body d-flex align-items-center">
                                        <div class="input-group w-75 mx-auto d-flex">
                                            <input type="search" class="form-control bg-transparent p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                            <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Modal Search End*/}

                    </>
                )
            }
        }, 1)
    }, [])

    return (
        <>
            {<Auth/>}
            {Nav}

        </>
    )
}

export default Nav;
