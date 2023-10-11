import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import i18n from "../../../utils/i18n";

import ScrollAnimation from "react-animate-on-scroll";
import Common from "../../../utils/Common";
import GameLister from "../Home/game-lister";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 770px;
  position: relative;
`;
const Banner = styled.div`
  width: 1920px;
  height: 600px;
  background: url(${(props) =>
      process.env.PUBLIC_URL}/assets/images/pcGamePage/esports/background.jpg)
    no-repeat center;
`;
const GPLogo = styled.div`
  position: absolute;
  width: 240px;
  height: 240px;
  background: url(${(props) => props.img}) no-repeat center;
  background-size: 150px auto;
  background-color: #00000080;
`;
const GameImage = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  width: 240px;
  height: 240px;
  background-size: cover;
  &:hover {
    cursor: pointer;
  }
`;
const LeftSlide = styled(ScrollAnimation)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  row-gap: 15px;
  column-gap: 10px;
`;
const RightSlide = styled(ScrollAnimation)`
  display: flex;
`;
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1280px;
  margin: 0 auto;
  padding: 15px 15px;
`;
const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  color: white;
  display: none;
  user-select: none;
  max-height: 109px;
  max-width: 170px;
  bottom: 10px;
  left: 35px;
  cursor: not-allowed;
  background: url(${(props) =>
      process.env.PUBLIC_URL}/assets/images/pcGamePage/maintenance.png)
    no-repeat;
`;
const GameTitle = styled.div`
  position: absolute;
  bottom: 0;
  display: none;
  width: 100%;
  height: 30px;
  color: #fff;
  background: #000000c7;
  line-height: 30px;
  text-align: center;
  text-transform: uppercase;
`;
const GameWrapper = styled.div`
  width: 240px;
  height: 240px;
  position: relative;
  border-radius: 25px;

  ${({ maintenance }) => {
    return maintenance
      ? `

  ${Maintenance}{
   
    display: flex;
  }
  ${GameImage}{
    filter: brightness(40%) grayscale(200%);
  }
  ${GPLogo}{
    filter: brightness(40%);
  }
  
  
  `
      : `
      &:hover {
        ${GPLogo}{
          display: none;
        }
        ${GameTitle}{
          display: block;
        }
      }
      `;
  }}
`;
class ESports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.game.homePageGameList.filter((item) => {
        return item.type === GameTypeEnum.ESPORTS;
      }),
    };
  }

  componentDidMount() {}
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var sportsList = this.props.game.homePageGameList.filter((item) => {
        return item.type === GameTypeEnum.ESPORTS;
      });

      this.setState({
        ...this.state,
        selected: sportsList[0],

        list: sportsList,
      });
    }
  }
  handleJoinGameClick = (params, type) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      // this.props.performBalanceRefresh();
      Common.closePreviousPopup();
      this.props.history.push(
        "/sports/play/" + params + "/" + GameTypeEnum.ESPORTS
      );
    }
  };
  render() {
    return (
      <Container>
        <Banner></Banner>
        <GameLister game={this.props.game}></GameLister>
        <ItemContainer>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.state.list.map((item, index) => {
              return (
                <GameWrapper maintenance={item.status != 0}>
                  <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                  <GameImage
                    style={{ float: "right" }}
                    img={
                      process.env.PUBLIC_URL +
                      "/assets/images/pcGamePage/esports/" +
                      item.abbreviation.toLowerCase() +
                      ".png"
                    }
                    onClick={() => {
                      this.handleJoinGameClick(item.abbreviation);
                    }}
                  />
                  <GPLogo
                    img={
                      process.env.PUBLIC_URL +
                      "/assets/images/provider/" +
                      item.abbreviation.toLowerCase() +
                      ".png"
                    }
                  ></GPLogo>
                  <GameTitle>
                    {i18n.t(item.abbreviation.toUpperCase() + ".esports")}
                  </GameTitle>
                </GameWrapper>
              );
            })}
          </LeftSlide>
        </ItemContainer>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ESports));
