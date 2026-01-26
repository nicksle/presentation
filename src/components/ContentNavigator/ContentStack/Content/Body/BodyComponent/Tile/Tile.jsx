import React from 'react';
import './Tile.css';
import Text from '../Text/Text';
import Icon from '../../../../../../../components/Icon';
import { ICON_PATHS } from '../../../../../../../utils/iconPaths';

const textStyles = {
  index: {
    fontFamily: 'var(--font-family-subtitle)',
    fontSize: 'var(--font-size-subtitle)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-tertiary)'
  },
  title: {
    fontFamily: 'var(--font-family-title)',
    fontSize: 'var(--font-size-title-base)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-primary)'
  }
};

const Tile = ({
  index,
  title,
  bottomLeft,
  bottomRight,
  bottom2Icon,
  bottom2Subtitle,
  bottom2ClassName = '',
  className = '',
  style = {},
  icon
}) => {
  return (
    <div className={`tile ${className}`} style={style}>
      <div className="tile-head">
        <div className="tile-head-top">
          <span style={textStyles.index}>{index}</span>
          <div className="tile-head-icon">
            {icon ? (
              <div className="tile-icon-svg">
                {icon}
              </div>
            ) : (
              <div className="tile-icon-svg">
                <Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />
              </div>
            )}
          </div>
        </div>
        <div className="tile-head-title">
          <Text style="titleBase">{title}</Text>
        </div>
        <div className="tile-head-bottom">
          {bottomLeft}
          {bottomRight}
        </div>
        {(bottom2Icon || bottom2Subtitle) && (
          <div className={`tile-head-bottom2 ${bottom2ClassName}`}>
            {bottom2Icon && (
              <div className="tile-head-bottom2-icon">
                {bottom2Icon}
              </div>
            )}
            {bottom2Subtitle && (
              <div className="tile-head-bottom2-subtitle">
                {bottom2Subtitle}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tile;
