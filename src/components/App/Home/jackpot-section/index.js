import React, { useEffect, useState } from "react";

import styled from "styled-components";
import {
  GameTypeEnum,
  SlotFilterType,
} from "../../../../api-services/utils/Enum";
import Common from "../../../../utils/Common";
import SlotGenerator from "../slot-generator";
import Winners from "./winners";

import { GameService } from "../../../../api-services/services/GameService";

const Container = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 1280px;
  margin: 40px auto 0 auto;
  font-size: 44px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
`;

const JackpotHolder = styled.div`
  position: relative;
  margin-bottom: 0px;
`;

const JackpotContentWorkingSpace = styled.div`
  width: 1280px;
  height: 400px;
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
  font-weight: 500;
  justify-content: space-evenly;
  font-weight: bold;
`;

const BottomContent = styled.div`
  grid-area: bottomContent;
  width: 1280px;
  display: flex;
  height: 150px;
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
   font-size: 65px;
   padding: 0 0 0 0px;
   width: 20px;
   align-items: flex-end;
  
  `
      : ` background: #1B1D30;font-size: 75px;
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
  width: 60px;
`;

const SlotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const JackpotSection = ({ showLogin, token }) => {
  const Numbers = React.memo(({ amount }) => {

    var formatedAmount = Common.formatNumberWithCommas(amount);
    var display = formatedAmount && formatedAmount.split("");

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
  const initialJackpotAmount = 1822085;
  const [jackpotAmount, setJackpotAmount] = useState(initialJackpotAmount);
  const [homePageGameList, setHomePageGamesList] = useState([]);
  const [homePageGames, setHomePageGames] = useState({
    games: [
      {
        title: "T13.topGames",
        type: "hot",
        category: SlotFilterType.Hot,
      },
      {
        title: "T13.recommeneddGames",
        type: "recommend",
        category: SlotFilterType.Recommend,
      },
      {
        title: "T13.newGames",
        type: "new",
        category: SlotFilterType.New,
      },
    ],
    type: GameTypeEnum.SLOT,
    isInitialized: false,
  });

  useEffect(() => {
    getGameList();
  }, []);

  useEffect(() => {
    const updateJackpotAmount = () => {
      if (jackpotAmount < 9999999.99) {
        setJackpotAmount((currentJackpotAmount) => currentJackpotAmount + randomNumber(0.01,0.20));
      } else {
        setJackpotAmount(initialJackpotAmount);
      }
    };

    const interval = setInterval(updateJackpotAmount, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  const  randomNumber = (min, max) => {
    return (Math.random() * (min - max) + max);
  }
  const checking = (variant) => {
    return homePageGameList.filter((a) => {
      return a.tag[variant] === true;
    });
  };

  const getGameList = async () => {
    if (!homePageGames.isInitialized) {
      var temp = homePageGames;
      await GameService.GetGameList("", temp.type).then((response) => {
        if (response.IsSuccess) {
          var data = response.data;
          temp.isInitialized = true;
          setHomePageGames(temp);
          setHomePageGamesList(data);
        }
      });
    }
  };

  return (
    <Container>
      <Title>MEGA JACKPOT</Title>
      <JackpotHolder>
        <JackpotContentWorkingSpace>
          <TopContent>
            <Numbers amount="PHP "></Numbers>
            <Numbers amount={jackpotAmount} />
          </TopContent>
          <BottomContent>
            <Winners></Winners>
          </BottomContent>
        </JackpotContentWorkingSpace>
      </JackpotHolder>
      <SlotContainer>
        {homePageGames.games.map((data, index) => {
          return (
            checking(data.type).length > 0 && (
              <SlotGenerator
                title={data.title}
                type={homePageGames.type}
                category={data.category}
                list={checking(data.type)}
                commonprops={commonprops}
              ></SlotGenerator>
            )
          );
        })}
      </SlotContainer>
    </Container>
  );
};

export default JackpotSection;
