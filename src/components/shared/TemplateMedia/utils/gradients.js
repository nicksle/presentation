/**
 * Dark purple linear gradients for TemplateMedia backgrounds
 * Moody, grainy aesthetic with subtle color transitions
 */

// Color palette: dark purples only, no whites
const colors = {
  deepPurple1: '#0d0015',
  deepPurple2: '#1a0033',
  deepPurple3: '#2d1b4e',
  midPurple1: '#4a1d5c',
  midPurple2: '#6b2d7a',
  midPurple3: '#5a2668'
};

/**
 * Linear gradients with subtle radial accents
 * Darker palette, more directional flow
 */
const gradients = [
  // Gradient 1: Deep diagonal
  {
    id: 'linear-1',
    background: `
      radial-gradient(circle at 85% 15%, ${colors.midPurple1} 0%, transparent 65%),
      linear-gradient(135deg, ${colors.deepPurple1} 0%, ${colors.deepPurple3} 50%, ${colors.midPurple1} 100%)`
  },

  // Gradient 2: Vertical descent
  {
    id: 'linear-2',
    background: `
      radial-gradient(circle at 20% 80%, ${colors.midPurple2} 0%, transparent 60%),
      linear-gradient(180deg, ${colors.deepPurple2} 0%, ${colors.midPurple3} 60%, ${colors.deepPurple1} 100%)`
  },

  // Gradient 3: Horizontal sweep
  {
    id: 'linear-3',
    background: `
      radial-gradient(circle at 10% 50%, ${colors.midPurple1} 0%, transparent 55%),
      linear-gradient(90deg, ${colors.deepPurple1} 0%, ${colors.deepPurple3} 100%)`
  },

  // Gradient 4: Angled depth
  {
    id: 'linear-4',
    background: `
      radial-gradient(ellipse at 70% 30%, ${colors.midPurple2} 0%, transparent 70%),
      linear-gradient(45deg, ${colors.deepPurple1} 0%, ${colors.midPurple1} 100%)`
  },

  // Gradient 5: Reverse diagonal
  {
    id: 'linear-5',
    background: `
      radial-gradient(circle at 15% 85%, ${colors.midPurple3} 0%, transparent 58%),
      linear-gradient(225deg, ${colors.deepPurple2} 0%, ${colors.deepPurple3} 100%)`
  },

  // Gradient 6: Vertical rise
  {
    id: 'linear-6',
    background: `
      radial-gradient(circle at 50% 90%, ${colors.midPurple1} 0%, transparent 62%),
      linear-gradient(0deg, ${colors.deepPurple1} 0%, ${colors.midPurple2} 100%)`
  },

  // Gradient 7: Steep angle
  {
    id: 'linear-7',
    background: `
      radial-gradient(ellipse at 90% 10%, ${colors.midPurple2} 0%, transparent 68%),
      linear-gradient(315deg, ${colors.deepPurple1} 0%, ${colors.deepPurple3} 100%)`
  },

  // Gradient 8: Subtle shift
  {
    id: 'linear-8',
    background: `
      radial-gradient(circle at 40% 60%, ${colors.midPurple1} 0%, transparent 65%),
      linear-gradient(270deg, ${colors.deepPurple2} 0%, ${colors.midPurple3} 100%)`
  }
];

/**
 * Get a random gradient from the collection
 * @returns {Object} Gradient object with id and background CSS
 */
export const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

/**
 * Get a specific gradient by index
 * @param {number} index - Gradient index (0-7)
 * @returns {Object} Gradient object
 */
export const getGradientByIndex = (index) => {
  return gradients[index % gradients.length];
};

export default gradients;
