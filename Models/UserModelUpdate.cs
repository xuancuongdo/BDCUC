using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CanhBaoApp.Models
{
    public class UserModelUpdate
    {
        public int? ID { get; set; }
        [Display(Name = "Tên đăng nhập")]
        [StringLength(500, ErrorMessage = "Độ dài của {0} không được vượt quá 500")]
        public string Username { get; set; }
        [Display(Name = "Mật khẩu")]
        [ StringLength(500, ErrorMessage = "Độ dài của {0} không được vượt quá 500")]
        public string Password { get; set; }
        [Display(Name = "Nhập lại Mật khẩu")]
        [StringLength(500, ErrorMessage = "Độ dài của {0} không được vượt quá 500")]
        [Compare("Password", ErrorMessage = "Mật khẩu nhập lại không khớp")]
        public string RetypePassword { get; set; }
        [Required(ErrorMessage = "Trường bắt buộc nhập"), StringLength(500, ErrorMessage = "Độ dài của {0} không được vượt quá 500"), EmailAddress(ErrorMessage = "Sai định sạng email")]
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Display(Name = "Số điện thoại")]
        [Required(ErrorMessage = "Trường bắt buộc nhập"), StringLength(10, ErrorMessage = "Độ dài của {0} không được vượt quá 10"), Phone(ErrorMessage = "Sai định dạng số điện thoại")]
        public string Phone { get; set; }
        [Display(Name = "Vai trò")]
        public string Role { get; set; }
    }
}