import { useEffect, useState } from "react";
import { __foodapiurl } from "../../../Api_Url";
import axios from "axios";
import swal from "sweetalert2";

function Find() {
  const [donations, setDonations] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Track expanded card

  useEffect(() => {
    fetchfood();
  }, []);

  const fetchfood = () => {
    axios
      .get(__foodapiurl + "fetch")
      .then((response) => {
        const sorted = response.data.sort(
          (a, b) => new Date(a.expiry) - new Date(b.expiry)
        );
        setDonations(sorted);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClaim = async (_id) => {
    const claimedBy = localStorage.getItem("name");
    const claimedContact = localStorage.getItem("mobile");

    if (!claimedBy || !claimedContact) return;

    const claimedDetail = {
      condition_obj: { _id },
      content_obj: { claimedBy, claimedContact, status: 1 },
    };

    try {
      const response = await axios.patch(__foodapiurl + "claim", claimedDetail);
      if (response.data.status) {
        swal.fire("Claimed successfully");
        fetchfood();
      } else {
        swal.fire("Claim failed");
      }
    } catch (error) {
      console.log(error);
      swal.fire("Server error");
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Food Donations</h2>

      {donations.length === 0 ? (
        <p>No food donations available at the moment.</p>
      ) : (
        <div className="row">
          {donations.map((donation) => {
            const isExpired = new Date(donation.expiry) < new Date();
            const isExpanded = expandedId === donation._id;

            return (
              <div key={donation._id} className="col-md-6 mb-4">
                <div className="card border-primary shadow-sm">
                  <div className="card-body position-relative">
                    <h5 className="card-title text-primary d-flex justify-content-between align-items-center">
                      {donation.foodItem}
                      {/* Three-dot menu button */}
                      <button
                        onClick={() => toggleExpand(donation._id)}
                        aria-label="Toggle details"
                        className="btn btn-sm btn-light"
                        style={{
                          border: "none",
                          background: "transparent",
                          fontWeight: "bold",
                          fontSize: "1.5rem",
                          lineHeight: 1,
                          cursor: "pointer",
                        }}
                      >
                        &#x22EE;
                      </button>
                    </h5>

                    <p className="card-text mb-1">
                      <strong>Quantity:</strong> {donation.quantity}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Expiry:</strong> {new Date(donation.expiry).toLocaleString()}
                    </p>

                    {isExpanded && (
                      <div
                        className="additional-details border-top pt-2 mt-2"
                        style={{ fontSize: "0.9rem", color: "#555" }}
                      >
                        <p>
                          <strong>Location:</strong> {donation.location}
                        </p>
                        <p>
                          <strong>Contact:</strong> {donation.contact}
                        </p>
                        <p>
                          <strong>Donor Name:</strong> {donation.donorName || "N/A"}
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          {donation.status === 1
                            ? `Claimed by ${donation.claimedBy || "someone"}`
                            : isExpired
                            ? "Expired"
                            : "Available"}
                        </p>
                        {donation.status === 1 && (
                          <p>
                            <strong>Claimed Contact:</strong> {donation.claimedContact || "N/A"}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="mt-3">
                      {isExpired ? (
                        <button className="btn btn-danger btn-sm" disabled>
                          Expired
                        </button>
                      ) : donation.status === 1 ? (
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Find;
