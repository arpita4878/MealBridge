
import './Contact.css'



function Contact() {
 

  return (
    <>
          

        {/*  Book Us Start*/}
        <div class="container-fluid contact py-6 wow bounceInUp" data-wow-delay="0.1s">
            <div class="container">
                <div class="row g-0">
                    <div class="col-1">
                        <img src="/assets/img/background-site.jpg" class="img-fluid h-100 w-100 rounded-start" style={{"object-fit": "cover", "opacity": "0.7"}} alt=""/>
                    </div>
                    <div class="col-10">
                        <div class="border-bottom border-top border-primary bg-light py-5 px-4">
                            <div class="text-center">
                                <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Contact Us</small>
                                <h2 class="display-5 mb-5">Easily share excess food with those who need it most.</h2>
                            </div>
                            <div class="row g-4 form">
                                <div class="col-lg-4 col-md-6">
                                    <select class="form-select border-primary p-2" aria-label="Default select example">
                                        <option selected>Select City</option>
                                        <option value="1">Indore</option>
                                        <option value="2">Pune</option>
                                        <option value="3">Khandwa</option>
                                        <option value="3">Ujjain</option>
                                    </select>
                                </div>
                                
                               
                                <div class="col-lg-4 col-md-6">
                                    <select class="form-select border-primary p-2" aria-label="Default select example">
                                        <option selected>You are</option>
                                        <option value="1">Seeker</option>
                                        <option value="2">Donor</option>
                                        <option value="3">Other</option>
                                    </select>
                                </div>
                              
                              
                                <div class="col-lg-4 col-md-6">
                                    <input type="mobile" class="form-control border-primary p-2" placeholder="Your Contact No."/>
                                </div>
                                {/* <div class="col-lg-4 col-md-6">
                                    <input type="date" class="form-control border-primary p-2" placeholder="Select Date"/>
                                </div> */}
                                <div class="col-lg-4 col-md-6">
                                    <input type="email" class="form-control border-primary p-2" placeholder="Enter Your Email"/>
                                </div>
                                 <div class="col-lg-4 col-md-6">
                                    <input type="text" class="form-control border-primary p-2" placeholder="Enter Your Loaction"/>
                                </div>
                                 <div class="col-lg-4 col-md-6">
                                    <input type="text" class="form-control border-primary p-2" placeholder="what's on your Mind"/>
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-primary px-5 py-3 rounded-pill">Submit Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-1">
                        <img src="/assets/img/background-site.jpg" class="img-fluid h-100 w-100 rounded-end" style={{"object-fit": "cover", "opacity": "0.7"}} alt=""/>
                    </div>
                </div>
            </div>
        </div>
        {/*  Book Us End*/}

      
    </>
  )
}

export default Contact;
