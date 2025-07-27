// socialsharing.js
import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import './SocialSharing.css';

const SocialSharing = ({ url, title }) => {
  return (
    <div className="social-sharing-container" aria-label="Share your impact on social media">
      <p className="share-text">Share our impact with your friends!</p>
      <div className="social-buttons">
        <FacebookShareButton url={url} quote={title} className="social-btn" aria-label="Share on Facebook">
          <FacebookIcon size={48} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title} className="social-btn" aria-label="Share on Twitter">
          <TwitterIcon size={48} round />
        </TwitterShareButton>
        <WhatsappShareButton url={url} title={title} className="social-btn" aria-label="Share on WhatsApp">
          <WhatsappIcon size={48} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default SocialSharing;
