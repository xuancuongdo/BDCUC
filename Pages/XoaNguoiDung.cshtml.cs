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
    public class XoaNguoiDungModel : PageModel
    {
        private readonly ILogger<XoaNguoiDungModel> _logger;
        private readonly IAccountServices _accountServices;
        public UserModelUpdate DeletingUser { get; set; }

        public XoaNguoiDungModel(ILogger<XoaNguoiDungModel> logger, IAccountServices accountServices)
        {
            _logger = logger;
            _accountServices = accountServices;
        }

        public void OnGet(int id)
        {
            if (id >= 0)
            {
                DeletingUser = _accountServices.GetUserByID(id);
            }

        }
        [BindProperty]
        public int userId { get; set; }
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            
            await _accountServices.DeleteAccountAsync(userId);
            return RedirectToPage("./NguoiDung");
        }
    }
}
