import { z } from "zod";
import { ensureUser } from "../services/user.js";
import { store } from "../services/store.js";

const voteSchema = z.object({
  value: z.number().int().min(-1).max(1)
});

export async function voteOnIdea(req, res, next) {
  try {
    const user = await ensureUser(req);
    const { id } = req.params;
    const payload = voteSchema.parse(req.body);
    res.json(store.voteIdea({ ideaId: id, userId: user.id, value: payload.value }));
  } catch (error) {
    next(error);
  }
}
