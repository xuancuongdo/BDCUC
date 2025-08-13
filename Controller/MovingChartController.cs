using System;
using System.Collections.Generic;
using System.Configuration;
using System.Threading.Tasks;
using CanhBaoApp.Models;
using CanhBaoApp.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CanhBaoApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MovingChartController : ControllerBase
    {
        private readonly ILogger<MovingChartController> _logger;
        private readonly IToaDoITRFService _toaDoService;

        public MovingChartController(ILogger<MovingChartController> logger, IToaDoITRFService toaDoService)
        {
            _logger = logger;
            _toaDoService = toaDoService;
        }

        // GET: api/<MovingChartController>
        [HttpGet]
        public async Task<IEnumerable<MovingChartModel>> Get([FromQuery] QueryToaDoITRFModel model)
        {
            try
            {
                return await _toaDoService.CalculateMovingChart(model);
            }
            catch (Exception ex)
            {
                _logger.LogError("moving chart error:" + ex.Message);
            }
            return null;
        }
    }
}
