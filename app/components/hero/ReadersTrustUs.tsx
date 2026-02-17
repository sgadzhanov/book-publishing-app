import { useTranslations } from "next-intl"

type Review = {
  text: string,
  author: string,
  works: string,
}

export default function ReadersTrustUs() {
  const t = useTranslations("readersTrustUs")

  const data: Review[] = [
    {
      text: t("reviews.taylor.text"),
      author: t("reviews.taylor.author"),
      works: t("reviews.taylor.role"),
    },
    {
      text: t("reviews.jordan.text"),
      author: t("reviews.jordan.author"),
      works: t("reviews.jordan.role"),
    },
    {
      text: t("reviews.morgan.text"),
      author: t("reviews.morgan.author"),
      works: t("reviews.morgan.role"),
    },
    {
      text: t("reviews.avery.text"),
      author: t("reviews.avery.author"),
      works: t("reviews.avery.role"),
    },
  ]

  return (
    <div className="p-6 py-20 md:p-30 flex flex-col gap-12 bg-violet-50">
      <h1 className="text-4xl text-slate-800 text-center md:text-start">{t("title")}</h1>
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
      <p className="text-lg">{text}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm">{works}</p>
      </div>
    </li>
  )
}
