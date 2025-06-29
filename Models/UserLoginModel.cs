using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CanhBaoApp.Models
{
    public class UserLoginModel
    {
        [Display(Name="Tên đăng nhập")]
        [Required]
        public string Username { get; set; }
        [Display(Name="Mật khẩu")]
        [Required]
        public string Password { get; set; }
    }
}