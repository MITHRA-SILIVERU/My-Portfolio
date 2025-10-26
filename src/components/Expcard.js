import React from "react";

export const Expcard = ({
  company = "Smart Internz",
  position = "Salesforce Administrator",
  date = " Nov 2023– Jan 2024",
  description = " Completed 6+ Salesforce Superbadges and 10+ modules in Admin, Security, and Reporting. Automated 15+ business processes, managed 100+ records, and implemented custom reports and user security models",
  achievements = [
    "Successfully launched our flagship SaaS platform with AI capabilities",
    "Built and manage a cross-functional team of developers, designers, and marketers",
    "Implemented cutting-edge technologies including machine learning models and microservices architecture",
    "Secured initial funding and established strategic partnerships for business growth"
  ]
}) => {
  return (
    <div
      style={{
        background: "#18151d", // dark background
        color: "#ededed", // light text
        borderRadius: "20px",
        boxShadow: "0 4px 24px rgba(32, 129, 220, 1)",
        maxWidth: "1000px",
        margin: "32px auto",
        padding: "32px 40px",
        position: "relative",
      }}
    >
      <div style={{ marginBottom: "22px", display: "flex", alignItems: "center" }}>
        {/* If you want to add a company logo, include <img src={logoUrl} /> here */}
        <div>
          <span
            style={{
              color: "#256df2ff",
              fontWeight: "700",
              fontSize: "2rem",
              lineHeight: "2rem",
            }}
          >
            {company}
          </span>
          <div style={{ fontSize: "1.3rem", fontWeight: "600", marginTop: "6px" }}>
            {position}
          </div>
          <div style={{ color: "#c2babf", marginTop: "3px", fontSize: "1rem" }}>
            {date}
          </div>
        </div>
      </div>
      <div style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "25px" }}>
        {description}
      </div>
      <ul style={{ paddingLeft: "1.3em" }}>
        {achievements.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "12px", fontSize: "1.07rem", color: "#ededed" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
