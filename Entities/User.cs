using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CanhBaoApp.Entities
{
    public class User : BaseEntities
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
    }
}