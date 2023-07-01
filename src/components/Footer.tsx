import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
`;

interface FooterProps {
  children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return <FooterContainer>{children}</FooterContainer>;
};

export default Footer;
