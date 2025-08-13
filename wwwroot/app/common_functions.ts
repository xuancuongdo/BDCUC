export class CommonFunctions {
  constructor() {}
  toggleCursor() {
    if (
      $("#draw-point span.esri-icon").hasClass("esri-icon-cursor-filled") ||
      $("#btnIdentify").hasClass("selected")
    ) {
      document.getElementById("viewDiv").style.cursor = "pointer";
    } else {
      document.getElementById("viewDiv").style.cursor = "auto";
    }
  }
}

export function dateToSession(dateStr: string): string {
  const date = new Date(dateStr);
  
  const year = date.getFullYear().toString().slice(-2); // Lấy 2 số cuối của năm
  
  // Tính ngày thứ mấy trong năm
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Format DayOfYear thành 3 chữ số
  const dayOfYearStr = dayOfYear.toString().padStart(3, '0');
  
  return `${year}${dayOfYearStr}0`;
}