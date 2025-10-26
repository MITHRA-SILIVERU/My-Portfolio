import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Skills.css";

export const Skills = () => {
  const [activeFilter, setActiveFilter] = useState("Full Stack Development");

  const skillsData = [
    {
      name: "Java",
      category: "Full Stack Development",
    },
    {
      name: "Python",
      category: "Full Stack Development",
    },
    {
      name: "JavaScript",
      category: "Full Stack Development",
    },
    {
      name: "TypeScript",
      category: "Full Stack Development",
    },
  
    {
      name: "SpringBoot",
      category: "Full Stack Development",
    },
    
    {
      name: "Django",
      category: "Full Stack Development",
    },
    {
      name: "Flask",
      category: "Full Stack Development",
    },
    {
      name: "Angular",
      category: "Full Stack Development",
    },
    {
      name: "Mongo DB",
      category: "Full Stack Development",
    },
    {
      name: "Express.js",
      category: "Full Stack Development",
    },
    {
      name: "React.js",
      category: "Full Stack Development",
    },
    {
      name: "Node.js",
      category: "Full Stack Development",
    },
    {
      name: "MY SQL",
      category: "Full Stack Development",
    },
    {
      name: "Postgre SQL",
      category: "Full Stack Development",
    },
    {
      name: "TailwindCSS",
      category: "Full Stack Development",
    },
    {
      name: "Redux",
      category: "Full Stack Development",
    },
    {
      name: "JSON",
      category: "Full Stack Development",
    },
    {
      name: "RESTful API",
      category: "Full Stack Development",
    },
    {
      name: "Jenkins",
      category: "Cloud & DevOps ",
    },
        {
      name: "Docker",
      category: "Cloud & DevOps ",
    },
        {
      name: "Kubernetes",
      category: "Cloud & DevOps ",
    },
        {
      name: "OpenShift",
      category: "Cloud & DevOps ",
    },
    {
      name: "Selenium",
      category: "Cloud & DevOps ",
    },
        {
      name: "Postman",
      category: "Cloud & DevOps ",
    },
        {
      name: "IBM Cloud",
      category: "Cloud & DevOps ",
    },
        {
      name: "Micro Services",
      category: "Cloud & DevOps ",
    },
     {
      name: "Git / GitHub",
      category: "Cloud & DevOps ",
    },
    {
      name: "Embedded C",
      category: "IoT & Embedded Systems ",
    },
     {
      name: "Arduino",
      category: "IoT & Embedded Systems",
    },
     {
      name: "Raspberry Pi",
      category: "IoT & Embedded Systems",
    },
     {
      name: "Node MCU",
      category: "IoT & Embedded Systems",
    },
     {
      name: "IoT Protocols",
      category: "IoT & Embedded Systems",
    },
     {
      name: "Keil version",
      category: "IoT & Embedded Systems",
    },
    {
      name: "Edge Computing",
      category: "IoT & Embedded Systems ",
    },
    {
      name: "VS Code",
      category: "Tools & Platforms",
    },
    {
      name: "Linux",
      category: "Tools & Platforms",
    },
    {
      name: "Jupyter Notebook",
      category: "Tools & Platforms",
    },
    {
      name: "Salesforce",
      category: "Tools & Platforms",
    },
    {
      name: " Power BI ",
      category: "Tools & Platforms",
    },
    {
      name: "Tableau",
      category: "Tools & Platforms",
    },
    {
      name: "Gen AI",
      category: "Other",
    },
      {
      name: "DSA",
      category: "Other",
    },
   
        {
      name: "SDLC",
      category: "Other",
    },
        {
      name: "Software Architecture",
      category: "Other",
    },
        {
      name: "Prompt Engineering",
      category: "Other",
    },
    {
      name: "Agile (SCRUM)",
      category: "Other",
    },
      
    
  ];

  const filterButtons = [
    "Full Stack Development",
    "Cloud & DevOps ",
    "IoT & Embedded Systems",
    "Tools & Platforms",
    "Other",
  ];

  const filteredSkills =
    activeFilter === "All"
      ? skillsData
      : skillsData.filter((skill) => {
          if (Array.isArray(skill.category)) {
            return skill.category.includes(activeFilter);
          }
          return skill.category === activeFilter;
        });

  return (
    <section className="skills" id="skills">
      <Container>
        <Row>
          <Col>
            <div className="skills-bx">
              <h2>Skills</h2>
              <p>
                A comprehensive showcase of my technical expertise across
                various Domains.
              </p>

              {/* Filter Buttons */}
              <div className="filter-buttons">
                {filterButtons.map((filter, index) => (
                  <button
                    key={index}
                    className={`filter-btn ${
                      activeFilter === filter ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Skills Cards */}
              <Row className="skills-row">
                {filteredSkills.map((skill, index) => (
                  <Col
                    key={index}
                    xs={12}
                    sm={6}
                    md={2}
                    className="skill-col"
                  >
                    <div className="skill-card">
                      <h3>{skill.name}</h3>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
