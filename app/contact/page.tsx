import ContactUsForm from "../components/forms/contact-us/ContactUsForm";

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-800">

      {/* HERO */}
      <section className="w-4/5 mx-auto py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-semibold leading-tight mb-6">
            Let’s get in touch.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Whether you’re a reader, an author, or a potential partner,
            we’d love to hear from you. Send us a message and we’ll get back
            to you as soon as possible.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="bg-violet-50 py-24">
        <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT — FORM */}
          <div>
            <h2 className="text-3xl font-semibold mb-8">
              Send us a message
            </h2>
            <ContactUsForm />
          </div>

          {/* RIGHT — CONTACT DETAILS */}
          <div className="flex flex-col gap-8">

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Reach us directly
              </h3>

              <ul className="flex flex-col gap-4 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-violet-600">
                    call
                  </span>
                  <a
                    href="+359 888 777 666"
                    className="hover:text-violet-600 transition-colors"
                  >
                    +359 888 777 666
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-violet-600">
                    mail
                  </span>
                  <a
                    href="our-mail@mail.com"
                    className="hover:text-violet-600 transition-colors"
                  >
                    our-mail@mail.com
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-violet-600">
                    location_on
                  </span>
                  <span>
                    Sofia, Bulgaria
                  </span>
                </li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Find us online
              </h3>

              <div className="flex gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-slate-600 hover:text-violet-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">
                    photo_camera
                  </span>
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-slate-600 hover:text-violet-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">
                    alternate_email
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTEXT / EXPECTATIONS */}
      <section className="py-24">
        <div className="w-4/5 mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6">
            What can you contact us about?
          </h2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>General questions about our books or authors</li>
            <li>Upcoming events and collaborations</li>
            <li>Feedback or suggestions</li>
            <li>Press and partnership inquiries</li>
          </ul>
        </div>
      </section>

    </main>
  )
}
