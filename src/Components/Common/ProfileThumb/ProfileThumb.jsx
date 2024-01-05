import React, { useState } from 'react';
import { ProfileThumbWrapper } from './ProfileThumb.style';
import userDefaultImage from '../../../Assets/Images/img_profile_basic.png';

export default function ProfileThumb({ src, userName, size }) {
  const image = src.includes('mandarin.api') ? src.replace('mandarin.api', 'api.mandarin') : src;
  const [imgSrc, setImgSrc] = useState(image);

  const handleError = () => {
    setImgSrc(userDefaultImage);
  };

  return (
    <ProfileThumbWrapper source={src} size={size}>
      <img src={imgSrc} alt={userName} onError={handleError} />
    </ProfileThumbWrapper>
  );
}
