import React, { useState } from 'react';
import './CardGroup.css';
import Card from './Card/Card';

const CardGroup = ({ 
  firstCard,
  lastCard,
  style = {} 
}) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardExpand = (isExpanded, isFirstCard) => {
    if (isExpanded) {
      setExpandedCard(isFirstCard ? 'first' : 'last');
    } else {
      setExpandedCard(null);
    }
  };

  return (
    <div className="card-group fade-in-item" style={style}>
      <Card 
        {...firstCard} 
        onExpand={(isExpanded) => handleCardExpand(isExpanded, true)}
        isExpanded={expandedCard === 'first'}
        className={`${expandedCard === 'first' ? 'expanded' : ''} ${expandedCard === 'last' ? 'unexpanded' : ''}`}
      />
      {lastCard && (
        <Card 
          {...lastCard} 
          onExpand={(isExpanded) => handleCardExpand(isExpanded, false)}
          isExpanded={expandedCard === 'last'}
          className={`${expandedCard === 'last' ? 'expanded' : ''} ${expandedCard === 'first' ? 'unexpanded' : ''}`}
        />
      )}
    </div>
  );
};

export default CardGroup;
