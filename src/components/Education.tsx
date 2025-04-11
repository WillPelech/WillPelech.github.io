import React from "react";
import "./Education.css"; // Import the CSS file for styling

const Education: React.FC = () => {
  return (
    <section id="education" className="education-section">
      <h2>Education</h2>
      <div className="education-item">
        <h3>New York University (NYU)</h3>
        <p>Bachelor of Science in Computer Engineering</p>
        <p>Specialization: Quantum Computing</p>
        <p>Graduation Year: 2025</p>
      </div>
    </section>
  );
};

export default Education;