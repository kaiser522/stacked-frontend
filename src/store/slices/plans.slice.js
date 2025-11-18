import { createSlice } from '@reduxjs/toolkit';

const plansSlice = createSlice({
  name: 'plans',
  initialState: {
    selectedPlan: {
      selectedCard: null,
      billingType: null,
      selectedAddOns: null,
      price: 0,
      type: ""
    },
    // Cache for transformed data to avoid re-computation
    transformedPlans: {},
    transformedAddons: {},
  },
  reducers: {
    setSelectedPlansForSummary: (state, action) => {
      state.selectedPlan = action.payload;
    },
    clearSelectedPlan: (state) => {
      state.selectedPlan = {
        selectedCard: null,
        billingType: null,
        selectedAddOns: null,
        price: 0,
        type: ""
      };
    },
    // Cache transformed data to avoid re-processing
    setTransformedPlans: (state, action) => {
      const { category, plans } = action.payload;
      state.transformedPlans[category] = plans;
    },
    setTransformedAddons: (state, action) => {
      const { category, addons } = action.payload;
      state.transformedAddons[category] = addons;
    },
  },
});

export const {
  setSelectedPlansForSummary,
  clearSelectedPlan,
  setTransformedPlans,
  setTransformedAddons,
} = plansSlice.actions;

export default plansSlice.reducer;