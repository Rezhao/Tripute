import { HttpError } from "./httpError.js";
import { store } from "./store.js";

export async function ensureUser(req) {
  const userId = req.header("x-user-id");
  if (!userId) {
    throw new HttpError(400, "Missing x-user-id header");
  }

  const name = req.header("x-user-name");
  return store.getOrCreateUser({ userId, name });
}
