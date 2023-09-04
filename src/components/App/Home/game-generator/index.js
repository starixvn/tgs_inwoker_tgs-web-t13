import React from "react";
import styled from "styled-components";
import { utility } from "../../../../utils/utility";
import { AppHistory } from "../../../../history/History";
import Common from "../../../../utils/Common";

const Overlay = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 4px solid;
`;

const PlayOverlay = styled.div`
  background: ${({ theme }) => theme.pcGameGeneratorOverlayBackground};
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 4px solid black;
  text-align: center;
  text-transform: uppercase;
  border: 4px solid ${({ theme }) => theme.pcGameGeneratorSecondary};

  & p > span {
    color: red;
    display: block;
  }
`;

const Wrapper = styled.div`
  position: relative;
  border-radius: 8px;

  :hover {
    ${Overlay} {
      display: flex;
      border-color: ${({ theme }) => theme.pcGameGeneratorSecondary};
    }
  }
`;

const SlotContent = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const GameList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const GameItem = styled.div`
  height: 150px;
  background: ${({ gpcode, gameType }) =>
      `url(${
        process.env.PUBLIC_URL +
        `/assets/images/gameGenerator/${gameType}/${gpcode}.png`
      })`}
    no-repeat center center;
`;

const TitleBox = styled.div`
  display: flex;
  backgorund: red;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  color: ${({ theme }) => theme.primaryText};
  margin-bottom: 5px;
`;

const SeeAllButton = styled.div`
  padding: 10px 25px;
  border: 1px solid ${({ theme }) => theme.pcGameGeneratorPrimary};
  background: ${({ theme }) => theme.pcGameGeneratorPrimary};
  border-radius: 4px;
  cursor: pointer;
`;

const Title = styled.h3`
  text-transform: uppercase;
  margin: 0;
`;

const GameGenerator = ({
  showLogin,
  token,
  game,
  gameType,
  handleNavigateClick,
}) => {
  const gamelist = game.homePageGameList.filter((item) => {
    return item.type === gameType;
  });

  const gameTypeStr = utility.getGameTypeStr(gameType);

  const handleJoinGame = (item) => {
    if (token) {
      Common.PopupCenter(
        "/joingame/" + item.type + "/" + item.abbreviation,
        "Live",
        1280,
        720
      );
    } else {
      showLogin(true);
    }
  };

  const GameContainer = ({ gpcode }) => {
    return (
      <div>
        <GameItem gpcode={gpcode} gameType={gameTypeStr}></GameItem>
      </div>
    );
  };

  return (
    <SlotContent>
      <TitleBox>
        <Title>{gameTypeStr}</Title>
        <SeeAllButton
          onClick={() => {
            handleNavigateClick("/live");
          }}
        >
          See All
        </SeeAllButton>
      </TitleBox>
      <GameList>
        {gamelist &&
          gamelist.slice(0, 5).map((item, index) => {
            return (
              <Wrapper
                key={index}
                onClick={() => {
                  handleJoinGame(item);
                }}
              >
                <Overlay>
                  <PlayOverlay>
                    <p>
                      <span>Play</span>Now
                    </p>
                  </PlayOverlay>
                </Overlay>
                <GameContainer
                  key={index}
                  gpcode={item.gpcode.toLowerCase()}
                ></GameContainer>
              </Wrapper>
            );
          })}
      </GameList>
    </SlotContent>
  );
};

export default GameGenerator;
