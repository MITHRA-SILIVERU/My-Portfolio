import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.png";
import navIcon3 from "../assets/img/nav-icon3.webp";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/mithra-siliveru"><img src={navIcon1} alt="Icon" /></a>
              <a href="https://leetcode.com/u/yAaVio8qyH/"><img src={navIcon2} alt="" /></a>
              <a href="https://github.com/MITHRA-SILIVERU"><img src={navIcon3} alt="Icon" /></a>
            </div>
            <p> © Copyright 2025. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
