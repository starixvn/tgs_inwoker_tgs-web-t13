import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { withRouter } from "react-router-dom";

import config from "../../config/config";
import i18n from "../../utils/i18n";

const Container = styled.div`
  width: 1280px;
  margin: 0 auto;
  height: 577px;
  display: flex;
  justify-content: space-between;
  font-family: "Montserrat";
`;

const Section = styled.div`
  color: #ffffff;
  width: 400px;
`;

const SectionTitle = styled.div`
  font-family: "Montserrat";
  font-size: 34px;
  text-transform: uppercase;
`;

const AboutUsLogo = styled.div`
  width: 200px;
  height: 120px;

  background: #ffffff;
  background-position: left center;
  background-size: contain;
  background-repeat: no-repeat;

  mask: url("${(props) => props.img}");
  mask-position: left center;
  mask-size: contain;
  mask-repeat: no-repeat;
`;

const AboutUsContainer = styled.div`
  line-height: 25px;
`;

const LinkContainer = styled.div`
  margin: 20px 0;
  line-height: 35px;
`;

const Link = styled.div`
  width: max-content;
  font-family: "Montserrat";
  cursor: pointer;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 20px 0;
`;

const SocialMedia = styled.div`
  width: 68px;
  height: 68px;
  background: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/pcHomePage/${src}.svg`
    }) no-repeat center /
  contain;`;
  }};
  cursor: pointer;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 400px;
  gap: 8px;
  align-content: flex-start;
  margin: 10px 0;
`;

const Chip = styled.div`
  width: max-content;
  min-width: 55px;
  height: 35px;
  border: 1px solid #ffffff;
  border-radius: 25px;
  text-align: center;
  padding: 6px 15px;
`;

function Footer(props) {
  const navigateTo = (to) => {
    props.history.push("/" + i18n.language + "/" + to);
  };
  const AboutUs = ({ img }) => (
    <Section>
      <SectionTitle>About Us</SectionTitle>
      <AboutUsContainer>
        <AboutUsLogo img={img}></AboutUsLogo>
        {i18n.t("web.footer.copyright")}
        <br />
        {i18n
          .t("web.footer.copyrightLine2")
          .replace(/{brand}/g, config.brandName)}
        <br />
        Version {process.env.REACT_APP_VERSION}
      </AboutUsContainer>
    </Section>
  );
  const QuickLinks = ({ navigateTo }) => (
    <Section>
      <SectionTitle>Quick Links</SectionTitle>
      <LinkContainer>
        <Link onClick={() => navigateTo("cs")}>24/7 Customer Service</Link>
        <Link onClick={() => navigateTo("faq")}>FAQs</Link>
        <Link onClick={() => navigateTo("privacy")}>Privacy Policy</Link>
        <Link onClick={() => navigateTo("terms")}>Terms and Conditions</Link>
        <Link onClick={() => alert(i18n.t("common.comingSoon"))}>
          Responsible Gaming
        </Link>
      </LinkContainer>
      <SectionTitle>Follow Us</SectionTitle>
      <SocialMediaContainer>
        <SocialMedia src="facebook" onClick={() => navigateTo("cs")}></SocialMedia>
        <SocialMedia src="instagram" onClick={() => navigateTo("cs")}></SocialMedia>
        <SocialMedia src="twitter" onClick={() => navigateTo("cs")}></SocialMedia>
      </SocialMediaContainer>
    </Section>
  );
  const Partners = ({ providers }) => (
    <Section>
      <SectionTitle>Partners</SectionTitle>
      <ChipContainer>
        {providers
          .filter(
            (a) =>
              a.abbreviation.toLowerCase() !== "wgfm" &&
              a.abbreviation.toLowerCase() !== "wgvia"
          )
          .filter((gp) => {
            if (gp.abbreviation.includes("TCG")) {
              return gp.abbreviation === "TCG_SEA";
            } else {
              return gp;
            }
          })
          .map((item, index) => (
            <Chip key={index}>{item.name}</Chip>
          ))}
      </ChipContainer>
    </Section>
  );
  return (
    <Container hide={props.hide}>
      <AboutUs img={props.general.brand.desktopLogoUrl} />
      <QuickLinks navigateTo={navigateTo} />
      <Partners providers={props.game.providerList} />
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    game: state.game,
    general: state.general,
  };
};
export default connect(mapStateToProps, null)(withRouter(Footer));
