    import React from 'react';
import './GamificationDashboard.css';

const getBadges = (foodKg, people) => {
  const badges = [];

  if (foodKg >= 5) badges.push({ name: '🥇 First Saver', description: 'Saved 5kg of food' });
  if (people >= 10) badges.push({ name: '🏅 Helper Hero', description: 'Helped 10 people' });
  if (foodKg >= 50) badges.push({ name: '💎 Impact Champion', description: 'Saved 50kg of food' });

  return badges;
};

const getLevel = (foodKg) => {
  if (foodKg >= 50) return 4;
  if (foodKg >= 25) return 3;
  if (foodKg >= 10) return 2;
  return 1;
};

const getProgress = (foodKg) => {
  const level = getLevel(foodKg);
  const levelGoals = [10, 25, 50, 100];
  const max = levelGoals[level - 1];
  const prev = level > 1 ? levelGoals[level - 2] : 0;
  return Math.min(((foodKg - prev) / (max - prev)) * 100, 100);
};

function GamificationDashboard({ foodSavedKg, peopleHelped }) {
  const badges = getBadges(foodSavedKg, peopleHelped);
  const level = getLevel(foodSavedKg);
  const progress = getProgress(foodSavedKg);

  return (
    <section className="gamification-dashboard" aria-labelledby="gamification-title">
      <h2 id="gamification-title">🎮 Your Impact Journey</h2>

      <div className="progress-section">
        <p>Level {level} – Total Food Saved: {foodSavedKg}kg</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="badges-section">
        <h3>🏆 Earned Badges</h3>
        {badges.length > 0 ? (
          <ul className="badge-list">
            {badges.map((badge, i) => (
              <li key={i} className="badge-item">
                <span className="badge-icon">{badge.name.split(' ')[0]}</span>
                <div>
                  <strong>{badge.name}</strong>
                  <p className="badge-desc">{badge.description}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No badges yet—keep going!</p>
        )}
      </div>

      <div className="challenge-section">
        <h3>🔥 Weekly Challenge</h3>
        <p>Save 15kg of food this week to earn the 🧤 “Food Rescuer” badge!</p>
      </div>
    </section>
  );
}

export default GamificationDashboard;
