// Create some constants and variables that we'll use later to find out about the workbook structure
console.log("Hello World!");

const viz = document.getElementById("OurViz");
let workbook;
let VizActiveSheet;
let dashboard;
let listsheets;

//Sheets we want to filter
let SaleMap;
let totalSales;
let SalesbyProduct;
let SalesbySegment;

// Log all the information about the workbook with a function

function logWorkbookInformation() {
  //Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  //   get the array of dashboards and standalone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The Sheet with Index[${index}] is: ${element.name}`);
  });
  //   We are only interested in the active sheet
  VizActiveSheet = workbook.activeSheet;
  console.log(`The Active Sheet name is: "${VizActiveSheet.name}"`);

  //   List of all the worksheets within the active sheet
  listsheets = VizActiveSheet.worksheets;
  listsheets.forEach((element) => {
    index = element.index;
    console.log(`The Sheet with Index[${index}] is: ${element.name}`);
  });
  SaleMap = listsheets.find((ws) => ws.name == "SaleMap");
  totalSales = listsheets.find((ws) => ws.name == "Total Sales");
  SalesbyProduct = listsheets.find((ws) => ws.name == "SalesbyProduct");
  SalesbySegment = listsheets.find((ws) => ws.name == "SalesbySegment");
}

// Log the workbook information once the viz is interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);

// tell javascript which button to look for
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// Functions to do when buttons are clicked
function oregonWashfunction() {
  // log what is pressed
  console.log(oregonWashingtonButton.value);

  //apply the filter to all sheets
  SaleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  SalesbyProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  SalesbySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}
oregonWashingtonButton.addEventListener("click", oregonWashfunction);

function clearFilterFunction() {
  SaleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  SalesbyProduct.clearFilterAsync("State");
  SalesbySegment.clearFilterAsync("State");
}
clearFilterButton.addEventListener("click", clearFilterFunction);

function undoFunction() {
  viz.undoAsync();
}
undoButton.addEventListener("click", undoFunction);
