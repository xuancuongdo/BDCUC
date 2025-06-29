using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CanhBaoApp.Models;
using CanhBaoApp.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace CanhBaoApp.Pages
{
    [Authorize(Roles = "ADMIN")]
    public class ThemMoiNguoiDungModel : PageModel
    {
        private readonly ILogger<ThemMoiNguoiDungModel> _logger;
        private readonly IMapper _mapper;
        private readonly IAccountServices _accountServices;
        public ThemMoiNguoiDungModel(ILogger<ThemMoiNguoiDungModel> logger, IAccountServices accountServices, IMapper mapper)
        {
            _logger = logger;
            _accountServices = accountServices;
            _mapper = mapper;
        }

        public void OnGet(int id)
        {
            
        }

        [BindProperty]
        public UserModelAdd user { get; set; }
        public async Task<IActionResult> OnPostAsync()
        {

            if (!ModelState.IsValid)
            {
                return Page();
            }

            var model = _mapper.Map<UserModel>(user);

            
            var existedUserCreate = _accountServices.GetUser(model.Username);
            if (existedUserCreate != null)
            {
                ViewData["ErrorMessage"] = "Người dùng đã tồn tại.";
                return Page();
            }
            await _accountServices.CreateAccountAsync(model);
            return RedirectToPage("./NguoiDung");
        }

    }
}
