import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { accountAction } from "../../api-services/actions/accountAction";
import { AccountService } from "../../api-services/services/AccountService";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import UserIconPNG from "../../assets/images/user-icon.png";
import Password1IconPNG from "../../assets/images/password1-icon.png";
import IconMobilePNG from "../../assets/images/icon-mobile.png";
import IconInboxSelectedPNG from "../../assets/images/icon-inbox-selected.png";
import IconInputVerifyCodePNG from "../../assets/images/icon-input-verifycode.png";

import { makeStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import IconLoginClosePNG from "../../assets/images/icon-login-close.png";
import i18n from "../../utils/i18n";
import config from "../../config/config";
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
  font-size: 34px;
  font-style: italic;
  font-weight: 600;
  color: #fff;
  margin: 30px 0 35px 0;
`;

const FormContainer = styled.div`
  margin: 10px 78px 0 78px;
  padding: 0 3px;
`;
const CustomText = withStyles({
  root: {
    width: "350px",
    height: "51px",
    border: "none",
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
const CustomText2 = withStyles({
  root: {
    marginLeft: "8px",
    width: "255px",
    height: "51px",
    borderRadius: "6px",
    border: "none",
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
})(CustomText);
const ButtonLogin = styled.div`
  margin: 30px auto 40px auto;
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

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "2px",
    border: "solid #404040 1px",
  },
  formControl: {
    width: "78px",
    height: "46px",
    marginTop: "14px",
    marginRight: "10px",

    broder: "solid 2px #000",

    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
  input: {
    fontSize: "14px",
  },
  checkboxRoot: {
    padding: "0",
    margin: "0",
    float: "left",
    "& .MuiIconButton-label": {
      borderRadius: "6px",
      border: "solid 1px #000",
    },
  },
  icon: {
    width: 20,
    height: 20,

    borderRadius: "5px",
    backgroundColor: "#fff",
    "$root.Mui-focusVisible &": {},
    "input:hover ~ &": {},
    "input:disabled ~ &": {},
  },
  checkedIcon: {
    backgroundImage: "url(" + IconInboxSelectedPNG + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#fff",
    borderRadius: "5px",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage: "url(" + IconInboxSelectedPNG + ")",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "5px",
      content: '""',
    },
    "input:hover ~ &": {},
  },
}));
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "80px",
    height: "51px",
    border: "none",
    marginTop: "13px",
    marginBottom: "13px",
    float: "left",
    backgroundColor: "none",
    padding: 0,
    "&:before": {
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
      display: "block",
      height: "100%",
    },
    "& .MuiSelect-icon": {
      color: "#fff",
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
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        borderWidth: "1px",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);
const StyleButton = styled.div`
  width: 140px;
  height: 51px;
  margin: 0;
  float: right;
  ${(props) =>
    props.disable === true
      ? `  background: #b6b6b6;`
      : `  background: #cf2029;
  `}
  border-radius: 30px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  padding-top: 16px;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonLabel = styled.span`
  text-align: center;
  margin-top: 17px;
  text-transform: uppercase;
`;
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#fff",
  },
}))(Select);
function Activation(props) {
  const [username, setUsername] = React.useState(props.username);

  const [password, setPassword] = React.useState(props.pass);
  const [areacode, setAreacode] = React.useState(config.features.PhonePrefix);
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [countdown, setCountdown] = React.useState(0);
  const [securityKey, setSecurityKey] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function smsVerification(securityKey, code) {
    props
      .newRegister("InitPhone", {
        input: "Valid",
        data: {
          securitykey: securityKey,
          validatecode: code,
        },
      })
      .then(async (response) => {
        if (response.IsSuccess) {
          props.enqueueSnackbar(i18n.t("common.msgTokenVerified"), {
            variant: "success",
          });
          props.doLogin(username, password);

          props.history.push("/registersuccess/" + username);
        } else {
          props.enqueueSnackbar(response.info, {
            variant: "warning",
          });
        }
      });
  }

  const handleActivationClick = async () => {
    var expr = /^[a-zA-Z0-9]{6,16}$/;
    if (!expr.test(username)) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterUserNameInvalid"), {
        variant: "warning",
      });
      return;
    }
    expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterPassInvalid"), {
        variant: "warning",
      });
      return;
    }
    expr = new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`);
    if (!expr.test(phone)) {
      props.enqueueSnackbar(
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH),
        {
          variant: "warning",
        }
      );
      return;
    }

    if (!config.features.SkipSMSVerification) {
      expr = /^[a-zA-Z0-9]{6}$/;
      if (!expr.test(code)) {
        props.enqueueSnackbar(i18n.t("common.msgEnterCode"), {
          variant: "warning",
        });
        return;
      }
    }

    if (config.features.SkipSMSVerification) {
      var result = await AccountService.Login(username, password);
      if (result.IsSuccess) {
        props.getAccountInfo();

        props
          .newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: areacode,
              phone: phone,
            },
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              smsVerification(response.data, "123456");
            } else {
              props.enqueueSnackbar(response.info, {
                variant: "warning",
              });
            }
          });
      }
    } else {
      smsVerification(securityKey, code);
    }
  };
  const handleGetCodeClick = async () => {
    if (countdown <= 0) {
      var expr = /^[a-zA-Z0-9]{6,16}$/;
      if (!expr.test(username)) {
        props.enqueueSnackbar(i18n.t("common.msgRegisterUserNameInvalid"), {
          variant: "warning",
        });
        return;
      }
      var expr = /^.{6,20}$/;
      if (!expr.test(password)) {
        props.enqueueSnackbar(i18n.t("common.msgRegisterPassInvalid"), {
          variant: "warning",
        });
        return;
      }
      expr = new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`);
      if (!expr.test(phone)) {
        props.enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "warning",
          }
        );
        return;
      }
      var result = null;
      if (!isLoggedIn) {
        result = await AccountService.Login(username, password);
      }
      if ((result !== null && result.IsSuccess) || isLoggedIn) {
        setIsLoggedIn(true);

        props
          .newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: areacode,
              phone: phone,
            },
          })

          .then(async (response) => {
            if (response.IsSuccess) {
              setSecurityKey(response.data.stepResponse);
              props.enqueueSnackbar(i18n.t("common.msgTokenSent"), {
                variant: "info",
              });
              setCountdown(60);
            } else {
              props.enqueueSnackbar(response.info, {
                variant: "warning",
              });
            }
          });
      }
    }
  };
  useEffect(() => {
    if (countdown > 0)
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
  }, [countdown]);

  return (
    <Container>
      <CloseIconContainer
        viewBox="4 4 16 16"
        onClick={props.onhandleClose}
      ></CloseIconContainer>
      <div className="clear"></div>
      <TitleContainer>{i18n.t("web.register.activation")}</TitleContainer>

      <FormContainer>
        {
          //       <CustomText
          //       onChange={handleUsernameChange}
          //       id="username"
          //       value={username}
          //       placeholder={i18n.t("web.register.username")}
          //       variant="outlined"
          //       autoComplete="off"
          //       inputProps={{
          //         maxLength: 32,
          //       }}
          //       InputProps={{
          //         startAdornment: (
          //           <InputAdornment
          //             position="start"
          //             style={{ height: "24px", width: "30px" }}
          //           >
          //             <img src={UserIconPNG} alt=""></img>
          //           </InputAdornment>
          //         ),
          //       }}
          //     />
          //
          //     <CustomText
          //       onChange={handlePasswordChange}
          //       id="password"
          //       value={password}
          //       placeholder={i18n.t("web.register.password")}
          //       variant="outlined"
          //       type="password"
          //       autoComplete="off"
          //       inputProps={{
          //         maxLength: 20,
          //       }}
          //       InputProps={{
          //         startAdornment: (
          //           <InputAdornment
          //             position="start"
          //             style={{ height: "26px", width: "30px" }}
          //           >
          //             <img src={Password1IconPNG} alt=""></img>
          //           </InputAdornment>
          //         ),
          //       }}
          //     />
        }

        <CustomFormControl>
          <CustomSelect
            native
            variant="outlined"
            value={areacode}
            displayEmpty
            onChange={(e) => {
              setAreacode(e.target.value);
            }}
          >
            <option value={config.features.PhonePrefix}>
              {config.features.PhonePrefix}
            </option>
          </CustomSelect>
        </CustomFormControl>
        <CustomText2
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          id="phone"
          value={phone}
          placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
          variant="outlined"
          type="text"
          autoComplete="off"
          inputProps={{
            maxLength: config.features.MAX_PHONE_LENGTH || 10,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                style={{ height: "26px", width: "30px" }}
              >
                <img src={IconMobilePNG} alt=""></img>
              </InputAdornment>
            ),
          }}
        />
        {!config.features.SkipSMSVerification && (
          <>
            <div class="clear"></div>
            <CustomText
              placeholder={i18n.t("common.msgEnterCode")}
              adornment={IconInputVerifyCodePNG}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              variant="outlined"
              autoComplete="off"
              value={code}
              type={"text"}
              style={{
                width: "200px",
                height: "51px",
                marginTop: "0",
              }}
            ></CustomText>
            <StyleButton onClick={handleGetCodeClick} disable={countdown > 0}>
              <ButtonLabel>
                {countdown <= 0
                  ? i18n.t("common.msgSendToken")
                  : i18n.t("common.btnTokenResendLabel") +
                    "(" +
                    countdown +
                    "s)"}
              </ButtonLabel>
            </StyleButton>
          </>
        )}
        <ButtonLogin onClick={handleActivationClick}>
          <ButtonLoginLabel>{i18n.t("common.submit")}</ButtonLoginLabel>
        </ButtonLogin>
      </FormContainer>
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFunction: (json) => dispatch(json),
    getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
    getAccountProfile: (token) =>
      dispatch(accountAction.getAccountProfile(token, true)),
    register: (username, pwd, confirmpwd, invitationcode) =>
      dispatch(
        accountAction.registerAccount(username, pwd, confirmpwd, invitationcode)
      ),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
  };
};
export default withRouter(
  connect(null, mapDispatchToProps)(withSnackbar(Activation))
);
