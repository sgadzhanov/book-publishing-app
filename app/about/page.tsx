import Image from "next/image"
import MissionAndValues from "../components/about/MissionAndValues"

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-800">

      {/* HERO */}
      <section className="w-4/5 mx-auto py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-semibold leading-tight mb-6">
            We believe stories shape the way we see the world.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            We are an independent publishing house dedicated to discovering,
            nurturing, and sharing meaningful stories for readers of all ages.
            From children’s books to thoughtful fiction, we publish with care,
            intention, and a deep respect for storytelling.
          </p>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <MissionAndValues />

      {/* WHAT WE PUBLISH */}
      <section className="py-24">
        <div className="w-4/5 mx-auto">
          <h2 className="text-3xl font-semibold mb-12">
            What we publish
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Children’s Books",
              "Literary Fiction",
              "Young Adult",
              "Thoughtful Non-Fiction"
            ].map((category) => (
              <div
                key={category}
                className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <p className="text-lg font-medium">
                  {category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-slate-900 text-slate-200 py-24">
        <div className="w-4/5 mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Our philosophy
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            Publishing is not about speed or volume — it’s about trust.
            We build long-term relationships with authors, editors, and readers,
            believing that meaningful books deserve time, attention, and care.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="w-4/5 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl font-semibold">
            Want to work with us?
          </h2>
          <a
            href="/contact"
            className="
              inline-flex items-center gap-2
              bg-violet-600 text-white
              px-6 py-3 rounded-full
              hover:bg-violet-700 transition-colors
            "
          >
            <span className="material-symbols-outlined">
              mail
            </span>
            Get in touch
          </a>
        </div>
      </section>

    </main>
  )
}
