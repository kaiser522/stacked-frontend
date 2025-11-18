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
 * Calendar Event Operations
 */

export const createCalendarEvent = async (eventData) => {
  try {
    const docRef = await addDoc(collection(db, 'calendar_events'), {
      ...eventData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      date: eventData.date 
        ? Timestamp.fromDate(new Date(eventData.date)) 
        : Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

export const updateCalendarEvent = async (eventId, eventData) => {
  try {
    const docRef = doc(db, 'calendar_events', eventId);
    await updateDoc(docRef, {
      ...eventData,
      updatedAt: Timestamp.now(),
      date: eventData.date 
        ? Timestamp.fromDate(new Date(eventData.date)) 
        : null,
    });
    return eventId;
  } catch (error) {
    console.error('Error updating calendar event:', error);
    throw error;
  }
};

export const deleteCalendarEvent = async (eventId) => {
  try {
    const docRef = doc(db, 'calendar_events', eventId);
    await deleteDoc(docRef);
    return eventId;
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    throw error;
  }
};

export const getCalendarEventById = async (eventId) => {
  try {
    const docRef = doc(db, 'calendar_events', eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        date: data.date?.toDate?.() || new Date(data.date),
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching calendar event:', error);
    throw error;
  }
};

export const getAllCalendarEvents = async () => {
  try {
    const q = query(
      collection(db, 'calendar_events'),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        date: data.date?.toDate?.() || new Date(data.date),
      };
    });
    return events;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    if (error.code === 'failed-precondition') {
      console.warn('Firestore index required. Collections will work once indexes are created.');
      return [];
    }
    throw error;
  }
};

export const getCalendarEventsByDateRange = async (startDate, endDate) => {
  try {
    const q = query(
      collection(db, 'calendar_events'),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate)),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        date: data.date?.toDate?.() || new Date(data.date),
      };
    });
    return events;
  } catch (error) {
    console.error('Error fetching calendar events by date range:', error);
    if (error.code === 'failed-precondition') {
      console.warn('Firestore index required. Collections will work once indexes are created.');
      return [];
    }
    throw error;
  }
};

