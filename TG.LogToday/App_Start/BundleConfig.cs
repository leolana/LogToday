using System.Web;
using System.Web.Optimization;

namespace LogToday
{
    public class BundleConfig
    {
        public static class ViewsBundles
        {
            public static string CSS_TIMER_INDEX  = "~/assets/css/views/timer/index";
            public static string JS_TIMER_INDEX = "~/assets/js/views/timer/index";

            public static string STYLE_SCHEDULE_INDEX = "~/assets/css/views/schedule/index";
            public static string BUNDLES_SCHEDULE_INDEX = "~/Assets/bundles/views/schedule/index";

            public static string HOME_INDEX = "~/Assets/bundles/views/home/index";

            public static string INFRASTRUCTURE_TASK_SCHEDULER = "~/Assets/bundles/views/infrastructure/taskscheduler";
            public static string INFRASTRUCTURE_LOG = "~/Assets/bundles/views/infrastructure/log";

            public static string STATUS_MONITOR_INDEX = "~/Assets/bundles/views/statusMonitor/index";
            public static string STATUS_MONITOR_FULLSCREEN = "~/Assets/bundles/views/statusMonitor/fullscreen";

            public static string STRATEGY_RECOMMEND = "~/Assets/bundles/views/strategy/recommend";
            public static string STRATEGY_PREFERENCES = "~/Assets/bundles/views/strategy/preferences";

        }
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            //DevOops
            bundles.Add(new StyleBundle("~/assets/bundles/cssbase").Include(
                        "~/plugins/bootstrap/css/bootstrap.css",
                        "~/plugins/jquery-ui/jquery-ui.css",
                        "~/plugins/jquery.fancybox.css",
                        "~/plugins/fullcalendar/fullcalendar.css",
                        "~/plugins/xcharts/xcharts.css",
                        "~/plugins/select2/select2.css",
                        "~/plugins/justified-gallery/justifiedGallery.css",
                        "~/assets/css/style.css"));

            bundles.Add(new ScriptBundle("~/assets/bundles/scriptbase").Include(
                        "~/plugins/jquery/jquery-{version}.js",
                        "~/plugins/jquery/jquery-{version}.intellisense.js",
                        "~/plugins/jquery-ui/jquery-ui.js",
                        "~/plugins/bootstrap/js/bootstrap.js",
                        "~/plugins/justified-gallery/jquery.justifiedGallery.js",
                        "~/plugins/tinymce/tinymce.min.js",
                        "~/plugins/tinymce/jquery.tinymce.min.js",
                        "~/plugins/knockout/knockout-{version}.js",
                        "~/plugins/moment/moment-with-locales.js",
                        "~/assets/js/template.js"));

            //mPurpose
            bundles.Add(new StyleBundle("~/assets/bundles/cssbasepurpose").Include(
                        "~/plugins/bootstrap/css/bootstrap.css",
                        "~/assets/css/icomoon-social.css",
                        "~/plugins/leaflet/leaflet.css"));

            bundles.Add(new ScriptBundle("~/assets/bundles/scriptbasepurpose").Include(
                        "~/plugins/jquery/jquery-{version}.js",
                        "~/plugins/jquery/jquery-{version}.intellisense.js",
                        "~/plugins/bootstrap/js/bootstrap.js",
                        "~/plugins/leaflet/leaflet-src.js",
                        "~/assets/js/jquery.fitvids.js",
                        "~/assets/js/jquery.sequence-min.js",
                        "~/assets/js/jquery.bxslider.js",
                        "~/assets/js/main-menu.js",
                        "~/assets/js/template_mPurpose.js"));

            // VIEWS BUNDLES
            bundles.Add(new StyleBundle(ViewsBundles.CSS_TIMER_INDEX).Include(
                        "~/assets/css/app/views.timer.index.css"));

            bundles.Add(new ScriptBundle(ViewsBundles.JS_TIMER_INDEX).Include(
                        "~/assets/js/app/views.timer.index.js"));

            bundles.Add(new StyleBundle(ViewsBundles.STYLE_SCHEDULE_INDEX).Include(
                        "~/assets/css/app/views.schedule.index.css"));

            bundles.Add(new ScriptBundle(ViewsBundles.BUNDLES_SCHEDULE_INDEX).Include(
                        "~/plugins/fullcalendar/fullcalendar.js",
                        "~/plugins/fullcalendar/gcal.js",
                        "~/assets/js/app/core.fullcalendar.lang.pt-br.js",
                        "~/assets/js/app/views.schedule.index.js"));



            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}
