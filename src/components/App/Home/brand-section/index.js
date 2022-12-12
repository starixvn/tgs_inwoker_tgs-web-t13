import React, { useState } from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";

const Container = styled.div`
  width: 1280px;
  height: 500px;
  margin: 0 auto;
`;
const TitleGapper = styled.div`
  padding: 10px 0px 10px 0px;
  display: flex;
`;

const TitleIcon = styled.div`
  width: 45px;
  height: 45px;
  background: url(${(props) =>
    process.env.PUBLIC_URL +
    "/assets/images/pcHomePage/" +
    props.icon +
    ".svg"});
  background-repeat: no-repeat;
  background-size: contain;
`;
const TitleHolder = styled.div`
  padding: 5px 20px;
  border-radius: 10px;
  width: 100%;
  color: white;
  font-family: "Montserrat";
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
`;
const BrandContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 400px;
`;

const BrandLogo = styled.div`
  width: 300px;
  background: url("${(props) => props.img}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const BrandDescription = styled.div`
  color: #fff;
  width: 950px;
  font-size: 25px;
  line-height: 40px;
  font-family: "Montserrat";
  font-weight: lighter;
  white-space: break-spaces;
`;

const BrandSection = ({ logo, handleNavigateClick }) => {
  const hardcodeBrand = {
    brand: "PGG",
    title: "Pega Gaming: A Winning Casino!",
    description: `Pega Gaming is the leading destination for all online casino players who are looking for a touch of class and elegance in their gaming environment. Our casino provides you with over 400 online casino games – some traditional with modern twists, and some completely new, innovative, and exotic.\nWith irresistible weekly bonus promotions and attractive loyalty and VIP programs, we're sure you'll be sticking around for a while to come.\nAll of our software is developed and maintained by the industry's foremost online gaming software company, Pegasus. Because of this, we are able to offer you the newest cutting-edge games, of the highest quality and ultimate security in a sophisticated, yet engaging atmosphere.
      `,
  };

  return (
    <Container>
      <TitleGapper>
        <TitleIcon icon={hardcodeBrand.brand}></TitleIcon>
        <TitleHolder>{hardcodeBrand.title}</TitleHolder>
      </TitleGapper>
      <BrandContainer>
        <BrandLogo img={logo}></BrandLogo>
        <BrandDescription>{i18n.t(hardcodeBrand.description)}</BrandDescription>
      </BrandContainer>
    </Container>
  );
};

export default BrandSection;
