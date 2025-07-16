import React from 'react';
import CountUp from 'react-countup';
import './ImpactTracking.css';

function ImpactTracking() {
  const foodSavedKg = 12; 
  const peopleHelped = 25;

  return (
    <section className="impact-tracking-container" aria-label="Impact Tracking Statistics">
      <header>
        <h2 className="impact-title">Impact Tracking</h2>
        <p className="impact-subtitle">
          Track how much food you’ve saved and how many people you’ve helped, all in one dashboard.
        </p>
      </header>

      <div className="impact-cards" role="list">
        <article className="impact-card" role="listitem" aria-label={`${foodSavedKg.toLocaleString()} kilograms of food saved`}>
          <div className="impact-icon food-icon" aria-hidden="true" title="Food Saved">🍎</div>
          <div className="impact-info">
            <h3 className="impact-number">
              <CountUp end={foodSavedKg} duration={2} separator="," />
            </h3>
            <p className="impact-label">Kilograms of Food Saved</p>
          </div>
        </article>

        <article className="impact-card" role="listitem" aria-label={`${peopleHelped.toLocaleString()} people helped`}>
          <div className="impact-icon people-icon" aria-hidden="true" title="People Helped">🤝</div>
          <div className="impact-info">
            <h3 className="impact-number">
              <CountUp end={peopleHelped} duration={2} separator="," />
            </h3>
            <p className="impact-label">People Helped</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ImpactTracking;
