import React, { Component } from "react";

import styled from "styled-components";
import i18n from "../../utils/i18n";
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
const ButtonStyle = styled.div`
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
const Button = styled(ButtonStyle)`
  width: 347px;
  height: 46px;
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

class ResetPasswordSuccess extends Component {
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
        <TitleContainer>
          {i18n.t("web.resetPassword.resetSuccess")}
        </TitleContainer>

        <FormContainer>
          <Button onClick={this.props.onhandleSubmitClick}>
            {i18n.t("common.confirm")}
          </Button>

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

export default ResetPasswordSuccess;
