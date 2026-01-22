import { useState, useMemo } from 'react';
import bannerData from '../data/banner';
import './CurouselBanner.css';

export default function CurouselBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerData.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  };

  // Memoize current banner
  const banner = useMemo(
    () => bannerData[currentBanner],
    [currentBanner]
  );

  return (
    <div className="carousel-banner">
      <div className="banner-content">
        <img src={banner.image} alt={banner.title} />
        <div className="banner-text">
          <h1>{banner.title}</h1>
          <p>{banner.description}</p>
        </div>
      </div>
      <button onClick={prevBanner} className="btn-prev">←</button>
      <button onClick={nextBanner} className="btn-next">→</button>
    </div>
  );
}
