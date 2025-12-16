import Section from "./ui/Section"

function renderListItems(items: string[]) {
  return (
    <ul className="flex flex-col md:flex-row justify-center">
      {items.map((item, index) => (
        <li key={index} className="text-slate-900 text-md text-center overflow-hidden font-semibold">
          {item}
          {index < items.length - 1 && <span className="mx-3 hidden md:inline">|</span>}
        </li>
      ))}
    </ul>
  )
}

const arr1 = [
  "Schools & universities", "Bookstores", "Agency partners"
]

const arr2 = [
  "Print specialists", "Online platforms", "Public libraries"
]

export default function TrustedBy() {
  return (
    <section className="py-10 bg-purple-100">
      <div className="max-w-5xl m-auto flex flex-col gap-4 text-center bg-violet-100 rounded-lg border-2 border-violet-200 px-4 md:px-40 py-5">
        <h2 className="text-slate-800 text-5xl font-bold">Trusted by top publishing partners</h2>
        <p className="text-slate-600 text-xl font-semibold mb-4">
          Partnering with industry leaders to deliver exceptional books and innovative publishing solutions for every reader.
        </p>
        {renderListItems(arr1)}
        {renderListItems(arr2)}
      </div>
    </section>
  )
}
