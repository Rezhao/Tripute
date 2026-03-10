import { z } from "zod";
import { ensureUser } from "../services/user.js";
import { store } from "../services/store.js";

const tripCreateSchema = z.object({
  name: z.string().min(2)
});

const tripDatesSchema = z.object({
  startDate: z.string(),
  endDate: z.string()
});

export async function listTrips(req, res, next) {
  try {
    const user = await ensureUser(req);
    res.json(store.listTripsForUser(user.id));
  } catch (error) {
    next(error);
  }
}

export async function createTrip(req, res, next) {
  try {
    const user = await ensureUser(req);
    const payload = tripCreateSchema.parse(req.body);
    const trip = store.createTrip({
      userId: user.id,
      name: payload.name
    });
    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
}

export async function getTrip(req, res, next) {
  try {
    const { id } = req.params;
    res.json(store.getTrip(id));
  } catch (error) {
    next(error);
  }
}

export async function updateTripDates(req, res, next) {
  try {
    await ensureUser(req);
    const { id } = req.params;
    const payload = tripDatesSchema.parse(req.body);
    res.json(store.updateTripDates({ tripId: id, startDate: payload.startDate, endDate: payload.endDate }));
  } catch (error) {
    next(error);
  }
}

export async function joinTrip(req, res, next) {
  try {
    const user = await ensureUser(req);
    const { id } = req.params;
    store.joinTrip({ tripId: id, userId: user.id });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function listIdeas(req, res, next) {
  try {
    const user = await ensureUser(req);
    const { id } = req.params;
    res.json(store.listIdeas({ tripId: id, userId: user.id }));
  } catch (error) {
    next(error);
  }
}

export async function createIdea(req, res, next) {
  try {
    const user = await ensureUser(req);
    const { id } = req.params;
    const ideaSchema = z.object({
      title: z.string().min(2),
      description: z.string().min(2),
      location: z.string().min(2),
      category: z.string().optional()
    });
    const payload = ideaSchema.parse(req.body);
    const idea = store.createIdea({
      tripId: id,
      userId: user.id,
      title: payload.title,
      description: payload.description,
      location: payload.location,
      category: payload.category
    });
    res.status(201).json(idea);
  } catch (error) {
    next(error);
  }
}

export async function generateTripItinerary(req, res, next) {
  try {
    const { id } = req.params;
    res.json(store.generateItinerary({ tripId: id }));
  } catch (error) {
    next(error);
  }
}

export async function getTripItinerary(req, res, next) {
  try {
    const { id } = req.params;
    res.json(store.getItinerary({ tripId: id }));
  } catch (error) {
    next(error);
  }
}
