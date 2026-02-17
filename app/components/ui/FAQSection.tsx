import AccordionItem from "./AccordionItem"
import { useTranslations } from "next-intl"

export default function FAQSection() {
  const t = useTranslations("faq")

  const faqs = [
    {
      question: t("questions.submit.question"),
      answer: t("questions.submit.answer")
    },
    {
      question: t("questions.newBooks.question"),
      answer: t("questions.newBooks.answer")
    },
    {
      question: t("questions.events.question"),
      answer: t("questions.events.answer")
    },
    {
      question: t("questions.newsletter.question"),
      answer: t("questions.newsletter.answer")
    }
  ]

  return (
    <section className="flex flex-col gap-8 max-w-full py-18 px-0 md:px-12 m-auto text-slate-700">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-4xl">{t("title")}</h1>
        <p>{t("description")}</p>
      </div>
      <ul>
        {faqs.map((item, i) => (
          <AccordionItem key={i} {...item} />
        ))}
      </ul>
    </section>
  )
}
