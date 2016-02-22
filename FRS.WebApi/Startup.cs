﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(FRS.WebApi.Startup))]

namespace FRS.WebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            ConfigureAuth(app);
        }
    }
}
