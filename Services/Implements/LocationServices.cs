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
    public class LocationServices : ILocationServices
    {
        private ThongBaoContext _dbContext;
        private readonly IMapper _mapper;
        public LocationServices(ThongBaoContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public LocationModel GetLocation()
        {
            var location = _dbContext.Locations.FirstOrDefault();
            var model = _mapper.Map<LocationModel>(location);
            return model;
        }

        public async Task<bool> UpdateLocation(LocationModel model)
        {
            var location = _dbContext.Locations.First();
            location.X1 = model.X1;
            location.X2 = model.X2;
            location.Y1 = model.Y1;
            location.Y2 = model.Y2;
            location.ZoomLevel = model.ZoomLevel;
            _dbContext.Entry(location).State = EntityState.Modified;
            return await _dbContext.SaveChangesAsync() != 0;
        }
    }
}