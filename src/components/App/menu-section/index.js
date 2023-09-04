import styled from "styled-components";
import { AppHistory } from "../../../../history/History";

const Container = styled.div`
  min-height: 830px;
  padding: 30px;
  background: ${({ theme }) => theme.pcMenuPrimary};
`;

const MenuItemIcon = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/pcHomePage/${icon}.png`
    }) no-repeat center /
    contain;`;
  }};
`;

const MenuItemName = styled.p`
  padding: 5px 10px 5px 20px;
  height: 50px;
  line-height: 50px;
  margin: 0;
  border-radius: 8px;
  text-transform: Capitalize;
  flex: 1;
`;

const Arrow = styled.div`
  width: 15px;
  height: 15px;
  mask: url(${process.env.PUBLIC_URL +
    "/assets/images/gameLister/btn-back.png"})
    no-repeat center center;
  mask-size: contain;
  background: ${({ theme }) => theme.pcMenuPrimary};
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: flex-between;
  align-items: center;
  padding: 0 10px 0 15px;
  border-radius: 10px;
  background: ${({ theme }) => theme.pcMenuPrimary};
  max-width: 300px;
  margin: 10px;
  color: ${({ theme }) => theme.primaryText};

  &:hover {
    background: ${({ theme }) => theme.pcMenuSecondary};

    ${Arrow} {
      background: ${({ theme }) => theme.primaryText};
    }
  }
`;

const menuList = [
  {
    path: "/live",
    label: "casino",
    icon: "star",
    needLogin: false,
  },
  {
    path: "/account/profile",
    label: "account",
    icon: "star",
    needLogin: true,
  },
  {
    path: "/account/deposit",
    label: "deposit",
    icon: "star",
    needLogin: true,
  },
];

const Menu = ({ token, showLogin }) => {
  const navigateTo = (path, needLogin) => {
    if (needLogin) {
      if (token) {
        AppHistory.push(`${path}`);
        window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        showLogin(true);
      }
    } else {
      AppHistory.push(`${path}`);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const ItemContainer = ({ path, label, icon, needLogin }) => {
    return (
      <MenuItem
        onClick={() => {
          navigateTo(path, needLogin);
        }}
      >
        <MenuItemIcon icon={icon}></MenuItemIcon>
        <MenuItemName>{label}</MenuItemName>
        <Arrow></Arrow>
      </MenuItem>
    );
  };

  return (
    <Container>
      {menuList &&
        menuList.map((item, index) => {
          // return ItemContainer( // index, // item.path, // item.label, //
          // item.icon, // item.needLogin // ); // })}
          return (
            <ItemContainer
              key={index}
              path={item.path}
              label={item.label}
              icon={item.icon}
              needLogin={item.needLogin}
            ></ItemContainer>
          );
        })}
    </Container>
  );
};

export default Menu;
