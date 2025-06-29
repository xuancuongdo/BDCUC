using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CanhBaoApp.Entities
{
    public class Location : BaseEntities
    {
        public double X1 { get; set; }
        public double Y1 { get; set; }
        public double X2 { get; set; }
        public double Y2 { get; set; }
        public int ZoomLevel { get; set; }
    }
}