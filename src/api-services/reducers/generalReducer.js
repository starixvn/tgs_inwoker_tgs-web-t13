import {
  IPRESTRICT,
  GETMOBILEPREFIX_SUCCESS,
  GETSITETOKEN_SUCCESS,
  GETSITETOKEN_FAIL,
  UNAUTHORIZE,
  GETPROMOLIST_BEGIN,
  GETPROMOLIST_SUCCESS,
  GETPROMOLIST_FAILURE,
  GETPLAYERPROMOLIST_BEGIN,
  GETPLAYERPROMOLIST_SUCCESS,
  GETPLAYERPROMOLIST_FAILURE,
  JOINPROMO_BEGIN,
  JOINPROMO_SUCCESS,
  JOINPROMO_FAILURE,
  GETBRANDCOMMUNICATION_SUCCESS,
  GETBRANDCOMMUNICATION_FAIL,
  GETBRANDLANGUAGE_BEGIN,
  GETBRANDLANGUAGE_SUCCESS,
  GETBRANDLANGUAGE_FAIL,
  GETLIVECHATURL_SUCCESS,
  GETBANNER_BEGIN,
  GETBANNER_SUCCESS,
  GETBANNER_FAIL,
  GETBRAND_BEGIN,
  GETBRAND_SUCCESS,
  GETBRAND_FAIL,
  GETPROMOROULETTE_STATUS_BEGIN,
  GETPROMOROULETTE_STATUS_SUCCESS,
  GETPROMOROULETTE_STATUS_FAILED,
  GETPROMOROULETTE_RESULT_BEGIN,
  GETPROMOROULETTE_RESULT_SUCCESS,
  GETPROMOROULETTE_RESULT_FAILED,
  GETDAROULETTE_RESULT_BEGIN,
  GETDAROULETTE_RESULT_SUCCESS,
  GETDAROULETTE_RESULT_FAILED,
  GETROULETTE_COUNT_BEGIN,
  GETROULETTE_COUNT_SUCCESS,
  GETROULETTE_COUNT_FAILED,
  RESET_PROMOROULETTE,
  GETPROMOTION_BEGIN,
  GETPROMOTION_SUCCESS,
  GETPROMOTION_FAILURE,
  GETDAROULETTE_HISTORY_BEGIN,
  GETDAROULETTE_HISTORY_FAILED,
  GETDAROULETTE_HISTORY_SUCCESS,
} from "../constant/actionType";
const initialState = {
  isIPRestrict: false,
  mobilePrefix: [],
  isMaintenance: false,
  promotionList: { items: [] },
  token: "",
  brandLanguage: [
    {
      culturecode: "en-US",
    },
  ],
  brandsSupport: [],
  livechat: "",
  banner: [],
  brand: {
    //TGS-197, since hide when true, default hide, show when return false
    hasInvitationCode: true,
  },
  isRouletteAvailable: null,
  itemIndex: null,
  rouletteCount: [],
  rouletteHistory: [],
};
function mapPromotionList(data) {
  var items = [];
  data.map((item) => items.push(item));
  return { items };
}

export function generalReducer(state = initialState, action) {
  switch (action.type) {
    case IPRESTRICT:
      return {
        ...state,
        isIPRestrict: true,
      };
    case GETMOBILEPREFIX_SUCCESS:
      return {
        ...state,
        mobilePrefix: action.payload,
      };
    case UNAUTHORIZE:
      return {
        ...state,
        token: "",
      };
    case GETSITETOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
      };
    case GETSITETOKEN_FAIL:
      return {
        ...state,
        token: action.payload.token,
        isMaintenance: true,
      };
    case GETPLAYERPROMOLIST_BEGIN:
    case GETPROMOLIST_BEGIN:
    case GETPROMOTION_BEGIN:
      return {
        ...state,
        loading: action.loading,
      };
    case GETPLAYERPROMOLIST_SUCCESS:
    case GETPROMOLIST_SUCCESS:
      return {
        ...state,
        promotionList: action.payload.data,
        loading: action.loading,
      };
    case GETPROMOTION_SUCCESS:
      return {
        ...state,
        promotionList: mapPromotionList(action.payload.data),
        loading: action.loading,
      };
    case GETPLAYERPROMOLIST_FAILURE:
    case GETPROMOLIST_FAILURE:
    case GETPROMOTION_FAILURE:
      return {
        ...state,
        promotionList: { items: [] },
        loading: action.loading,
      };
    case JOINPROMO_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case JOINPROMO_SUCCESS:
      return {
        ...state,
        joinPromoResult: action.payload.data,
        loading: false,
      };
    case JOINPROMO_FAILURE:
      return {
        ...state,
        joinPromoResult: action.payload.data,
        loading: false,
      };

    case GETBRANDCOMMUNICATION_SUCCESS:
      return {
        ...state,
        brandsSupport: action.payload.data,
        loading: false,
      };

    case GETBRANDCOMMUNICATION_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GETBRANDLANGUAGE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GETBRANDLANGUAGE_SUCCESS:
      return {
        ...state,
        brandLanguage: action.payload.data,
        loading: false,
      };

    case GETBRANDLANGUAGE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GETBANNER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GETBANNER_SUCCESS:
      return {
        ...state,
        banner: action.payload.data,
        loading: false,
      };

    case GETBANNER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GETBRAND_SUCCESS:
      var desktopUrl = action.payload.data.desktopLogoUrl;
      var mobileUrl = action.payload.data.mobileLogoUrl;
      var loadingUrl = action.payload.data.loadingUrl;
      var hasInvitationCode = action.payload.data.hasInvitationCode;

      if (desktopUrl && desktopUrl.indexOf("https://") < 0)
        desktopUrl = "https://" + desktopUrl;
      if (mobileUrl && mobileUrl.indexOf("https://") < 0)
        mobileUrl = "https://" + mobileUrl;
      if (loadingUrl && loadingUrl.indexOf("https://") < 0)
        loadingUrl = "https://" + loadingUrl;
      return {
        ...state,
        brand: {
          ...action.payload.data,
          desktopLogoUrl: desktopUrl,
          mobileLogoUrl: mobileUrl,
          loadingUrl: loadingUrl,
          hasInvitationCode: hasInvitationCode,
        },
        loading: false,
      };

    case GETBRAND_FAIL:
      console.log("GETBRAND_FAIL");

      return {
        ...state,
        // brand: { hasInvitationCode: true },
        loading: false,
      };
    case GETLIVECHATURL_SUCCESS:
      return {
        ...state,
        livechat: action.payload.data,
        loading: false,
      };

    case GETPROMOROULETTE_STATUS_BEGIN:
      return {
        ...state,
        isRouletteAvailable: null,
        loading: true,
      };
    case GETPROMOROULETTE_STATUS_SUCCESS:
      return {
        ...state,
        isRouletteAvailable: action.payload.data.id === undefined,
        loading: false,
      };
    case GETPROMOROULETTE_STATUS_FAILED:
      return {
        ...state,
        isRouletteAvailable: null,
        loading: false,
      };
    case GETDAROULETTE_RESULT_BEGIN:
    case GETPROMOROULETTE_RESULT_BEGIN:
      return {
        ...state,
        itemIndex: null,
        loading: true,
      };
    case GETDAROULETTE_RESULT_SUCCESS:
    case GETPROMOROULETTE_RESULT_SUCCESS:
      return {
        ...state,
        itemIndex: action.payload.data.itemindex,
        loading: false,
      };
    case GETDAROULETTE_RESULT_FAILED:
    case GETPROMOROULETTE_RESULT_FAILED:
      return {
        ...state,
        itemIndex: null,
        loading: false,
      };
    case RESET_PROMOROULETTE:
      return {
        ...state,
        isRouletteAvailable: null,
        itemIndex: null,
      };
    case GETROULETTE_COUNT_BEGIN:
    case GETROULETTE_COUNT_FAILED:
      return {
        ...state,
        rouletteCount: [],
      };
    case GETROULETTE_COUNT_SUCCESS:
      return {
        ...state,
        rouletteCount: action.payload.data,
      };
    case GETDAROULETTE_HISTORY_BEGIN:
    case GETDAROULETTE_HISTORY_FAILED:
      return {
        ...state,
        rouletteHistory: [],
      };
    case GETDAROULETTE_HISTORY_SUCCESS:
      return {
        ...state,
        rouletteHistory: action.payload.data,
      };
    default:
      return state;
  }
}
