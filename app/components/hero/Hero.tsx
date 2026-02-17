import Image from "next/image"
import Section from "../ui/Section"
import { useTranslations } from "next-intl"

export default function Hero() {
	const t = useTranslations("hero")

	return (
		<Section>
			<section className="relative w-full overflow-hidden py-10 h-auto lg:h-[calc(100vh-100px)]">
				{/* FLOATING DECORATION IMAGES — MD+ */}
				<div className="hidden [@media(min-width:1150px)]:block absolute inset-0 pointer-events-none select-none overflow-hidden pl-4">
					{/* LEFT IMAGE */}
					<div className="absolute top-36">
						<div className="w-72 h-96 relative drop-shadow-xl">
							<Image
								src="/images/books2.avif"
								alt={t("leftDecor")}
								fill
								className="object-cover rounded-2xl"
							/>
						</div>
					</div>

					{/* RIGHT IMAGE */}
					<div className="absolute right-4 top-36">
						<div className="w-72 h-96 relative drop-shadow-xl">
							<Image
								src="/images/books.avif"
								alt={t("rightDecor")}
								fill
								className="object-cover rounded-2xl"
							/>
						</div>
					</div>

				</div>

				{/* CENTER CONTENT */}
				<div className="relative z-10 max-w-3xl mx-auto text-center px-6 flex flex-col justify-between lg:h-[calc(100vh-300px)]">

					<h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-700 drop-shadow-sm">
						{t("title")}
					</h1>

					<p className="mt-6 font-semibold text-lg text-slate-600 md:max-w-lg mx-auto leading-relaxed md:px-6 xl:px-0">
						{t("description")}
					</p>

					{/* MOBILE IMAGES */}
					<div className="mt-10 flex flex-col gap-6 [@media(min-width:1150px)]:hidden">

						<div className="w-full h-60 relative">
							<Image src="/images/books.avif" alt={t("rightDecor")} fill className="object-cover rounded-xl shadow" />
						</div>
						<div className="w-full h-60 relative">
							<Image src="/images/books2.avif" alt={t("leftDecor")} fill className="object-cover rounded-xl shadow" />
						</div>
					</div>

					{/* BUTTONS */}
					<div className="flex flex-col md:flex-row justify-center gap-4 mt-20">
						<button className="bg-linear-to-r from-[#F2C94C] to-[#F2994A] px-6 py-3 rounded-md shadow font-bold transition-transform duration-200 hover:-translate-y-1 text-slate-100">
							{t("discoverBooks")}
						</button>
						<button className="bg-linear-to-r from-[#F2994A] to-[#F2C94C] px-6 py-3 rounded-md shadow font-bold transition-transform duration-200 hover:-translate-y-1 text-slate-100">
							{t("exploreMore")}
						</button>
					</div>
				</div>

				{/* BOTTOM GRADIENT FADE */}
				<div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t pointer-events-none" />
			</section>
		</Section>
	)
}
