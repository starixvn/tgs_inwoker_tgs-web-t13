import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";

import { GameTypeEnum } from "../../../../api-services/utils/Enum";
import config from "../../../../config/config";
import { AppHistory } from "../../../../history/History";
import Common from "../../../../utils/Common";
import i18n from "../../../../utils/i18n";

const SlotContent = styled.div`
  width: 1280px;
  padding-bottom: 30px;
  user-select: none;
`;

const TitleHolder = styled.div`
  padding: 5px 20px;
  border-radius: 10px;
  width: 100%;
  color: white;
  background: ${({ theme }) => theme.accent};
  background: linear-gradient(
    153deg,
    ${({ theme }) => theme.accent} 25%,
    rgba(20, 26, 29, 0) 78%
  );

  font-size: 30px;
  font-weight: bold;
`;

const ImagePiece = styled.div`
  color: white;
  padding: 40px 0 10px 40px;
  position: relative;
  cursor: pointer;
`;

const TheStar = styled.div`
  position: absolute;
  background: yellow;
  height: 100px;
  width: 100px;
  left: 0;
  top: 0;

  background: url(${process.env.PUBLIC_URL +
  "/assets/images/pcHomePage/star.png"});
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
`;

const GameImage = styled.div`
  background: url(${({ img }) => img});
  background-size: 100%;
  background-repeat: no-repeat;
  aspect-ratio: 1;
`;

const GameTitle = styled.div`
  background: #232323;
  padding: 20px;
  border-top: solid 1px ${({ theme }) => theme.accent};
  font-size: 24px;
  text-align: center;
  width: auto;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GameBanner = styled.div`
  border-radius: 12px;
`;

const TitleGapper = styled.div`
  padding: 10px 40px 10px 80px;
`;

const Overlay = styled.div`
  width: 100px;

  z-index: 2;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
`;

const ButtonWrapper = styled.div`
  padding: 40px 10px 10px 40px;
`;

const GameList = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 10% 80% 10%;
`;

const Arrow = styled.img`
  height: 60px;
  width: auto;
  cursor: pointer;
  pointer-events: auto;
`;

const SlotGenerator = React.memo(
  ({ title, platform, type, commonprops, list }) => {
    var settings = {
      slidesToShow: 4,
      slidesToScroll: 4,
    };
    const sliderRef = useRef();

    const GameContainer = ({ name, img, trigger }) => {
      return (
        <ImagePiece onClick={trigger}>
          <TheStar></TheStar>
          <GameBanner>
            <GameImage img={img} />
            <GameTitle>{name}</GameTitle>
          </GameBanner>
        </ImagePiece>
      );
    };

    const ArrowButton = ({ direction, where }) => {
      return (
        <ButtonWrapper>
          <Overlay
            onClick={() => {
              goto(where);
            }}
          >
            <Arrow
              src={
                process.env.PUBLIC_URL +
                `/assets/images/pcHomePage/${direction}.png`
              }
            />
          </Overlay>
        </ButtonWrapper>
      );
    };

    const goto = (direction) => {
      if (direction === "prev") {
        sliderRef.current.slickPrev();
      } else {
        sliderRef.current.slickNext();
      }
    };

    const handleJoinGameClick = (gpcode, gpid, gametype) => {
      const type =
        gametype === GameTypeEnum.FISH
          ? "fish"
          : gametype === GameTypeEnum.SLOT
          ? "slots"
          : "electron";
      if (commonprops.token) {
        Common.closePreviousPopup();

        AppHistory.push(`/${i18n.language}/${type}/play/${gpcode}/${gpid}`);
      } else {
        commonprops.showLogin(true);
      }
    };

    return (
      <SlotContent>
        <TitleGapper>
          <TitleHolder>{i18n.t(title)}</TitleHolder>
        </TitleGapper>
        <GameList>
          <ArrowButton direction="left" where="prev" />

          <Slider {...settings} ref={sliderRef}>
            {list &&
              list.map((data, index) => {
                return (
                  <GameContainer
                    key={index}
                    name={data.name}
                    img={`${
                      config.sourceUrl
                    }${data.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                      data.code
                    }.jpg`}
                    trigger={() =>
                      handleJoinGameClick(data.gpcode, data.id, data.type)
                    }
                  />
                );
              })}
          </Slider>

          <ArrowButton direction="right" where="next" />
        </GameList>
      </SlotContent>
    );
  }
);

export default SlotGenerator;
