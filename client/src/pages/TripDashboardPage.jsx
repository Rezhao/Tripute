import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddIdeaModal from "../components/AddIdeaModal.jsx";
import IdeaCard from "../components/IdeaCard.jsx";
import { useTripStore } from "../hooks/useTripStore.js";

export default function TripDashboardPage() {
  const { tripId } = useParams();
  const {
    currentTrip,
    ideas,
    loadTrip,
    loadIdeas,
    joinTrip,
    addIdea,
    voteIdea,
    updateTripDates,
    generateItinerary,
    loading,
    error
  } = useTripStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sortMode, setSortMode] = useState("top");
  const [datesForm, setDatesForm] = useState({ startDate: "", endDate: "" });
  const [datesSaved, setDatesSaved] = useState(false);

  useEffect(() => {
    if (!tripId) return;
    loadTrip(tripId);
    joinTrip(tripId);
    loadIdeas(tripId);
  }, [tripId, loadTrip, joinTrip, loadIdeas]);

  useEffect(() => {
    if (!currentTrip) return;
    setDatesForm({
      startDate: currentTrip.startDate || "",
      endDate: currentTrip.endDate || ""
    });
  }, [currentTrip]);

  const inviteLink = useMemo(() => {
    if (!tripId) return "";
    return `${window.location.origin}/trips/${tripId}`;
  }, [tripId]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddIdea = async (payload) => {
    if (!tripId) return;
    await addIdea(tripId, payload);
  };

  const handleGenerate = async () => {
    if (!tripId) return;
    await generateItinerary(tripId);
  };

  const handleSaveDates = async (event) => {
    event.preventDefault();
    if (!tripId) return;
    await updateTripDates(tripId, datesForm);
    setDatesSaved(true);
    setTimeout(() => setDatesSaved(false), 2000);
  };

  const visibleIdeas = useMemo(() => {
    const list = [...ideas];
    if (sortMode === "new") {
      return list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }
    return list.sort((a, b) => {
      if (b.voteScore !== a.voteScore) return b.voteScore - a.voteScore;
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
  }, [ideas, sortMode]);

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <Link to="/trips" className="text-sm text-slate-500">
        ← Back to trips
      </Link>

      <section className="mt-6 rounded-3xl bg-white/95 p-8 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-slate-500">Trip dashboard</p>
            <h1 className="text-3xl font-semibold text-ink">{currentTrip?.name || "Loading..."}</h1>
            <p className="mt-2 text-sm text-slate-500">
              {currentTrip?.startDate && currentTrip?.endDate
                ? `${currentTrip.startDate} → ${currentTrip.endDate}`
                : "Dates TBD"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-mist px-4 py-3 text-sm">
            <p className="font-semibold text-slate-500">Invite link</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">{inviteLink}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-full bg-ocean px-3 py-1 text-xs font-semibold text-white"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="rounded-3xl bg-white/95 p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink">Idea submission</h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-full bg-mist p-1 text-xs font-semibold text-slate-500">
                <button
                  type="button"
                  onClick={() => setSortMode("top")}
                  className={`rounded-full px-3 py-1 ${sortMode === "top" ? "bg-white text-ink shadow" : ""}`}
                >
                  Top
                </button>
                <button
                  type="button"
                  onClick={() => setSortMode("new")}
                  className={`rounded-full px-3 py-1 ${sortMode === "new" ? "bg-white text-ink shadow" : ""}`}
                >
                  New
                </button>
              </div>
              <button
                type="button"
                onClick={() => loadIdeas(tripId)}
                className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-ink shadow-card"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-moss px-4 py-2 text-xs font-semibold text-white"
              >
                Add idea
              </button>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {visibleIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} onVote={(value) => voteIdea(idea.id, value)} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-3xl bg-white/95 p-6 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Trip dates</h2>
            <p className="mt-3 text-sm text-slate-500">
              Set dates when you’re ready to plan the itinerary.
            </p>
            <form onSubmit={handleSaveDates} className="mt-4 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="date"
                  value={datesForm.startDate}
                  onChange={(e) => setDatesForm((prev) => ({ ...prev, startDate: e.target.value }))}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  required
                />
                <input
                  type="date"
                  value={datesForm.endDate}
                  onChange={(e) => setDatesForm((prev) => ({ ...prev, endDate: e.target.value }))}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-ocean px-4 py-3 text-sm font-semibold text-white"
              >
                {datesSaved ? "Saved" : "Save dates"}
              </button>
            </form>
          </div>
          <div className="rounded-3xl bg-white/95 p-6 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Trip status</h2>
            <p className="mt-3 text-sm text-slate-500">
              {currentTrip?.memberCount || 0} collaborators · {ideas.length} ideas so far
            </p>
          </div>
          <div className="rounded-3xl bg-white/95 p-6 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Itinerary</h2>
            <p className="mt-3 text-sm text-slate-500">
              Generate a schedule based on top-voted ideas.
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="mt-5 w-full rounded-2xl bg-ocean px-4 py-3 text-sm font-semibold text-white"
            >
              {loading ? "Generating..." : "Generate itinerary"}
            </button>
            <Link
              to={`/trips/${tripId}/itinerary`}
              className="mt-4 inline-flex text-sm font-semibold text-ocean"
            >
              View itinerary →
            </Link>
          </div>
        </div>
      </section>

      {error ? <p className="mt-4 text-sm text-coral">{error}</p> : null}
      <AddIdeaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddIdea} />
    </div>
  );
}
