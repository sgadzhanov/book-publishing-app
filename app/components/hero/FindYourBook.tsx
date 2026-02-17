import { useTranslations } from "next-intl"

export default function FindYourBook() {
  const t = useTranslations("findYourBook")

  return (
    <section className="p-4 text-slate-800 md:p-10 py-20 lg:py-26 flex justify-center">
      <div className="bg-slate-100 rounded-lg flex flex-col gap-4 lg:gap-1 lg:flex-row justify-between w-11/12 px-12 py-6 border border-slate-300">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl ">{t("title")}</h1>
          <p>{t("description")}</p>
        </div>
        <div className="flex justify-end flex-col">
          <button className='bg-[#FFA273] text-gray-50 hover:bg-orange-400 hover:shadow-xl cursor-pointer transition py-2 px-4 font-medium'>
            {t("browseNow")}
          </button>
        </div>
      </div>
    </section>
  )
}
