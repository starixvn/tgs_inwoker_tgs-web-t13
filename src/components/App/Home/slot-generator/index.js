import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";

import {
  GameTypeEnum,
  SlotFilterType,
} from "../../../../api-services/utils/Enum";
import config from "../../../../config/config";
import { AppHistory } from "../../../../history/History";
import Common from "../../../../utils/Common";
import i18n from "../../../../utils/i18n";

const SlotContent = styled.div`
  width: 1280px;
  padding-bottom: 30px;
  user-select: none;
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

const TitleMore = styled.div`
  color: #fff;
  position: relative;
  display: flex;
  padding: 5px 20px;
  font-size: 26px;
  font-weight: 500;
  width: 185px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:after {
    content: " ";
    width: 30px;
    height: 30px;
    background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcHomePage/right-arrow.svg"});
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

const ImagePiece = styled.div`
  color: white;
  position: relative;
  cursor: pointer;
  margin: 10px;
  border-radius: 25px;
`;

const GameImage = styled.div`
  background: url(${({ img }) => img});
  background-size: 100%;
  background-repeat: no-repeat;
  aspect-ratio: 1;
`;

const TitleGapper = styled.div`
  padding: 10px 0px 10px 0px;
  display: flex;
`;

const GameList = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const SlotGenerator = React.memo(
  ({ title, type, category, commonprops, list }) => {
    const GameContainer = ({ name, img, trigger }) => {
      return (
        <ImagePiece onClick={trigger}>
          <GameImage img={img} />
        </ImagePiece>
      );
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

        AppHistory.push(`/${type}/play/${gpcode}/${gpid}`);
      } else {
        commonprops.showLogin(true);
      }
    };

    const navigateTo = () => {
      const gametype =
        type === GameTypeEnum.FISH
          ? "fish"
          : type === GameTypeEnum.SLOT
          ? "slots"
          : "electron";
      AppHistory.push(`/${gametype}`, {
        category: category,
      });
    };

    return (
      <SlotContent>
        <TitleGapper>
          <TitleIcon></TitleIcon>
          <TitleHolder>{i18n.t(title)}</TitleHolder>
          <TitleMore
            onClick={() => {
              navigateTo();
            }}
          >
            {i18n.t("web.slotGame.more")}
          </TitleMore>
        </TitleGapper>
        <GameList>
          {list &&
            list.slice(0, 12).map((data, index) => {
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
        </GameList>
      </SlotContent>
    );
  }
);

export default SlotGenerator;
