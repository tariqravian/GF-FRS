﻿using System;
using System.Security.Claims;
using Cares.Commons;
using FRS.Commons;
using FRS.Interfaces.IServices;

namespace FRS.Implementation.Services
{
    /// <summary>
    /// Service that manages security claims
    /// </summary>
    public class ClaimsSecurityService :  IClaimsSecurityService
    {
        #region Private
        #endregion

        #region Constructor
        #endregion
        
        #region Public
        
        /// <summary>
        /// Add  general claims 
        /// </summary>
        public void AddClaimsToIdentity(string role, string name, string userId, 
            TimeSpan userTimeZoneOffset, ClaimsIdentity identity)
        {
            ClaimHelper.AddClaim(new Claim(ClaimTypes.Role, role), identity);   // role claim
            ClaimHelper.AddClaim(new Claim(ClaimTypes.Name, name), identity);         // user name claim
            ClaimHelper.AddClaim(new Claim(FRSUserClaims.UserTimeZoneOffset, userTimeZoneOffset.ToString()), identity); // User TimeZoneOffset claim
        }

        #endregion
    }
}
