import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

export const portableTextComponent = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mt-12 mb-6 text-slate-800">{children}</h2>
    ),
    normal: ({ children }: any) => (
      <p className="text-slate-700 leading-relaxed mb-2">{children}</p>
    ),
  },
  types: {
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
