import styled from "styled-components";
import config from "../../../../config/config";
import { SortedMenuList } from "../../../../utils/HeaderSorting";
import i18n from "../../../../utils/i18n";
import { AppHistory } from "../../../../history/History";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GameMenuContainer = styled.div`
  width: 1280px;
  margin: 0px auto 0px auto;
  padding: 15px 0;
  overflow: visible;

  div {
    overflow: visible;
  }

  & .slick-prev,
  & .slick-next {
    width: 40px;
    height: 40px;
    z-index: 999;
  }

  & .slick-prev {
    left: -10px;
  }

  & .slick-next {
    right: -10px;
  }

  & .slick-next::before,
  & .slick-prev::before {
    content: "";
    background: url(${process.env.PUBLIC_URL +
      "/assets/images/gameLister/btn-back.png"})
      no-repeat center center;
    background-size: contain;
    display: inline-block;
    width: 30px;
    height: 30px;
  }

  & .slick-prev::before {
    transform: scale(-1, 1);
  }
`;

const GameMenuIcon = styled.div`
  position: absolute;
  top: -30px;
  right: 10px;
  width: 100%;
  height: 100%;
  min-height: 125px;
  max-height: 150px;
  min-width: 125px;
  max-width: 150px;

  margin: 10px auto 0 auto;

  background: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/gameLister/${src}.png`
    }) no-repeat center /
  contain;`;
  }};
  transition: 0.1s ease-in;
`;

const GameMenuTitle = styled.div`
  position: absolute;
  overflow: hidden;
  font-size: 30px;
  width: 60%;
  padding: 0 0 5px 10px;
  text-align: Left;
  align-self: flex-end;
  color: ${({ theme }) => theme.gamelisterOriginalText};
  z-index: 999;
`;

const GameMenu = styled.div`
  position: relative;
  display: inline-flex !important;
  box-sizing: border-box;
  width: 300px !important;
  height: 131px;
  background: ${({ theme }) => theme.pcGameListerBackground};
  border: 1px solid ${({ theme }) => theme.pcGameListerBorder}
  border-radius: 16px;
  cursor: pointer;
  margin: 0 10px;
  filter: drop-shadow(0 3px 6px #00000028);
  ${({ active }) => {
    return active
      ? `
    background: #cf2029;
    filter: drop-shadow(1px 1px 8px #cf2029ba);
    ${GameMenuIcon} { 
    }`
      : ``;
  }}
  &:hover {
    background: #cf2029;
    filter: drop-shadow(1px 1px 8px #cf2029ba);
    ${GameMenuIcon} {
      transform: scale(1.2);
      transform-origin: center;
    }
    ${GameMenuTitle} {
      font-weight: 700;
    }
  }
`;

const GameLister = ({ game }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
  };

  var currentPage = window.location.pathname.split("/")[2];

  const filterGameList = (item) => {
    if (item.include && item.include !== undefined) {
      game.homePageGameList.map((game) => {
        if (item.include.indexOf(game.game_platform_name) >= 0) {
          game.type = item.gameType[0];
        }
        return item;
      });
    }

    return game.homePageGameList.filter((game) => {
      return item.gameType.indexOf(game.type) >= 0;
    });
  };

  return (
    <GameMenuContainer>
      <Slick {...settings}>
        {SortedMenuList.map((item, index) => {
          var list = filterGameList(item).sort((a, b) => {
            if (config.features.LiveGame_Sorting_SKY) {
              var sortDGFirst = ["DG"];
              return (
                sortDGFirst.indexOf(b.abbreviation) -
                sortDGFirst.indexOf(a.abbreviation)
              );
            } else return b - a;
          });

          if (list.length > 0) {
            return (
              <GameMenu
                key={index}
                active={currentPage === item.path}
                onClick={() => {
                  AppHistory.push("/" + item.path);
                }}
              >
                <GameMenuTitle>{i18n.t(item.title)}</GameMenuTitle>
                <GameMenuIcon src={item.gameType}></GameMenuIcon>
              </GameMenu>
            );
          } else {
            return null;
          }
        })}
      </Slick>
    </GameMenuContainer>
  );
};

export default GameLister;
