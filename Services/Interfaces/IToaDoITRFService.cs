using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CanhBaoApp.Models;

namespace CanhBaoApp.Services.Interfaces
{
    public interface IToaDoITRFService
    {
        Task<List<MovingChartModel>> CalculateMovingChart(QueryToaDoITRFModel model);

    }
}