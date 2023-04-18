import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import i18n from "../../../../utils/i18n";

const Container = styled.div`
  width: 1280px;
  height: 300px;
  margin: 0 auto;
  & .slick-next {
    right: 0 !important;
    z-index: 1;
  }
  & .slick-prev {
    left: 0 !important;
    z-index: 1;
  }

  & .slick-slider {
    margin-top: 10px;
  }

  & .slick-list {
    margin: 0 26px;
  }

  & .slick-slide {
    margin: 0 5px;
  }
`;
const TitleGapper = styled.div`
  padding: 10px 0px 10px 0px;
  display: flex;
`;

const TitleIcon = styled.div`
  width: 45px;
  height: 45px;
  background: url(${process.env.PUBLIC_URL +
  "/assets/images/pcHomePage/crown.svg"});
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

const PromotionItem = styled.div`
  background: url(${(props) => props.img});
  background-size: 400px 162px;
  background-repeat: no-repeat;
  height: 162px;
  position: relative;
  border-radius: 25px;
  cursor: pointer;
`;

const PromotionSlider = ({ promotionList, handleNavigateClick }) => {
  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true,
    centerPadding: "20px",
    autoplay: true,
  };
  return (
    <Container>
      <TitleGapper>
        <TitleIcon></TitleIcon>
        <TitleHolder>{i18n.t("common.promotion")}</TitleHolder>
      </TitleGapper>
      <Slider {...settings}>
        {promotionList
          .sort((a, b) => {
            return a.order - b.order;
          })
          .map((data, index) => {
            var checkLocale = data.localization[i18n.language];
            return (
              <div
                style={{
                  width: "400px",
                }}
              >
                <PromotionItem
                  key={index}
                  img={
                    checkLocale ? checkLocale.desktopBanner : data.desktopBanner
                  }
                  onClick={() => {
                    handleNavigateClick("/promotion/" + data.id);
                  }}
                ></PromotionItem>
              </div>
            );
          })}
      </Slider>
    </Container>
  );
};

export default PromotionSlider;
