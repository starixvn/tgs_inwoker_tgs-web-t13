import React, { Component } from "react";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import i18n from "../../utils/i18n";
import TextField from "@material-ui/core/TextField";
import IconLoginClosePNG from "../../assets/images/icon-login-close.png";

const Container = styled.div`
  width: 506px;
  height: 360px;
  background: #27273f;
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
  font-size: 34px;
  font-style: italic;
  font-weight: 600;
  color: #fff;
  margin: 30px 0 35px 0;
`;

const FormContainer = styled.div`
  margin: 10px 78px 20px 78px;
`;
const CustomText = withStyles({
  root: {
    width: "350px",
    height: "46px",
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
const StyleButton = styled.div`
  width: 170px;
  height: 46px;
  ${(props) =>
    props.disable === true
      ? `  background: #b6b6b6;`
      : `  background: #cf2029;
  `}
  border-radius: 30px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  padding-top: 14px;
  margin: 15px 5px;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonSubmit = styled(StyleButton)``;
const ButtonBack = styled(StyleButton)`
  float: left;
`;
const LinkStyle = styled.a`
  font-size: 15px;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.p`
  text-align: center;
  font-size: 14px;
  color: #fff;
`;

const ContactUsLink = styled(LinkStyle)`
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
`;

class ResetPassword extends Component {
  state = {
    password: "",
    confirmpassword: "",
  };
  componentDidMount() {}
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handleNewPasswordChange = (e) => {
    this.setState({ ...this.state, confirmpassword: e.target.value });
  };
  render() {
    return (
      <Container>
        <CloseIconContainer
          viewBox="4 4 16 16"
          onClick={this.props.onhandleClose}
        ></CloseIconContainer>
        <div className="clear"></div>
        <TitleContainer>{i18n.t("web.resetPassword.title")}</TitleContainer>

        <FormContainer>
          <CustomText
            placeholder={i18n.t("web.resetPassword.newPassword")}
            variant="outlined"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            type={"password"}
          />
          <CustomText
            placeholder={i18n.t("web.resetPassword.confirmNewPassword")}
            variant="outlined"
            onChange={this.handleNewPasswordChange}
            value={this.state.confirmpassword}
            type={"password"}
          />
          <ButtonBack onClick={() => this.props.onhandleBackClick()}>
            {i18n.t("common.back")}
          </ButtonBack>
          <ButtonSubmit
            onClick={() =>
              this.props.onhandleSubmitClick(
                this.props.code,
                this.props.phone,
                this.props.securityKey,
                this.state.password,
                this.state.confirmpassword
              )
            }
          >
            {i18n.t("common.submit")}
          </ButtonSubmit>

          <Description>
            {i18n.t("common.support")}
            <ContactUsLink onClick={this.props.onhandleOnlineSupport}>
              {i18n.t("common.contactus")}
            </ContactUsLink>
          </Description>
        </FormContainer>
      </Container>
    );
  }
}

export default ResetPassword;
