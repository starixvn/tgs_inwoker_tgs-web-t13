import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { withRouter } from "react-router-dom";

import config from "../../config/config";
import i18n from "../../utils/i18n";
import GamingLicensePNG from "../../assets/images/gaming-license.png";
import VersionNumber from "../../utils/versionnumber";
const Container = styled.div`
  width: 1280px;
  margin: 0 auto;
  height: 577px;
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  color: #ffffff;
  width: 400px;
`;

const SectionTitle = styled.div`
  font-size: 34px;
  text-transform: uppercase;
`;

const AboutUsLogo = styled.div`
  width: 200px;
  height: 120px;

  background: url("${(props) => props.img}");
  background-position: left center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const AboutUsContainer = styled.div`
  line-height: 25px;
  white-space: pre-line;
`;

const LinkContainer = styled.div`
  margin: 20px 0;
  line-height: 35px;
`;

const Link = styled.div`
  width: max-content;
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
    props.history.push("/" + to);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const AboutUs = ({ img }) => (
    <Section>
      <SectionTitle>{i18n.t("T13.gamingLicense")}</SectionTitle>
      <AboutUsContainer>
        <AboutUsLogo img={img}></AboutUsLogo>
        {i18n.t("T13.footer.copyright").replace(/{brand}/g, config.brandName)}
        <br />
        {i18n.t("T13.footer.rights")}
        <br />
        Version <VersionNumber />
      </AboutUsContainer>
    </Section>
  );
  const QuickLinks = ({ navigateTo, performOpenSupportModal }) => (
    <Section>
      <SectionTitle>{i18n.t("T13.quickLink.title")}</SectionTitle>
      <LinkContainer>
        <Link onClick={performOpenSupportModal}>
          {i18n.t("T13.quickLink.247")}
        </Link>
        <Link onClick={() => navigateTo("faq")}>
          {i18n.t("T13.quickLink.faq")}
        </Link>
        <Link onClick={() => navigateTo("privacy")}>
          {i18n.t("T13.quickLink.privacy")}
        </Link>
        <Link onClick={() => navigateTo("terms")}>
          {i18n.t("T13.quickLink.tnc")}
        </Link>
        <Link onClick={() => navigateTo("responsiblegaming")}>
          {i18n.t("T13.quickLink.reponsible")}
        </Link>
      </LinkContainer>
      <SectionTitle>{i18n.t("T13.quickLink.follow")}</SectionTitle>
      <SocialMediaContainer>
        <SocialMedia
          src="facebook"
          onClick={() => navigateTo(" ")}
        ></SocialMedia>
        <SocialMedia
          src="instagram"
          onClick={() => navigateTo(" ")}
        ></SocialMedia>
        <SocialMedia
          src="twitter"
          onClick={() => navigateTo(" ")}
        ></SocialMedia>
      </SocialMediaContainer>
    </Section>
  );
  const Partners = ({ providers }) => (
    <Section>
      <SectionTitle>{i18n.t("T13.partners")}</SectionTitle>
      <ChipContainer>
        {providers.map((item, index) => (
          <Chip key={index}>{item.name}</Chip>
        ))}
      </ChipContainer>
    </Section>
  );
  return (
    <Container hide={props.hide}>
      <AboutUs img={GamingLicensePNG} />
      <QuickLinks
        navigateTo={navigateTo}
        performOpenSupportModal={props.performOpenSupportModal}
      />
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
