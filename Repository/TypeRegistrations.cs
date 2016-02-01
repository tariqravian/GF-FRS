﻿using FRS.Interfaces.Repository;
using FRS.Repository.BaseRepository;
using FRS.Repository.Repositories;
using Microsoft.Practices.Unity;

namespace FRS.Repository
{
    /// <summary>
    /// Repository Type Registration
    /// </summary>
    public static class TypeRegistrations
    {
        /// <summary>
        /// Register Types for Repositories
        /// </summary>
        public static void RegisterType(IUnityContainer unityContainer)
        {
            unityContainer.RegisterType<IMenuRightRepository, MenuRightRepository>();
            unityContainer.RegisterType<BaseDbContext>(new PerRequestLifetimeManager());
            unityContainer.RegisterType<IMenuRepository, MenuRepository>();
            unityContainer.RegisterType<IWebApiUserRepository, WebApiUserRepository>();
            unityContainer.RegisterType<IUserRepository, UserRepository>();
            unityContainer.RegisterType<IUserDetailsRepository, UserDetailsRepository>();
            unityContainer.RegisterType<IEmployeeRepository, EmployeeRepository>();
            unityContainer.RegisterType<ILoadRepository, LoadRepository>();
            unityContainer.RegisterType<ILoadMetaDataRepository, LoadMetaDataRepository>();
            unityContainer.RegisterType<ILoadMetaDataRepository, LoadMetaDataRepository>();
            unityContainer.RegisterType<IMT940BalanceRepository, MT940BalanceRepository>();
            unityContainer.RegisterType<IMT940CustomerStatementRepository, MT940CustomerStatementRepository>();
            unityContainer.RegisterType<ILoadTypeRepository, LoadTypeRepository>();
            unityContainer.RegisterType<ISourceRepository, SourceRepository>();
            unityContainer.RegisterType<ICurrencyRepository, CurrencyRepository>();
            unityContainer.RegisterType<IStatusRepository, StatusRepository>();
            unityContainer.RegisterType<IFileContentRepository, FileContentRepository>();
            unityContainer.RegisterType<IMT940LoadRepository, MT940LoadRepository>();
        }
    }
}