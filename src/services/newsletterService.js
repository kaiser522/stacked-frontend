import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * Newsletter Operations
 */

export const createNewsletter = async (newsletterData) => {
  try {
    const docRef = await addDoc(collection(db, 'newsletters'), {
      ...newsletterData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      scheduledDate: newsletterData.scheduledDate 
        ? Timestamp.fromDate(new Date(newsletterData.scheduledDate)) 
        : null,
      createdDate: newsletterData.createdDate 
        ? Timestamp.fromDate(new Date(newsletterData.createdDate)) 
        : Timestamp.now(),
      sentDate: newsletterData.sentDate 
        ? Timestamp.fromDate(new Date(newsletterData.sentDate)) 
        : null,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating newsletter:', error);
    throw error;
  }
};

export const updateNewsletter = async (newsletterId, newsletterData) => {
  try {
    const docRef = doc(db, 'newsletters', newsletterId);
    await updateDoc(docRef, {
      ...newsletterData,
      updatedAt: Timestamp.now(),
      scheduledDate: newsletterData.scheduledDate 
        ? Timestamp.fromDate(new Date(newsletterData.scheduledDate)) 
        : null,
      sentDate: newsletterData.sentDate 
        ? Timestamp.fromDate(new Date(newsletterData.sentDate)) 
        : null,
    });
    return newsletterId;
  } catch (error) {
    console.error('Error updating newsletter:', error);
    throw error;
  }
};

export const deleteNewsletter = async (newsletterId) => {
  try {
    const docRef = doc(db, 'newsletters', newsletterId);
    await deleteDoc(docRef);
    return newsletterId;
  } catch (error) {
    console.error('Error deleting newsletter:', error);
    throw error;
  }
};

export const getNewsletterById = async (newsletterId) => {
  try {
    const docRef = doc(db, 'newsletters', newsletterId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate?.() || new Date(docSnap.data().createdAt),
        updatedAt: docSnap.data().updatedAt?.toDate?.() || new Date(docSnap.data().updatedAt),
        scheduledDate: docSnap.data().scheduledDate?.toDate?.() || null,
        createdDate: docSnap.data().createdDate?.toDate?.() || new Date(docSnap.data().createdDate),
        sentDate: docSnap.data().sentDate?.toDate?.() || null,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    throw error;
  }
};

export const getAllNewsletters = async () => {
  try {
    const q = query(
      collection(db, 'newsletters'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const newsletters = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        scheduledDate: data.scheduledDate?.toDate?.() || null,
        createdDate: data.createdDate?.toDate?.() || new Date(data.createdDate),
        sentDate: data.sentDate?.toDate?.() || null,
      };
    });
    return newsletters;
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    if (error.code === 'failed-precondition') {
      console.warn('Firestore index required. Collections will work once indexes are created.');
      return [];
    }
    throw error;
  }
};

export const getNewslettersByStatus = async (status) => {
  try {
    const q = query(
      collection(db, 'newsletters'),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const newsletters = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        scheduledDate: data.scheduledDate?.toDate?.() || null,
        createdDate: data.createdDate?.toDate?.() || new Date(data.createdDate),
        sentDate: data.sentDate?.toDate?.() || null,
      };
    });
    return newsletters;
  } catch (error) {
    console.error('Error fetching newsletters by status:', error);
    if (error.code === 'failed-precondition') {
      console.warn('Firestore index required. Collections will work once indexes are created.');
      return [];
    }
    throw error;
  }
};

/**
 * Newsletter Stats
 */
export const getNewsletterStats = async () => {
  try {
    const newsletters = await getAllNewsletters();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const sentThisMonth = newsletters.filter(nl => {
      if (!nl.sentDate) return false;
      const sentDate = new Date(nl.sentDate);
      return sentDate.getMonth() === currentMonth && sentDate.getFullYear() === currentYear;
    }).length;

    const scheduled = newsletters.filter(nl => nl.status === 'Scheduled').length;

    const totalRecipients = newsletters.reduce((sum, nl) => sum + (nl.recipients || 0), 0);
    
    const sentNewsletters = newsletters.filter(nl => nl.status === 'Sent');
    const avgOpenRate = sentNewsletters.length > 0
      ? sentNewsletters.reduce((sum, nl) => sum + (nl.openRate || 0), 0) / sentNewsletters.length
      : 0;

    return {
      totalSubscribers: totalRecipients,
      avgOpenRate: avgOpenRate,
      sentThisMonth: sentThisMonth,
      scheduled: scheduled,
    };
  } catch (error) {
    console.error('Error calculating newsletter stats:', error);
    return {
      totalSubscribers: 0,
      avgOpenRate: 0,
      sentThisMonth: 0,
      scheduled: 0,
    };
  }
};

