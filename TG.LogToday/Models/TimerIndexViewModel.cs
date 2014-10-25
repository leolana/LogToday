using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LogToday.Models
{
    public class TimerIndexViewModel
    {
        public int TaskId { get; set; }
        public string Description { get; set; }
        public int ModuleId { get; set; }
        public string Minutes { get; set; }
        public DateTime TaskDate { get; set; }
        public DateTime InitialTime { get; set; }
        public DateTime FinalTime { get; set; }
    }
}