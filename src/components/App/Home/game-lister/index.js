import styled from "styled-components";
import config from "../../../../config/config";
import { SortedMenuList } from "../../../../utils/HeaderSorting";
import i18n from "../../../../utils/i18n";
import { AppHistory } from "../../../../history/History";
const GameMenuContainer = styled.div`
  display: flex;
  width: 1280px;
  justify-content: center;
  margin: 0px auto 0px auto;
  padding: 15px 10px;
`;

const GameMenuIcon = styled.div`
  min-height: 80px;
  min-width: 80px;

  height: 41px;
  width: 45px;

  margin: 10px auto 0 auto;

  mask: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/pcHeaderMenu/${src}.png`
    }) no-repeat center /
  contain;`;
  }};
  background: ${({ theme }) => theme.primary};

  transition: background 0.1s ease-in;
`;

const GameMenu = styled.div`
  width: 151px;
  height: 131px;
  background: #27273f;
  border-radius: 16px;
  margin: 0 8px;
  filter: drop-shadow(0 3px 6px #00000028);
  ${({ active }) => {
    return active
      ? `    
    background: #cf2029;
    filter: drop-shadow(1px 1px 8px #cf2029ba);
    ${GameMenuIcon} {
      background: #fff;
    }`
      : ``;
  }}
  &:hover {
    background: #cf2029;
    filter: drop-shadow(1px 1px 8px #cf2029ba);
    ${GameMenuIcon} {
      background: #fff;
    }
  }
`;

const GameMenuTitle = styled.div`
  font-size: 20px;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.gamelisterOriginalText};
`;

const GameLister = ({ game }) => {
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
              active={currentPage === item.path}
              onClick={() => {
                AppHistory.push("/" + item.path);
              }}
            >
              <GameMenuIcon src={item.gameType}></GameMenuIcon>
              <GameMenuTitle>{i18n.t(item.title)}</GameMenuTitle>
            </GameMenu>
          );
        } else {
          return null;
        }
      })}
    </GameMenuContainer>
  );
};

export default GameLister;
