import React from "react";
import styled, { keyframes, withTheme } from "styled-components";
import InboxIconPNG from "../../assets/images/inbox-icon.png";
import InboxIconPNG_PB from "../../assets/images/inbox-icon-pb.png";
import IconRefreshBalancePNG_PB from "../../assets/images/icon-refresh-balance-pb.png";
import IconRefreshBalancePNG from "../../assets/images/icon-refresh-balance.png";
import IconRefreshBalanceHoverPNG from "../../assets/images/icon-refresh-balance-hover.png";
import { Link } from "react-router-dom";
import i18n from "../../utils/i18n";
import Common from "../../utils/Common";
import config from "../../config/config";
import { SortedMenuList } from "../../utils/HeaderSorting";
import CustomPopover from "../Share/custompopover";
import { Textfit } from "react-textfit";

const balanceIconSwitcher = () => {
  switch (config.theme.toLowerCase()) {
    case "pb":
      return `${IconRefreshBalancePNG_PB}`;
    default:
      return `${IconRefreshBalancePNG}`;
  }
};
const balanceHoverIconSwitcher = () => {
  switch (config.theme.toLowerCase()) {
    case "pb":
      return `${IconRefreshBalancePNG_PB}`;
    default:
      return `${IconRefreshBalanceHoverPNG}`;
  }
};

export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-right: 5px;
`;
const BtnStyle1 = styled.div`
  border-radius: 4px;

  font-size: 15px;
  padding: 4.5px 10px;
  text-align: center;
  color: ${({ theme }) => theme.pcHeaderText};
  cursor: pointer;
  border-radius: 4px;

  text-align: center;

  color: #fff;
  background: ${({ theme }) => theme.accent};
`;
const BtnLogout = styled.div`
  color: ${({ theme }) => theme.pcHeaderText};
  text-align: right;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.accent};
  }
`;

const BtnTransfer = styled(BtnStyle1)``;
const BtnDeposit = styled(BtnStyle1)``;

const BalanceContainer = styled.div`
  color: ${({ theme }) => theme.pcHeaderText};
  text-align: right;

  &:hover {
    cursor: pointer;
  }
`;

const RefreshBalance = styled.div`
  margin: 2px 0 0 0;

  width: 16px;
  height: 16px;

  &:hover {
    cursor: pointer;
  }
`;
const RefreshBalanceIcon = styled.div`
  background-image: url(${({ theme }) => balanceIconSwitcher()});
  background-repeat: no-repeat;
  background-position: center;
  width: 16px;
  height: 16px;

  &:hover {
    background-image: url(${({ theme }) => balanceHoverIconSwitcher()});
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const BalanceAmountLabel = styled.span`
  color: ${({ theme }) => theme.accent};
`;
const MemberUserName = styled.span`
  color: ${({ theme }) => theme.accent};
`;
const Spliter = styled.div`
  width: 2px;
  height: 16px;
  margin: 0 5px;
  background-color: rgba(255, 255, 255, 0.2);
`;
const InboxContainer = styled(BalanceContainer)`
  color: ${({ theme }) => theme.accent};
  text-align: right;
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 5px;
`;
const InboxIconImg = styled.img`
  display: inline-block;

  margin-top: 2px;
`;
const InboxCountLabel = styled.span`
  color: ${({ theme }) => theme.accent};
  display: inline-block;
`;
const WelcomeContainer = styled(BalanceContainer)`
  color: ${({ theme }) => theme.pcHeaderText};

  margin-right: 0px;

  max-width: 300px;
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`;

const GameType = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const GameTypeName = styled.div`
  padding-bottom: 10px;
  color: ${({ theme }) => theme.popoverGameTypeText};
  opacity: 0.65;
`;

const BrandAndBalance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5px 0;
  color: ${({ theme }) => theme.popoverText};
`;

const Brand = styled.div`
  padding-left: 5px;
  font-size: 12px;
`;

const Balance = styled.div`
  text-align: right;
  opacity: 0.75;
`;

const BrandAndBalanceButBigger = styled(BrandAndBalance)`
  border-bottom: solid 1px #000;
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
`;

const MemberContainer = (props) => {
  const vipSwitcher = (rank) => {
    switch (rank) {
      case 1:
        return "VIP 1";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        return;
    }
  };

  const inboxIconSwitcher = () => {
    switch (config.theme.toLowerCase()) {
      case "pb":
        return InboxIconPNG_PB;
      default:
        return InboxIconPNG;
    }
  };

  const handleTransfer = (e) => {
    if (config.features.NewTransferUI) {
      handleClick(e);
    } else {
      props.onhandleTransfer();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const totalBalance =
    props.wallet.mainBalance +
    props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .reduce((a, v) => (a = a + v.balance), 0);

  return (
    <Container>
      <WelcomeContainer>
        <CustomLink to={"/" + i18n.language + "/account/profile"}>
          {i18n.t("web.header.welcomBack")}{" "}
          <MemberUserName>
            {props.account.info.member_username}(
            {config.features.CustomVIP
              ? vipSwitcher(props.account.info.member_level_id)
              : "VIP" + props.account.info.member_level_id}
            )
          </MemberUserName>
        </CustomLink>
      </WelcomeContainer>
      <Spliter></Spliter>
      <BtnLogout onClick={props.onhandleLogout}>
        {i18n.t("web.header.logout")}
      </BtnLogout>
      <Spliter></Spliter>
      <InboxContainer onClick={props.onhandleInboxClick}>
        <InboxCountLabel>{props.account.info.message_num}</InboxCountLabel>
        <InboxIconImg src={inboxIconSwitcher()}></InboxIconImg>
      </InboxContainer>
      <Spliter></Spliter>
      <BalanceContainer style={{ display: "flex" }}>
        <span>{i18n.t("web.header.mainAccount")}:</span>
        <BalanceAmountLabel
          onClick={(e) => {
            handleTransfer(e);
          }}
        >
          {Common.formatNumberWithThousand(totalBalance)}
        </BalanceAmountLabel>
        <CustomPopover
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
        >
          <div>
            <BrandAndBalanceButBigger>
              <div style={{ paddingRight: 30 }}>
                {i18n.t("web.header.mainAccount")}
              </div>
              <div
                style={{
                  width: 150,
                  display: "flex",
                  alignSelf: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Textfit mode="single">
                  {Common.formatNumberWithThousand(totalBalance)}
                </Textfit>
              </div>
            </BrandAndBalanceButBigger>
          </div>
          {SortedMenuList.map((item, key) => {
            return (
              <GameType>
                <GameTypeName>{i18n.t(item.title)}</GameTypeName>
                {props.game.homePageGameList
                  .filter((game) => {
                    return item.gameType.indexOf(game.type) >= 0;
                  })
                  .map((brand, index) => {
                    return props.game.providerList
                      .filter((item) => {
                        return (
                          item.abbreviation === brand.abbreviation &&
                          item.transferwallet === true
                        );
                      })
                      .map((data, index) => {
                        return (
                          <BrandAndBalance>
                            <Brand>
                              {i18n.t(`${data.abbreviation}.${item.path}`)}
                            </Brand>
                            <Balance>
                              {data.maintenance === 1
                                ? i18n.t("transfer.maintenance")
                                : Common.formatNumberWithCommas(data.balance)}
                            </Balance>
                          </BrandAndBalance>
                        );
                      });
                  })}
              </GameType>
            );
          })}
        </CustomPopover>

        <RefreshBalance onClick={props.onhandleRefreshBalanceClick}>
          <RefreshBalanceIcon
            icon={balanceIconSwitcher()}
            hoverIcon={balanceHoverIconSwitcher()}
          ></RefreshBalanceIcon>
        </RefreshBalance>
      </BalanceContainer>
      <Spliter></Spliter>
      {props.game.containTransferWallet && !config.features.NewTransferUI && (
        <BtnTransfer onClick={props.onhandleTransfer}>
          {i18n.t("web.header.transfer")}
        </BtnTransfer>
      )}
      <BtnDeposit onClick={props.onhandleDeposit}>
        {i18n.t("web.header.deposit")}
      </BtnDeposit>
    </Container>
  );
};

export default withTheme(MemberContainer);
