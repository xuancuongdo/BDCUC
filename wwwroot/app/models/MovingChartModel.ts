export interface MovingChartModel {
  calcDate: string; // dùng string vì JSON trả về Date ở dạng chuỗi ISO
  north: number;
  east: number;
  altitude: number;
  x_MP: number;
  y_MP: number;
}