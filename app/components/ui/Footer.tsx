export default function Footer() {
  return (
    <footer className="bg-sky-100 text-slate-900">
      {/* Main footer content */}
      <div className="w-4/5 mx-auto py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            Your Publishing House
          </h3>
          <p className="leading-relaxed">
            Stories that inspire, educate, and spark imagination for readers of all ages.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-4">
            Explore
          </h4>
          <ul className="flex flex-col gap-2">
            <li><a href="/books" className="hover:text-slate-500 transition-colors">Books</a></li>
            <li><a href="/kids" className="hover:text-slate-500 transition-colors">Kids</a></li>
            <li><a href="/popular" className="hover:text-slate-500 transition-colors">Popular</a></li>
            <li><a href="/authors" className="hover:text-slate-500 transition-colors">Authors & Events</a></li>
            <li><a href="/quizzes" className="hover:text-slate-500 transition-colors">Quizzes</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">
            Contact
          </h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">
                call
              </span>
              <a href="tel:+15551234567" className="hover:text-slate-500 transition-colors">
                +359 888 777 666
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">
                mail
              </span>
              <a href="mailto:hello@publisher.com" className="hover:text-slate-500 transition-colors">
                our-mail@mail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">
                location_on
              </span>
              <span>Sofia, Bulgaria</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-4">
            Find us online
          </h4>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-slate-500 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                photo_camera
              </span>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-slate-500 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                alternate_email
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800w-4/5 mx-20 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 gap-2">
        <p>
          © {new Date().getFullYear()} OUR PUBLISHING HOUSE NAME. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
