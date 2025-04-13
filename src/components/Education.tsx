import React from "react";
import "./Education.css";

const Education: React.FC = () => {
  return (
    <section id="education" className="education-section">
      <h2>Education</h2>
      <div className="education-item">
        <h3>New York University (NYU)</h3>
        <p>Bachelor of Science in Computer Engineering</p>
        <p>Specialization: Quantum Computing</p>
        <div className="graduation-year">
          <p>Graduation Year: 2026</p>
        </div>
      </div>
    </section>
  );
};

export default Education;