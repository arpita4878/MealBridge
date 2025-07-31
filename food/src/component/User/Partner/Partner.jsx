import React, { useState } from 'react';
import './BecomePartner.css';
import swal from 'sweetalert2'
import  {__partnerapiurl} from '../../../Api_Url'
import axios from 'axios'

function BecomePartner() {
  const [formData, setFormData] = useState({
    organization: '',
    contactName: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(__partnerapiurl + "add", formData);

    if (response.status === 200 || response.status === 201) {
      setSubmitted(true);
      setFormData({
        organization: '',
        contactName: '',
        email: '',
        message: '',
      });
      swal.fire('Success!', 'Thank you for partnering with us!', 'success');
    } else {
      swal.fire('Submission failed. Please try again later.', '', 'error');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    swal.fire('There was an error submitting the form. Please try again.', '', 'error');
  }
};

  return (
    <section className="partner-form-section" aria-labelledby="partner-form-title">
      <h2 id="partner-form-title">🤝 Become a Partner</h2>
      <p className="partner-intro">
        Join us in the mission to reduce food waste and support communities. Fill out the form to partner with us.
      </p>

      {submitted ? (
        <div className="partner-success">
          <h3>🎉 Thank you for partnering!</h3>
          <p>We'll reach out to you soon with more information.</p>
        </div>
      ) : (
        <form className="partner-form" onSubmit={handleSubmit}>
          <label>
            Organization Name
            <input
              type="text"
              name="organization"
              required
              value={formData.organization}
              onChange={handleChange}
              placeholder="Your Organization"
            />
          </label>
          <label>
            Contact Person
            <input
              type="text"
              name="contactName"
              required
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </label>
          <label>
            Email Address
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Message / Proposal
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your goals or ideas..."
            ></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </section>
  );
}

export default BecomePartner;
