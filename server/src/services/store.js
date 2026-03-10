import { randomUUID } from "node:crypto";
import { buildItinerary } from "./itineraryBuilder.js";
import { HttpError } from "./httpError.js";

function normalizeName(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  return trimmed.slice(0, 40);
}

function defaultUserName(userId) {
  return `Traveler ${String(userId).slice(0, 4)}`;
}

function toISODate(value) {
  if (!value) return null;
  return new Date(value).toISOString().slice(0, 10);
}

function now() {
  return new Date();
}

function compareByDateDesc(a, b) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

const state = {
  users: new Map(), // userId -> { id, name }
  trips: new Map(), // tripId -> { id, name, startDate, endDate, createdById, createdAt }
  tripsByUser: new Map(), // userId -> Set<tripId>
  membersByTrip: new Map(), // tripId -> Set<userId>
  ideas: new Map(), // ideaId -> { id, tripId, title, description, location, category, createdById, createdAt }
  ideasByTrip: new Map(), // tripId -> Set<ideaId>
  votesByIdea: new Map(), // ideaId -> Map<userId, value>
  itineraries: new Map() // tripId -> itinerary payload
};

function ensureTripExists(tripId) {
  const trip = state.trips.get(tripId);
  if (!trip) throw new HttpError(404, "Trip not found");
  return trip;
}

function ensureIdeaExists(ideaId) {
  const idea = state.ideas.get(ideaId);
  if (!idea) throw new HttpError(404, "Idea not found");
  return idea;
}

function getMemberCount(tripId) {
  return state.membersByTrip.get(tripId)?.size || 0;
}

function formatTrip(trip) {
  return {
    id: trip.id,
    name: trip.name,
    startDate: toISODate(trip.startDate),
    endDate: toISODate(trip.endDate),
    memberCount: getMemberCount(trip.id)
  };
}

function getVotes(ideaId) {
  const votesMap = state.votesByIdea.get(ideaId);
  if (!votesMap) return [];
  return [...votesMap.entries()].map(([userId, value]) => ({ userId, value }));
}

function formatIdea(idea, userId) {
  const votes = getVotes(idea.id);
  const voteScore = votes.reduce((sum, vote) => sum + vote.value, 0);
  const userVote = votes.find((vote) => vote.userId === userId)?.value || 0;
  const createdBy = state.users.get(idea.createdById);
  return {
    id: idea.id,
    title: idea.title,
    description: idea.description,
    location: idea.location,
    category: idea.category,
    createdAt: idea.createdAt,
    submittedBy: createdBy?.name || "Traveler",
    voteScore,
    voteCount: votes.length,
    userVote
  };
}

export const store = {
  getOrCreateUser: ({ userId, name }) => {
    const normalized = normalizeName(name);
    const existing = state.users.get(userId);
    if (existing) {
      if (normalized && existing.name !== normalized) {
        existing.name = normalized;
      }
      return existing;
    }

    const user = {
      id: userId,
      name: normalized || defaultUserName(userId)
    };
    state.users.set(userId, user);
    return user;
  },

  listTripsForUser: (userId) => {
    const tripIds = state.tripsByUser.get(userId);
    if (!tripIds) return [];
    return [...tripIds]
      .map((tripId) => state.trips.get(tripId))
      .filter(Boolean)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((trip) => formatTrip(trip));
  },

  createTrip: ({ userId, name, startDate, endDate }) => {
    const trip = {
      id: randomUUID(),
      name,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      createdById: userId,
      createdAt: now()
    };
    state.trips.set(trip.id, trip);

    const existingForUser = state.tripsByUser.get(userId) || new Set();
    existingForUser.add(trip.id);
    state.tripsByUser.set(userId, existingForUser);

    const members = state.membersByTrip.get(trip.id) || new Set();
    members.add(userId);
    state.membersByTrip.set(trip.id, members);

    return formatTrip(trip);
  },

  updateTripDates: ({ tripId, startDate, endDate }) => {
    const trip = ensureTripExists(tripId);
    trip.startDate = new Date(startDate);
    trip.endDate = new Date(endDate);
    state.itineraries.delete(tripId);
    return formatTrip(trip);
  },

  getTrip: (tripId) => {
    const trip = ensureTripExists(tripId);
    return formatTrip(trip);
  },

  joinTrip: ({ tripId, userId }) => {
    ensureTripExists(tripId);

    const members = state.membersByTrip.get(tripId) || new Set();
    members.add(userId);
    state.membersByTrip.set(tripId, members);

    const userTrips = state.tripsByUser.get(userId) || new Set();
    userTrips.add(tripId);
    state.tripsByUser.set(userId, userTrips);
  },

  listIdeas: ({ tripId, userId }) => {
    ensureTripExists(tripId);
    const ideaIds = state.ideasByTrip.get(tripId);
    if (!ideaIds) return [];
    return [...ideaIds]
      .map((ideaId) => state.ideas.get(ideaId))
      .filter(Boolean)
      .sort(compareByDateDesc)
      .map((idea) => formatIdea(idea, userId));
  },

  createIdea: ({ tripId, userId, title, description, location, category }) => {
    ensureTripExists(tripId);
    const idea = {
      id: randomUUID(),
      tripId,
      title,
      description,
      location,
      category: category || null,
      createdById: userId,
      createdAt: now()
    };
    state.ideas.set(idea.id, idea);
    const ideasForTrip = state.ideasByTrip.get(tripId) || new Set();
    ideasForTrip.add(idea.id);
    state.ideasByTrip.set(tripId, ideasForTrip);

    state.itineraries.delete(tripId);
    return formatIdea(idea, userId);
  },

  voteIdea: ({ ideaId, userId, value }) => {
    const idea = ensureIdeaExists(ideaId);
    const votes = state.votesByIdea.get(ideaId) || new Map();
    if (value === 0) {
      votes.delete(userId);
    } else {
      votes.set(userId, value);
    }
    state.votesByIdea.set(ideaId, votes);

    state.itineraries.delete(idea.tripId);
    return formatIdea(idea, userId);
  },

  generateItinerary: ({ tripId }) => {
    const trip = ensureTripExists(tripId);
    if (!trip.startDate || !trip.endDate) {
      throw new HttpError(400, "Set trip dates before generating an itinerary");
    }
    const ideaIds = state.ideasByTrip.get(tripId) || new Set();
    const ideas = [...ideaIds]
      .map((ideaId) => state.ideas.get(ideaId))
      .filter(Boolean)
      .map((idea) => ({
        ...idea,
        votes: getVotes(idea.id)
      }));

    const itinerary = buildItinerary({ trip, ideas });
    state.itineraries.set(tripId, itinerary);
    return itinerary;
  },

  getItinerary: ({ tripId }) => {
    ensureTripExists(tripId);
    return state.itineraries.get(tripId) || { tripId, days: [] };
  }
};
