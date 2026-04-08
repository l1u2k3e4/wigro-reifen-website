// src/sections/TeamGrid.tsx
// Grid mit allen 7 TeamCards

import { motion } from 'framer-motion'
import { COPY } from '@/data/content'
import { useModuleOverrides } from '@/hooks/useContentOverrides'
import { mergeOverrides } from '@/lib/mergeOverrides'
import SectionHeading from '@/components/ui/SectionHeading'
import TeamCard from '@/components/ui/TeamCard'
import { staggerContainer } from '@/lib/animations'

export default function TeamGrid() {
  const overrides = useModuleOverrides<typeof COPY.team>('team')
  const team = mergeOverrides(COPY.team, overrides)
  return (
    <section id="team-grid" className="section" aria-labelledby="team-grid-heading">
      <div className="container-content">
        <SectionHeading
          title={team.grid.headline}
          subtitle={team.grid.subline}
          tag="h2"
          alignment="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          variants={staggerContainer}
          className="mt-12 grid-team"
        >
          {team.mitglieder.map((mitglied) => (
            <TeamCard
              key={mitglied.name}
              name={mitglied.name}
              role={mitglied.rolle}
              image={mitglied.bild}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
