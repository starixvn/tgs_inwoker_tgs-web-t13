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
  user-select: none;
`;

const ImagePiece = styled.div`
  color: white;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;

  &:nth-child(n + 2) {
    margin-left: 20px;
  }
`;

const GameImage = styled.div`
  background: url(${({ img }) => img});
  background-size: 100%;
  background-repeat: no-repeat;
  aspect-ratio: 1;
  border-radius: 8px;
`;

const GameList = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 20px;
  gap: 10px;
`;

const GamePlay = styled.div`
  background: ${({ theme }) => theme.pcGamePlayBtnBackground};
  color: ${({ theme }) => theme.pcGameListerPrimary};
  border: 1px solid ${({ theme }) => theme.pcGameListerSecondary};
  height: 50px;
  width: 100%;
  margin-top: 10px;
  text-align: center;
  line-height: 50px;
  border-radius: 8px;

  &:hover {
    background: ${({ theme }) => theme.pcGamePlayBtnHover};
    border: 1px solid ${({ theme }) => theme.pcGamePlayBtnHover};
    color: ${({ theme }) => theme.primaryText};
  }
`;

const Wrapper = styled.div``;

const SlotGenerator = React.memo(
  ({ title, type, category, commonprops, list }) => {
    const GameContainer = ({ name, img, trigger }) => {
      return (
        <Wrapper>
          <ImagePiece onClick={trigger}>
            <GameImage img={img} />
            <GamePlay>Play Now</GamePlay>
          </ImagePiece>
        </Wrapper>
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

    // navigate reference
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
