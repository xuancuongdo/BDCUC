using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CanhBaoApp.Models
{
    public class UserModel
    {

        [Required, StringLength(500)]
        public string Username { get; set; }
        [Required, StringLength(500)]
        public string Password { get; set; }
        [Required, StringLength(500), EmailAddress]
        public string Email { get; set; }
        [Required, StringLength(10), Phone]
        public string Phone { get; set; }
        public string Role { get; set; }
    }
}