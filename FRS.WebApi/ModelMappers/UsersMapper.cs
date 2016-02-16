﻿using System.Linq;
using FRS.Models.IdentityModels;
using FRS.WebApi.Models.Users;

namespace FRS.WebApi.ModelMappers
{
    public static class UsersMapper
    {
        public static UsersModel MapUserFromServerToClient(this AspNetUser source)
        {
            var toReturn = new UsersModel
            {
                Address = source.Address,
                CompanyName = source.CompanyName,
                Email = source.Email,
                FirstName = source.FirstName,
                Id = source.Id,
                ImageName = source.ImageName,
                LastName = source.LastName,
                Telephone = source.Telephone,
                UserName = source.UserName
            };

            var role = source.AspNetRoles.FirstOrDefault();
            if (role != null)
            {
                toReturn.Role = role.Name;
            }
            return toReturn;
        }
    }
}