// src/components/Logo.tsx
import React from 'react';
import VibeCheckLogo from '../assets/VibeCheck_logo.png';

const Logo: React.FC = () => {
    return(
        <img src={VibeCheckLogo} alt="VibeCheck Logo" className="vibecheck-logo" />
    );

};

export default Logo;