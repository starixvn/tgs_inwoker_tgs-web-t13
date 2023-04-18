import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Common from "../../../utils/Common";

import Slider from "./Slider";
import { withRouter } from "react-router-dom";

import Marquee from "./Marquee";

import {
  SHOW_MODAL,
  SHOW_LOGIN,
} from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";

import i18n from "../../../utils/i18n";

import config from "../../../config/config";

import PopupAnnouncement from "./PopupAnnouncement";
import JackpotSection from "./jackpot-section";
import GameLister from "./game-lister";
import PromotionSlider from "./promotion-slider";
import NewsSection from "./news-section";
import BrandSection from "./brand-section";

const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  position: relative;
`;

const MarqueeContainer = styled.div`
  width: 1280px;
  background-color: #27273f;
  border-radius: 25px;
  margin: 15px auto;
`;
const SectionContainer = styled.div`
  width: 1280px;
  min-height: 1200px;

  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    var displayGame = this.getHomePageDisplayGame();

    this.state = {
      marqueeText: [],
      banner_list: [],
      wm: displayGame.wm,
      ky: displayGame.ky,
      openAnnouncement: false,
      showPromotion: false,
    };
  }

  componentDidMount() {
    // let promotionId = "";
    // let promotionChannelId = "";
    // if (this.props.match.params) {
    //   promotionId = this.props.match.params.promotionid || "";
    //   promotionChannelId = this.props.match.params.promotionchannelid || "";
    // }
    // localStorage.setItem("promotionId", promotionId);
    // localStorage.setItem("promotionChannelId", promotionChannelId);
  }
  componentDidUpdate(preProps) {
    var isInHomePage =
      this.props.ui.mains &&
      this.props.ui.mains !== preProps.ui.mains &&
      this.props.ui.mains.length > 0;

    if (config.features.PopupAnnouncement) {
      if (isInHomePage) {
        this.setState({
          openAnnouncement: true,
          showPromotion: false,
        });
      }
    }

    if (config.features.PopupPromotion) {
      if (
        isInHomePage &&
        this.props.general.promotionList.items !==
          preProps.general.promotionList.items &&
        this.props.general.promotionList.items.length > 0
      ) {
        if (!this.state.openAnnouncement) {
          this.setState({
            showPromotion: true,
          });
        }
      }
    }

    if (
      preProps.game.homePageGameList.length !==
        this.props.game.homePageGameList.length &&
      this.props.game.homePageGameList.length > 0
    ) {
      var displayGame = this.getHomePageDisplayGame();
      this.setState({
        ...this.state,
        wm: displayGame.wm,
        ky: displayGame.ky,
      });
    }
  }
  getHomePageDisplayGame() {
    var wm = null,
      ky = null;
    if (this.props.game.homePageGameList.length > 0) {
      var wmList = this.props.game.homePageGameList.filter(
        (item) => item.type === "Wm"
      );
      var kyList = this.props.game.homePageGameList.filter(
        (item) => item.abbreviation === "Ky"
      );
      if (wmList.length >= 1) {
        wm = wmList[0];
      } else {
        wm = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.LIVE
        )[0];
      }
      if (kyList.length >= 1) {
        ky = kyList[0];
      } else {
        ky = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.QIPAI
        )[0];
      }
    }

    return { wm, ky };
  }
  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (this.props.token !== "" && this.props.token !== null) {
      var slotPageGameType = [
        GameTypeEnum.FISH,
        GameTypeEnum.SLOT,
        GameTypeEnum.TIGERSLOT,
        GameTypeEnum.SPORTS,
        GameTypeEnum.ESPORTS,
        GameTypeEnum.TABLEGAME,
      ];
      Common.closePreviousPopup();
      if (slotPageGameType.indexOf(gameType) >= 0) {
        if (
          gameType === GameTypeEnum.SPORTS ||
          gameType === GameTypeEnum.ESPORTS
        ) {
          if (!this.props.token) {
            this.props.showLogin(true);
          } else {
            this.props.history.push(`/sports/play/${gameCode}/${gameType}`);
          }
        } else {
          this.props.history.push(`/${path}/${gameCode}`);
        }
      } else {
        // Common.PopupCenter(url, gameCode, 1280, 720);
      }
    } else {
      this.props.showLogin(true);
    }
  };

  handleNavigateClick = (url) => {
    this.props.history.push(url);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  render() {
    return (
      <HomeContainer>
        <SliderContainer>
          <Slider list={this.props.ui.board_list}></Slider>
        </SliderContainer>
        <SectionContainer>
          <JackpotSection
            showLogin={this.props.showLogin}
            token={this.props.token}
          />
        </SectionContainer>
        <SliderContainer>
          <PromotionSlider
            promotionList={this.props.general.promotionList.items}
            handleNavigateClick={this.handleNavigateClick}
          ></PromotionSlider>
        </SliderContainer>
        <NewsSection
          handleNavigateClick={this.handleNavigateClick}
        ></NewsSection>
        <BrandSection
          logo={this.props.general.brand.desktopLogoUrl}
        ></BrandSection>
        {(() => {
          if (
            config.features.PopupAnnouncement &&
            this.props.ui.mains &&
            this.props.ui.mains.length > 0
          ) {
            var row = this.props.ui.mains[0];

            return (
              <PopupAnnouncement
                open={this.state.openAnnouncement}
                onClose={() => {
                  if (document.getElementById("audio") != null)
                    document.getElementById("audio").play();
                  this.setState({
                    ...this.state,
                    openAnnouncement: false,
                    showPromotion: true,
                  });
                }}
                text={
                  row.localization !== null && row.localization.content
                    ? row.localization.content
                    : row.content
                }
                header={
                  row.localization !== null && row.localization.subject
                    ? row.localization.subject
                    : row.subject
                }
              ></PopupAnnouncement>
            );
          }
        })()}

        {config.features.PopupPromotion &&
          this.props.general.promotionList.items.length > 0 && (
            <PopupAnnouncement
              open={this.state.showPromotion}
              type="promo"
              onClose={() => {
                if (document.getElementById("audio") != null)
                  document.getElementById("audio").play();
                this.setState({ ...this.state, showPromotion: false });
              }}
              content={this.props.general.promotionList.items}
              header={i18n.t("promotion.title")}
              isCustom={true}
            ></PopupAnnouncement>
          )}
      </HomeContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (pageName) => {
      dispatch({ type: SHOW_MODAL, pageName });
    },
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    ui: state.ui,
    game: state.game,
    general: state.general,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
