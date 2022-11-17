import axios from "axios";
import { UNAUTHORIZE } from "../constant/actionType";
import { AppHistory } from "../../history/History";
import i18n from "../../utils/i18n";
import Promise from "promise-polyfill";
import { isMobileOnly } from "react-device-detect";
import ErrorSwitcher from "../../utils/ErrorSwitcher";

const Interceptor = {
  setupInterceptors: (store) => {
    // Add a response interceptor
    axios.interceptors.request.use(
      function (config) {
        const client = localStorage.getItem("client-token");
        if (client != null && client != "") {
          config.headers["Authorization"] = "bearer " + client;
        }

        const token = localStorage.getItem(
          "token" + (isMobileOnly ? "1" : "0")
        );
        const logintime = localStorage.getItem(
          "logintime" + (isMobileOnly ? "1" : "0")
        );
        
        if (token != null && token != "") {
          if (logintime != null && logintime != "") {
            var date = new Date(parseInt(logintime, 10 | 0));
            date = new Date(new Date(date).setHours(date.getHours() + 11));
            var newD = new Date(date.getTime() + 50 * 60000);
            var currentDate = new Date();
            // console.log("beforeloginTime:", currentDate);
            // console.log("afterloginTime1:", date);
            // console.log("afterloginTime2:", newD);
            // console.log("compare:", currentDate < newD);
            if (currentDate < newD) {
              config.headers["Token"] = token;
            }
          }
          
          // config.headers["Token"] = token;
        }
        // const crypto = require("crypto");
        // const TraceParent = require("traceparent");

        // const version = Buffer.alloc(1).toString("hex");
        // const traceId = crypto.randomBytes(16).toString("hex");
        // const id = crypto.randomBytes(8).toString("hex");
        // const flags = "01";

        // const header = `${version}-${traceId}-${id}-${flags}`;

        // const parent = TraceParent.fromString(header);
        config.headers["Content-Type"] = "application/json";
        // config.headers["traceparent"] = parent;//"00-ab42124a3c573678d4d8b21ba52df3bf-d21f7bc17caa5aba-01";
        config.headers["Accept-Language"] = localStorage.getItem("i18nextLng");

        if(config.url.toUpperCase().indexOf("/GAMEPROVIDER/LIST") >= 0)
        {
          config.headers["Token"] = "";
        }

        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        var newResponse = {
          IsSuccess: false,
          info: ErrorSwitcher.getTranslation(response.data.errmsgid),
          code: response.data.err,
          data:
            response.data.data !== null &&
            typeof response.data.data !== "undefined"
              ? response.data.data
              : response.data,
        };

        if (response.data.url) {
          newResponse.data.url = response.data.url;
        }
        if (response.data.items) {
          newResponse.data = response.data;
          newResponse.IsSuccess = true;
        }
        if (response.data.token) {
          newResponse.data.token = response.data.token;
        }
        if (
          response.config.url.toUpperCase().indexOf("/API/PLAYER/LOGIN") >= 0
        ) {
          localStorage.setItem(
            "token" + (isMobileOnly ? "1" : "0"),
            response.data.token
          );
          localStorage.setItem(
            "logintime" + (isMobileOnly ? "1" : "0"),
            response.data.logintime
          );
        }
        if (
          response.config.url.toUpperCase().indexOf("/API/PLAYER/LOGOUT") >= 0
        ) {
          localStorage.removeItem("token" + (isMobileOnly ? "1" : "0"));
          localStorage.removeItem("logintime" + (isMobileOnly ? "1" : "0"));
        }
        if (
          response.config.url.toUpperCase().indexOf("/BANK/HELP2PAY/PAY") >= 0
        ) {
          newResponse.IsSuccess = true;
        }
        if (newResponse.code === 0) {
          newResponse.IsSuccess = true;
        } else if (
          newResponse.code === 102 ||
          newResponse.code === 101 ||
          newResponse.code === 210
        ) {

          localStorage.removeItem("token" + (isMobileOnly ? "1" : "0"));
          localStorage.removeItem("logintime" + (isMobileOnly ? "1" : "0"));
          store.dispatch({ type: UNAUTHORIZE });

          if (newResponse.code === 210) {
            AppHistory.replace("/" + i18n.language + "/banned");
          } else {
            AppHistory.replace("/" + i18n.language + "/");
          }
        }

        return newResponse;
      },
      function (error) {
        if (error.response) {
          if (
            error.response.data.err == 102 ||
            error.response.data.err == 101 ||
            error.response.data.err == 210 ||
            error.response.data.errmsg ===
              "request platform is not matched with player login platform."
          ) {
            if (
              error.response.config.url.indexOf("Player/Login") < 0 &&
              error.response.config.url.indexOf("player/password") < 0 &&
              error.response.config.url.indexOf("player/init-phone") < 0
            ) {
              localStorage.removeItem("token" + (isMobileOnly ? "1" : "0"));
              localStorage.removeItem("logintime" + (isMobileOnly ? "1" : "0"));
              store.dispatch({ type: UNAUTHORIZE });
              if (error.response.data.err == 210) {
                AppHistory.replace("/" + i18n.language + "/banned");
              } else {
                AppHistory.replace("/" + i18n.language + "/");
              }
            }
          }

          return {
            IsSuccess: false,
            info: ErrorSwitcher.getTranslation(error.response.data.errmsgid),
            code: error.response.data.err,
            data: error.response.data,
          };
        } else {
          return {
            IsSuccess: false,
            info: "Internal Server Error",
            code: "",
            data: {},
          };
        }
      }
    );
  },
};
export default Interceptor;
