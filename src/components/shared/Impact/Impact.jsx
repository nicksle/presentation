import React from 'react';
import Icon from '../../Icon';

/**
 * Impact Component - Displays impact metrics for case studies
 *
 * @param {Object[]} metrics - Array of metric objects
 * @param {string} metrics[].index - Display index (e.g., "01", "02")
 * @param {string} metrics[].prefix - Prefix symbol (e.g., "+", "-")
 * @param {string} metrics[].value - Numeric value (e.g., "48")
 * @param {string} metrics[].unit - Unit symbol (e.g., "%")
 * @param {string} metrics[].label - Metric label (e.g., "User Sign Up")
 * @param {string} metrics[].description - Description text shown on hover
 * @param {string} metrics[].icon - Icon SVG path from ICON_PATHS
 * @param {string} [metrics[].iconSize] - Optional icon size (default: "small")
 */
const Impact = ({ metrics = [] }) => {
  return (
    <div className="casestudy-impact">
      <div className="casestudy-impact-top">
        <h3 className="S1">Impact</h3>
      </div>
      <div className="casestudy-impact-content">
        {metrics.map((metric, idx) => (
          <div key={idx} className="casestudy-impact-metric">
            <div className="casestudy-impact-metric-inner">
              <div className="casestudy-impact-metric-content">
                <div className="casestudy-impact-metric-top">
                  <span className="S1">{metric.index}</span>
                  <Icon svgPath={metric.icon} size={metric.iconSize || "small"} />
                </div>
                <div className="casestudy-impact-metric-text">
                  <span className="casestudy-impact-metric-prefix">{metric.prefix}</span>
                  <span className="casestudy-impact-metric-value">{metric.value}</span>
                  <span className="casestudy-impact-metric-unit">{metric.unit}</span>
                </div>
                <div className="casestudy-impact-metric-bottom">
                  <span className="S1">{metric.label}</span>
                </div>
              </div>
              <div className="casestudy-impact-metric-description">
                <p className="subtitle">{metric.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Impact;
