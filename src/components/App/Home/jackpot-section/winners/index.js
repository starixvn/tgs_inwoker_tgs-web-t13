import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Common from "../../../../../utils/Common";
import config from "../../../../../config/config";
const ContentHolder = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
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
  grid-template-columns: 120px 1fr 1fr;
  justify-content: space-evenly;
  align-items: center;
  background: #27273f;
  color: #fff;
  width: 400px;
  height: 120px;
  border-radius: 25px;
`;

const WinnerListItemImage = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 20px;
  margin: auto;
`;
const WinnerListItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  & > div{
    font-size: 16px;
  }
`;
const WinnerListItemPrize = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 22px;
  align-self: center;
`;

const Winners = React.memo(({ title }) => {
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

  Array.from({ length: 3 }, () =>
    newList.push({
      name: randomize(playerName),
      game: randomize(gameList),
      amount: Common.formatNumberWithThousand(randomNumber(min, max)),
    })
  );

  useEffect(() => {
    if(winnerList<=0)
    {
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

  return (
    <ContentHolder>
      {winnerList.slice(0, 3).map((data, index) => {
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
              <div>{data.name}</div>
              <div>{data.game.name}</div>
            </WinnerListItemDescription>
            <WinnerListItemPrize>₱ {data.amount}</WinnerListItemPrize>
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
