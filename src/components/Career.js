import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import { Expcard } from "./Expcard";
import projImg1 from "../assets/img/miniprj.jpg";
import projImg2 from "../assets/img/mjr prj.jpg";
import projImg3 from "../assets/img/libweb.webp";
import colorSharp2 from "../assets/img/color-sharp2.jpg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Career = () => {


  const projects = [
    {
      title: " Life-Line : Real-Time Patient Health Monitoring System ",
      description:"IoT platform for continuous vital sign monitoring.",
      imgUrl: projImg1,
    },
    {
      title: " IoT-Enhanced Robot For Human Detection Of Concealed Threats ",
      description: "Detects concealed humans in hazardous zones; alerts with visuals and notification.",
      imgUrl: projImg2,
    },
    {
      title: "FoL- Father of Libraries",
      description: "Library management platform",
      imgUrl: projImg3,
    },
   
  ];

  const experience = [
    {
      title: " Smart Internz | SmartBridge & Salesforce",
      description: " Completed 6+ Salesforce Superbadges and 10+ modules in Admin, Security, and Reporting. Automated 15+ business processes, managed 100+ records, and implemented custom reports and user security models",
    },
   
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Career</h2>
                <p>"Driven by innovation, powered by code—transforming ideas into impactful solutions, one line at a time."</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Experience</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Resume</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Projects</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="third">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                           <Tab.Pane eventKey="second">
                            <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", padding: "0px 20px", color: "#fff" }}>
                              <p style={{ fontSize: "1.1rem", marginBottom: "36px", lineHeight: "1.7" }}></p>
                              
                              <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                                <a
                                  href="/Resume.pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    backgroundColor: "#2986ee",
                                    color: "#fff",
                                    padding: "12px 28px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    fontSize: "1rem"
                                  }}
                                >
                                  View Resume
                                </a>
                                <a
                                  href="/Resume.pdf"
                                  download
                                  style={{
                                    backgroundColor: "#23c26f",
                                    color: "#fff",
                                    padding: "12px 28px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    fontSize: "1rem"
                                  }}
                                >
                                  Download Resume
                                </a>
                              </div>
                            </div>
                          </Tab.Pane>
                    <Tab.Pane eventKey="first">
                       <Col>
                          {experience.map((exp, index) => (
                            <Expcard key={index} title={exp.title} description={exp.description} />
                          ))}
                        </Col>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
