"use client"

import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { FiBook, FiCpu, FiLayers } from "react-icons/fi"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const educationItems = [
  {
    icon: <FiBook className="h-8 w-8" />,
    title: "Computer Engineering",
    institution: "New York University",
    year: "2022 - 2026",
    description: "Bachelor of Science in Computer Engineering with a focus on hardware-software integration and system design.",
    delay: 0.2
  },
  {
    icon: <FiCpu className="h-8 w-8" />,
    title: "Quantum Computing",
    institution: "New York University",
    year: "2023 - Present",
    description: "Minor in Quantum Computing, exploring quantum algorithms, quantum hardware, and their applications in solving complex computational problems.",
    delay: 0.4
  },
  {
    icon: <FiLayers className="h-8 w-8" />,
    title: "Research Interests",
    institution: "NYU Quantum Computing Lab",
    year: "2023 - Present",
    description: "Researching quantum algorithms and their potential applications in optimization problems and machine learning.",
    delay: 0.6
  }
]

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section
      id="education"
      ref={ref}
      className="py-20 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
        initial={{ y: 0 }}
        animate={{
          y: [0, -20, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            My academic journey in Computer Engineering and Quantum Computing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationItems.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: item.delay }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-background/50 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 inline-block">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-primary mb-2">{item.institution}</p>
                <p className="text-foreground/60 mb-4">{item.year}</p>
                <p className="text-foreground/80">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 