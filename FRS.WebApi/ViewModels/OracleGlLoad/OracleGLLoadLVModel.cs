﻿using System.Collections.Generic;
using FRS.WebApi.Models.OracleGLEntry;

namespace FRS.WebApi.ViewModels.OracleGlLoad
{
    public class OracleGLEntryLVModel
    {
        public OracleGLEntryLVModel()
        {
            OracleGlEntries = new List<OracleGLEntryModel>();
        }

        public IEnumerable<OracleGLEntryModel> OracleGlEntries { get; set; }

        public int TotalCount { get; set; }
        public int TotalRecords { get; set; }
        public int FilteredCount { get; set; }
    }
}