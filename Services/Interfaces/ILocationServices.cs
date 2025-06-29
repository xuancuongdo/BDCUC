using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CanhBaoApp.Models;

namespace CanhBaoApp.Services.Interfaces
{
    public interface ILocationServices
    {
        LocationModel GetLocation();
        Task<bool> UpdateLocation(LocationModel model);
    }
}