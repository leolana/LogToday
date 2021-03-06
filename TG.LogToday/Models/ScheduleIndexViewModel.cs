﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LogToday.Models
{
    public class ScheduleIndexViewModel : ModelBase
    {
        public int CustomerId { get; set; }
        public SelectList Customers { get; set; }
        public int ProjectId { get; set; }
        public SelectList Projects { get; set; }
        public int ModuleId { get; set; }
        public SelectList Modules { get; set; }
        public DateTime Date { get; set; }
        public DateTime InitialTime { get; set; }
        public DateTime FinalTime { get; set; }
        public string Description { get; set; }

        public ScheduleIndexViewModel()
        {
            var customers = new Dictionary<int, string>
            {
                {1, "NeoPack"}
            };
            var projects = new Dictionary<int, string>
            {
                {1, "Neopack - Custos"}
            };
            var modules = new Dictionary<int, string>
            {
                {1, "Cadastro de fornecedores"}
            };
            Projects = new SelectList(projects, "Key", "Value");
            Customers = new SelectList(customers, "Key", "Value");
            Modules = new SelectList(modules, "Key", "Value");
        }
    }
}