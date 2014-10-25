using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LogToday.Startup))]
namespace LogToday
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
