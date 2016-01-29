﻿CREATE TABLE [dbo].[AspNetUsers] (
    [Id]                NVARCHAR (128)  NOT NULL,
    [Email]             NVARCHAR (256)  NULL,
    [EmailConfirmed]    BIT             NOT NULL,
    [PasswordHash]      NVARCHAR (MAX)  NULL,
    [SecurityStamp]     NVARCHAR (MAX)  NULL,
    [TwoFactorEnabled]  BIT             NOT NULL,
    [LockoutEndDateUtc] DATETIME        NULL,
    [LockoutEnabled]    BIT             NOT NULL,
    [AccessFailedCount] INT             NOT NULL,
    [UserName]          NVARCHAR (256)  NOT NULL,
    [Address]           NVARCHAR (200)  NULL,
    [CompanyName]       NVARCHAR (200)  NULL,
    [ImageName]         NVARCHAR (MAX)  NULL,
    [FirstName]         NVARCHAR (200)  NULL,
    [LastName]          NVARCHAR (200)  NULL,
    [Telephone]         NVARCHAR (200)  NULL,
    [UserComments]      NVARCHAR (1000) NULL,
    [EmployeeId]        BIGINT          NULL,
    CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED ([Id] ASC)
);
