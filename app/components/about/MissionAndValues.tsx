import MissionAndValueItem from "./MissionAndValueItem";

export default function MissionAndValues() {
  return (
    <section className="bg-violet-50 py-24">
      <div className="w-4/5 mx-auto">
        <h2 className="text-3xl font-semibold mb-12">
          Our mission & values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Value 1 */}
          <MissionAndValueItem
            icon="auto_stories"
            title="Story first"
            description="We believe great books start with honest, well-crafted stories
              that resonate long after the last page."
          />

          {/* Value 2 */}
          <MissionAndValueItem
            icon="diversity_3"
            title="Inclusive voices"
            description="We champion diverse perspectives and believe publishing should reflect the richness of the world we live in"
          />

          {/* Value 3 */}
          <MissionAndValueItem
            icon="favorite"
            title="Crafted with care"
            description="From manuscript to final print, every detail matters. We work closely with authors to do their stories justice."
          />
        </div>
      </div>
    </section>

  )
}
