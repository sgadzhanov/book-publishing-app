"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { X, Menu, Search, LogOut, User, ChevronDown, UserCircle, ShoppingBag } from "lucide-react"
import { useTranslations } from "next-intl"
import { useSession, signOut } from "next-auth/react"
import LanguageSwitcher from "./LanguageSwitcher"
import { useCart } from "@/app/components/providers/CartProvider"

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
	{ key: "studio", href: "/studio" },
]

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false)
	const [userMenuOpen, setUserMenuOpen] = useState(false)
	const t = useTranslations("navigation")
	const tAuth = useTranslations("auth")
	const { data: session, status } = useSession()
	const { itemCount } = useCart()
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setUserMenuOpen(false)
			}
		}
		if (userMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside)
		}
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [userMenuOpen])

	// First name only — avoids truncation at medium widths
	const displayName = session?.user?.name?.split(" ")[0] ?? session?.user?.email

	return (
		<nav className="relative bg-fuchsia-50 px-6 py-4">
			<div className="flex items-center justify-between gap-4">
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
				<ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-slate-700 text-lg">
					{LINKS.map((link) => (
						<LinkItem key={link.key} link={link} label={t(link.key)} />
					))}
				</ul>

				{/* DESKTOP SEARCH */}
				<form action="/search" className="hidden lg:block shrink-0">
					<div className="relative">
						<input
							type="search"
							name="q"
							placeholder={t("search")}
							className="w-44 xl:w-64 rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent transition-shadow"
						/>
						<button
							type="submit"
							className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
							aria-label={t("search")}
						>
							<Search size={16} />
						</button>
					</div>
				</form>

				{/* RIGHT CLUSTER: language switcher + auth — grouped so they sit flush */}
				<div className="hidden lg:flex items-center gap-2 shrink-0">
					<LanguageSwitcher />

					<Link
						href="/cart"
						className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50"
						aria-label={t("cart")}
					>
						<ShoppingBag size={17} />
						{itemCount > 0 ? (
							<span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFA273] px-1 text-[11px] font-bold text-white">
								{itemCount}
							</span>
						) : null}
					</Link>

					{/* AUTH */}
					{status === "loading" ? (
						<div className="w-9 h-9 rounded-full bg-slate-100 animate-pulse" />
					) : session?.user ? (
						<div className="relative bg-violet-100/80 rounded-2xl" ref={dropdownRef}>
							<button
								onClick={() => setUserMenuOpen((prev) => !prev)}
								className="flex items-center gap-2 hover:bg-neutral-50 border border-transparent hover:border-slate-200 transition-all py-1.5 pl-1.5 pr-2 xl:pr-3 rounded-full xl:rounded-lg cursor-pointer"
							>
								{/* Avatar */}
								{session.user.image ? (
									<Image
										src={session.user.image}
										alt={session.user.name ?? "User"}
										width={32}
										height={32}
										className="rounded-full shrink-0"
									/>
								) : (
									<div className="w-8 h-8 rounded-full bg-[#FFA273] flex items-center justify-center text-white text-sm font-bold shrink-0">
										{session.user.name?.[0]?.toUpperCase() ?? <User size={14} />}
									</div>
								)}

								{/* Name — only at xl and above */}
								<span className="hidden xl:block text-sm font-semibold text-slate-700">
									{displayName}
								</span>
								<ChevronDown
									size={14}
									className={`hidden xl:block text-slate-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
								/>
							</button>

							{/* Dropdown */}
							{userMenuOpen && (
								<div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
									<div className="px-4 py-2.5 border-b border-slate-100">
										<p className="text-xs font-semibold text-slate-700 truncate">{session.user.name}</p>
										<p className="text-xs text-slate-400 truncate">{session.user.email}</p>
									</div>
									<Link
										href="/profile"
										onClick={() => setUserMenuOpen(false)}
										className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-fuchsia-50 transition-colors cursor-pointer"
									>
										<UserCircle size={14} />
										{tAuth("myProfile")}
									</Link>
									<Link
										href="/orders"
										onClick={() => setUserMenuOpen(false)}
										className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-fuchsia-50 transition-colors cursor-pointer"
									>
										<ShoppingBag size={14} />
										{t("orders")}
									</Link>
									<button
										onClick={() => signOut({ callbackUrl: "/" })}
										className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-fuchsia-50 transition-colors cursor-pointer"
									>
										<LogOut size={14} />
										{tAuth("signOut")}
									</button>
								</div>
							)}
						</div>
					) : (
						<Link
							href="/sign-in"
							className="bg-[#FFA273] hover:bg-orange-400 transition-colors py-2.5 px-6 font-bold cursor-pointer rounded-lg shadow-sm hover:shadow-md text-sm"
						>
							{t("signIn")}
						</Link>
					)}
				</div>

				{/* MOBILE: language switcher + hamburger */}
				<div className="lg:hidden flex items-center gap-3">
					<Link href="/cart" className="relative text-slate-700" aria-label={t("cart")}>
						<ShoppingBag size={24} />
						{itemCount > 0 ? (
							<span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFA273] px-1 text-[11px] font-bold text-white">
								{itemCount}
							</span>
						) : null}
					</Link>
					<LanguageSwitcher />
					<button
						onClick={() => setIsOpen(prev => !prev)}
						className="text-slate-700"
					>
						{isOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
			</div>

			{/* MOBILE MENU */}
			{isOpen && (
				<div className="lg:hidden bg-fuchsia-50 border-t border-stone-300 mt-4">
					<div className="flex flex-col items-center gap-6 py-6">
						{/* MOBILE SEARCH */}
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

						{/* MOBILE AUTH */}
						{session?.user ? (
							<div className="flex flex-col items-center gap-1.5">
								{session.user.image && (
									<Image
										src={session.user.image}
										alt={session.user.name ?? "User"}
										width={48}
										height={48}
										className="rounded-full"
									/>
								)}
								<p className="text-sm font-semibold text-slate-700">{session.user.name}</p>
								<p className="text-xs text-slate-400">{session.user.email}</p>
								<button
									onClick={() => signOut({ callbackUrl: "/" })}
									className="mt-2 flex items-center gap-2 bg-white border border-slate-200 py-2 px-6 rounded-lg text-sm font-semibold text-slate-600 cursor-pointer hover:bg-fuchsia-50 transition-colors"
								>
									<LogOut size={14} />
									{tAuth("signOut")}
								</button>
								<Link
									href="/orders"
									onClick={() => setIsOpen(false)}
									className="text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors"
								>
									{t("orders")}
								</Link>
							</div>
						) : (
							<Link
								href="/sign-in"
								onClick={() => setIsOpen(false)}
								className="bg-[#FFA273] hover:bg-orange-400 transition-colors py-3 px-10 font-bold rounded-lg shadow-sm hover:shadow-md"
							>
								{t("signIn")}
							</Link>
						)}
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
