import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import IconLoginClosePNG from "../../../assets/images/icon-login-close.png";
import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n";
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);
const CustomStyledPromoDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "& .MuiPaper-root": {
      backgroundColor: "#27273F",
      borderRadius: "35px",
      maxWidth: "1160px",
    },
  },
})(Dialog);
const CustomStyledDialog = withStyles({
  root: {
    boxShadow: "none",
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
      maxWidth: "700px",
      paddingTop: "85px",
      paddingRight: "50px",
      boxShadow: "none",
    },
  },
})(Dialog);
const Container = styled.div`
  width: ${(props) => (props.isPromo ? `1160px` : `506px`)};
  background: #27273f;
  background-attachment: fixed;
  background-position: center;
  color: #fff;
  display: flex;
  padding: 50px;

  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 50px;
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
const CloseButton = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 20px 30px;
  margin-bottom: 10px;
  width: 100%;
  text-align: center;
  letter-spacing: 3px;
  font-size: 30px;
  border-radius: 50px;
  filter: drop-shadow(1px 1px 8px ${({ theme }) => theme.primary}ba);
  cursor: pointer;
`;
const TitleContainer = styled.div`
  text-align: center;
  font-size: 40px;
`;
const FormContainer = styled.div`
  margin: 30px 30px 40px 30px;
  text-align: justify;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  margin: 20px 20px 10px 20px;
  padding: 0 3px;
  overflow: auto;
`;

const CustomPromoContentContainer = styled(ContentContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px 25px;
  height: 705px;
  padding: 0 55px;
  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #1b1d30;
    border-radius: 14px;
  }
`;

const ImageBanner = styled.div`
  background: url(${({ img }) => img}) no-repeat center;
  height: 175px;
  border-radius: 5px;
  background-size: 100%;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1);
`;

const CustomPromoImageBanner = styled(ImageBanner)`
  border-radius: 15px;
`;

const TheButton = styled.div`
  padding: 5px 20px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primaryText};
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1);
`;

const CustomContainer = styled.div`
  width: 680px;
  background: transparent;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const CustomPromoContainer = styled(CustomContainer)`
  width: 1160px;
  background: #27273f;
`;
const CustomCloseButton = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/pcHomePage/close-button.png`})
    no-repeat;
  width: 35px;
  height: 35px;
  float: right;
  &:hover {
    cursor: pointer;
  }
  position: absolute;
  top: 0;
  right: 10px;
`;
const CustomEmptyHeader = styled.div`
  width: 680px;
  height: 187px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/pcHomePage/dialog-header.png`})
    no-repeat;
  background-size: 680px 187px;
  padding: 60px 30px;
  font-size: 3em;
  font-weight: bold;
  font-style: italic;
  color: #fff;
  text-shadow: 0 0 10px #222;
`;
const CustomHeaderImage = styled.div`
  width: 310px;
  height: 253px;
  position: absolute;
  top: 20px;
  right: -12px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/pcHomePage/dialog-header-image.png`})
    no-repeat;
  background-size: contain;
  background-position: right;
  filter: drop-shadow(-1px -5px 5px #222);
`;
const CustomTitleContainer = styled(TitleContainer)`
  color: #fff;
  font-style: italic;
  font-size: 30px;
  margin: 45px auto 12px;
`;
const CustomPromoTitleContainer = styled(CustomTitleContainer)`
  color: #fff;
  font-style: italic;
  font-size: 40px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 45px auto 12px;
`;
const CustomBodyContainer = styled.div`
  width: 680px;
  height: 391px;
  text-align: center;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/pcHomePage/dialog-body.png`})
    no-repeat;
  background-size: 680px 391px;
  margin-top: -10px;
`;
const CustomPromoBodyContainer = styled.div`
  width: 1160px;
  height: 850px;
  text-align: center;
  margin-top: -10px;
`;
const CustomFormContainer = styled.div`
  margin: 0 auto;
  padding: 25px;
  width: 600px;
  font-size: 22px;
  text-align: justify;
  overflow: auto;
  height: 253px;
  color: #fff;
`;

const DetailButton = styled.div`
  width: 100px;
  height: 34px;
  border-radius: 25px;
  margin: 0 10px;
  padding-top: 7px;
  text-align: center;
  background: #cf2029;
  color: #fff;
  cursor: pointer;
`;

const DialogSwitcher = (props) => {
  if (props.isCustom && props.isPromo)
    return (
      <CustomStyledPromoDialog open={props.open} onClose={props.onClose}>
        {props.children}
      </CustomStyledPromoDialog>
    );
  else if (props.isCustom)
    return (
      <CustomStyledDialog open={props.open} onClose={props.onClose}>
        {props.children}
      </CustomStyledDialog>
    );
  else
    return (
      <StyledDialog open={props.open} onClose={props.onClose}>
        {props.children}
      </StyledDialog>
    );
};
const ContainerSwitcher = (props) => {
  if (props.isCustom && props.isPromo)
    return (
      <CustomPromoContainer>
        <CustomPromoBodyContainer>{props.children}</CustomPromoBodyContainer>
      </CustomPromoContainer>
    );
  if (props.isCustom)
    return (
      <CustomContainer>
        <CustomEmptyHeader>WELCOME</CustomEmptyHeader>
        <CustomHeaderImage></CustomHeaderImage>
        <CustomCloseButton onClick={props.onClose}></CustomCloseButton>
        <CustomBodyContainer>{props.children}</CustomBodyContainer>
      </CustomContainer>
    );
  else
    return (
      <Container>
        {props.children}{" "}
        <CloseButton onClick={props.onClose}>
          {i18n.t("T13.dialog.confirm")}
        </CloseButton>
      </Container>
    );
};

const TitleSwitcher = (props) => {
  if (props.isCustom && props.isPromo)
    return (
      <CustomPromoTitleContainer>{props.children}</CustomPromoTitleContainer>
    );
  if (props.isCustom)
    return <CustomTitleContainer>{props.children}</CustomTitleContainer>;
  else return <TitleContainer>{props.children}</TitleContainer>;
};

const FormContainerSwitcher = (props) => {
  if (props.isCustom)
    return (
      <CustomFormContainer
        dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
      ></CustomFormContainer>
    );
  else
    return (
      <FormContainer
        dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
      ></FormContainer>
    );
};

class PopupAnnouncement extends Component {
  handlePromotionClick = (id) => {
    AppHistory.push({
      pathname: "/promotion/" + id,
    });
    this.props.onClose();
  };

  render() {
    return (
      <DialogSwitcher
        isCustom={this.props.isCustom}
        isPromo={this.props.type === "promo"}
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <ContainerSwitcher
          isCustom={this.props.isCustom}
          onClose={this.props.onClose}
          isPromo={this.props.type === "promo"}
        >
          <div className="clear"></div>
          <TitleSwitcher
            isCustom={this.props.isCustom}
            isPromo={this.props.type === "promo"}
          >
            {this.props.header}
          </TitleSwitcher>
          {this.props.isCustom && this.props.type === "promo" ? (
            <CustomPromoContentContainer>
              {this.props.content
                .sort((a, b) => {
                  return a.order - b.order;
                })
                .map((data, index) => {
                  var checkLocale = data.localization[i18n.language];
                  return (
                    <CustomPromoImageBanner
                      key={index}
                      order={data.order}
                      img={
                        checkLocale
                          ? checkLocale.desktopBanner
                          : data.desktopBanner
                      }
                    >
                      <DetailButton
                        onClick={() => {
                          this.handlePromotionClick(data.id);
                        }}
                      >
                        {i18n.t("promotion.details")}
                      </DetailButton>
                    </CustomPromoImageBanner>
                  );
                })}
            </CustomPromoContentContainer>
          ) : this.props.type === "promo" ? (
            <ContentContainer>
              {this.props.content
                .sort((a, b) => {
                  return a.order - b.order;
                })
                .map((data, index) => {
                  var checkLocale = data.localization[i18n.language];
                  return (
                    <ImageBanner
                      key={index}
                      order={data.order}
                      img={
                        checkLocale
                          ? checkLocale.desktopBanner
                          : data.desktopBanner
                      }
                      onClick={() => {
                        this.handlePromotionClick(data.id);
                      }}
                    ></ImageBanner>
                  );
                })}
            </ContentContainer>
          ) : (
            <FormContainerSwitcher
              isCustom={this.props.isCustom}
              dangerouslySetInnerHTML={{
                __html: this.props.text.replace(/\n/g, "<br />"),
              }}
            ></FormContainerSwitcher>
          )}
        </ContainerSwitcher>
      </DialogSwitcher>
    );
  }
}

export default PopupAnnouncement;
