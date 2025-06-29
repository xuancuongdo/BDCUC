using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CanhBaoApp.Models
{
    public class LocationModel
    {
        [Display(Name = "Tọa độ X điểm 1")]
        [Required(ErrorMessage = "Trường bắt buộc nhập")]
        [RegularExpression(@"^\d+\.?\d*", ErrorMessage = "{0} phải là dạng số.")]
        public double X1 { get; set; }
        [Display(Name = "Tọa độ Y điểm 1")]
        [Required(ErrorMessage = "Trường bắt buộc nhập")]
        [RegularExpression(@"^\d+\.?\d*", ErrorMessage = "{0} phải là dạng số.")]
        public double Y1 { get; set; }
        [Display(Name = "Tọa độ X điểm 2")]
        [Required(ErrorMessage = "Trường bắt buộc nhập")]
        [RegularExpression(@"^\d+\.?\d*", ErrorMessage = "{0} phải là dạng số.")]
        public double X2 { get; set; }
        [Display(Name = "Tọa độ Y điểm 2")]
        [Required(ErrorMessage = "Trường bắt buộc nhập")]
        [RegularExpression(@"^\d+\.?\d*", ErrorMessage = "{0} phải là dạng số.")]
        public double Y2 { get; set; }
        [Display(Name = "Mức độ Zoom")]
        [Required(ErrorMessage = "Trường bắt buộc nhập")]
        [RegularExpression(@"^\d+\.?\d*", ErrorMessage = "{0} phải là dạng số.")]
        public int ZoomLevel { get; set; }
    }
}