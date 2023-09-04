import React, { Component } from "react";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import UserIconPNG from "../../assets/images/user-icon.png";
import Password1IconPNG from "../../assets/images/password1-icon.png";
import IconLoginClosePNG from "../../assets/images/icon-login-close.png";
import IconUncheckedPNG from "../../assets/images/icon-unchecked.png";
import IconCheckedPNG from "../../assets/images/icon-checked.png";
import i18n from "../../utils/i18n";

const Container = styled.div`
  width: 506px;
  background: ${({ theme }) => theme.pcLoginBody};
  background-attachment: fixed;
  background-position: center;
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat;
  width: 28px;
  height: 28px;
  float: right;
  margin: 30px 30px 0 0;
  &:hover {
    cursor: pointer;
  }
`;

const LogoContainer = styled.div`
  background-image: url("${({ img }) => img}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 200px;
  height: 90px;
  margin: 0 auto;
`;
const TitleContainer = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 53px;
  font-style: italic;
  font-weight: 600;
  color: #fff;
  margin: 30px 0 35px 0;
`;
const SubTitleContainer = styled.div`
  text-align: center;

  font-size: 18px;

  color: ${({ theme }) => theme.secondary};
`;
const FormContainer = styled.div`
  margin: 10px 78px 0 78px;
  padding: 0 3px;
`;

const FormInputWrap = styled.div`
  width: 350px;
  height: 55px;
  border: none;
  box-shadow: 0px 3px 8px -2px rgba(0, 0, 0, 0.75);
  margin: 0;
  margin-top: 13px;
  -webkit-text-fill-color: #b6b6b6;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.pcLoginInputBackground};
  overflow: hidden;
  box-sizing: content-box;
`;
const FormInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.pcLoginInputBackground} !important;
  padding: 0 15px;
  border: 1px solid transparent;
`;

const ButtonLogin = styled.div`
  margin: 0 auto 0 auto;
  width: 350px;
  height: 55px;
  color: #fff;
  font-size: 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.pcLoginButtonColor};
  filter: drop-shadow(1px 1px 8px #cf2029ba);
  &:hover {
    cursor: pointer;
  }
`;
const ButtonLoginLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: 17px;
  text-transform: uppercase;
`;
const LinkStyle = styled.a`
  font-size: 15px;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;
const LinkRegister = styled(LinkStyle)`
  color: ${({ theme }) => theme.pcLoginLinkColor};
`;
const LinkForgotPassword = styled(LinkStyle)`
  display: block;
  padding: 15px 0;
  color: ${({ theme }) => theme.pcLoginLinkColor};
`;
const EmptyBlock = styled.div`
  clear: both;
  height: 30px;
`;
const Description = styled.p`
  font-size: 14px;
  color: #fff;
  margin: 0;
`;
const OnlineSupportLink = styled(LinkStyle)`
  font-size: 13px;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BottomContainer = styled.div`
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  gap: 20px;
`;

const RememberMe = styled.div`
  padding: 20px 0;
`;

const ProcessRegisterContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CheckBoxLabel = styled.label`
  font-size: 14px;
  padding: 5px;
  color: ${({ theme }) => theme.pcLoginCheckBoxLabelColor};
`;

const CheckBoxInput = styled.input`
  &:checked {
    background: ${({ theme }) => theme.pcLoginCheckBoxCheckedBackground};
  }
`;

class Login extends Component {
  state = {
    rememberMe: false,
    username: "",
    password: "",
  };

  componentDidMount = () => {
    const username = localStorage.getItem("username");
    const remember = localStorage.getItem("remember");
    if (remember) {
      this.setState({
        ...this.state,
        username: username,
        rememberMe: remember,
      });
    }
  };

  handleTextFieldChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };

  handleRememberMeChange = (e) => {
    this.setState({ ...this.state, rememberMe: e.target.checked });
  };

  render() {
    return (
      <Container>
        <CloseIconContainer
          viewBox="4 4 16 16"
          onClick={this.props.onhandleClose}
        ></CloseIconContainer>
        <div className="clear"></div>
        <LogoContainer
          img={this.props.brand && this.props.brand.desktopLogoUrl}
        ></LogoContainer>
        {/* <TitleContainer>{i18n.t("web.login.login")}</TitleContainer> */}
        <FormContainer>
          <FormInputWrap>
            <FormInput
              type="text"
              value={this.state.username}
              onChange={(e) => {
                this.handleTextFieldChange(e);
              }}
              id="username"
              placeholder={i18n.t("common.username")}
              maxLength="16"
            ></FormInput>
          </FormInputWrap>
          <FormInputWrap>
            <FormInput
              type="password"
              value={this.state.password}
              onChange={(e) => this.handleTextFieldChange(e)}
              id="password"
              placeholder={i18n.t("common.password")}
              maxLength="20"
            ></FormInput>
          </FormInputWrap>
          <MiddleContainer>
            <RememberMe>
              <CheckBoxInput
                id="rememberMe"
                type="checkbox"
                checked={this.state.rememberMe}
                onChange={(e) => this.handleRememberMeChange(e)}
              ></CheckBoxInput>
              <CheckBoxLabel htmlFor="rememberMe">
                {i18n.t("web.login.rememberMe")}
              </CheckBoxLabel>
            </RememberMe>
          </MiddleContainer>
          <ButtonLogin
            onClick={() =>
              this.props.onhandleLoginClick(
                this.state.username,
                this.state.password,
                this.state.rememberMe
              )
            }
          >
            <ButtonLoginLabel>{i18n.t("web.login.login")}</ButtonLoginLabel>
          </ButtonLogin>
          <BottomContainer>
            <LinkForgotPassword onClick={this.props.onhandleForgotPassword}>
              {i18n.t("web.login.forgetPass") + "?"}
            </LinkForgotPassword>
            <ProcessRegisterContainer>
              <Description>{i18n.t("T13.proceedRegister")}</Description>
              <LinkRegister onClick={this.props.onhandleRegister}>
                Create Account
              </LinkRegister>
            </ProcessRegisterContainer>
          </BottomContainer>
          {/* {(() => {
            var brand = ["HK28", "21GEN", "21gen", "MESS8", "PISO", "BUNNY"];
            if (brand.indexOf(config.brand) < 0) {
              return (
                <LinkForgotPassword onClick={this.props.onhandleForgotPassword}>
                  {i18n.t("web.login.forgetPass")}
                </LinkForgotPassword>
              );
            }
          })()} */}

          <EmptyBlock></EmptyBlock>
        </FormContainer>
        {/* <Description>
          {i18n.t("web.login.cs")}
          <OnlineSupportLink onClick={this.props.onhandleOnlineSupport}>
            {i18n.t("web.login.contactus")}
          </OnlineSupportLink>

          <br></br>
          {i18n.t("web.login.footerDesc")}
        </Description> */}
      </Container>
    );
  }
}

export default Login;
