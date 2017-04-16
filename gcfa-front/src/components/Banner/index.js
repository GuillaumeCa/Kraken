import React from 'react';

const BANNER_HEIGHT = 150;

const BACKGROUND_STYLE = {
  background: 'url(background.jpg)',
  backgroundRepeat: 'none',
  backgroundSize: 'cover',
  backgroundPosition: '50% 30%',
  position: 'absolute',
  width: '100%',
  height: BANNER_HEIGHT - 10,
  zIndex: 0,
}

const OVERLAY_STYLE = {
  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), white 90%)',
  position: 'absolute',
  width: '100%',
  height: BANNER_HEIGHT,
  zIndex: 1,
}

const CONTENT_STYLE = {
  position: 'relative',
  padding: 20,
  minHeight: 300,
  zIndex: 2,
  margin: '0 auto',
  maxWidth: 1000,
}

function Banner(props) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={BACKGROUND_STYLE}></div>
      <div style={OVERLAY_STYLE}></div>
      <div style={CONTENT_STYLE}>
        {props.children}
      </div>
    </div>
  );
}

export default Banner;
