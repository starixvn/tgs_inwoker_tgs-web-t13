import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { accountAction } from "../../api-services/actions/accountAction";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import UserIconPNG from "../../assets/images/user-icon.png";
import Password1IconPNG from "../../assets/images/password1-icon.png";
import Password2IconPNG from "../../assets/images/password2-icon.png";
import IconMobilePNG from "../../assets/images/icon-mobile.png";
import IconEmailPNG from "../../assets/images/icon-input-email.png";
import IconUncheckedPNG from "../../assets/images/icon-unchecked.png";
import IconCheckedPNG from "../../assets/images/icon-checked.png";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import config from "../../config/config";
import IconLoginClosePNG from "../../assets/images/icon-login-close.png";
import i18n from "../../utils/i18n";
import ErrorSwitcher from "../../utils/ErrorSwitcher";
import { generalAction } from "../../api-services/actions/generalAction";

const Container = styled.div`
  width: ${({ layout }) => (layout === "horizontal" ? "800px" : "506px")};
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
  ${({ layout }) =>
    layout === "horizontal"
      ? `  
      display: grid;
      grid-auto-columns: 1fr;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
      "username password"
      "invitation repassword"
      "descriptionContent descriptionContent"
      "buttonContent buttonContent"
      "bottomContent bottomContent";
      `
      : ``}
`;
const CustomText = withStyles({
  root: {
    width: ({ layout }) => layout === "horizontal" ? "300px" : "430px",
    height: "55px",
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
    width: "320px",
    height: "55px",
    borderRadius: "6px",
    border: "none",
    margin: 0,
    marginTop: "20px",
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

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "100px",
    height: "55px",
    border: "none",
    marginTop: "20px",
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

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#fff",
  },
}))(Select);

const ButtonLogin = styled.div`
  margin: 20px auto 0 auto;
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
  grid-area: ${({gridArea})=> gridArea};
`;
const ButtonLoginLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: 17px;
  text-transform: uppercase;
`;

const DescriptionContainer = styled.div`
  padding: 12px 0 0 8px;
  ${({ layout, gridArea }) =>
    layout === "horizontal"
      ? `  
      grid-area: ${gridArea};
      display: flex;
      `
      : ``}
`;
const Description = styled.div`
  float: left;
  width: ${({layout})=> layout==="horizontal" ? "100%": "380px"};
  margin-left: 5px;
  font-size: 14px;

  line-height: 1.43;

  color: #fff;
`;

const Text = styled.div`
  text-align: center;
  font-size: 14px;
  color: #fff;
`;

const LinkStyle = styled.a`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
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
    backgroundImage: "url(" + IconUncheckedPNG + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#fff",
    "$root.Mui-focusVisible &": {},
    "input:hover ~ &": {},
    "input:disabled ~ &": {},
  },
  checkedIcon: {
    backgroundImage: "url(" + IconCheckedPNG + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#fff",
    borderRadius: "5px",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage: "url(" + IconCheckedPNG + ")",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "5px",
      content: '""',
    },
    "input:hover ~ &": {},
  },
}));

const CustomInvitationContainer = styled.div`
  position: relative;
  box-shadow: 0px 3px 8px -2px rgb(0 0 0 / 75%);
`;

const CustomInvitationSelect = styled.select`
  position: absolute;
  right: ${({ layout }) => (layout === "horizontal" ? "30px" : "10px")};
  bottom: 18px;
  border: none;
  outline: none;
  background: none;
  color: #fff;
`;

const CustomOption = styled.option`
  color: #000;
`;

const CustomTextWrapper = styled.div`
  border-radius: 6px;
  margin-top: 13px;
  grid-area: ${({gridArea})=> gridArea};
`;

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

const BottomContainer = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
  grid-area: ${({gridArea})=> gridArea};
`;

function Register(props) {
  const [username, setUsername] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [areacode, setAreacode] = React.useState(config.features.PhonePrefix);
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [promotionId, setPromotionId] = React.useState(
    config.affiliateId !== ""
      ? config.affiliateId
      : localStorage.getItem("promotionId")
  );

  const [upper, setUpper] = React.useState(localStorage.getItem("upper"));
  const [promoteType, setPromoteType] = React.useState(
    localStorage.getItem("invitationtype") === ""
      ? "a"
      : localStorage.getItem("invitationtype")
  );
  const [prefill, setPrefill] = React.useState(
    localStorage.getItem("promotionId") !== "" ||
      localStorage.getItem("upper") !== ""
      ? true
      : false
  );

  const [fromCustomDomain, setFromCustomDomain] = React.useState(false);
  const [layout, setLayout] = React.useState(
    config.features.Register_ShowEmail || config.features.Register_ShowPhone
      ? "vertical"
      : "horizontal"
  );
  useEffect(() => {
    if (props.general.brand.hasInvitationCode) {
      props.getInvitationCode().then((result) => {
        if (result.IsSuccess && result.data.invitationCode) {
          setPromoteType("a");
          setPromotionId(result.data.invitationCode);
          setPrefill(true);
          setFromCustomDomain(true);
        }
      });
    }
  }, []);

  const [tnc, setTnc] = React.useState(true);
  const handleRegisterClick = async () => {
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
    if (password !== password2) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterPassMatchInvalid"), {
        variant: "warning",
      });
      return;
    }
    expr = new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`);
    if (config.features.Register_ShowPhone) {
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
    }

    expr =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (config.features.Register_ShowEmail) {
      if (!expr.test(email)) {
        props.enqueueSnackbar(i18n.t("common.msgInvalidEmail"), {
          variant: "warning",
        });
        return;
      }
    }

    if (tnc) {
      // user_account,
      // user_password,
      // pay_password,
      // mobile,
      // recommend_code,
      // mobile_code_id
      props
        .register(username, password, password2, promotionId, upper)
        .then(async (response) => {
          if (response.IsSuccess && response.data.isnew === false) {
            props.enqueueSnackbar(i18n.t("common.msgAlreadyExist"), {
              variant: "warning",
            });
          } else if (response.IsSuccess) {
            // let urlParams = new URLSearchParams(props.location.search);
            // if (urlParams.has("return_url")) {
            //   const returnValue = urlParams.get("return_url");
            //   if (returnValue) {
            //     window.location.href =
            //       returnValue +
            //       "?token=" +
            //       BlowFishEncryption.Encrypt(response.data);
            //   }
            // }
            if (config.features.SMSVerification) {
              props.onRegisterSuccess(username, password);
            } else if (
              config.features.Register_ShowEmail &&
              config.features.Register_ShowPhone
            ) {
              props.doLoginWithHpEmail(username, password, phone, email);
            } else if (config.features.Register_ShowPhone) {
              props.doLoginWithHp(username, password, phone);
            } else {
              props.doLogin(username, password);
              // await props.getAccountInfo(response.data);
              // await props.getAccountProfile(response.data);
            }
          } else {
            props.enqueueSnackbar(ErrorSwitcher.getTranslation(response.info), {
              variant: "warning",
            });
            // if (response.code === 206) {
            //   props.enqueueSnackbar(i18n.t("common.msgInvalidInvitationCode"), {
            //     variant: "warning",
            //   });
            // } else {
            //   props.enqueueSnackbar(response.info, {
            //     variant: "warning",
            //   });
            // }
          }
        });
    } else {
      props.enqueueSnackbar(i18n.t("common.msgRegisterTermAndCondition"), {
        variant: "warning",
      });
      return;
    }
  };

  const performNewRegister = async () => {
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
    if (password !== password2) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterPassMatchInvalid"), {
        variant: "warning",
      });
      return;
    }
    expr = new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`);
    if (config.features.Register_ShowPhone) {
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
    }

    expr =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (config.features.Register_ShowEmail) {
      if (!expr.test(email)) {
        props.enqueueSnackbar(i18n.t("common.msgInvalidEmail"), {
          variant: "warning",
        });
        return;
      }
    }

    if (tnc) {
      props
        .newRegister("CreatePlayer", {
          username: username,
          pwd: password,
          upper: upper,
          invitationcode: promotionId,
        })
        .then(async (response) => {
          if (
            response.IsSuccess &&
            response.data.stepResponse.isnew === false
          ) {
            props.enqueueSnackbar(i18n.t("common.msgAlreadyExist"), {
              variant: "warning",
            });
          } else if (response.IsSuccess) {
            let setPhoneDontCareDuplicate =
              response.data.nextStepType === "SetPhoneDontCareDuplicate";

            if (config.features.SMSVerification) {
              props.onRegisterSuccess(username, password);
            } else if (
              config.features.Register_ShowEmail &&
              config.features.Register_ShowPhone
            ) {
              props.doLoginWithHpEmail(
                username,
                password,
                phone,
                email,
                setPhoneDontCareDuplicate
              );
            } else if (config.features.Register_ShowPhone) {
              props.doLoginWithHp(username, password, phone, setPhoneDontCareDuplicate);
            } else {
              props.doLogin(username, password);
            }
          } else {
            props.enqueueSnackbar(ErrorSwitcher.getTranslation(response.info), {
              variant: "warning",
            });
          }
        });
    } else {
      props.enqueueSnackbar(i18n.t("common.msgRegisterTermAndCondition"), {
        variant: "warning",
      });
      return;
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePromoChange = (e) => {
    setPromotionId(e.target.value);
  };
  const handleUpperChange = (e) => {
    setUpper(e.target.value);
  };
  const handleTncClick = (e) => {
    setTnc(!tnc);
  };
  const handleSwitchType = (e) => {
    setPromoteType(e.target.value);
    setUpper("");
    setPromotionId("");
  };

  const classes = useStyles();
  return (
    <Container layout={layout}>
      <CloseIconContainer
        viewBox="4 4 16 16"
        onClick={props.onhandleClose}
      ></CloseIconContainer>
      <div className="clear"></div>
      <TitleContainer>{i18n.t("web.register.registerTitle")}</TitleContainer>
      <FormContainer layout={layout}>
        <CustomTextWrapper gridArea="username">
          <CustomText
            layout={layout}
            onChange={handleUsernameChange}
            id="username"
            value={username}
            placeholder={i18n.t("web.register.username")}
            variant="outlined"
            autoComplete="off"
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
        </CustomTextWrapper>

        <CustomTextWrapper gridArea="password">
          <CustomText
            layout={layout}
            onChange={handlePasswordChange}
            id="password"
            value={password}
            placeholder={i18n.t("web.register.password")}
            variant="outlined"
            type="password"
            autoComplete="off"
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
        </CustomTextWrapper>
        <CustomTextWrapper gridArea="repassword">
          <CustomText
            layout={layout}
            onChange={handlePassword2Change}
            id="password2"
            value={password2}
            placeholder={i18n.t("T13.register.confirmPassword")}
            variant="outlined"
            type="password"
            autoComplete="off"
            inputProps={{
              maxLength: 20,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ height: "30px", width: "40px" }}
                >
                  <img src={Password2IconPNG} alt=""></img>
                </InputAdornment>
              ),
            }}
          />
        </CustomTextWrapper>

        {config.features.Register_ShowPhone && (
          <React.Fragment>
            <CustomFormControl>
              <CustomSelect
                native
                variant="outlined"
                value={areacode}
                displayEmpty
                onChange={(e) => {
                  setAreacode(e.target.value);
                }}
                IconComponent={KeyboardArrowDown}
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
          </React.Fragment>
        )}
        {config.features.Register_ShowEmail && (
          <CustomTextWrapper>
            <CustomText
              onChange={handleEmailChange}
              id="email"
              value={email}
              placeholder={i18n.t("web.register.email")}
              variant="outlined"
              type="email"
              autoComplete="off"
              inputProps={{
                maxLength: 50,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ height: "26px", width: "30px" }}
                  >
                    <img src={IconEmailPNG} alt=""></img>
                  </InputAdornment>
                ),
              }}
            />
          </CustomTextWrapper>
        )}

        {!(config.features.Register_HideInvitation && fromCustomDomain) && (
          <CustomTextWrapper gridArea="invitation">
            <CustomInvitationContainer>
              <CustomText
                layout={layout}
                onChange={
                  promoteType === "a" ? handlePromoChange : handleUpperChange
                }
                value={promoteType === "a" ? promotionId : upper}
                id="code"
                placeholder={i18n.t("web.register.promoteCode")}
                variant="outlined"
                inputProps={{ disabled: prefill }}
              />
              {props.general.haveAffiliate && (
                <CustomInvitationSelect
                  layout={layout}
                  disabled={prefill}
                  value={promoteType}
                  selected={promoteType}
                  onChange={handleSwitchType}
                >
                  <CustomOption value="a">{i18n.t("usertype.agent")}</CustomOption>
                  <CustomOption value="p">{i18n.t("usertype.player")}</CustomOption>
                </CustomInvitationSelect>
              )}
            </CustomInvitationContainer>
          </CustomTextWrapper>
        )}

        <DescriptionContainer layout={layout} gridArea="descriptionContent">
          <Checkbox
            checked={tnc}
            className={classes.checkboxRoot}
            onClick={handleTncClick}
            checkedIcon={<CheckBoxChecked />}
            icon={<CheckBoxUnchecked />}
          />
          <Description layout={layout}>{i18n.t("web.register.contract")}</Description>
        </DescriptionContainer>

        <ButtonLogin onClick={performNewRegister} gridArea="buttonContent">
          <ButtonLoginLabel>
            {config.features.Register_CustomFlow_IDR
              ? i18n.t("common.nextStep")
              : i18n.t("T13.register.btn")}
          </ButtonLoginLabel>
        </ButtonLogin>
        <BottomContainer gridArea="bottomContent">
          <Text>{i18n.t("T13.proceedLogin")}</Text>
          <LinkStyle onClick={props.onhandleLogin}>
            {i18n.t("common.login")}
          </LinkStyle>
        </BottomContainer>
      </FormContainer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInvitationCode: () => dispatch(generalAction.getInvitationCode()),
    dispatchFunction: (json) => dispatch(json),
    getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
    getAccountProfile: (token) =>
      dispatch(accountAction.getAccountProfile(token, true)),
    register: (username, pwd, confirmpwd, invitationcode, upper) =>
      dispatch(
        accountAction.registerAccount(
          username,
          pwd,
          confirmpwd,
          invitationcode,
          upper
        )
      ),
    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Register))
);
