"use client"

import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Contact from "@/components/Contact"
import Education from "@/components/Education"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <motion.div
          initial="initial"
          animate={heroInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="text-center z-10"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Will Pelech
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-foreground/80 mb-8"
          >
            Computer Engineering Student & Quantum Computing Enthusiast
          </motion.p>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      </section>

      {/* Education Section */}
      <Education />

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="py-20 bg-secondary/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="initial"
            animate={projectsInView ? "animate" : "initial"}
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial="initial"
            animate={projectsInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Project cards will go here */}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate={aboutInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mb-8"
            >
              About Me
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-foreground/80 max-w-3xl mx-auto"
            >
              I'm a junior at NYU studying Computer Engineering with a minor in Quantum Computing. 
              I'm passionate about exploring the intersection of classical and quantum computing, 
              and I love building innovative solutions to complex problems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  )
} 