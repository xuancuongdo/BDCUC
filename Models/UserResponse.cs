using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CanhBaoApp.Models
{
    public class UserResponse
    {
        public string Id { get; set; }
        public string Username { get; set; }
        //public string Token { get; set; }//Bỏ token của app cảnh báo
    }
}