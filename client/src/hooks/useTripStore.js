import { create } from "zustand";
import { api } from "../lib/api.js";

export const useTripStore = create((set, get) => ({
  trips: [],
  currentTrip: null,
  ideas: [],
  itinerary: null,
  loading: false,
  error: null,

  loadTrips: async () => {
    set({ loading: true, error: null });
    try {
      const trips = await api.getTrips();
      set({ trips, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createTrip: async (payload) => {
    set({ loading: true, error: null });
    try {
      const trip = await api.createTrip(payload);
      set((state) => ({ trips: [trip, ...state.trips], loading: false }));
      return trip;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  loadTrip: async (tripId) => {
    set({ loading: true, error: null });
    try {
      const trip = await api.getTrip(tripId);
      set({ currentTrip: trip, loading: false });
      return trip;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateTripDates: async (tripId, payload) => {
    set({ loading: true, error: null });
    try {
      const trip = await api.updateTripDates(tripId, payload);
      set((state) => ({
        currentTrip: state.currentTrip?.id === trip.id ? trip : state.currentTrip,
        trips: state.trips.map((candidate) => (candidate.id === trip.id ? trip : candidate)),
        loading: false
      }));
      return trip;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  joinTrip: async (tripId) => {
    try {
      await api.joinTrip(tripId);
    } catch (error) {
      set({ error: error.message });
    }
  },

  loadIdeas: async (tripId) => {
    set({ loading: true, error: null });
    try {
      const ideas = await api.getIdeas(tripId);
      set({ ideas, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addIdea: async (tripId, payload) => {
    set({ loading: true, error: null });
    try {
      const idea = await api.createIdea(tripId, payload);
      set((state) => ({ ideas: [idea, ...state.ideas], loading: false }));
      return idea;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  voteIdea: async (ideaId, value) => {
    const previous = get().ideas;
    const priorVote = previous.find((idea) => idea.id === ideaId)?.userVote || 0;
    const delta = value - priorVote;
    set({
      ideas: previous.map((idea) =>
        idea.id === ideaId
          ? { ...idea, voteScore: idea.voteScore + delta, userVote: value }
          : idea
      )
    });
    try {
      const updated = await api.voteIdea(ideaId, value);
      set((state) => ({
        ideas: state.ideas.map((idea) => (idea.id === updated.id ? updated : idea))
      }));
    } catch (error) {
      set({ ideas: previous, error: error.message });
    }
  },

  generateItinerary: async (tripId) => {
    set({ loading: true, error: null });
    try {
      const itinerary = await api.generateItinerary(tripId);
      set({ itinerary, loading: false });
      return itinerary;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  loadItinerary: async (tripId) => {
    set({ loading: true, error: null });
    try {
      const itinerary = await api.getItinerary(tripId);
      set({ itinerary, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));
