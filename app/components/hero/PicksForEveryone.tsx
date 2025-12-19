import Section from "../ui/Section"

const images = [
  {
    path: "/images/books3.avif",
    title: "Start your own book circle",
    description: "Simple steps to launch and enjoy your first group read.",
  },
  {
    path: "/images/books4.avif",
    title: "Meet author Jamie Rivera",
    description: "Jamie discusses writing journeys and sparking young imaginations.",
  },
  {
    path: "/images/books11.avif",
    title: "Top 5 new books to try",
    description: "Explore standout releases and staff favorites this month.",
  },
  {
    path: "/images/books6.avif",
    title: "Host a family reading night",
    description: "Fun, easy activities to bring stories to life at home",
  },
]

export default function PicksForEveryone() {
  return (
    <Section>
      <div className="p-10">
        <h1 className="text-5xl font-semibold text-slate-700">Fresh picks for every reader</h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((imgData) => (
            <div key={imgData.description}>
              <div className="w-full relative">
                <img src={imgData.path} alt={imgData.title} className="object-cover rounded-xl shadow" />
              </div>
              <div className="mt-4 cursor-default hover:text-slate-900">
                <h2 className="text-2xl font-semibold hover:text-slate-500 text-slate-700">{imgData.title}</h2>
                <p className="text-slate-600">{imgData.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
