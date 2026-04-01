// src/sections/TeamGrid.tsx
// Grid mit allen 7 TeamCards

import { motion } from 'framer-motion'
import { COPY } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'
import TeamCard from '@/components/ui/TeamCard'
import { staggerContainer } from '@/lib/animations'

export default function TeamGrid() {
  return (
    <section id="team-grid" className="section" aria-labelledby="team-grid-heading">
      <div className="container-content">
        <SectionHeading
          title={COPY.team.grid.headline}
          subtitle={COPY.team.grid.subline}
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
          {COPY.team.mitglieder.map((mitglied) => (
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
