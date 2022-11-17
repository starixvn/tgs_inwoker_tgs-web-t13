import { ApiService } from "./ApiService";
export const WalletService = {
  GetWalletBalance,
  GetDepositMethod,
  PerformManualDeposit,
  PerformGetManualDepositDetail,
  PerformUploadDepositProof,
  GetListOfWithdrawChannel,
  GetBankCardList,
  InitBankCard,
  AddBankCard,
  DeleteBankCard,
  DoWithdraw,
  CancelDeposit,
  Deposit,
  PerformLeePayDeposit,
  PerformPrimePayDeposit,
  PerformMaticPayDeposit,
  PerformApplePayDeposit,
  GetLeePayExchangeRate,
  WithdrawalFromGame,
  Transfer,
  GetGameBalance,
  GetAutoTransferStatus,
  UpdateAutoTransferStatus,
  PerformUmPayBankDeposit,
  PerformUmPayCrytoDeposit,
  GetUmPayExchangeRate,
  GetMinWithdrawLimit,
  PerformManualThirdPartyDeposit,
  PerformManualBankDeposit,
  PerformManualFPSDeposit,
  PerformManualFPSDepositWithName,
  PerformHelp2PayDeposit,
  GetHelp2PayDeposit,
  PerformSkyPayDeposit,
  PerformBankDeposit,
  PerformCryptoDeposit,
  PerformDeposit,
  PerformUsdtDeposit,
  PerformPulsaDeposit,
  PerformEWalletDeposit,
  WithdrawEverything,
  PerformManualBankDepositWithDetail,
  PerformPulsaDepositWithDetail,
  PerformEWalletDepositWithDetail,
};

function WithdrawalFromGame(gpcode, amount) {
  const result = ApiService.put("game/balance/fund/in", {
    amount: Math.floor(amount),
    gpcode: gpcode,
  });
  return result;
}

function WithdrawEverything() {
  const result = ApiService.post("game/balance/fund/in");
  return result;
}

function Transfer(gpcode, amount) {
  const result = ApiService.put("game/balance/fund/out", {
    amount: Math.floor(amount),
    gpcode: gpcode,
  });
  return result;
}

function GetGameBalance(gpcode) {
  const result = ApiService.get(`game/balance/${gpcode}`);
  return result;
}
//SWAGGER: Wallet

function GetWalletBalance() {
  const result = ApiService.get("Wallet");
  return result;
}

//SWAGGER: Deposit

function GetDepositMethod() {
  const result = ApiService.get("Deposit");
  return result;
}

//SWAGGER: ManualDeposit

function PerformManualDeposit(account, amount, paymentid, promotionid = "") {
  const result = ApiService.put("deposit/manual", {
    account: account,
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
  });
  return result;
}

function PerformManualThirdPartyDeposit(
  amount,
  paymentid,
  promotionid = "",
  banktype
) {
  const result = ApiService.put("deposit/manual/thirdparty", {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: banktype || "thirdparty",
  });
  return result;
}

function PerformUsdtDeposit(amount, paymentid, promotionid, banktype) {
  const result = ApiService.put("deposit/manual/usdt", {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: banktype || "usdt",
  });
  return result;
}

function PerformPulsaDeposit(amount, paymentid, promotionid, banktype, note) {
  var params = {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: banktype || "pulsa"
  }
  if(note !== undefined && note !== null)
  {
    params.note = note;
  }
  const result = ApiService.put("deposit/manual/pulsa", params);
  return result;
}

function PerformEWalletDeposit(amount, paymentid, promotionid, banktype, note, emoneyname) {
  var params = { 
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: banktype || "ewallet",
    emoneyname: emoneyname
  }
  if(note !== undefined && note !== null)
  {
    params.note = note;
  }
  const result = ApiService.put("deposit/manual/ewallet", params);
  return result;
}

function PerformManualBankDeposit(
  name,
  account,
  amount,
  paymentid,
  promotionid = "",
  banktype,
  note
) {
  const result = ApiService.put("deposit/manual/bank", {
    name: name,
    account: account,
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: banktype || "bank",
    note: note
  });
  return result;
}

function PerformManualFPSDeposit(
  account,
  amount,
  paymentid,
  promotionid = "",
  banktype
) {
  const result = ApiService.put("deposit/manual/fps", {
    account: account,
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: banktype || "fps"
  });
  return result;
}

function PerformManualFPSDepositWithName(
  name,
  account,
  amount,
  paymentid,
  promotionid = "",
  banktype
) {
  const result = ApiService.put("deposit/manual/fps", {
    account: name,
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: banktype || "fps",
    name: account
  });
  return result;
}

function PerformLeePayDeposit(amount, paymentid, promotionid = "") {
  const result = ApiService.put("deposit/crypto/leepay", {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
  });
  return result;
}
function GetLeePayExchangeRate(brandPaymentId) {
  const result = ApiService.get(
    `deposit/crypto/leepay/exchangerate/${brandPaymentId}`
  );
  return result;
}
function PerformUmPayBankDeposit(amount, paymentid, promotionid = "") {
  const result = ApiService.post("deposit/bank/umpay", {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
  });
  return result;
}
function PerformUmPayCrytoDeposit(amount, paymentid, promotionid = "") {
  const result = ApiService.post("deposit/crypto/umpay", {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
  });
  return result;
}
function GetUmPayExchangeRate(brandPaymentId) {
  const result = ApiService.get(
    `deposit/crypto/umpay/exchangerate/${brandPaymentId}`
  );
  return result;
}

function PerformPrimePayDeposit(amount, paymentid, promotionid = "") {
  const result = ApiService.post("deposit/bank/primepay", {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
  });
  return result;
}
function PerformMaticPayDeposit(amount, paymentid, promotionid = "") {
  const result = ApiService.post("deposit/bank/maticpay", {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
  });
  return result;
}
function PerformApplePayDeposit(
  amount,
  paymentid,
  promotionid = "",
  transname
) {
  const result = ApiService.post("deposit/bank/applepay", {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    transname: transname,
  });
  return result;
}
function PerformGetManualDepositDetail(id) {
  const result = ApiService.get(`deposit/manual/${id}`);
  return result;
}

function PerformUploadDepositProof(id, file) {
  const result = ApiService.postFile(`deposit/manual/${id}`, file, {});

  return result;
}

//SWAGGER: Withdraw
function GetListOfWithdrawChannel() {
  const result = ApiService.get("withdraw");
  return result;
}
function DoWithdraw(amount, bankinfoid, paypassword, note) {
  var params = {
    amount: amount,
    bankinfoid: bankinfoid,
    paypassword: paypassword
  }
  if(note !== undefined && note !== null)
  {
    params.note = note;
  }
  const result = ApiService.post("withdraw", params);

  return result;
}
function GetBankCardList() {
  const result = ApiService.get("bankinfo");

  return result;
}
function InitBankCard(channelid, bankType, detail) {
  const result = ApiService.post("player/init-bankinfo", {
    paymentchannelid: channelid,
    banktype: bankType,
    detail: detail,
  });

  return result;
}
function AddBankCard(channelid, bankType, detail) {
  const result = ApiService.post("bankinfo", {
    paymentchannelid: channelid,
    banktype: bankType,
    detail: detail,
  });

  return result;
}
function DeleteBankCard(bankInfoId) {
  const result = ApiService.del(
    "bankinfo",
    {
      bankInfoId,
    },
    true
  );

  return result;
}
function CancelDeposit(id) {
  const result = ApiService.del("pc/userRecharge/delete", {
    id,
  });

  return result;
}
function Deposit(amount, payment_id, extend) {
  const result = ApiService.post(
    "pc/userRecharge",
    {
      amount,
      payment_id,
      extend: extend,
    },
    true
  );

  return result;
}

function GetAutoTransferStatus() {
  const result = ApiService.get("player/game/auto-transfer");
  return result;
}

function UpdateAutoTransferStatus() {
  const result = ApiService.post("player/game/auto-transfer");
  return result;
}

function GetMinWithdrawLimit() {
  const result = ApiService.get("withdraw/player/amount");
  return result;
}

function PerformHelp2PayDeposit(amount, paymentid, promotionid = "") {
  const result = ApiService.post("deposit/bank/help2pay", {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
  });
  return result;
}
function PerformSkyPayDeposit(amount, paymentid, promotionid = "") {
  const result = ApiService.post("deposit/bank/skypay", {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
  });
  return result;
}
function GetHelp2PayDeposit(id) {
  const result = ApiService.get("deposit/bank/help2pay/pay/" + id);
  return result;
}
function PerformBankDeposit(amount, paymentid, promotionid = "", paymentcode) {
  const result = ApiService.post(`deposit/bank/${paymentcode.toLowerCase()}`, {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
  });
  return result;
}
function PerformCryptoDeposit(
  amount,
  paymentid,
  promotionid = "",
  paymentcode
) {
  var url = `deposit/crypto/${paymentcode.toLowerCase()}`;
  var params = {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
  };
  if (paymentcode.toUpperCase() === "LEEPAY") {
    const result = ApiService.put(url, params);
    return result;
  } else {
    const result = ApiService.post(url, params);
    return result;
  }
}

function PerformDeposit(
  amount,
  paymentid,
  promotionid = "",
  paymentcode,
  type
) {
  var url = `deposit/${type}/${paymentcode.toLowerCase()}`;
  var params = {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: type
  };
  if (paymentcode.toUpperCase() === "LEEPAY" && type === "crypto") {
    const result = ApiService.put(url, params);
    return result;
  } else {
    const result = ApiService.post(url, params);
    return result;
  }
}

function PerformManualBankDepositWithDetail(
  name,
  account,
  amount,
  paymentid,
  promotionid = "",
  banktype,
  detail,
  note
) {
  var params = {
    name: name,
    account: account,
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: banktype || "bank",
    note: note,
  };
  if(detail !== undefined && detail !== null)
  {
    params.detail = detail;
  }
  const result = ApiService.put("deposit/manual/bank", params);
  return result;
}

function PerformPulsaDepositWithDetail(amount, paymentid, promotionid, banktype, note, detail) {
  var params = {
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: banktype || "pulsa"
  }
  if(note !== undefined && note !== null)
  {
    params.note = note;
  }
  if(detail !== undefined && detail !== null)
  {
    params.detail = detail;
  }
  const result = ApiService.put("deposit/manual/pulsa", params);
  return result;
}

function PerformEWalletDepositWithDetail(amount, paymentid, promotionid, banktype, note, detail, emoneyname) {
  var params = { 
    amount: amount,
    paymentid: paymentid,
    promotionid: promotionid === "" ? null : promotionid,
    banktype: banktype || "ewallet",
    emoneyname: emoneyname
  }
  if(note !== undefined && note !== null)
  {
    params.note = note;
  }
  if(detail !== undefined && detail !== null)
  {
    params.detail = detail;
  }
  const result = ApiService.put("deposit/manual/ewallet", params);
  return result;
}
