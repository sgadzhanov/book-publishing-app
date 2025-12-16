
type Review = {
  text: string,
  author: string,
  works: string,
}

const data = [
  {
    text: "Every recommendation feels handpicked. I’ve found new favorites and always trust their suggestions for my classroom.",
    author: "Taylor Kim",
    works: "Elementary Teacher",
  },
  {
    text: "Finding books for my kids is effortless. The reviews and age guides make choosing stories simple and enjoyable.",
    author: "Jordan Patel",
    works: "Parent & Book Enthusiast",
  },
  {
    text: "Thoughtful curation and inviting design. Exploring new genres here is always a pleasure.",
    author: "Morgan Ellis",
    works: "Literacy Specialist",
  },
  {
    text: "Recommendations are always on point. I’ve built my library and shared great reads with friends thanks to this site.",
    author: "Avery Lin",
    works: "Commutary Librarian",
  },
]

export default function ReadersTrustUs() {
  return (
    <div className="p-6 py-20 md:p-30 flex flex-col gap-12 bg-violet-50">
      <h1 className="text-4xl text-slate-800 text-center md:text-start">Readers trust our book picks</h1>
      <ul className="flex flex-col md:flex-row justify-center items-center gap-6">
        {renderListItems(data.slice(0, 2))}
      </ul>
      <ul className="flex flex-col md:flex-row justify-center items-center gap-6 md:justify-end">
        {renderListItems(data.slice(2, 4))}
      </ul>
    </div>
  )
}

function renderListItems(data: Review[]) {
  return (
    <>
      {data.map((item) => (
        <ListItem
          key={item.author}
          author={item.author}
          text={item.text}
          works={item.works}
        />
      ))}
    </>
  )
}

function ListItem({ author, text, works }: Review) {
  return (
    <li key={author} className="max-w-3/4 md:max-w-2/5 min-h-50 flex flex-col justify-between gap-4 rounded-lg bg-slate-200 text-slate-600 p-4">
      <p>{text}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-xs">{works}</p>
      </div>
    </li>
  )
}
