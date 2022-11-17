import { ApiService } from "./ApiService";

export const UiService = {
  GetMarquee,
  GetMaintenance,
};

function GetMarquee(language) {
  const result = ApiService.get(`announcement/list/${language}`); //done
  return result;
}

function GetMaintenance() {
  const result = ApiService.get(`brand/maintenance`);
  return result;
}
