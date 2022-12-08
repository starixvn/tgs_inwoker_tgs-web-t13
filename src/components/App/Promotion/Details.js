import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import BGJPG from "../../../assets/images/bg.jpg";
import { AppHistory } from "../../../history/History";
import { withSnackbar } from "notistack";

import i18n from "../../../utils/i18n";
import { generalAction } from "../../../api-services/actions/generalAction";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import IconLoginClosePNG from "../../../assets/images/icon-login-close.png";
import { Grid, Container as MContainer } from "@material-ui/core";
import ChevronLeftRounded from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";

const moment = require("moment");

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
  font-family: "Montserrat";
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

const SubTitle = styled.div`
  width: 1280px;
  margin: 30px auto;
  font-size: 30px;
  font-family: "Montserrat";
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
`;

const PromotionContent = styled.div`
  width: 1000px;
  background: #27273f;
  margin: 0 auto 40px auto;
  padding: 25px;
  color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const PromotionButton = styled.div`
  width: 141px;
  height: 54px;
  font-size: 22px;
  font-family: "Montserrat";
  padding: 12.5px 0px;
  text-align: center;
  color: ${({ theme }) => theme.pcHeaderText};
  cursor: pointer;
  background: ${({ theme }) => theme.primary};
  border-color: ${({ theme }) => theme.primary};
  border-radius: 30px;
  text-transform: uppercase;
  filter: drop-shadow(1px 1px 8px #cf2029ba);
  ${({ disabled }) => {
    return disabled
      ? `
    opacity: 0.65;
    cursor: not-allowed;`
      : ``;
  }}
`;
const PromoDesc = styled.div`
  font-size: 14px;
`;

const PromoDetailContainer = styled(Grid)`
  box-shadow: 0px 1px 8px rgba(32, 0, 0, 0.7);
  margin: 10px 0px;
  width: 100%;
  position: relative;
  background: white;
  padding: 18px 15px;
  border-radius: 20px;
`;

const PromoDetailImage = styled.div`
  width: 100%;
  height: 486px;
  margin-bottom: 20px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
`;

const EventTitle = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
`;

const EventText = styled.div`
  font-size: 14px;
  line-height: 26px;
  margin-bottom: 20px;
`;
const PromoButtonContainer = styled(Grid)`
  cursor: pointer;
  user-select: none;
  position: relative;
  width: 100%;
  border-radius: 5px;
  height: 62px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );

  ${({ disableTheButton }) => {
    return disableTheButton
      ? `
    opacity: 0.65;
    cursor: not-allowed;`
      : ``;
  }}
`;
const BottomContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;
const TNCToggle = styled.div`
  display: flex;
  color: #ffffff;
  font-weight: bold;
  place-self: flex-start;
  &:before {
    content: ${(props) => (props.active ? `"—"` : `"+"`)};
    color: ${({ theme }) => theme.primary};
    width: 28px;
    height: 28px;
    margin: 0 5px;
    font-size: ${(props) => (props.active ? `13px` : `18px`)};
    text-align: center;
  }
`;
const TNCContainer = styled.div`
  color: #ffffff;
  padding: 0 35px;
  margin-bottom: 40px;
`;
const PromoButtonText = styled(Grid)`
  color: #fff;
  font-size: 20px;
`;
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);
const DialogContainer = styled.div`
  width: 600px;

  background-color: #fff;
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat;
  width: 28px;
  height: 28px;
  float: right;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 42px;

  color: ${({ theme }) => theme.secondary};
`;
const DialogContent = styled.div`
  margin: 0 auto;
  padding: 10px 40px;
`;

class PromotionDetails extends Component {
  constructor(props) {
    super(props);
    var index = -1;
    var details = null;
    for (var i = 0; i < this.props.general.promotionList.items.length; i++) {
      if (
        this.props.general.promotionList.items[i].id ===
        this.props.match.params.id
      ) {
        index = i;
        details = this.props.general.promotionList.items[i];
        break;
      }
    }
    if (index === -1) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
    var term = "";
    if (details) {
      if (
        JSON.stringify(details.localization) !== "{}" &&
        (details.localization[i18n.language] !== "" ||
          details.localization[i18n.language] !== null)
      ) {
        term = details.localization[i18n.language].terms
          ? details.localization[i18n.language].terms
          : details.terms;
      } else {
        term = details.terms || "";
      }
    }

    this.state = {
      index: index,
      details: details,
      term: term,
      joined: false,
      openDialog: false,
      isTNCToggled: false,
    };
  }

  componentDidMount() {
    if (this.props.match.params.id == null) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
    if (this.props.general.promotionList.items.length <= 0) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.enqueueSnackbar(i18n.t("promotion.joinSuccess"), {
          variant: "success",
        });
        this.setState({
          ...this.state,
          joined: true,
        });
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.enqueueSnackbar(i18n.t("promotion.promoJoint"), {
            variant: "success",
          });
        }
      }
    }
    if (prevProps.account.token !== this.props.account.token) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
    if (
      prevProps.match.params.id !== null &&
      this.props.match.params.id != null &&
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      for (var i = 0; i < this.props.general.promotionList.items.length; i++) {
        if (
          this.props.general.promotionList.items[i].id ===
          this.props.match.params.id
        ) {
          var term = "";
          if (this.props.general.promotionList.items[i]) {
            if (
              JSON.stringify(
                this.props.general.promotionList.items[i].localization
              ) !== "{}" &&
              (this.props.general.promotionList.items[i].localization[
                i18n.language
              ] !== "" ||
                this.props.general.promotionList.items[i].localization[
                  i18n.language
                ] !== null)
            ) {
              term = this.props.general.promotionList.items[i].localization[
                i18n.language
              ].terms
                ? this.props.general.promotionList.items[i].localization[
                    i18n.language
                  ].terms
                : this.props.general.promotionList.items[i].terms;
            } else {
              term = this.props.general.promotionList.items[i].terms || "";
            }
          }
          this.setState({
            ...this.state,
            index: i,
            details: this.props.general.promotionList.items[i],
            term: term,
            joined: false,
            openDialog: false,
            isTNCToggled: false,
          });
          break;
        }
      }
    }
  }

  handleBospIdChange = (bospId) => {
    this.setState({ ...this.state, selectedBospId: bospId });
  };
  ResetPopup = () => {
    this.setState({
      ...this.state,
      openJoin: false,
      selectedPromoSpecifications: [],
      selectedPromoTitle: "",
      selectedBospId: 0,
    });
    this.props.history.push("/" + i18n.language + "/promotion");
  };
  handleCloseDialog = () => {
    this.ResetPopup();
  };
  ViewAllClick = (activity_id) => {
    let list = this.state.list;
    var foundIndex = list.findIndex((x) => x.id === activity_id);
    list[foundIndex].checked = !list[foundIndex].checked;

    this.setState({ ...this.state, list: list });
  };
  contentClickHandler = (e) => {
    const targetLink = e.target.closest("a");
    if (!targetLink) return;
    e.preventDefault();
    if (targetLink.href.indexOf("/promotion/") >= 0) {
      this.props.history.push(
        "/" +
          i18n.language +
          "/promotion/" +
          targetLink.href.substring(
            targetLink.href.indexOf("/promotion/") + 11,
            targetLink.href.length
          )
      );
    }
  };

  performRedirect = (id, promotionType) => {
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
        pathname: "/" + i18n.language + "/account/deposit/" + id,
      });
    }
  };

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
          pathname: "/" + i18n.language + "/account/deposit/" + id,
        });
      }
    }
  };
  handleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
  };
  handleShowDialog = () => {
    this.setState({ ...this.state, openDialog: true });
  };

  handleToggleTnC = () => {
    this.setState({ ...this.state, isTNCToggled: !this.state.isTNCToggled });
  };

  goBack() {
    AppHistory.replace("/" + i18n.language + "/promotion");
  }

  navigatePromotion = (isLeft) => {
    var newPromotionId = "";
    var newIndex;
    if (isLeft) {
      newIndex =
        this.state.index - 1 < 0
          ? this.props.general.promotionList.items.length - 1
          : this.state.index - 1;
      newPromotionId = this.props.general.promotionList.items[newIndex].id;
    } else {
      newIndex =
        this.state.index + 1 >= this.props.general.promotionList.items.length
          ? 0
          : this.state.index + 1;
      newPromotionId = this.props.general.promotionList.items[newIndex].id;
    }
    if (newPromotionId !== "") {
      AppHistory.push("/" + i18n.language + "/promotion/" + newPromotionId);
    }
  };

  render() {
    if (this.state.details === null) return <></>;
    var isDummy = this.state.details.promotionType.toUpperCase() === "DUMMY";
    var checkIfLocalizationIsEmpty =
      JSON.stringify(this.state.details.localization) === "{}";
    return (
      <Container>
        <Title>{this.state.details.name}</Title>
        <BannerContainer
          img={(() => {
            if (this.state.details.localization !== null) {
              var checkLocale = this.state.details.localization[i18n.language];
              if (checkLocale) {
                return checkLocale.desktopBanner;
              } else {
                return this.state.details.desktopBanner;
              }
            } else {
              return this.state.details.desktopBanner;
            }
          })()}
        >
          {this.props.general.promotionList.items.length > 1 && (
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
        <SubTitle>{this.state.details.subSubject}</SubTitle>
        <PromotionContent>
          <EventTitle>{i18n.t("promotion.promoTarget")}：</EventTitle>
          <EventText>
            {this.state.details.vipLevels
              .sort((a, b) => {
                return a - b;
              })
              .map((a, index) => {
                return (
                  <span key={index}>
                    VIP{a}
                    {index < this.state.details.vipLevels.length - 1 && ", "}
                  </span>
                );
              })}
          </EventText>
          <EventTitle>{i18n.t("promotion.promoDate")}：</EventTitle>
          <EventText>
            {moment(this.state.details.from).format("YYYY/MM/DD HH:mm:ss")}
            {" - "}
            {moment(this.state.details.to).format("YYYY/MM/DD HH:mm:ss")} (GMT
            +8)
          </EventText>
          <EventText>
            <PromoDesc
              dangerouslySetInnerHTML={{
                __html:
                  "<div>" +
                  (() => {
                    if (
                      !checkIfLocalizationIsEmpty &&
                      (this.state.details.localization[i18n.language] !== "" ||
                        this.state.details.localization[i18n.language] !== null)
                    ) {
                      return (
                        (this.state.details.localization[i18n.language].content
                          ? this.state.details.localization[i18n.language]
                              .content
                          : this.state.details.content) ?? ""
                      );
                    } else {
                      return this.state.details.content ?? "";
                    }
                  })() +
                  "</div>",
              }}
            ></PromoDesc>
          </EventText>
        </PromotionContent>
        <BottomContainer>
          {this.state.term !== "" && (
            <React.Fragment>
              <TNCToggle
                onClick={this.handleToggleTnC}
                active={this.state.isTNCToggled}
              >
                {i18n.t("common.termsAndCondition")}
              </TNCToggle>
              {this.state.isTNCToggled && (
                <TNCContainer
                  dangerouslySetInnerHTML={{
                    __html: "<div >" + this.state.term + "</div>",
                  }}
                ></TNCContainer>
              )}
            </React.Fragment>
          )}
          {!isDummy && (
            <PromotionButton
              disabled={this.state.joined}
              onClick={() =>
                !this.state.joined &&
                this.handlejoinPromotionClick(
                  this.state.details.id,
                  this.state.details.promotionType
                )
              }
            >
              {i18n.t("promotion.joinPromo")}
            </PromotionButton>
          )}
        </BottomContainer>
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
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(PromotionDetails))
);
