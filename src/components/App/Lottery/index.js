import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";

import i18n from "../../../utils/i18n";
import ScrollAnimation from "react-animate-on-scroll";
import Common from "../../../utils/Common";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 770px;
  padding: 70px 0px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL}/assets/images/pcGamePage/lottery/background.jpg)
    no-repeat center;
`;
const GirlImage = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  width: 308px;
  height: 244px;

  float: left;
  &:hover {
    cursor: pointer;
  }
`;
const LeftSlide = styled(ScrollAnimation)`
  display: flex;
`;

const ItemContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  overflow: visible;
`;
const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: white;
  display: none;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
  cursor: not-allowed;
`;
const GameWrapper = styled.div`
  position: relative;

  ${({ maintenance }) => {
    return maintenance
      ? `

  ${Maintenance}{
   
    display: flex;
  }
  ${GirlImage}{
    filter: brightness(40%) grayscale(200%);
  }
  
  
  `
      : ``;
  }}
`;
class Lottery extends Component {
  constructor(props) {
    super(props);

    var lotteryList = props.game.homePageGameList.filter((item) => {
      return item.type === GameTypeEnum.LOTTERY;
    });

    this.state = {
      selected: lotteryList[0],
      subMenu: null,
      loaded: false,
      hide: true,
      list: lotteryList,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hide: false,
      });
    }, 1000);
  }
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var lotteryList = this.props.game.homePageGameList.filter((item) => {
        return item.type === GameTypeEnum.LOTTERY;
      });

      this.setState({
        ...this.state,
        selected: lotteryList[0].abbreviation,

        list: lotteryList,
      });
    }
  }
  handleJoinGameClick = (name) => {
    if (this.props.account.token != null) {
      Common.closePreviousPopup();
      // this.props.performBalanceRefresh();
      Common.PopupCenter(
        "/" + i18n.language + "/joinlottery/" + name,
        name,
        1280,
        720
      );
    } else {
      this.props.showLogin(true);
    }
  };
  handleGameChange = (game) => {
    this.setState({
      selected: game,
    });
  };

  render() {
    return (
      <Container>
        <ItemContainer style={{ marginTop: 380 }}>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.state.list
              .slice(0, 4)

              .map((item, index) => {
                return (
                  <GameWrapper maintenance={item.status !== 0}>
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                    <GirlImage
                      style={{ float: "right" }}
                      img={
                        process.env.PUBLIC_URL +
                        "/assets/images/pcGamePage/lottery/" +
                        item.abbreviation.toLowerCase() +
                        ".png"
                      }
                      onClick={() => {
                        this.handleJoinGameClick(item.abbreviation);
                      }}
                    />
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
export default connect(mapStateToProps, mapDispatchToProps)(Lottery);
