import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import BGPromotionJPG from "../../../assets/images/bg-promotion.jpg";

import { AppHistory } from "../../../history/History";

import { withSnackbar } from "notistack";

import i18n from "../../../utils/i18n";
import { generalAction } from "../../../api-services/actions/generalAction";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";

import PromoEmpty from "../../../assets/images/promo-empty.png";

const moment = require("moment");

const Container = styled.div`
  width: 100%;
  min-height: 800px;
  position: relative;
`;
const Title = styled.div`
  width: 1280px;
  margin: 40px auto;
  font-size: 44px;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
`;
const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
const PromoEmptyContainer = styled.div``;
const PromoEmptyBg = styled.div`
  background: url(${PromoEmpty}) no-repeat;
  width: 1920px;
  height: 1015px;
  margin: 0 auto;
`;
const PromoEmptyText = styled.div`
  width: 673px;
  position: absolute;
  right: 50%;
  top: 30%;
`;
const PromoEmptyTextLine = styled.div`
  font-size: 80px;
  text-align: center;
  font-weight: bold;
  background: -webkit-linear-gradient(#446597, #282828);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PromotionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 40px;
  padding: 30px 0;
`;

const PromotionItem = styled.div`
  width: 550px;
  height: 222px;
  position: relative;
  margin-bottom: 12px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  border-radius: 25px;
  transition: all 1s;
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(1px 10px 10px #000000c4);
  }
`;

class Promotion extends Component {
  state = {
    list: [],
    selectedTab: 0,
    selectedPromoId: "",
    selectedPromoTitle: "",
    selectedBospId: 0,
    openJoin: false,
    selectedPromoSpecifications: [],
  };

  componentDidMount() {
    this.props.getPromotion();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account.token !== this.props.account.token) {
      this.props.getPromotion();
    }

    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.enqueueSnackbar(i18n.t("promotion.joinSuccess"), {
          variant: "success",
        });
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.enqueueSnackbar(i18n.t("promotion.promoJoint"), {
            variant: "error",
          });
        }
      }
    }
  }
  // handleJoinClick = (bosp_id) => {
  //   BonusService.JoinActivity(
  //     this.props.token,
  //     this.state.selectedPromoId,
  //     this.state.selectedBospId
  //   ).then((response) => {
  //     if (response.IsSuccess) {
  //       this.props.enqueueSnackbar(response.msg, {
  //         variant: "success",
  //       });
  //       this.ResetPopup();
  //     } else {
  //       this.props.enqueueSnackbar(response.msg, {
  //         variant: "error",
  //       });
  //     }
  //   });
  // };

  //TODO: Temporary hardcode the navigation
  handlejoinPromotionClick = (id, promotionType) => {
    if (this.props.account.token === null) this.props.showLogin(true);
    else {
      this.props.joinPromotion(id);
      if (
        [
          "FirstDeposit",
          "DailySecondDeposit",
          "DailyFirstDeposit",
          "DepositReward",
          "DepositAccumulateRoulette",
        ].indexOf(promotionType) >= 0
      ) {
        AppHistory.push({
          pathname: "/account/deposit/" + id,
        });
      }
    }
  };
  handlePromotionClick = (id, promotionType) => {
    AppHistory.push({
      pathname: "/promotion/" + id,
    });
  };
  render() {
    return (
      <Container>
        {this.props.general.promotionList.items &&
        this.props.general.promotionList.items.length <= 0 ? (
          <PromoEmptyContainer>
            <PromoEmptyBg></PromoEmptyBg>
          </PromoEmptyContainer>
        ) : (
          <>
            {" "}
            <Title>{i18n.t("common.promotion")}</Title>
          </>
        )}
        <Wrap>
          <PromotionContainer>
            {this.props.general.promotionList.items
              .sort((a, b) => {
                return a.order - b.order;
              })
              .map((data, index) => {
                const checkIfLocaleExist =
                  data.localization !== null &&
                  data.localization[i18n.language];
                return (
                  <PromotionItem
                    key={index}
                    img={
                      checkIfLocaleExist
                        ? checkIfLocaleExist.desktopBanner
                        : data.desktopBanner
                    }
                    onClick={() => {
                      this.handlePromotionClick(data.id, data.promotionType);
                    }}
                  ></PromotionItem>
                );
              })}
          </PromotionContainer>
        </Wrap>
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
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    joinPromotion: (id) => {
      dispatch(generalAction.joinPromotion(id));
    },
    getPromotionList: (language) =>
      dispatch(generalAction.getPromotionList(language, 1, 99, true, "", true)),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    getPromotion: () => dispatch(generalAction.getPromotion()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Promotion))
);
