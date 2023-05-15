import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes, withTheme } from "styled-components";

import config from "../../config/config";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { accountAction } from "../../api-services/actions/accountAction";
import { walletAction } from "../../api-services/actions/walletAction";
import { SHOWING_DIALOG } from "../../api-services/constant/actionType";
import { SHOW_LOGIN } from "../../api-services/constant/actionType";
import { GameTypeEnum } from "../../api-services/utils/Enum";

import BtnCSPNG from "../../assets/images/btn-cs.png";
import BtnCSPNG_PB from "../../assets/images/btn-cs-pb.png";

import BtnCSHoverPNG from "../../assets/images/btn-cs-hover.png";
import BtnCSHoverPNG_PB from "../../assets/images/btn-cs-hover-pb.png";

import { Link } from "react-router-dom";
import GuestContainer from "./GuestContainer";
import MemberContainer from "./MemberContainer";

import IconPhonePNG from "../../assets/images/icon-mobile.png";

import { withSnackbar } from "notistack";
import Common from "../../utils/Common";

import i18n from "../../utils/i18n";
import LanguageChanger from "../Share/language-changer";
import { uiAction } from "../../api-services/actions/uiAction";
import { generalAction } from "../../api-services/actions/generalAction";
import { GeneralService } from "../../api-services/services/GeneralService";
import ErrorSwitcher from "../../utils/ErrorSwitcher";
import { AppHistory } from "../../history/History";
import { SortedMenuList } from "../../utils/HeaderSorting";
import OnlineUserDisplayer from "../Share/online-user-displayer";
import { GameService } from "../../api-services/services/GameService";
import Marquee from "./Home/Marquee";
import GameLister from "./Home/game-lister";
const moment = require("moment");

const btnCSSwitcher = () => {
  switch (config.theme.toLowerCase()) {
    case "pb":
      return `${BtnCSPNG_PB}`;
    default:
      return `${BtnCSPNG}`;
  }
};

const btnCSHoverSwitcher = () => {
  switch (config.theme.toLowerCase()) {
    case "pb":
      return `${BtnCSHoverPNG_PB}`;
    default:
      return `${BtnCSHoverPNG}`;
  }
};

const InnerWrap = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;
  font-size: 14px;
  height: ${(props) => (props.displayGameListInHeader ? `384px` : `155px`)};
`;
const TopContainer = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.pcHeaderRightMenuHover};
`;
const TimerContainer = styled.div`
  font-family: arial;
  float: left;
  @media (max-width: 950px) {
    display: none;
  }
`;

const TimerSpan = styled.span`
  color: ${({ theme }) => theme.pcHeaderText};
  float: left;
  min-width: 100px;
`;
const PhoneNumberSpan = styled.span`
  color: ${({ theme }) => theme.pcHeaderText};
  float: left;
`;

const IconPhone = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  float: left;
  width: 20px;
  height: 20px;
`;
const LinkContainer = styled.div`
  color: ${({ theme }) => theme.pcHeaderText};
  float: left;
  padding: 0px 10px;
  @media (max-width: 950px) {
    display: none;
  }
`;
const CustomLink = styled(Link)`
  color: ${({ theme }) => theme.pcHeaderText};

  &:hover {
    color: ${({ theme }) => theme.pcHeaderTextHover};
    text-decoration: underline;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 230px auto auto;
  grid-gap: 5px;
  @media (max-width: 1279px) {
    grid-template-columns: auto;
  }
`;
const LogoContainer = styled.div`
  background-image: url("${(props) => props.img}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 90px;
  margin-top: 10px;
  float: left;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1279px) {
    display: none;
  }
`;

const RightMenuContainer = styled.div`
  float: right;
`;
const RightMenuUL = styled.ul`
  display: flex;
  align-items: stretch; /* Default */
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 110px;
`;

const RightMenuTextSpan = styled.span`
  font-size: ${(props) => (i18n.language === "vi-VN" ? "18px" : "20px")};
  margin: 0 auto;
  display: block;

  padding: 6px 0 15px 0;
  text-align: center;
  text-transform: uppercase;
  border-bottom: solid 3px transparent;
`;

const RightMenuLI = styled.li`
  display: inline-block;
  width: max-content;
  color: ${({ theme }) => theme.pcHeaderRightMenu};
  cursor: pointer;

  @media (max-width: 925px) {
    width: 100px;
  }
  @media (max-width: 770px) {
    width: 80px;
  }
  @media (max-width: 650px) {
    width: 100px;
  }
  padding: 45px 35px 0px 35px;

  ${(props) =>
    props.active
      ? `  
      ${RightMenuTextSpan} {
        border-bottom: solid 3px #cf2029;
      }
  `
      : ``}
`;

const StyledAppBar = withStyles((theme) => ({
  root: {
    "& .MuiToolbar-regular": {
      margin: "0 auto",
    },
  },
}))(AppBar);

const CustomAppBar = styled(StyledAppBar)`
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
  background: ${({ theme }) => theme.pcAppBar};
  box-shadow: none;
`;

const styles = {
  root: {
    flexGrow: 1,
  },
  show: {
    transform: "translateY(0)",
    transition: "transform .5s",
  },
  hide: {
    transform: "translateY(-110%)",
    transition: "transform .5s",
  },
  minIcon: {
    width: "25px",
    height: "25px",
    margin: "20px 0 0 15px",
    transition: "all .3s",
  },
  maxIcon: {
    width: "100%",
    height: "40px",
    margin: "30px 0 0 0",
    transition: "all .3s",
  },
  maxLabel: {
    transition: "all .3s",
  },
  minLabel: {
    transition: "all .3s",
    transform: "translate(18px, -30px)",
  },
  maxMenu: {
    height: "110px",
    transition: "height .3s",
  },
  minMenu: {
    height: "64px",
    transition: "height .3s",
  },
};

const LeftContent = styled.div`
  display: flex;
  align-items: center;
`;

const MarqueeContainer = styled.div`
  width: 1280px;
  background-color: #27273f;
  border-radius: 25px;
  margin: 15px auto;
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "/",
      hovermenu: "",
      shouldShow: null,
      isHoverMenu: false,
      isHoverSubMenuContainer: false,
      open: false,
      dialog: "",
      systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };
    this.lastScroll = null;

    this.handleScroll = this.handleScroll.bind(this);
  }

  updateInterval = null;
  tickCount = 0;

  changeLanguage = (language) => {
    this.props.getBanner();
    this.props.getMarquee(language);
    this.props.getAnnouncement(language);
    GeneralService.GetLocalization().then((response) => {
      if (response.IsSuccess) {
        ErrorSwitcher.setTranslation(response.data);
      }
    });
  };

  async componentDidMount() {
    this.setState({ selected: this.props.location.pathname });

    this.FireTimerToUpdateBalance();
  }

  FireTimerToUpdateBalance = () => {
    this.updateInterval = setInterval(() => {
      this.setState({
        ...this.state,
        systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      });
      const localStorageToken = localStorage.getItem("token0");
      if (
        this.props.account.token === localStorageToken &&
        localStorageToken !== null
      ) {
        this.tickCount++;
        if (this.tickCount >= 10) {
          this.tickCount = 0;
          if (!config.features.Register_CustomFlow_IDR)
            this.props.getBalanceList(false);
          else if (
            config.features.Register_CustomFlow_IDR &&
            this.props.wallet.bankCardList.length > 0
          )
            this.props.getBalanceList(false);
        }
      }
    }, 1000);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleDialogChange = (dialog) => {
    this.setState({ ...this.state, dialog: dialog });
  };
  handleScroll(evt) {
    const lastScroll = window.scrollY;
    if (lastScroll > 160) {
      this.setState({ ...this.state, shouldShow: false });
    } else {
      this.setState({ ...this.state, shouldShow: true });
    }
    return;
  }

  onhandleLogout = () => {
    this.props.logout(this.props.account.token);
    this.props.history.push("/");
  };
  onhandleLogoClick = () => {
    this.setState({ selected: "/" });
    this.props.history.push("/");
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  onhandleTransfer = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/transfer");
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  onhandleDeposit = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/deposit");
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  handleInboxClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/inbox");
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  handleProfileClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/profile");
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  handleWithdrawClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/withdrawal");
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  handleRefreshBalanceClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.tickCount = 0;
    this.props.updateBalanceList();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => this.props.getGameBalance(a.gpcode));
  };
  handleDownloadAppsClick = () => {
    this.setState({ selected: "/download" });
    this.props.history.push("/download");
    window.scrollTo({ top: 0, behavior: "auto" });
    //alert("敬请期待");
  };
  handleContactUsClick = () => {
    this.props.history.push("/aboutus/contactus");
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  HighlightLink = (link) => {};
  handleMenuMouseOver = (to) => {
    this.setState({ ...this.state, hovermenu: to, isHoverMenu: true });
  };
  handleMenuMouseLeave = () => {
    this.setState({ ...this.state, isHoverMenu: false });
  };
  handleClickMenu = (path) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.setState({ ...this.state, selected: path });
    this.props.history.push(`/${path}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  RightMenuItem = (to, label, active) => {
    const { classes } = this.props;

    return (
      <RightMenuLI active={active} onClick={() => this.handleClickMenu(to)}>
        <RightMenuTextSpan
          className={`${
            this.state.shouldShow === null
              ? classes.maxLabel
              : this.state.shouldShow
              ? classes.maxLabel
              : classes.minLabel
          }`}
        >
          {label}
        </RightMenuTextSpan>
      </RightMenuLI>
    );
  };
  MouseOverItem = (to, image) => {
    return (
      <CustomLink to={to} onClick={() => this.setState({ selected: to })}>
        <img src={image} alt=""></img>
      </CustomLink>
    );
  };

  handleJoinLotteryGame = (name) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    Common.closePreviousPopup();
    if (this.props.account.token != null) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0.0;
      if (this.props.history.location.pathname.indexOf("play") >= 0) {
        AppHistory.goBack();
      }
      var win = Common.PopupCenter("/joinlottery/" + name, name, 1280, 720);
      // var win = window.open(
      //   "/joinlottery/" + name,
      //   "_blank",
      //   "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
      // );
      var timer = setInterval(function () {
        if (win.closed) {
          clearInterval(timer);
          if (document.getElementById("audio") != null)
            document.getElementById("audio").volume = 1.0;
        }
      }, 1000);
    } else {
      this.props.showLogin(true);
    }
  };

  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    var slotPageGameType = [
      GameTypeEnum.SLOT,
      GameTypeEnum.TIGERSLOT,
      GameTypeEnum.SPORTS,
      GameTypeEnum.ESPORTS,
      GameTypeEnum.TABLEGAME,
      GameTypeEnum.FISH,
      GameTypeEnum.RNGSPORTS,
    ];
    Common.closePreviousPopup();
    if (slotPageGameType.indexOf(gameType) >= 0) {
      if (
        gameType === GameTypeEnum.SPORTS ||
        gameType === GameTypeEnum.ESPORTS ||
        gameType === GameTypeEnum.RNGSPORTS
      ) {
        if (!this.props.account.token) {
          this.props.showLogin(true);
        } else {
          if (gameType === GameTypeEnum.RNGSPORTS) {
            this.props.history.push("/sports/" + gameCode);
          } else if (gameCode === "WGFM" || gameCode === "WGVIA") {
            if (document.getElementById("audio") != null)
              document.getElementById("audio").volume = 0;
            if (this.props.history.location.pathname.indexOf("play") >= 0) {
              AppHistory.goBack();
            }
            // this.handleRefreshBalanceClick();
            var win = Common.PopupCenter(
              `/joinlobbygame/${gameType}/${gameCode}`,
              gameCode,
              1280,
              720
            );
            // var win = window.open(
            //   ,
            //   "_blank"
            // );
            var timer = setInterval(function () {
              if (win.closed) {
                clearInterval(timer);
                if (document.getElementById("audio") != null)
                  document.getElementById("audio").volume = 1.0;
              }
            }, 1000);
          } else {
            // this.handleRefreshBalanceClick();
            this.props.history.push(
              "/sports/play/" + gameCode + "/" + gameType
            );
          }
        }
      } else {
        this.props.history.push(`/${path}/${gameCode}`);
      }
    } else {
      if (!this.props.account.token) {
        this.props.showLogin(true);
        return;
      }
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0;
      if (this.props.history.location.pathname.indexOf("play") >= 0) {
        AppHistory.goBack();
      }
      // this.handleRefreshBalanceClick();
      var win = Common.PopupCenter(url, gameCode, 1280, 720);
      var timer = setInterval(function () {
        if (win.closed) {
          clearInterval(timer);
          if (document.getElementById("audio") != null)
            document.getElementById("audio").volume = 1.0;
        }
      }, 1000);
    }
  };
  handleBookmarkClick = () => {
    let pageTitle = document.title;
    let pageURL = document.location;
    try {
      // Internet Explorer solution
      eval(
        "window.external.AddFa-vorite(pageURL, pageTitle)".replace(/-/g, "")
      );
    } catch (e) {
      try {
        // Mozilla Firefox solution
        window.sidebar.addPanel(pageTitle, pageURL, "");
      } catch (e) {
        // Opera solution
        if (typeof window.opera == "object") {
          e.rel = "sidebar";
          e.title = pageTitle;
          e.url = pageURL;
          return true;
        } else {
          // The rest browsers (i.e Chrome, Safari)

          alert(
            i18n.t("web.header.plsClick") +
              (navigator.userAgent.toLowerCase().indexOf("mac") !== -1
                ? "Cmd"
                : "Ctrl") +
              "+D" +
              i18n.t("web.header.bookmark")
          );
        }
      }
    }
    return false;
  };

  handleCockfight = (item) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      if (item.include.indexOf("SM01") >= 0) {
        this.popup = window.open("", "Cockfight");
        GameService.GetCockfight()
          .then((e) => {
            this.popup.document.write(e.data);
            this.popup.document.close();
            this.popup.focus();
          })
          .catch((e) => {
            this.popup.close();
          });
      }
    }
  };

  consolidateJoinGame = (game, item) => {
    if (game.type === GameTypeEnum.COCKFIGHT && game.name === "SM01") {
      this.handleCockfight(item);
    } else if (
      game.type === GameTypeEnum.LOTTERYLOBBY ||
      game.type === GameTypeEnum.LOBBY
    ) {
      this.handleJoinLotteryGame(game.gpcode);
    } else {
      this.handleJoinGameClick(
        game.type,
        item.path,
        game.gpcode,
        "/joingame/" + game.type + "/" + game.gpcode
      );
    }
  };

  displayGameListInHeader = () => {
    const path = this.props.location.pathname;
    const pathArray = path.split("/");
    if (
      pathArray[1] === undefined ||
      pathArray[1] === null ||
      pathArray[1] === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { classes } = this.props;

    const settings = {
      className: "headerSubmenu",
      slidesToShow: 4,
      slidesToScroll: 4,
    };

    var currentPage = window.location.pathname.split("/").pop();

    return (
      <CustomAppBar hide={this.props.hide}>
        <InnerWrap displayGameListInHeader={this.displayGameListInHeader()}>
          <TopContainer>
            <LeftContent></LeftContent>
            <RightContainer>
              <LinkContainer>
                <LanguageChanger
                  useAcronym={true}
                  language={this.props.general.brandLanguage}
                  changeLanguage={this.changeLanguage}
                />
              </LinkContainer>
              {config.features.OnlineUser && (
                <OnlineUserDisplayer color="#fff" size="14px" iconOnly={true} />
              )}
              <TimerContainer>
                <TimerSpan>GMT+8 {this.state.systemDateTime}</TimerSpan>
              </TimerContainer>
              {config.features.DisplayPhone && (
                <TimerContainer style={{ marginLeft: "10px" }}>
                  <IconPhone img={IconPhonePNG}></IconPhone>
                  <PhoneNumberSpan>
                    {this.props.general.brandsSupport &&
                      this.props.general.brandsSupport.length >= 1 &&
                      this.props.general.brandsSupport[0].phone}
                  </PhoneNumberSpan>
                </TimerContainer>
              )}
              {/* {(() => {
                if (!this.props.general.isMaintenance) {
                  if (
                    this.props.account.token !== this.props.account.info.token
                  ) {
                    return (
                      <GuestContainer
                        onhandleShowCSClick={this.props.onhandleShowCSClick}
                        onhandleContactUsClick={this.handleContactUsClick}
                        onDialogChange={this.handleDialogChange}
                      ></GuestContainer>
                    );
                  } else {
                    return (
                      <MemberContainer
                        onhandleLogout={this.onhandleLogout}
                        onhandleTransfer={this.onhandleTransfer}
                        onhandleDeposit={this.onhandleDeposit}
                        onhandleInboxClick={this.handleInboxClick}
                        onhandleRefreshBalanceClick={
                          this.handleRefreshBalanceClick
                        }
                        wallet={this.props.wallet}
                        game={this.props.game}
                        account={this.props.account}
                      ></MemberContainer>
                    );
                  }
                }
              })()} */}
              {/* <NewButtonCs onClick={this.props.onhandleShowCSClick}>
                <CSIcon /> {i18n.t("common.cs")}
              </NewButtonCs> */}
            </RightContainer>
          </TopContainer>
          <BottomContainer>
            <LogoContainer
              img={
                this.props.general.brand &&
                this.props.general.brand.desktopLogoUrl
              }
              onClick={this.onhandleLogoClick}
              className={`${
                this.state.shouldShow === null
                  ? classes.maxMenu
                  : this.state.shouldShow
                  ? classes.maxMenu
                  : classes.minMenu
              }`}
            ></LogoContainer>
            <RightMenuContainer>
              <RightMenuUL
                className={`${
                  this.state.shouldShow === null
                    ? classes.maxMenu
                    : this.state.shouldShow
                    ? classes.maxMenu
                    : classes.minMenu
                }`}
              >
                {this.RightMenuItem(
                  "promotion",
                  i18n.t("common.promotion"),
                  currentPage === "promotion"
                )}

                {this.RightMenuItem("vip", "VIP", currentPage === "vip")}
                {config.features.HaveDownloadFeature &&
                  this.RightMenuItem(
                    "download",
                    "APP",
                    currentPage === "download"
                  )}
                {this.RightMenuItem(
                  "news",
                  i18n.t("T13.header.news"),
                  currentPage === "news"
                )}
              </RightMenuUL>
            </RightMenuContainer>
            {(() => {
              if (!this.props.general.isMaintenance) {
                if (
                  this.props.account.token !== this.props.account.info.token
                ) {
                  return (
                    <GuestContainer
                      onhandleShowCSClick={this.props.onhandleShowCSClick}
                      onhandleContactUsClick={this.handleContactUsClick}
                      onDialogChange={this.handleDialogChange}
                    ></GuestContainer>
                  );
                } else {
                  return (
                    <MemberContainer
                      onhandleLogout={this.onhandleLogout}
                      onhandleTransfer={this.onhandleTransfer}
                      onhandleDeposit={this.onhandleDeposit}
                      onhandleInboxClick={this.handleInboxClick}
                      onhandleRefreshBalanceClick={
                        this.handleRefreshBalanceClick
                      }
                      onhandleWithdraw={this.handleWithdrawClick}
                      onhandleProfile={this.handleProfileClick}
                      wallet={this.props.wallet}
                      game={this.props.game}
                      account={this.props.account}
                    ></MemberContainer>
                  );
                }
              }
            })()}
          </BottomContainer>
          {this.displayGameListInHeader() && (
            <>
              {!config.features.HideMarquee && (
                <MarqueeContainer>
                  <Marquee text={this.props.ui.marqueeText}></Marquee>
                </MarqueeContainer>
              )}
              <GameLister game={this.props.game}></GameLister>
            </>
          )}
        </InnerWrap>
      </CustomAppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // screenWidth: state.ui.screenWidth,
    // screenHeight: state.ui.screenHeight,
    ui: state.ui,
    account: state.account,
    game: state.game,
    wallet: state.wallet,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBanner: () => dispatch(generalAction.getBanner()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getAnnouncement: (language) => dispatch(uiAction.getAnnouncement(language)),
    // updateScreenSize: (width, height) => {
    //   dispatch({ type: UPDATING_SCREEN_SIZE, width, height });
    // },
    // checkTokenIsValid: token =>
    //   dispatch(accountAction.checkTokenIsValid(token)),
    logout: (token) => dispatch(accountAction.accountLogout(token)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getBalanceList: (loading) => dispatch(walletAction.getBalanceList(loading)),
    updateBalanceList: (loading) => dispatch(walletAction.updateBalanceList()),
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withSnackbar(withStyles(styles)(withTheme(Header))))
);
