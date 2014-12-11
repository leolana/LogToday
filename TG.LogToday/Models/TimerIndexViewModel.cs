using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LogToday.Models
{
    public class TimerIndexViewModel
    {
        public int TaskId { get; set; }
        public string Description { get; set; }
        public int ModuleId { get; set; }
        public SelectList Modules { get; set; }
        public string Minutes { get; set; }
        public DateTime TaskDate { get; set; }
        public DateTime InitialTime { get; set; }
        public DateTime FinalTime { get; set; }

        public TimerIndexViewModel()
        {
            var modules = new Dictionary<int, string>
            {
                {1, "Cadastro de fornecedores"}
            };
            Modules = new SelectList(modules, "Key", "Value");
        }
    }
}