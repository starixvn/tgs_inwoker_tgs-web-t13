import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { AppHistory } from "../../../history/History";

import { withSnackbar } from "notistack";

import i18n from "../../../utils/i18n";

const Container = styled.div`
  width: 1280px;
  min-height: 800px;
  position: relative;
  margin: 0 auto;
`;
const Title = styled.div`
  width: 1280px;
  margin: 40px auto;
  font-size: 44px;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
`;

const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 1280px;
  margin: 40px auto;
  justify-items: center;
  row-gap: 30px;
`;

const NewsItem = styled.div`
  width: 600px;
  height: 600px;
  position: relative;
  border-radius: 39px;
  cursor: pointer;
  border: 1px solid #707070;
`;

const NewsImageContainer = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 25px;
  width: 100%;
  height: 300px;
`;

const NewsImage = styled.img`
  width: 600px;
  height: 300px;
`;

const NewsTitle = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 500;
  padding: 30px 20px 10px 20px;
  overflow: hidden;
`;

const NewsContent = styled.div`
  color: white;
  font-size: 14px;
  padding: 0px 20px 10px 20px;
  height: 100px;
  overflow: hidden;
`;

const ButtonMore = styled.div`
  width: 300px;
  height: 80px;
  line-height: 80px;
  border-radius: 40px;
  margin: 40px auto;
  background: #cf2029;
  filter: drop-shadow(1px 1px 8px #cf2029ba);
  text-transform: uppercase;
  text-align: center;
  font-size: 26px;
  color: #fff;
  cursor: pointer;
`;

class News extends Component {
  state = {
    newsList: [
      {
        id: "1",
        title: "Caesars Racebook launches on Android and desktop",
        content:
          "The launch is in cooperation with Nyra Bets, the official online wagering platform of the New York Racing Association.",
        image: "1",
      },
      {
        id: "2",
        title: "Liverpool vs Manchester United final score",
        content:
          "Luis Diaz, Sadio Mane, and Mohamed Salah all had at least a goal and an assist in a 4-0 demolition of Manchester United at Anfield that sent Liverpool top of the Premier League.",
        image: "2",
      },
      {
        id: "3",
        title:
          "EVOLUTION LAUNCHES MONOPOLY BIG BALLER, A BINGO-STYLE LIVE GAMES SHOW BASED ON THE WORLD-FAMOUS BOARD GAME",
        content:
          "Evolution today announced the launch of MONOPOLY Big Baller, a totally new bingo-style live game show played online. The game features live automated ball drawing and a live game host, an augmented reality MR. MONOPOLY, and numerous multipliers offering players the chance of greatly increased payouts.",
        image: "3",
      },
      {
        id: "4",
        title:
          "Snapdragon Pro Series to host multi-title live events at DreamHack Valencia",
        content: `The Snapdragon Pro Series, ESL Gaming’s mobile esports ecosystem, will host three live events during DreakHack Valencia, which will be taking place at the Valencia Fair from December 9th-11th.
          Wild Circuit: Game Changers, the first championships for League of Legends: Wild Rift’s women’s scene, will take place at the gaming festival alongside Wild Rift EUR & North Africa Finals as well as Brawl Stars EUR & MENA Finals.
          `,
        image: "4",
      },
      {
        id: "5",
        title: "Lucky Group Wins $100k In Encore Draw",
        content:
          "A group of enthusiastic lottery players recently won big following their purchase of an Encore ticket from the Ontario Lottery and Gaming ",
        image: "5",
      },
      {
        id: "6",
        title: "GET DOUBLE THE PRIZES WITH “WILD BOUNTY SHOWDOWN”!",
        content: `Cass has heard that the bandits have hidden some gold bars in an old cellar and that they will be splitting the loot tonight. Cass wants to snatch all the gold bars from them, but she is weak in finding a good ambush spot. Can you help her?
          PG SOFT™ has launched another new exciting game — "Wild Bounty Showdown"! Once entering the game, players will be immediately immersed in a brutal world where they have to compete against bandits for rewards. Show no mercy to the cunning bandits and keep spinning the reels to gain tremendous rewards! 
          `,
        image: "6",
      },
    ],
  };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  handleNavigateClick = (id) => {
    AppHistory.push({
      pathname: "/" + i18n.language + "/news/" + id,
    });
  };

  render() {
    return (
      <Container>
        <Title>{i18n.t("Top News")}</Title>
        <NewsContainer>
          {this.state.newsList.slice(0, 6).map((item, index) => {
            return (
              <NewsItem
                onClick={() => {
                  this.handleNavigateClick(item.id);
                }}
              >
                <NewsImageContainer>
                  <NewsImage
                    alt={item.image}
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/news/" +
                      item.image +
                      ".jpg"
                    }
                  ></NewsImage>
                </NewsImageContainer>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsContent>{item.content}</NewsContent>
              </NewsItem>
            );
          })}
        </NewsContainer>
        <ButtonMore>{i18n.t("Load More")}</ButtonMore>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    general: state.general,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(News))
);
