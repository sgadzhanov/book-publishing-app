import Image from "next/image"

export default function NavBar() {
	return (
		<nav className="flex items-center justify-between py-4 px-8 bg-fuchsia-50">
			{/* LOGO */}
			<Image
				src='/new-logo.png'
				alt="Logo"
				width={90}
				height={90}
				className="bg-transparent rounded-xl"
			/>

			{/* MENU */}
			<ul className="hidden md:flex items-center gap-8 text-slate-700">
				<li className="cursor-pointer font-semibold transition delay-50 hover hover:text-indigo-500">Books</li>
				<li className="cursor-pointer font-semibold transition delay-50 hover hover:text-indigo-500">About</li>
				<li className="cursor-pointer font-semibold transition delay-50 hover hover:text-indigo-500">Blog</li>
				<li className="cursor-pointer font-semibold transition delay-50 hover hover:text-indigo-500">Support</li>
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
