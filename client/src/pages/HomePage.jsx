import { Link } from "react-router-dom";
import HeroScene from "../components/HeroScene.jsx";
import UserIdentity from "../components/UserIdentity.jsx";

export default function HomePage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Tripute</p>
          <h1 className="mt-2 text-4xl font-semibold text-ink sm:text-5xl">
            Classic planning,
            <span className="block text-ocean">modern collaboration.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-slate-500">
            Drop trip ideas as blocks, invite friends, and vote together. Generate a draft itinerary based on what the
            group loves most.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to="/trips" className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-card">
              View trips
            </Link>
            <Link
              to="/trips/new"
              className="rounded-full border border-white/60 bg-white/80 px-6 py-3 text-sm font-semibold text-ink shadow-card backdrop-blur"
            >
              Create a trip
            </Link>
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
        <HeroScene />
        <div className="flex flex-col gap-6">
          <UserIdentity editable />
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-card backdrop-blur">
            <h2 className="text-lg font-semibold text-ink">How it works</h2>
            <ol className="mt-4 grid gap-3 text-sm text-slate-600">
              <li className="rounded-2xl bg-white/70 px-4 py-3">
                <span className="font-semibold text-ink">1.</span> Create a trip and share the invite link.
              </li>
              <li className="rounded-2xl bg-white/70 px-4 py-3">
                <span className="font-semibold text-ink">2.</span> Add ideas as blocks (places, food, activities).
              </li>
              <li className="rounded-2xl bg-white/70 px-4 py-3">
                <span className="font-semibold text-ink">3.</span> Vote together (+1 / -1) to surface favorites.
              </li>
              <li className="rounded-2xl bg-white/70 px-4 py-3">
                <span className="font-semibold text-ink">4.</span> Generate a draft itinerary from top-voted ideas.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
