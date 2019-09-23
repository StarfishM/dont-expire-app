exports.calculateExpirationDate = (purchaseDate, daysToExpiry) => {
  let expiryDate = purchaseDate + daysToExpiry;
  return expiryDate;
};
