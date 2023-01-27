import React from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
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
  font-size: 16px;
  line-height: 40px;
  font-weight: lighter;
  white-space: break-spaces;
`;

const BrandSection = ({ logo, handleNavigateClick }) => {
  const hardcodeBrand = {
    brand: "PGG",
    title: i18n
      .t("T13.brandTag")
      .replace("{brandName}", config.brandName),
    description: i18n
      .t("T13.brandDescription")
      .replace("{brandName}", config.brandName),
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
