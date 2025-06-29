using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using CanhBaoApp.Models;
using CanhBaoApp.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;

namespace CanhBaoApp.Pages
{
    public class Login : PageModel
    {
        private readonly ILogger<Login> _logger;
        private readonly IAccountServices _accountServices;
        //const string SessionToken = "token";//Bỏ token của app cảnh báo
        public IConfiguration Configuration { get; }
        public Login(ILogger<Login> logger, IAccountServices accountServices,IConfiguration configuration)
        {
            _logger = logger;
            _accountServices = accountServices;
            Configuration = configuration;
        }
        [BindProperty]
        public UserLoginModel user { get; set; }
        public IActionResult OnGet()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToPage("Index");
            }
            return Page();
        }
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                ViewData["ErrorMessage"] = "Sai định dạng tên đăng nhập hoặc mật khẩu.";
                return Page();
            }


            bool isLogin = _accountServices.Login(user);
            if (isLogin)
            {
                var userLogin = _accountServices.GetUser(user.Username);
                List<Claim> claims = new List<Claim>
                        {
                         new Claim(ClaimTypes.Name, user.Username),

                         new Claim(ClaimTypes.Email, !string.IsNullOrEmpty(userLogin.Email)? userLogin.Email: "Không xác định"),
                         new Claim(ClaimTypes.Role, userLogin.Role),
                         new Claim(ClaimTypes.MobilePhone, userLogin.Phone)
                        };
                ClaimsIdentity identity = new ClaimsIdentity(claims, "cookie");
                ClaimsPrincipal principal = new ClaimsPrincipal(identity);
                var timeout = 4;
                await HttpContext.SignInAsync(
                        scheme: CookieAuthenticationDefaults.AuthenticationScheme,
                        principal: principal,
                        properties: new AuthenticationProperties
                        {
                            IsPersistent = true,
                            ExpiresUtc = DateTime.UtcNow.AddHours(timeout)
                        });

                //Bỏ token của app cảnh báo
                //     //request the api to get token
                //     HttpClient client = new HttpClient();
                //     client.BaseAddress = new Uri(Configuration.GetSection("ApiURL").Value);
                //     client.DefaultRequestHeaders.Accept.Clear();

                //     client.DefaultRequestHeaders.Accept.Add(
                //         new MediaTypeWithQualityHeaderValue("application/json"));
                //     UserLoginModel userAPI = new UserLoginModel
                //     {
                //         Username = user.Username,
                //         Password = user.Password
                //     };
                //     HttpResponseMessage response = await client.PostAsJsonAsync(
                //"/api/Account/Authenticate/authenticate", user);
                //     var message = response.EnsureSuccessStatusCode();

                //     if (response.IsSuccessStatusCode)
                //     {
                //         var userResponse = await response.Content.ReadAsAsync<UserResponse>();
                //         HttpContext.Session.SetString(SessionToken, userResponse.Token); 
                //     }
                //     //

                return RedirectToPage("/index");
            }
            ViewData["ErrorMessage"] = "Có lỗi trong quá trình đăng nhập, tên đăng nhập hoặc mật khẩu không đúng.";
            return Page();
        }
    }
}
