import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * Commission calculation utilities based on Program Rules
 */

/**
 * Calculate commission for a given month
 * @param {number} monthNumber - Month number (1-12)
 * @param {number} subscriptionAmount - Monthly subscription amount
 * @returns {number} Commission amount
 */
export const calculateCommission = (monthNumber, subscriptionAmount) => {
  if (monthNumber > 12) return 0; // Cap at 12 months
  
  if (monthNumber === 1) {
    return subscriptionAmount * 0.30; // 30% for month 1
  } else if (monthNumber >= 2 && monthNumber <= 12) {
    return subscriptionAmount * 0.10; // 10% for months 2-12
  }
  
  return 0;
};

/**
 * Check if commission is eligible for payout (Net-14 hold)
 * @param {Date} chargeDate - Date when charge was made
 * @returns {boolean} True if eligible for payout
 */
export const isCommissionEligibleForPayout = (chargeDate) => {
  const holdPeriodDays = 14;
  const holdDate = new Date(chargeDate);
  holdDate.setDate(holdDate.getDate() + holdPeriodDays);
  return new Date() >= holdDate;
};

/**
 * Get payout eligibility date (14 days after charge)
 * @param {Date} chargeDate - Date when charge was made
 * @returns {Date} Date when commission becomes eligible
 */
export const getPayoutEligibilityDate = (chargeDate) => {
  const holdDate = new Date(chargeDate);
  holdDate.setDate(holdDate.getDate() + 14);
  return holdDate;
};

/**
 * Check if payout meets minimum threshold
 * @param {number} amount - Payout amount
 * @returns {boolean} True if meets $150 minimum
 */
export const meetsPayoutMinimum = (amount) => {
  return amount >= 150;
};

/**
 * Get next payout date (15th of next month)
 * @returns {Date} Next payout date
 */
export const getNextPayoutDate = () => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 15);
  return nextMonth;
};

/**
 * Affiliate Referrals Operations
 */

export const getAffiliateReferrals = async (affiliateId) => {
  try {
    const q = query(
      collection(db, 'affiliate_referrals'),
      where('affiliateId', '==', affiliateId)
      // Removed orderBy to avoid index requirement - will sort client-side
    );
    const querySnapshot = await getDocs(q);
    const referrals = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt),
      chargeDate: doc.data().chargeDate?.toDate?.() || new Date(doc.data().chargeDate),
    }));
    // Sort client-side by createdAt (newest first)
    return referrals.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (error) {
    console.error('Error fetching affiliate referrals:', error);
    // Return empty array instead of throwing - allows UI to show empty state
    if (error.code === 'failed-precondition') {
      console.warn('Firestore index required. Collections will work once indexes are created.');
      return [];
    }
    throw error;
  }
};

export const createAffiliateReferral = async (referralData) => {
  try {
    const docRef = await addDoc(collection(db, 'affiliate_referrals'), {
      ...referralData,
      createdAt: Timestamp.now(),
      chargeDate: referralData.chargeDate ? Timestamp.fromDate(new Date(referralData.chargeDate)) : Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating affiliate referral:', error);
    throw error;
  }
};

/**
 * Affiliate Payouts Operations
 */

export const getAffiliatePayouts = async (affiliateId) => {
  try {
    const q = query(
      collection(db, 'affiliate_payouts'),
      where('affiliateId', '==', affiliateId)
      // Removed orderBy to avoid index requirement - will sort client-side
    );
    const querySnapshot = await getDocs(q);
    const payouts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      payoutDate: doc.data().payoutDate?.toDate?.() || new Date(doc.data().payoutDate),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt),
    }));
    // Sort client-side by payoutDate (newest first)
    return payouts.sort((a, b) => (b.payoutDate || 0) - (a.payoutDate || 0));
  } catch (error) {
    console.error('Error fetching affiliate payouts:', error);
    // Return empty array instead of throwing - allows UI to show empty state
    if (error.code === 'failed-precondition') {
      console.warn('Firestore index required. Collections will work once indexes are created.');
      return [];
    }
    throw error;
  }
};

export const createAffiliatePayout = async (payoutData) => {
  try {
    const docRef = await addDoc(collection(db, 'affiliate_payouts'), {
      ...payoutData,
      createdAt: Timestamp.now(),
      payoutDate: payoutData.payoutDate ? Timestamp.fromDate(new Date(payoutData.payoutDate)) : Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating affiliate payout:', error);
    throw error;
  }
};

/**
 * Affiliate Clawbacks Operations
 */

export const getAffiliateClawbacks = async (affiliateId) => {
  try {
    const q = query(
      collection(db, 'affiliate_clawbacks'),
      where('affiliateId', '==', affiliateId)
      // Removed orderBy to avoid index requirement - will sort client-side
    );
    const querySnapshot = await getDocs(q);
    const clawbacks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt),
      chargeDate: doc.data().chargeDate?.toDate?.() || new Date(doc.data().chargeDate),
    }));
    // Sort client-side by createdAt (newest first)
    return clawbacks.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (error) {
    console.error('Error fetching affiliate clawbacks:', error);
    // Return empty array instead of throwing - allows UI to show empty state
    if (error.code === 'failed-precondition') {
      console.warn('Firestore index required. Collections will work once indexes are created.');
      return [];
    }
    throw error;
  }
};

export const createAffiliateClawback = async (clawbackData) => {
  try {
    const docRef = await addDoc(collection(db, 'affiliate_clawbacks'), {
      ...clawbackData,
      createdAt: Timestamp.now(),
      chargeDate: clawbackData.chargeDate ? Timestamp.fromDate(new Date(clawbackData.chargeDate)) : Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating affiliate clawback:', error);
    throw error;
  }
};

/**
 * Affiliate Profile Operations
 */

export const getAffiliateProfile = async (affiliateId) => {
  try {
    const docRef = doc(db, 'affiliates', affiliateId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate?.() || new Date(docSnap.data().createdAt),
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching affiliate profile:', error);
    throw error;
  }
};

export const createAffiliateProfile = async (affiliateData) => {
  try {
    const docRef = doc(db, 'affiliates', affiliateData.userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Update existing document
      await updateDoc(docRef, {
        ...affiliateData,
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } else {
      // Create new document
      await updateDoc(docRef, {
        ...affiliateData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }, { merge: true });
      return docRef.id;
    }
  } catch (error) {
    console.error('Error creating/updating affiliate profile:', error);
    throw error;
  }
};

/**
 * Admin Operations - Get all affiliates
 */

export const getAllAffiliates = async () => {
  try {
    const q = query(collection(db, 'affiliates'));
    // Removed orderBy to avoid index requirement - will sort client-side
    const querySnapshot = await getDocs(q);
    const affiliates = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt),
    }));
    // Sort client-side by createdAt (newest first)
    return affiliates.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (error) {
    console.error('Error fetching all affiliates:', error);
    // Return empty array instead of throwing - allows UI to show empty state
    if (error.code === 'failed-precondition') {
      console.warn('Firestore index required. Collections will work once indexes are created.');
      return [];
    }
    throw error;
  }
};

/**
 * Activity Target Tracking
 */

/**
 * Count new paid customers for a specific month
 * @param {Array} referrals - Array of referral objects
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {number} Count of new paid customers
 */
export const countNewPaidCustomers = (referrals, year, month) => {
  return referrals.filter(ref => {
    const chargeDate = ref.chargeDate instanceof Date ? ref.chargeDate : new Date(ref.chargeDate);
    return chargeDate.getFullYear() === year &&
           chargeDate.getMonth() === month - 1 &&
           ref.status === 'paid' &&
           ref.monthNumber === 1; // Only count first month charges
  }).length;
};

/**
 * Check if affiliate meets activity target (2+ new customers per month)
 * @param {Array} referrals - Array of referral objects
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {boolean} True if meets target
 */
export const meetsActivityTarget = (referrals, year, month) => {
  const count = countNewPaidCustomers(referrals, year, month);
  return count >= 2;
};

/**
 * Calculate pending commissions that are eligible for payout
 * @param {Array} referrals - Array of referral objects
 * @returns {number} Total eligible amount
 */
export const calculateEligibleCommissions = (referrals) => {
  return referrals
    .filter(ref => {
      if (ref.status !== 'pending') return false;
      return isCommissionEligibleForPayout(ref.chargeDate);
    })
    .reduce((sum, ref) => sum + (ref.commission || 0), 0);
};

