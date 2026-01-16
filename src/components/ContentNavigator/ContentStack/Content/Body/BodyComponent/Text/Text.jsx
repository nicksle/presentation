import React from 'react';
import './Text.css';

const textStyles = {
  title1: {
    fontFamily: 'var(--font-family-title)',
    fontSize: 'var(--font-size-title-xxl)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-primary)',
    lineHeight: 1.2
  },
  titleLg: {
    fontFamily: 'var(--font-family-title)',
    fontSize: 'var(--font-size-title-xl)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-primary)',
    lineHeight: 1.2
  },
  titleBase: {
    fontFamily: 'var(--font-family-title)',
    fontSize: 'var(--font-size-title-base)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-primary)',
    lineHeight: 1.2
  },
  bodyLg: {
    fontFamily: 'var(--font-family-body)',
    fontSize: 'var(--font-size-body)',
    fontWeight: 'var(--font-weight-regular)',
    color: 'var(--color-primary)',
    lineHeight: 1.2
  },
  bodyBase: {
    fontFamily: 'var(--font-family-body)',
    fontSize: 'var(--font-size-body)',
    fontWeight: 'var(--font-weight-regular)',
    color: 'var(--color-primary)',
    lineHeight: 1.2
  },
  bodySm: {
    fontFamily: 'var(--font-family-body)',
    fontSize: 'var(--font-size-body-sm)',
    fontWeight: 'var(--font-weight-regular)',
    color: 'var(--color-primary)',
    lineHeight: 1.2
  },
  subtitle: {
    fontFamily: 'var(--font-family-subtitle)',
    fontSize: 'var(--font-size-subtitle)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-tertiary)',
    lineHeight: 1.2
  }
};

const Text = ({ 
  children, 
  style = 'bodyLg',
  subtitle,
  subtitleStyle = 'subtitle'
}) => {
  const textStyle = typeof style === 'string' ? textStyles[style] || textStyles.bodyLg : style;
  const subStyle = typeof subtitleStyle === 'string' ? textStyles[subtitleStyle] || textStyles.subtitle : subtitleStyle;

  return (
    <div className="text-component-wrapper">
      {subtitle && (
        <p 
          className="text-subtitle" 
          style={subStyle}
        >
          {subtitle}
        </p>
      )}
      <p 
        className="text-component" 
        style={textStyle}
      >
        {children}
      </p>
    </div>
  );
};

export default Text;
