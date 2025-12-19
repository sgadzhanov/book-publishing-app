import AccordionItem from "./AccordionItem"

const faqs = [
  {
    question: "How can I submit my book?",
    answer: "Visit our submissions page and upload your manuscript as a PDF or Word file. Our editors will review and respond within 4–6 weeks."
  },
  {
    question: "Where are new books listed?",
    answer: "Browse the homepage or Books section for the latest releases. Filter by category, age, or popularity to find new titles."
  },
  {
    question: "Do you host author or reader events?",
    answer: "We offer author talks, signings, and workshops. See the Authors & Events page for upcoming dates and details."
  },
  {
    question: "How do I get the newsletter?",
    answer: "Subscribe at the bottom of any page to receive updates on new books, events, and exclusive content."
  }
]

export default function FAQSection() {
  return (
    <section className="flex flex-col gap-8 max-w-full py-18 px-0 md:px-12 m-auto text-slate-700">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-4xl">Answers for curious readers</h1>
        <p>Quick help for your book questions, submissions, and events.</p>
      </div>
      <ul>
        {faqs.map((item, i) => (
          <AccordionItem key={i} {...item} />
        ))}
      </ul>
    </section>
  )
}
