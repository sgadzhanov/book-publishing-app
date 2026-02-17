import MissionAndValueItem from "./MissionAndValueItem";
import { useTranslations } from "next-intl";

export default function MissionAndValues() {
  const t = useTranslations("about")

  return (
    <section className="bg-violet-50 py-24">
      <div className="w-4/5 mx-auto">
        <h2 className="text-3xl font-semibold mb-12">
          {t("missionTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Value 1 */}
          <MissionAndValueItem
            icon="auto_stories"
            title={t("values.storyFirst.title")}
            description={t("values.storyFirst.description")}
          />

          {/* Value 2 */}
          <MissionAndValueItem
            icon="diversity_3"
            title={t("values.inclusiveVoices.title")}
            description={t("values.inclusiveVoices.description")}
          />

          {/* Value 3 */}
          <MissionAndValueItem
            icon="favorite"
            title={t("values.craftedWithCare.title")}
            description={t("values.craftedWithCare.description")}
          />
        </div>
      </div>
    </section>

  )
}
