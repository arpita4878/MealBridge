import { useState } from "react";
import axios from "axios";
import { __foodapiurl } from '../../../Api_Url';

function Donate() {
    const [formData, setFormData] = useState({
        foodItem: "",
        quantity: "",
        expiry: "",
        location: "",
        contact: ""
    });

    const [donorName, setDonorName]=useState()
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const name = localStorage.getItem("name")
        setDonorName(name)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(__foodapiurl + "add", {
                ...formData,
                "donorName": donorName
            });
            if (response.data.status) {
                setShowModal(true);
                setFormData({
                    foodItem: "",
                    quantity: "",
                    expiry: "",
                    location: "",
                    contact: ""
                });
                setErrorMessage("");
                
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("API Error:", error);
            setErrorMessage("Server error. Please check your connection or try later.");
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
                    setFormData({ ...formData, location: coords });
                },
                (error) => {
                    alert("Unable to retrieve location. Please allow location access.");
                    console.error(error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Donate Surplus Food</h2>

            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}


            <form onSubmit={handleSubmit} className="row g-3">

                <div className="col-md-6">
                    <label className="form-label">Donor Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="donorName"
                        value={localStorage.getItem("name") || ""}
                        readOnly
                    />
                </div>


                <div className="col-md-6">
                    <label className="form-label">Food Item Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="foodItem"
                        value={formData.foodItem}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Quantity (e.g. 10 packs)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Expiry Date & Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Pickup Location</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleGetLocation}
                        >
                            Get My Location
                        </button>
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Contact Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary px-4">
                        Submit Donation
                    </button>
                </div>
            </form>
            <br />

            {/* Thank You Modal */}
            {showModal && (
                <>
                    <div className="modal show fade d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Thank You!</h5>
                                    <button type="button" className="btn-close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Your food donation has been submitted successfully. A volunteer will contact you soon for pickup.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </div>
    );
}

export default Donate;
