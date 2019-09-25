const moment = require("moment-timezone");
let today = new Date();
let todayFormatted = moment(today, "YYYY-MM-DD");

exports.calculateDefaultExpirationDate = daysToExpiry => {
  let calcExpDate = todayFormatted.add(daysToExpiry, "days");
  calcExpDate = moment(calcExpDate)
    .tz("Europe/Berlin")
    .format("YYYY-MM-DD");
  return calcExpDate;
};

exports.calculateCompareValueForDB = () => {
  let expiryFromToday = todayFormatted.add("2", "days");
  console.log("****expiry from today", expiryFromToday);
  let expiryFromTodayFormatted = moment(expiryFromToday)
    .tz("Europe/Berlin")
    .format("YYYY-MM-DD");
  console.log("****expiry from today", expiryFromTodayFormatted);
  return expiryFromTodayFormatted;
};
