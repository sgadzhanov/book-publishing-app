import ContactUsForm from "./forms/contact-us/ContactUsForm";
import Image from "next/image";

export default function ContactUs() {
  return (
    <div className="flex flex-col md:flex-row gap-12 px-6 py-20 w-full md:w-[90%] mx-auto">

      {/* left side - form */}
      <div className="flex-1">
        <div className="flex flex-col gap-8">
        <h2 className="text-sm text-slate-500">CONTACT US</h2>
        <h1 className="text-4xl text-slate-800 mb-12">Let’s start the conversation</h1>
        </div>
        <ContactUsForm />
      </div>

      <div className="relative w-full md:w-1/2 h-[400px] rounded-xl outline-hidden">
        <Image
          src="/images/contact-form.avif"
          alt="Contact us"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
