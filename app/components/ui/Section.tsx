
type SectionProps = {
	children: React.ReactNode
	bgColor?: string
}

export default function Section({ children }: SectionProps) {
	return (
		<section className="bg-violet-50 p-8 mx-auto">
			{children}
		</section>
	)
}
