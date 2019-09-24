const moment = require("moment");

exports.calculateExpirationDate = (purchaseDate, daysToExpiry) => {
  let expiryDate = moment(purchaseDate, "YYYY-MM-DD");
  let calcExpDate = expiryDate.add(daysToExpiry, "days");
  calcExpDate = moment(calcExpDate)
    .utc()
    .format("YYYY-MM-DD");
  return calcExpDate;
};
