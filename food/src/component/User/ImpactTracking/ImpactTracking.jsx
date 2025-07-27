import React from 'react';
import CountUp from 'react-countup';
import SocialSharing from './SocialSharing.jsx';
import './ImpactTracking.css';

const ImpactCard = ({ icon, label, value }) => (
  <article className="impact-card" role="listitem" aria-label={`${value.toLocaleString()} ${label}`}>
    <div className="impact-icon" aria-hidden="true" title={label}>{icon}</div>
    <div className="impact-info">
      <h3 className="impact-number">
        <CountUp end={value} duration={2} separator="," />
      </h3>
      <p className="impact-label">{label}</p>
    </div>
  </article>
);

const testimonials = [
  { name: "Maria G.", quote: "Thanks to this platform, my children are eating healthy every day." },
  { name: "David K.", quote: "We’ve reduced so much food waste and helped families in need." },
];

const Testimonials = () => (
  <section className="impact-testimonials" aria-label="Testimonials">
    <h3>Voices from the Community</h3>
    <ul>
      {testimonials.map((t, idx) => (
        <li key={idx} className="testimonial-card" tabIndex="0">
          <blockquote>"{t.quote}"</blockquote>
          <p>— {t.name}</p>
        </li>
      ))}
    </ul>
  </section>
);

const CallToAction = () => (
  <div className="impact-cta">
    <h3>Want to Make a Bigger Difference?</h3>
    <p>Join our volunteer network or donate to help us expand our reach.</p>
    <button className="involve-button"><Link to='/get-involved'> Get Involved</Link></button>
  </div>
);

function ImpactTracking({ metrics }) {
  const shareUrl = window.location.href;
  const shareTitle = 'Check out our collective impact!';

  return (
    <section className="impact-tracking" aria-label="Impact Tracking Statistics">
      <header className="impact-header">
        <h2 className="impact-title">We Are Making an Impact</h2>
        <p className="impact-subtitle">
          We are saving food and helping lives every day—track our progress together in one powerful dashboard.
        </p>
      </header>

      <div className="impact-cards" role="list">
        {metrics.map(({ icon, label, value }, index) => (
          <ImpactCard key={index} icon={icon} label={label} value={value} />
        ))}
      </div>

      <SocialSharing url={shareUrl} title={shareTitle} />

      <Testimonials />

      <CallToAction />
    </section>
  );
}

export default ImpactTracking;
