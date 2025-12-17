import Image from "next/image"
import Link from "next/link"

export default function NavBar() {
	return (
		<nav className="flex items-center justify-between py-4 px-8 bg-fuchsia-50">
			{/* LOGO */}
			<Link href="/">
				<Image
					src='/images/fuschia-logo.png'
					alt="Logo"
					width="130"
					height="130"
					className="h-26 w-18 rounded-xl"
				/>
			</Link>

			{/* MENU */}
			<ul className="hidden md:flex items-center gap-8 text-slate-700">
				<li className="cursor-pointer font-semibold transition delay-50 hover hover:text-amber-600">Books</li>
				<li className="cursor-pointer font-semibold transition delay-50 hover hover:text-amber-600">About</li>
				<li className="cursor-pointer font-semibold transition delay-50 hover hover:text-amber-600">Blog</li>
				<li className="cursor-pointer font-semibold transition delay-50 hover hover:text-amber-600">Support</li>
			</ul>

			{/* SIGN IN */}
			<button
				className='bg-[#FFA273] hover:bg-orange-400 hover:shadow-xl cursor-pointer transition py-4 px-10 font-bold'
			>
				Sign in
			</button>
		</nav>
	)
}
