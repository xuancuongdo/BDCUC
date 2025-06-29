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
    public class CapNhatNguoiDungModel : PageModel
    {
        private readonly ILogger<CapNhatNguoiDungModel> _logger;
        private readonly IMapper _mapper;
        private readonly IAccountServices _accountServices;
        public CapNhatNguoiDungModel(ILogger<CapNhatNguoiDungModel> logger, IAccountServices accountServices, IMapper mapper)
        {
            _logger = logger;
            _accountServices = accountServices;
            _mapper = mapper;
        }

        public void OnGet(int id)
        {
            if (id >= 0)
            {
                user = _accountServices.GetUserByID(id);
            }

        }

        [BindProperty]
        public UserModelUpdate user { get; set; }
        public async Task<IActionResult> OnPostAsync()
        {

            if (!ModelState.IsValid)
            {
                return Page();
            }

            var model = _mapper.Map<UserModel>(user);

            if (user.ID != null)
            {
                var existedUserUpdate = _accountServices.GetUser(model.Username, user.ID.Value);
                if (existedUserUpdate != null)
                {
                    ViewData["ErrorMessage"] = "Người dùng đã tồn tại.";
                    return Page();
                }
                await _accountServices.UpdateAccountAsync(model, user.ID.Value);
                return RedirectToPage("./NguoiDung");
            }
            ViewData["ErrorMessage"] = "Người dùng không tồn tại.";
            return Page();

        }

    }
}
