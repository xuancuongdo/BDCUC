using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CanhBaoApp.Models;

namespace CanhBaoApp.Services.Interfaces
{
    public interface IAccountServices
    {
        Task<bool> CreateAccountAsync(UserModel model);
        List<UserModelAdd> GetListAccount();
        bool Login(UserLoginModel user);
        UserModel GetUser(string username, int id);
        UserModel GetUser(string username);
        UserModelUpdate GetUserByID(int id);
        Task<bool> DeleteAccountAsync(int userId);
        Task<bool> UpdateAccountAsync(UserModel model,int id);
    }
}