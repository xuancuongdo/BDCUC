using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CanhBaoApp.Entities;
using CanhBaoApp.Models;
using CanhBaoApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CanhBaoApp.Services.Implements
{
    public class AccountServices : IAccountServices
    {
        private ThongBaoContext _dbContext;
        private readonly IMapper _mapper;
        public AccountServices(ThongBaoContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<bool> CreateAccountAsync(UserModel model)
        {
            var entity1 = _mapper.Map<User>(model);
            entity1.Password = ConvertSHA256(model.Password);
            _dbContext.Users.Add(entity1);
            return await _dbContext.SaveChangesAsync() != 0;
        }
        public string ConvertSHA256(string code)
        {
            var mySHA256 = SHA256.Create();
            var Sb = new StringBuilder();
            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(code));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }
            code = Sb.ToString();
            return code;
        }

        public List<UserModelAdd> GetListAccount()
        {
            var lst = _dbContext.Users
                .OrderBy(x => x.ID)
                .ProjectTo<UserModelAdd>(_mapper.ConfigurationProvider).ToList();
            return lst;
        }

        public bool Login(UserLoginModel user)
        {
            var Password = ConvertSHA256(user.Password);
            var isLogin = _dbContext.Users.Any(x => x.Username.ToLower().Equals(user.Username.ToLower().Trim()) && x.Password.Equals(Password));
            return isLogin;
        }

        public UserModel GetUser(string username)
        {
            var user = _dbContext.Users.Where(x => x.Username.ToLower().Equals(username.ToLower().Trim())).FirstOrDefault();
            var model = _mapper.Map<UserModel>(user);
            return model;
        }

        public UserModelUpdate GetUserByID(int id)
        {
            var user = _dbContext.Users.Find(id);
            var model = _mapper.Map<UserModelUpdate>(user);
            return model;
        }

        public async Task<bool> DeleteAccountAsync(int userId)
        {
            var user = _dbContext.Users.Find(userId);
            _dbContext.Users.Remove(user);
            var result = await _dbContext.SaveChangesAsync();
            return result != 0;
        }

        public async Task<bool> UpdateAccountAsync(UserModel model, int id)
        {
            var user = _dbContext.Users.Find(id);
            // user = _mapper.Map<User>(model);
            user.Email = model.Email;
            user.Phone = model.Phone;
            user.Role = model.Role;
            if (!string.IsNullOrEmpty(model.Password))
            {
                user.Password = ConvertSHA256(model.Password);
            }

            _dbContext.Entry(user).State = EntityState.Modified;
            return await _dbContext.SaveChangesAsync() != 0;
        }

        public UserModel GetUser(string username, int id)
        {
            var user = _dbContext.Users.Where(x => x.Username.ToLower().Equals(username.ToLower().Trim()) && x.ID != id).FirstOrDefault();
            var model = _mapper.Map<UserModel>(user);
            return model;
        }
    }
}