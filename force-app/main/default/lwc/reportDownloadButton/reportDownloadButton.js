import { LightningElement, wire, track } from "lwc";
import getAccountDataToExport from "@salesforce/apex/AccountController.getAccountDataToExport";
export default class ReportGenerator extends LightningElement {
  //list to store account from class

  @track AccountData = {};

  @wire(getAccountDataToExport)
  wiredData({ error, data }) {
    if (data) {
      console.log("Data", data);

      this.AccountData = data;
    } else if (error) {
      console.error("Error:", error);
    }
  }

  columnHeader = [
    "ID",
    "Name",
    "AnnualRevenue",
    "BillingCity",
    "Phone",
    " AccountNumber",
    "ShippingStreet",
    "Rating"
  ];

  exportAccountData() {
    // table

    let accounttable = "<table>";

    accounttable += "<style>";

    accounttable += "table, th, td {";

    accounttable += "   border: 1px solid black;";

    accounttable += "    border-collapse: collapse;";

    accounttable += "}";

    accounttable += "</style>";

    // Headers

    accounttable += "<tr>";

    this.columnHeader.forEach((element) => {
      accounttable += "<th>" + element + "</th>";
    });

    accounttable += "</tr>";

    // data rows

    this.AccountData.forEach((record) => {
      accounttable += "<tr>";

      accounttable += "<th>" + record.Id + "</th>";

      accounttable += "<th>" + record.Name + "</th>";

      accounttable += "<th>" + record.AnnualRevenue + "</th>";

      accounttable += "<th>" + record.BillingCity + "</th>";

      accounttable += "<th>" + record.Phone + "</th>";

      accounttable += "<th>" + record.AccountNumber + "</th>";

      accounttable += "<th>" + record.ShippingStreet + "</th>";

      accounttable += "<th>" + record.Rating + "</th>";

      accounttable += "</tr>";
    });

    accounttable += "</table>";

    let element =
      "data:application/vnd.ms-excel," + encodeURIComponent(accounttable);

    let downloadElement = document.createElement("a");

    downloadElement.href = element;

    downloadElement.target = "_self";

    downloadElement.download = "Account Data.xls";

    document.body.appendChild(downloadElement);

    downloadElement.click();
  }
}