import React, { useState } from 'react';
import './Volunteer.css';
import swal from 'sweetalert2';
import axios from 'axios';
import { __volunteerapiurl } from '../../../Api_Url';
import { useNavigate } from 'react-router-dom';

function Volunteer() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await axios.post(__volunteerapiurl + "add", formData);

    if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        swal.fire('🎉 Thank you!', 'Your form was submitted successfully.', 'success');
      } else {
        swal.fire('Submission failed', 'Please try again later.', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      swal.fire('Error', 'There was an error submitting the form.', 'error');
    }
  };

  return (
    <section className="volunteer" aria-labelledby="volunteer-title">
      <h2 id="volunteer-title">Become a Volunteer</h2>
      <p className="volunteer-intro">
        Join our team and help us rescue food and feed communities. Fill out the form below to get started.
      </p>

      {submitted ? (
        <div className="volunteer-success">
          <h3>🎉 Thank you for volunteering!</h3>
          <p>We’ll be in touch with more details shortly.</p>

           <p className="mt-4 text-muted">
                  Want to go back?{' '}
                  <span
                    className="fw-bold text-decoration-none text-primary"
                    role="button"
                    onClick={() => navigate(-1)}
                  >
                     return
                  </span>
                </p>
        </div>
        
      ) : (
        <form className="volunteer-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
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
            Why do you want to volunteer?
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us a little bit..."
            ></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </section>
  );
}

export default Volunteer;
