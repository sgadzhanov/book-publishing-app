"use client"

import { useState } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { X, Menu, Search } from "lucide-react"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "./LanguageSwitcher"

type NavLink = {
	key: string
	href: string
}

const LINKS: NavLink[] = [
	{ key: "books", href: "/books" },
	{ key: "authors", href: "/authors" },
	{ key: "about", href: "/about" },
	{ key: "blog", href: "/blog" },
	{ key: "support", href: "/support" },
	{ key: "studio", href: "/studio"},
]

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false)
	const t = useTranslations("navigation")

	return (
		<nav className="relative bg-fuchsia-50 px-6 py-4">
			<div className="flex items-center justify-between gap-6">
				{/* LOGO */}
				<Link href="/" className="shrink-0">
					<Image
						src="/images/fuschia-logo.png"
						alt="Logo"
						width={80}
						height={80}
						className="rounded-xl"
						loading="eager"
						style={{ width: "auto", height: 120 }}
					/>
				</Link>

				{/* DESKTOP MENU */}
				<ul className="hidden lg:flex items-center gap-8 text-slate-700 text-lg">
					{LINKS.map((link) => (
						<LinkItem key={link.key} link={link} label={t(link.key)} />
					))}
				</ul>

				{/* 🔍 DESKTOP SEARCH */}
				<form action="/search" className="hidden lg:block shrink-0">
					<div className="relative">
						<input
							type="search"
							name="q"
							placeholder={t("search")}
							className="w-64 rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent transition-shadow"
						/>
						<button
							type="submit"
							className="absolute left-5 top-1/2 -translate-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
							aria-label={t("search")}
						>
							<Search size={18} />
						</button>
					</div>
				</form>

				{/* LANGUAGE SWITCHER */}
				<LanguageSwitcher />

				{/* DESKTOP SIGN IN */}
				<button
					className="hidden lg:block bg-[#FFA273] hover:bg-orange-400 transition-colors py-3 px-8 font-bold cursor-pointer rounded-lg shadow-sm hover:shadow-md shrink-0"
					onClick={() => alert(t("comingSoon"))}
				>
					{t("signIn")}
				</button>

				<button
					onClick={() => setIsOpen(prev => !prev)}
					className="lg:hidden text-slate-700"
				>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* MOBILE MENU */}
			{isOpen && (
				<div className="lg:hidden bg-fuchsia-50 border-t border-stone-300 mt-4">
					<div className="flex flex-col items-center gap-6 py-6">
						{/* 🔍 MOBILE SEARCH */}
						<form action="/search" className="w-full px-4">
							<div className="relative">
								<Search
									className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
									size={18}
								/>
								<input
									type="search"
									name="q"
									placeholder={t("searchMobile")}
									className="w-full rounded-md border border-slate-300 bg-white pl-11 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
								/>
							</div>
						</form>
						{/* MOBILE LINKS */}
						<ul className="flex flex-col items-center gap-6 text-slate-700 w-full">
							{LINKS.map((link) => (
								<LinkItem key={link.key} link={link} label={t(link.key)} setIsOpen={setIsOpen} />
							))}
						</ul>
						<button
							className="bg-[#FFA273] hover:bg-orange-400 transition-colors py-3 px-10 font-bold rounded-lg shadow-sm hover:shadow-md"
							onClick={() => alert(t("comingSoon"))}
						>
							{t("signIn")}
						</button>
					</div>
				</div>
			)}
		</nav>
	)
}

function LinkItem({ link, label, setIsOpen }: { link: NavLink, label: string, setIsOpen?: (isOpen: boolean) => void }) {
	return (
		<Link href={link.href}>
			<li
				className="cursor-pointer font-semibold transition-colors hover:text-amber-600"
				onClick={() => {
					if (!setIsOpen) return
					setIsOpen(false)
				}}
			>
				{label}
			</li>
		</Link>
	)
}
