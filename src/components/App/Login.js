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
  background: #27273f;
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
const CustomText = withStyles({
  root: {
    width: "350px",
    height: "55px",
    border: "none",
    boxShadow: "0px 3px 8px -2px rgba(0,0,0,0.75)",
    margin: 0,
    marginTop: "13px",
    WebkitTextFillColor: "#b6b6b6",
    "& .MuiOutlinedInput-input": {
      fontSize: "16px",
    },
    "& .MuiInputBase-input::-webkit-input-placeholder": {
      fontSize: "16px",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      "& fieldset": {
        borderColor: "#b6b6b6",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        borderWidth: "1px",
      },
    },
    "& .PrivateNotchedOutline-root-19": {
      top: "-4px",
    },
    "& .MuiInputBase-root": {
      color: "#b6b6b6 !important",
    },
  },
})(TextField);

const ButtonLogin = styled.div`
  margin: 35px auto 0 auto;
  width: 250px;
  height: 60px;
  color: #fff;
  font-size: 20px;
  border-radius: 30px;
  background: #cf2029;
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
  font-weight: bold;
  text-transform: uppercase;
`;
const LinkForgotPassword = styled(LinkStyle)`
  float: right;
`;
const EmptyBlock = styled.div`
  clear: both;
  height: 30px;
`;
const Description = styled.p`
  text-align: center;
  font-size: 14px;
  color: #fff;
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
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  gap: 20px;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
`;
const CustomCheck = withStyles({
  root: {
    width: "25px",
    height: "25px",
    float: "left",
  },
})(Checkbox);

const CheckBoxUnchecked = styled.div`
  width: 20px;
  height: 20px;

  background: ${() => {
    return `url(${IconUncheckedPNG}) no-repeat center /
    contain;`;
  }};
`;

const CheckBoxChecked = styled.div`
  width: 20px;
  height: 20px;

  background: ${() => {
    return `url(${IconCheckedPNG}) no-repeat center /
    contain;`;
  }};
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
        <TitleContainer>{i18n.t("web.login.login")}</TitleContainer>
        <FormContainer>
          <CustomText
            value={this.state.username}
            onChange={this.handleTextFieldChange}
            id="username"
            placeholder={i18n.t("common.username")}
            variant="outlined"
            inputProps={{
              maxLength: 16,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ height: "30px", width: "40px" }}
                >
                  <img src={UserIconPNG} alt=""></img>
                </InputAdornment>
              ),
            }}
          />
          <CustomText
            onChange={this.handleTextFieldChange}
            id="password"
            placeholder={i18n.t("common.password")}
            variant="outlined"
            type="password"
            inputProps={{
              maxLength: 20,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ height: "30px", width: "40px" }}
                >
                  <img src={Password1IconPNG} alt=""></img>
                </InputAdornment>
              ),
            }}
          />
          <MiddleContainer>
            <RememberMe>
              <CustomCheck
                checked={this.state.rememberMe}
                onClick={this.handleRememberMeChange}
                checkedIcon={<CheckBoxChecked />}
                icon={<CheckBoxUnchecked />}
              />
              <LinkStyle>{i18n.t("web.login.rememberMe")}</LinkStyle>
            </RememberMe>
            <LinkForgotPassword onClick={this.props.onhandleForgotPassword}>
              {i18n.t("web.login.forgetPass")}
            </LinkForgotPassword>
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
            <Description>{i18n.t("T13.proceedRegister")}</Description>
            <LinkRegister onClick={this.props.onhandleRegister}>
              {i18n.t("wap.main.home.steps.step1")}
            </LinkRegister>
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
