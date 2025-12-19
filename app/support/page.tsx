import FAQSection from "../components/ui/FAQSection"

export default function SupportPage() {
  return (
    <main className="bg-white text-slate-800">

      {/* HERO */}
      <section className="w-4/5 mx-auto py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-semibold leading-tight mb-6">
            We’re here to help.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Whether you have a question about our books, events, quizzes,
            or your account, our support team is happy to assist you.
          </p>
        </div>
      </section>

      {/* QUICK HELP TOPICS */}
      <section className="bg-violet-50 py-24">
        <div className="w-4/5 mx-auto">
          <h2 className="text-3xl font-semibold mb-12">
            How can we help you?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Account & Profile", icon: "person" },
              { title: "Books & Content", icon: "menu_book" },
              { title: "Quizzes", icon: "quiz" },
              { title: "Events", icon: "event" },
              { title: "Technical Issues", icon: "build" },
              { title: "General Questions", icon: "help" }
            ].map((item) => (
              <div
                key={item.title}
                className="
                  bg-white rounded-xl p-6
                  border border-slate-200
                  hover:shadow-md transition-shadow
                "
              >
                <span className="material-symbols-outlined text-3xl text-violet-600 mb-4 block">
                  {item.icon}
                </span>
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  Find answers and guidance related to {item.title.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* <section className="py-24"> */}
        <div className="w-4/5 mx-auto max-w-5xl">
          <FAQSection />
        </div>
      {/* </section> */}

      {/* CONTACT SUPPORT CTA */}
      <section className="bg-slate-900 py-20">
        <div className="w-4/5 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl font-semibold text-white">
            Still need help?
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
              support_agent
            </span>
            Contact support
          </a>
        </div>
      </section>

    </main>
  )
}
