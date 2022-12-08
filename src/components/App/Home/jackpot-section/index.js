import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { GameTypeEnum } from "../../../../api-services/utils/Enum";
import Common from "../../../../utils/Common";
import SlotGenerator from "../slot-generator";
import Winners from "./winners";

import {
  jiliSlot,
  rtSlot,
  jdbSlot,
  jiliFish,
  jdbFish,
} from "../../../Wap/Main/Home/scene-1/template11/hardcode";
import { GameService } from "../../../../api-services/services/GameService";

const Container = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 1280px;
  margin: 40px auto;
  font-size: 44px;
  font-family: "Montserrat";
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
`;

const JackpotHolder = styled.div`
  height: 1135px;
  position: relative;
  margin-bottom: 0px;
`;

const JackpotContentWorkingSpace = styled.div`
  width: 1280px;
  height: 512px;
  position: relative;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 215px 1fr;
  grid-template-areas:
    "topContent topContent"
    "bottomContent bottomContent";
  margin: 0 auto;
`;

const TopContent = styled.div`
  grid-area: topContent;
  position: absolute;
  color: white;
  display: flex;
  height: 150px;
  width: 1280px;

  font-size: 75px;
  align-items: center;
  letter-spacing: 14px;
  gap: 4px;
  font-weight: 500;
  justify-content: space-evenly;
  font-weight: bold;
`;

const CurrencyHolder = styled.div`
  padding-top: 35px;
  font-family: "Montserrat";
`;

const BottomContent = styled.div`
  grid-area: bottomContent;
  width: 1280px;
  display: flex;
  height: 150px;
`;

const BottomLeftcontent = styled.div`
  grid-area: bottomLeft;
  padding: 10px 10px 10px 150px;
`;

const BottomRightContent = styled.div`
  grid-area: bottomRight;
  padding: 10px 150px 10px 10px;
`;

const TextHolder = styled.div`
  border-radius: 8px;
  padding: 0 10px 0 10px;
  text-align: center;
  font-size: 55px;
  height: 80px;
  display: flex;

  ${({ hide }) => {
    return hide
      ? `
   font-size: 60px;
   padding: 0 0 0 0px;
   width: 20px;
   align-items: flex-end;
  
  `
      : ` background: #1B1D30;font-size: 55px;
      align-items: center; width: 75px;`;
  }};
  color: ${({ theme }) => theme.primary};
  filter: drop-shadow(2px 5px 15px #00000033);
  border-radius: 20px;

  justify-content: center;
  margin: 7px;

`;

const TextContent = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Digit = styled.div`
  font-family: "Montserrat";
  width: 45px;
`;

const SlotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const JackpotSection = ({ showLogin, token }) => {
  const Numbers = React.memo(({ amount }) => {
    var display = amount && amount.split("");

    return display.map((element) => {
      return (
        <TextContent>
          <TextHolder
            hide={element === "," || element === "." || element === " "}
          >
            <Digit>{element}</Digit>
          </TextHolder>
        </TextContent>
      );
    });
  });

  const commonprops = {
    showLogin: showLogin,
    token: token,
  };

  const generateJackpotAmount = ({ min, max }) => {
    let date = new Date();
    let dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    let maxPerDay = (max - min) / 7;
    let minWithDay = Math.floor(min + maxPerDay * dayIndex);
    let maxWithDay = Math.floor(max * ((dayIndex + 1) / 7));
    let amount = Math.floor(
      Math.random() * (maxWithDay - minWithDay + 1) + minWithDay
    );
    return Common.formatNumberWithCommas(amount);
  };

  const [jackpotAmount, setJackpotAmount] = useState(
    generateJackpotAmount({ min: 200000, max: 5000000 })
  );

  const [recommendedGames, setRecommendedGames] = useState({
    games: [
      {
        title: "JILITF.slots",
        list: jiliSlot,
        type: GameTypeEnum.SLOT,
        platform: "JILITF",
        gameList: [],
      },
      {
        title: "RTTF.slots",
        list: rtSlot,
        type: GameTypeEnum.SLOT,
        platform: "RTTF",
        gameList: [],
      },
      {
        title: "JDBTF.slots",
        list: jdbSlot,
        type: GameTypeEnum.SLOT,
        platform: "JDBTF",
        gameList: [],
      },

      {
        title: "JILITF.fish",
        list: jiliFish,
        type: GameTypeEnum.FISH,
        platform: "JILITF",
        gameList: [],
      },
      {
        title: "JDBTF.fish",
        list: jdbFish,
        type: GameTypeEnum.FISH,
        platform: "JDBTF",
        gameList: [],
      },
    ],
    isInitialized: false,
  });

  useEffect(() => {
    if (!recommendedGames.isInitialized) {
      getGameList();
    }
  });

  const getGameList = () => {
    var temp = recommendedGames;
    temp.games.map(async (game, index) => {
      GameService.GetGameList(game.platform, game.type).then((response) => {
        if (response.IsSuccess) {
          var data = response.data;
          game.list.map((item) => {
            var index = data.findIndex((item2) => item2.code === item.code);
            if (index >= 0 && data[index] !== null) {
              game.gameList.push(data[index]);
              game.gameList.filter((item, index) => {
                return game.gameList.indexOf(item) === index;
              });
            }
            return null;
          });
        }
      });
      return null;
    });
    temp.isInitialized = true;
    setRecommendedGames(temp);
  };

  return (
    <Container>
      <Title>MEGA JACKPOT</Title>
      <JackpotHolder>
        <JackpotContentWorkingSpace>
          <TopContent>
            {/* <CurrencyHolder>PHP</CurrencyHolder>{" "} */}
            <Numbers amount="PHP "></Numbers>
            <Numbers amount={jackpotAmount} />
          </TopContent>
          <BottomContent>
              <Winners></Winners>
          </BottomContent>
          {/* <BottomLeftcontent>
            <Winners title="Slots Winners" />
          </BottomLeftcontent>
          <BottomRightContent>
            <Winners title="Latest Winners" />
          </BottomRightContent> */}
        </JackpotContentWorkingSpace>
      </JackpotHolder>
      <SlotContainer>
        {recommendedGames.games.map((data, index) => {
          return (
            data.gameList.length > 0 && (
              <SlotGenerator
                title={data.title}
                platform={data.platform}
                type={data.type}
                list={data.gameList}
                commonprops={commonprops}
              />
            )
          );
        })}
      </SlotContainer>
    </Container>
  );
};

export default JackpotSection;
