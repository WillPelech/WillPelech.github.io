"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"

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
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
            Full Stack Developer & Creative Problem Solver
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-background border border-border"
            >
              <FiGithub className="h-6 w-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-background border border-border"
            >
              <FiLinkedin className="h-6 w-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="mailto:your.email@example.com"
              className="p-3 rounded-full bg-background border border-border"
            >
              <FiMail className="h-6 w-6" />
            </motion.a>
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      </section>

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
              I'm a passionate developer with expertise in building modern web applications.
              I love creating beautiful, functional, and user-friendly experiences.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-20 bg-secondary/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate={contactInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mb-8"
            >
              Get In Touch
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-foreground/80 mb-8"
            >
              I'm always open to new opportunities and collaborations.
            </motion.p>
            <motion.a
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:your.email@example.com"
              className="inline-block px-8 py-3 rounded-full bg-primary text-white font-medium"
            >
              Say Hello
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 