// Utility functions to transform API data to the format expected by components

export const transformPlanData = (apiPlan) => {
  if (!apiPlan) return null;

  return {
    key: apiPlan._id,
    title: apiPlan.name,
    subheading: apiPlan.description || '',
    features: apiPlan.features || [],
    rate: {
      monthly: {
        price: apiPlan.price || 0,
        duration: '/month'
      },
      yearly: {
        price: Math.floor((apiPlan.price || 0) * 12 * 0.9),
        duration: '/year'
      }
    },
    // Keep original API data for reference
    originalData: apiPlan
  };
};

export const transformAddonData = (apiAddon) => {
  if (!apiAddon) return null;

  return {
    key: apiAddon._id,
    title: apiAddon.addon_name,
    description: apiAddon.features && apiAddon.features.length > 0 
      ? apiAddon.features  // Use features array if available for bullet points
      : (apiAddon.description || ''),  // Fallback to description string
    price: apiAddon.price || 0,
    duration: apiAddon.billing_cycle || '/month',
    // Keep original API data for reference
    originalData: apiAddon
  };
};

export const transformPlansArray = (apiPlans) => {
  if (!Array.isArray(apiPlans)) return [];
  return apiPlans.map(transformPlanData).filter(Boolean);
};

export const transformAddonsArray = (apiAddons) => {
  if (!Array.isArray(apiAddons)) return [];
  return apiAddons.map(transformAddonData).filter(Boolean);
};

// Get title based on category type
export const getCategoryTitle = (type) => {
  const titleMapping = {
    'probate': 'Probate',
    'home-flippers': 'Home Flippers',
    'real-estate-agents': 'Real Estate Agents',
    'whole-salers': 'Wholesalers'
  };

  return titleMapping[type] || 'Plans';
};