using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CanhBaoApp.Models;
using CanhBaoApp.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace CanhBaoApp.Pages
{
    [Authorize(Roles = "ADMIN")]
    public class NguoiDung : PageModel
    {
        private readonly ILogger<NguoiDung> _logger;
        private readonly IAccountServices _accountServices;
        public List<UserModelAdd> userModel { get; set; }
        public NguoiDung(ILogger<NguoiDung> logger, IAccountServices accountServices)
        {
            _logger = logger;
            _accountServices = accountServices;
        }

        public void OnGet()
        {
            userModel = _accountServices.GetListAccount();
        }
    }
}
