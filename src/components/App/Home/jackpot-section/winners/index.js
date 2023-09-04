import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Common from "../../../../../utils/Common";
import config from "../../../../../config/config";
import { AppHistory } from "../../../../../history/History";
const ContentHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 415px;

  & > div:nth-child(even) {
    background: ${({ theme }) => theme.pcGameWinnerListSecondary};
  }
`;

const Title = styled.div`
  color: #fff;
  padding-left: 15px;
`;

const WinnerList = styled.div`
  border-radius: 20px;
  min-height: 200px;
  padding: 10px 20px;
  background: rgb(57, 54, 54);
  background: linear-gradient(
    0deg,
    rgba(36, 33, 33, 1) 10%,
    rgba(57, 54, 54, 1) 100%
  );
`;

const TableLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  padding: 3px;
`;

const TableHeader = styled(TableLayout)`
  color: ${({ theme }) => {
    return theme.accent;
  }};
  font-weight: bold;
`;

const TableData = styled(TableLayout)`
  border-top: solid 1.25px #fff;
  font-size: 12px;
  color: #fff;

  div {
    white-space: nowrap;
  }
`;

const WinnerListItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 1fr 120px;
  justify-content: space-evenly;
  align-items: center;
  background: ${({ theme }) => theme.pcGameWinnerListPrimary};
  color: #fff;
  width: 100%;
  max-height: 100px;
  padding: 10px 10px;
`;

const WinnerListItemImage = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: 1px solid white;
`;
const WinnerListItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  & > div {
    font-size: 16px;
  }

  & .name {
    font-weight: 700;
    font-size: 20px;
    padding: 10px 0;
  }
`;
const WinnerListItemPrize = styled.div`
  color: ${({ theme }) => theme.primaryText};
  font-weight: 600;
  align-self: center;

  & p {
    margin: 0;
  }

  & .prize {
    font-size: 25px;
  }

  & .currency-code {
    color: ${({ theme }) => theme.pcGameListerPrimary};
    padding-right: 12px;
  }
`;

const PlayButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayButton = styled.button`
  color: ${({ theme }) => theme.primaryText};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.pcGameListerPrimary}}
  height: 30px;
  padding: 5px 20px;
  box-sizing: border-box;
  border-radius: 5px;
  &:hover {
    background: ${({ theme }) => theme.pcGameListerPrimary};
  }
`;

const Winners = React.memo(({ commonprops }) => {
  const playerName = [
    "kin9123***",
    "morisp***",
    "erikfan1***",
    "ritam712***",
    "perriw00***",
    "victorb63***",
    "heryam20***",
    "trwass7***",
    "aajac***",
    "winne19***",
    "k125923***",
    "garysin***",
    "lksj9482***",
    "kwashd7***",
    "lwda***",
    "gwsk12***",
    "946301***",
    "abc7***",
    "mrhr112***",
    "t2943***",
    "smi***",
    "luckybo***",
    "873251***",
    "hh3888***",
    "ttwisn***",
    "vipvi***",
    "cha19***",
    "113847***",
    "tami36***",
    "zzz90***",
    "mus12***",
    "c099***",
    "juicec***",
    "peta5***",
    "onk***",
    "monn0***",
    "pulli52***",
    "matkal***",
    "siumi***",
    "god6***",
    "sk***",
    "asdje2***",
    "ron707***",
    "5013d***",
    "bus01***",
    "fun011***",
    "fivivv***",
    "oopw3***",
    "927364***",
  ];

  const gameList = [
    {
      code: "Super_Ace",
      name: "Super Ace",
      gpcode: "JILITF",
    },
    {
      code: "Golden_Empire",
      name: "Golden Empire",
      gpcode: "JILITF",
    },
    {
      code: "Fortune_Gems",
      name: "Fortune Gems",
      gpcode: "JILITF",
    },
    {
      code: "Masquerade",
      name: "Masquerade",
      gpcode: "RTTF",
    },
    {
      code: "10001_Nights",
      name: "10001 Nights",
      gpcode: "RTTF",
    },
    {
      code: "Aztec_Spins",
      name: "Aztec Spins",
      gpcode: "RTTF",
    },
    {
      code: "Mega_Fishing",
      name: "Mega Fishing",
      gpcode: "JILITF",
    },
    {
      code: "Jackpot_Fishing",
      name: "Jackpot Fishing",
      gpcode: "JILITF",
    },
    {
      code: "Dinosaur_Tycoon",
      name: "Dinosaur Tycoon",
      gpcode: "JILITF",
    },
    {
      code: "Trump_Card",
      name: "Trump Card",
      gpcode: "JDBTF",
    },
    {
      code: "MayaGoldCrazy",
      name: "MayaGoldCrazy",
      gpcode: "JDBTF",
    },
    {
      code: "TreasureBowl",
      name: "TreasureBowl",
      gpcode: "JDBTF",
    },
  ];

  var min = 5;
  var max = 5000;

  const [winnerList, setWinnerList] = useState([]);
  var newList = [...winnerList];

  Array.from({ length: 5 }, () =>
    newList.push({
      name: randomize(playerName),
      game: randomize(gameList),
      amount: Common.formatNumberWithThousand(randomNumber(min, max)),
    })
  );

  useEffect(() => {
    if (winnerList <= 0) {
      setWinnerList(newList);
    }
    const updateList = () => {
      newList.pop();

      newList.unshift({
        name: randomize(playerName),
        game: randomize(gameList),
        amount: Common.formatNumberWithThousand(randomNumber(min, max)),
      });
      setWinnerList(newList);
    };

    const interval = setInterval(updateList, randomNumber(1000, 10000));
    return () => {
      clearInterval(interval);
    };
  });

  function randomize(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleJoinGameClick = () => {
    if (!commonprops.token) {
      commonprops.showLogin(true);
    } else {
      AppHistory.push("/slots");
    }
  };

  return (
    <ContentHolder>
      {winnerList.slice(0, 5).map((data, index) => {
        return (
          <WinnerListItem>
            <WinnerListItemImage
              img={`${
                config.sourceUrl
              }${data.game.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                data.game.code
              }.jpg`}
            ></WinnerListItemImage>
            <WinnerListItemDescription>
              <div class="name">{data.name}</div>
              <div>{data.game.name}</div>
            </WinnerListItemDescription>
            <WinnerListItemPrize>
              <div>
                <p>just won</p>
                <p class="prize">
                  <span class="currency-code">PHP</span>
                  {data.amount}
                </p>
              </div>
            </WinnerListItemPrize>
            <PlayButtonContainer>
              <PlayButton onClick={() => handleJoinGameClick()}>
                PLAY
              </PlayButton>
            </PlayButtonContainer>
          </WinnerListItem>
        );
      })}
      {/* <Title>{title}</Title>
      <WinnerList>
        <TableHeader>
          <div>Player</div> <div>Game</div> <div>Wins</div>
        </TableHeader>
        {winnerList.slice(0, 5).map((data, index) => {
          return (
            <TableData key={index}>
              <div>{data.name}</div>
              <div>{data.game}</div>
              <div>{data.amount}</div>
            </TableData>
          );
        })}
      </WinnerList> */}
    </ContentHolder>
  );
});

export default Winners;
