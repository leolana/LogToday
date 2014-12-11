using LogToday.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LogToday.Controllers
{
    public class TimerController : Controller
    {
        // GET: Timer
        public ActionResult Index()
        {
            var model = new TimerIndexViewModel();
            return View(model);
        }
    }
}