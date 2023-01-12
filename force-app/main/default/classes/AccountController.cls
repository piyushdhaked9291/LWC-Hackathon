public with sharing class AccountController {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccountDataToExport() {
    List<Account> accList = [
      SELECT
        id,
        name,
        AnnualRevenue,
        BillingCity,
        Phone,
        AccountNumber,
        ShippingStreet,
        Rating
      FROM Account
    ];
    return accList;
  }
}

