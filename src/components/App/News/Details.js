import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { AppHistory } from "../../../history/History";
import { withSnackbar } from "notistack";

import i18n from "../../../utils/i18n";
import ChevronLeftRounded from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";

const Container = styled.div`
  width: 100%;
  padding-top: 20px;

  position: relative;
  min-height: 800px;
`;

const Title = styled.div`
  width: 1280px;
  margin: 40px auto;
  font-size: 44px;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
`;

const BannerContainer = styled.div`
  width: 1280px;
  height: 486px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: 1280px 486px;
  margin: 0 auto;
  border-radius: 25px;
  position: relative;
`;

const NavigationButton = styled.div`
  width: 77px;
  height: 77px;
  background: #232323;
  border-radius: 50px;
  color: #ffffff;
  padding: 3px 2px;
  position: absolute;
  cursor: pointer;
  top: 200px;
  ${(props) =>
    props.isLeft
      ? `
    left: 30px;
  `
      : `
  right: 30px;
  `}

  & > svg {
    font-size: 4.5rem;
  }
`;

const NewsContainer = styled.div`
  width: 1280px;
  margin: 0 auto 200px auto;
  padding: 25px 60px;
  color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const NewsTitle = styled.div`
  font-size: 40px;
  text-align: center;
  margin: 20px 0;
`;
const NewsAuthor = styled.div`
  font-size: 30px;
  text-align: center;
  margin: 20px 0;
`;
const NewsContent = styled.div`
  font-size: 28px;
  text-align: justify;
  margin: 20px 0;
  font-weight: 100;
  white-space: pre-line;
`;

class NewsDetails extends Component {
  constructor(props) {
    super(props);
    var index = -1;
    var newsDetail = null;
    var newsList = [
      {
        id: "1",
        title: "Caesars Racebook launches on Android and desktop",
        author: "Peter Lynch",
        content: `The launch is in cooperation with Nyra Bets, the official online wagering platform of the New York Racing Association.

          Fans of horseracing in the US states of Kentucky, Florida, Ohio, Indiana, Oregon, Montana and North Dakota can now enjoy access to Caesars Racebook ahead of the 2022 Breeders’ Cup.
          
          “Caesars Racebook utilises the Nyra Bets platform providing customers with pari-mutuel wagering on premier horseracing content from more than 250 tracks around the world with betting on marquee tracks in the United States and internationally,” a statement from the company read.
          
          “In addition to the upcoming Breeders’ Cup races at Keeneland, the wagering menu includes Aqueduct, Belmont Park, Saratoga Race Course, Gulfstream Park, Del Mar and Santa Anita, as well as Caesars-operated tracks Harrah’s Hoosier Park, Horseshoe Indianapolis, Harrah’s Philadelphia and Eldorado Gaming Scioto Downs.”
          
          Through the end of 2022, Caesars Racebook players will receive 4x the Racebook Points for every $1 wagered on races at Caesars Entertainment racetracks.
          
          As noted by the group, Caesars Racebook plans to continue to launch in additional US states.
          
          Caesars Digital Senior Vice President and Chief Development Officer Dan Shapiro commented: “Expanding Caesars Racebook’s access to Android users and desktop is key for the platform’s continued growth.
          
          “We’re excited to offer even more customers a horseracing wagering experience that treats them like royalty, no matter what type of device they prefer, thanks to the integration with our industry-leading Caesars Rewards loyalty programme.”
          
          Last week, Caesars Sportsbook was made available in Ohio, with bettors able to access it on desktop and download the app on iOS and Android.
          
          Legalised sports betting in the state starts on 1 January 2023, and gamers in Ohio will be able to place their first wagers from this date onwards.`,
        image: "1",
      },
      {
        id: "2",
        title: "Liverpool vs Manchester United final score",
        author: "Peter Lynch",
        content:
          "Luis Diaz, Sadio Mane, and Mohamed Salah all had at least a goal and an assist in a 4-0 demolition of Manchester United at Anfield that sent Liverpool top of the Premier League.",
        image: "2",
      },
      {
        id: "3",
        title:
          "EVOLUTION LAUNCHES MONOPOLY BIG BALLER, A BINGO-STYLE LIVE GAMES SHOW BASED ON THE WORLD-FAMOUS BOARD GAME",
        author: "Peter Lynch",
        content:
          "Evolution today announced the launch of MONOPOLY Big Baller, a totally new bingo-style live game show played online. The game features live automated ball drawing and a live game host, an augmented reality MR. MONOPOLY, and numerous multipliers offering players the chance of greatly increased payouts.",
        image: "3",
      },
      {
        id: "4",
        title:
          "Snapdragon Pro Series to host multi-title live events at DreamHack Valencia",
        author: "Peter Lynch",

        content: `The Snapdragon Pro Series, ESL Gaming’s mobile esports ecosystem, will host three live events during DreakHack Valencia, which will be taking place at the Valencia Fair from December 9th-11th.
                Wild Circuit: Game Changers, the first championships for League of Legends: Wild Rift’s women’s scene, will take place at the gaming festival alongside Wild Rift EUR & North Africa Finals as well as Brawl Stars EUR & MENA Finals.
                `,
        image: "4",
      },
      {
        id: "5",
        title: "Lucky Group Wins $100k In Encore Draw",
        author: "Peter Lynch",

        content:
          "A group of enthusiastic lottery players recently won big following their purchase of an Encore ticket from the Ontario Lottery and Gaming ",
        image: "5",
      },
      {
        id: "6",
        title: "GET DOUBLE THE PRIZES WITH “WILD BOUNTY SHOWDOWN”!",
        author: "Peter Lynch",

        content: `Cass has heard that the bandits have hidden some gold bars in an old cellar and that they will be splitting the loot tonight. Cass wants to snatch all the gold bars from them, but she is weak in finding a good ambush spot. Can you help her?
                PG SOFT™ has launched another new exciting game — "Wild Bounty Showdown"! Once entering the game, players will be immediately immersed in a brutal world where they have to compete against bandits for rewards. Show no mercy to the cunning bandits and keep spinning the reels to gain tremendous rewards! 
                `,
        image: "6",
      },
    ];

    for (var i = 0; i < newsList.length; i++) {
      if (newsList[i].id === this.props.match.params.id) {
        index = i;
        newsDetail = newsList[i];
        break;
      }
    }
    if (index === -1) {
      AppHistory.replace("/" + i18n.language + "/news");
    }

    this.state = {
      index: index,
      newsList: newsList,
      newsDetail: newsDetail,
    };
  }

  componentDidMount() {
    if (this.props.match.params.id == null) {
      AppHistory.replace("/" + i18n.language + "/news");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.id !== null &&
      this.props.match.params.id != null &&
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      for (var i = 0; i < this.state.newsList.length; i++) {
        if (this.state.newsList[i].id === this.props.match.params.id) {
          this.setState({
            ...this.state,
            index: i,
            newsDetail: this.state.newsList[i],
          });
        }
      }
    }
  }

  navigatePromotion = (isLeft) => {
    var newId = "";
    var newIndex;
    if (isLeft) {
      newIndex =
        this.state.index - 1 < 0
          ? this.state.newsList.length - 1
          : this.state.index - 1;
      newId = this.state.newsList[newIndex].id;
    } else {
      newIndex =
        this.state.index + 1 >= this.state.newsList.length
          ? 0
          : this.state.index + 1;
      newId = this.state.newsList[newIndex].id;
    }
    if (newId !== "") {
      AppHistory.push("/" + i18n.language + "/news/" + newId);
    }
  };

  render() {
    return (
      <Container>
        <Title>{i18n.t("Top News")}</Title>
        <BannerContainer
          img={
            this.state.newsDetail &&
            process.env.PUBLIC_URL +
              "/assets/images/news/" +
              this.state.newsDetail.image +
              ".jpg"
          }
        >
          {this.state.newsList.length > 1 && (
            <React.Fragment>
              <NavigationButton
                isLeft={true}
                onClick={() => {
                  this.navigatePromotion(true);
                }}
              >
                <ChevronLeftRounded></ChevronLeftRounded>
              </NavigationButton>
              <NavigationButton
                isLeft={false}
                onClick={() => {
                  this.navigatePromotion(false);
                }}
              >
                <ChevronRightRounded></ChevronRightRounded>
              </NavigationButton>
            </React.Fragment>
          )}
        </BannerContainer>
        <NewsContainer>
          <NewsTitle>{this.state.newsDetail.title}</NewsTitle>
          <NewsAuthor>{this.state.newsDetail.author}</NewsAuthor>
          <NewsContent>{this.state.newsDetail.content}</NewsContent>
        </NewsContainer>
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
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(NewsDetails))
);
