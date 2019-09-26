const moment = require("moment-timezone");

exports.calculateDefaultExpirationDate = daysToExpiry => {
  const todayDefaultExpiry = new Date();
  const todayDefaultExpiryFormatted = moment(todayDefaultExpiry, "YYYY-MM-DD");
  let calcExpDate = todayDefaultExpiryFormatted.add(daysToExpiry, "days");
  calcExpDate = moment(calcExpDate).tz("Europe/Berlin");

  console.log("calcExpDate unformatted", calcExpDate);
  return calcExpDate;
};

exports.calculateCompareValueForDB = () => {
  const todayRed = new Date();
  const todayRedFormatted = moment(todayRed, "YYYY-MM-DD");
  console.log("today & todayFormatted red", todayRed, todayRedFormatted);
  let expiryFromToday = todayRedFormatted.add("2", "days");
  let expiryFromTodayFormatted = moment(expiryFromToday)
    .tz("Europe/Berlin")
    .toDate();
  console.log(
    "***************expiryFromToday unformatted",
    expiryFromTodayFormatted
  );

  return expiryFromTodayFormatted;
};

exports.calculateOrangeZone = () => {
  const todayOrange = new Date();
  const todayOrangeFormatted = moment(todayOrange, "YYYY-MM-DD");
  console.log(
    "today & todayFormatted orange",
    todayOrange,
    todayOrangeFormatted
  );
  let addFourDaysFromToday = todayOrangeFormatted.add("4", "days");
  let addForDaysFromTodayFormatted = moment(addFourDaysFromToday)
    .tz("Europe/Berlin")
    .toDate();
  console.log(
    "addForDaysFromTodayFormatted unformatted",
    addForDaysFromTodayFormatted
  );

  return addForDaysFromTodayFormatted;
};
