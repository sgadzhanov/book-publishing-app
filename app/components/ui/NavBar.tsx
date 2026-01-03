"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Menu } from "lucide-react"

const LINKS = ["Books", "Authors", "About", "Blog", "Support", "Studio"]

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav className="relative bg-fuchsia-50 px-6 py-4">
			<div className="flex items-center justify-between">
				{/* LOGO */}
				<Link href="/">
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
				<ul className="hidden md:flex items-center gap-8 text-slate-700 text-lg">
					{LINKS.map((item) => (
						<LinkItem item={item} key={item} />
					))}
				</ul>

				{/* DESKTOP SIGN IN */}
				<button
					className="hidden md:block bg-[#FFA273] hover:bg-orange-400 transition py-3 px-8 font-bold cursor-pointer"
					onClick={() => alert("Coming soon!")}
				>
					Sign in
				</button>

				<button
					onClick={() => setIsOpen(prev => !prev)}
					className="md:hidden text-slate-700"
				>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* MOBILE MENU */}
			{isOpen && (
				<div className="md:hidden bg-fuchsia-50 border-t border-stone-400">
					<ul className="flex flex-col items-center gap-6 py-6 text-slate-700">
						{LINKS.map((item) => <LinkItem item={item} setIsOpen={setIsOpen} key={item} />)}
						<button
							className="bg-[#FFA273] hover:bg-orange-400 transition py-3 px-10 font-bold"
							onClick={() => alert("Coming soon!")}
						>
							Sign in
						</button>
					</ul>
				</div>
			)}
		</nav>
	)
}

function LinkItem({ item, setIsOpen }: { item: string, setIsOpen?: (isOpen: boolean) => void }) {
	return (
		<Link key={item} href={`/${item.toLowerCase()}`}>
			<li
				className="cursor-pointer font-semibold transition hover:text-amber-600"
				key={item}
				onClick={() => {
					if (!setIsOpen) return
					setIsOpen(false)
				}}
			>
				{item}
			</li>
		</Link>
	)
}
