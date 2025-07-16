import { useEffect, useState } from "react";
import { __foodapiurl } from "../../../Api_Url";
import axios from "axios";
import swal from 'sweetalert2'

function Find() {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetchfood();
    }, [])

    const fetchfood = () => {
        axios.get(__foodapiurl + "fetch").then((response) => {
            // console.log(response.data)
            const sorted = response.data.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
            setDonations(sorted)
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleClaim = async (_id) => {
        const claimedBy = localStorage.getItem("name")
        const claimedContact = localStorage.getItem("mobile")

        if (!claimedBy || !claimedContact) return;

        var claimedDetail = { "condition_obj": { "_id": _id }, "content_obj": { "claimedBy": claimedBy, "claimedContact": claimedContact, "status": 1 } }

        try {
            const response = await axios.patch(__foodapiurl + "claim", claimedDetail)
            if (response.data.status) {
                swal.fire("claimed successfully")
                fetchfood();
            }
            else {
                swal.fire("Claim failed")
            }
        }
        catch (error) {
            console.log(error);
            swal.fire("server  error")

        }
    }




    return (
        <div className="container mt-5">
            <h2 className="mb-4">Available Food Donations</h2>

            {donations.length === 0 ? (
                <p>No food donations available at the moment.</p>
            ) : (
                <div className="row">
                    {donations.map((donation) => (
                        <div key={donation.id} className="col-md-6 mb-4">
                            <div className="card border-primary shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">
                                        {donation.foodItem}
                                    </h5>
                                    <p className="card-text mb-1">
                                        <strong>Quantity:</strong> {donation.quantity}
                                    </p>
                                    <p className="card-text mb-1">
                                        <strong>Expiry:</strong>{" "}
                                        {new Date(donation.expiry).toLocaleString()}
                                    </p>
                                    <p className="card-text mb-1">
                                        <strong>Location:</strong> {donation.location}
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Contact:</strong> {donation.contact}
                                    </p>
                                    {donation.status == 1 ? (
                                        <button className="btn btn-secondary btn-sm" disabled>
                                            Claimed by {donation.claimedBy || "someone"}
                                        </button>
                                    ) : localStorage.getItem("name") === donation.donorName ? (
                                        <button className="btn btn-outline-secondary btn-sm" disabled>
                                            You are the donor
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleClaim(donation._id)}
                                        >
                                            Claim This
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Find;
