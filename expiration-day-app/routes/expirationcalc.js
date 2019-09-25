const moment = require("moment-timezone");
let today = new Date();
let todayFormatted = moment(today, "YYYY-MM-DD");

exports.calculateDefaultExpirationDate = daysToExpiry => {
  console.log("DAYS TO EXPIRY:", daysToExpiry);
  let calcExpDate = todayFormatted.add(daysToExpiry, "days");
  console.log(calcExpDate);
  calcExpDate = moment(calcExpDate)
    .tz("Europe/Berlin")
    .format("YYYY-MM-DD");
  console.log("************calcExpDate", calcExpDate);
  return calcExpDate;
};

exports.calculateCompareValueForDB = () => {
  let expiryFromToday = todayFormatted.add("2", "days");
  let expiryFromTodayFormatted = moment(expiryFromToday)
    .tz("Europe/Berlin")
    .format("YYYY-MM-DD");
  return expiryFromTodayFormatted;
};
