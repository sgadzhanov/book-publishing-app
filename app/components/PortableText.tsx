import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

export const portableTextComponent = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mt-12 mb-6 text-slate-800">{children}</h2>
    ),
    normal: ({ children, index }: any) => (
      <p
        className={`text-slate-700 leading-relaxed mb-6 ${index === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-1 first-letter:float-left" : ""}`}
      >
        {children}
      </p>
    ),
  },
  types: {
    pullQuote: ({ value }: any) => (
      <blockquote className="my-6 border-l-4 border-violet-500iolet-500 pl-6 italic text-xl text-slate-800">
        "{value.quote}"
      </blockquote>
    ),

    image: ({ value }: any) => (
      <figure className="my-10">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).width(1200).url()}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </figure>
    ),
  },
}
