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
  justify-content: flex-end;
`;

const RefreshBalance = styled.div`
  margin: 1px 1px 0 1px;

  width: 18px;
  height: 18px;

  &:hover {
    cursor: pointer;
  }
`;
const RefreshBalanceIcon = styled.div`
  background-image: url(${({ theme }) => balanceIconSwitcher()});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 13px;
  width: 18px;
  height: 18px;

  &:hover {
    background-image: url(${({ theme }) => balanceHoverIconSwitcher()});
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const BalanceAmountLabel = styled.span`
  color: ${({ theme }) => theme.pcHeaderText};
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;
const MemberUserName = styled.span`
  color: ${({ theme }) => theme.pcHeaderText};
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

const ActionButton = styled.div`
  background: ${({ theme }) => theme.primary};
  width: 35px;
  height: 35px;
  font-size: 35px;
  line-height: 35px;
  padding-left: 7px;
  border-radius: 25px;
  cursor: pointer;
`;

const AccountDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  font-size: 16px;
`;

const PopoverButton = styled.div`
  width: 100%;
  height: 30px;
  color: #b7b7b7;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const HeaderButton = styled.div`
  width: 141px;
  height: 54px;
  font-size: 20px;
  padding: 12.5px 0px;
  text-align: center;
  color: ${({ theme }) => theme.pcHeaderText};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.pcHeaderText};
  border-radius: 30px;
  text-transform: uppercase;
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

  const handleTransfer = (e) => {
    if (config.features.NewTransferUI) {
      handleClick(e);
    } else {
      props.onhandleTransfer();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorAction, setAnchorAction] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleActionClick = (e) => {
    setAnchorAction(e.currentTarget);
  };

  const handleActionClose = (e) => {
    setAnchorAction(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const openAction = Boolean(anchorAction);
  const totalBalance =
    props.wallet.mainBalance +
    props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .reduce((a, v) => (a = a + v.balance), 0);

  return (
    <Container>
      <ActionButton
        onClick={(e) => {
          handleActionClick(e);
        }}
      >
        +
      </ActionButton>
      <AccountDetail>
        <MemberUserName>
          {props.account.info.member_username}(
          {config.features.CustomVIP
            ? vipSwitcher(props.account.info.member_level_id)
            : "VIP" + props.account.info.member_level_id}
          )
        </MemberUserName>
        <BalanceAmountLabel
          onClick={(e) => {
            handleTransfer(e);
          }}
        >
          {config.currency} {Common.formatNumberWithThousand(totalBalance)}
          <RefreshBalance onClick={props.onhandleRefreshBalanceClick}>
            <RefreshBalanceIcon
              icon={balanceIconSwitcher()}
              hoverIcon={balanceHoverIconSwitcher()}
            ></RefreshBalanceIcon>
          </RefreshBalance>
        </BalanceAmountLabel>
      </AccountDetail>
      <HeaderButton onClick={props.onhandleProfile}>
        {i18n.t("web.account.profile")}
      </HeaderButton>
      <HeaderButton onClick={props.onhandleLogout}>
        {i18n.t("web.header.logout")}
      </HeaderButton>
      <CustomPopover
        open={openAction}
        anchorEl={anchorAction}
        handleClose={handleActionClose}
      >
        <PopoverButton onClick={props.onhandleDeposit}>
          {i18n.t("web.header.deposit")}
        </PopoverButton>
        <PopoverButton onClick={props.onhandleWithdraw}>
          {i18n.t("common.withdrawal")}
        </PopoverButton>
        {props.game.containTransferWallet && !config.features.NewTransferUI && (
          <PopoverButton onClick={props.onhandleTransfer}>
            {i18n.t("web.header.transfer")}
          </PopoverButton>
        )}
      </CustomPopover>
      <CustomPopover open={open} anchorEl={anchorEl} handleClose={handleClose}>
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
    </Container>
  );
};

export default withTheme(MemberContainer);
