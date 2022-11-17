import featureList from "./features";

var template = 11; //2 for T2, 3 for T3 (based on .xd file)
const config = {
  baseUrl: window?.env ? "/api/" : "https://stg-t1.rpgp.cc/api/",
  client:
    window?.env?.client ||
    "uc0C5tXKanr6gN9P7HqlTQ1AGwUFJhg8jEzuFhCuHEC0E1QcCfZYrH",
  currency: window?.env?.currency || "PHP",
  brand: window?.env?.brand || process.env.REACT_APP_BRAND || "PGG",
  brandName: window?.env?.brandName
    ? window?.env?.brandName
    : window?.env?.brand || "GPI",
  theme: window?.env?.theme || "wapT11",
  wapVersion: template,
  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
  defaultLanguage: window?.env?.defaultLanguage
    ? window?.env?.defaultLanguage === ""
      ? "zh-CN"
      : window?.env?.defaultLanguage
    : "zh-CN",
  affiliateId: window?.env?.affiliateId || "",
  features: featureList["default"],
};

export default config;
