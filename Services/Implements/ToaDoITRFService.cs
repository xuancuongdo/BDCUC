using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CanhBaoApp.Entities;
using CanhBaoApp.Models;
using CanhBaoApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CanhBaoApp.Services.Implements
{
    public class ToaDoITRFService : IToaDoITRFService
    {
        private ThongBaoContext _dbContext;
        private readonly IMapper _mapper;
        public ToaDoITRFService(ThongBaoContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<MovingChartModel>> CalculateMovingChart(QueryToaDoITRFModel model)
        {
            var list_ToaDo_ITRF = _dbContext.ToaDoItrf.Where(x => x.MakerName.Trim().ToLower().Equals(model.TenTramCORS.Trim().ToLower())
            && Convert.ToInt32(x.Session) >= model.StartDate && Convert.ToInt32(x.Session) <= model.EndDate)
            .OrderBy(x => x.Session);

            // Tính trung bình x_mp
            double TB_xmp = list_ToaDo_ITRF.Average(t => t.X_Mp) ?? 0;
            double TB_ymp = list_ToaDo_ITRF.Average(t => t.Y_Mp) ?? 0;
            double TB_hmp = list_ToaDo_ITRF.Average(t => t.H) ?? 0;

            // Tạo list mới
            var list_calculated = await list_ToaDo_ITRF
                .Select(t => new MovingChartModel
                {
                    CalcDate = ConvertSessionToDate(t.Session).ToString("dd MMM"),          // giữ nguyên session
                    North = (t.X_Mp ?? 0) - TB_xmp,       // tính chênh lệch
                    East = (t.Y_Mp ?? 0) - TB_ymp,
                    Altitude = (t.H ?? 0) - TB_hmp,
                    X_MP = t.X_Mp ?? 0,
                    Y_MP = t.Y_Mp ?? 0
                })
                .ToListAsync();
            return list_calculated;
        }

    
        public static DateTime ConvertSessionToDate(string session)
        {
            if (string.IsNullOrWhiteSpace(session) || session.Length != 6)
                throw new ArgumentException("Session không hợp lệ");

            // Lấy 2 ký tự đầu để tính năm
            int year = int.Parse(session.Substring(0, 2)) + 2000;

            // Lấy 3 ký tự tiếp theo là Day of Year
            int dayOfYear = int.Parse(session.Substring(2, 3));

            return new DateTime(year, 1, 1).AddDays(dayOfYear - 1);
        }

    }
}