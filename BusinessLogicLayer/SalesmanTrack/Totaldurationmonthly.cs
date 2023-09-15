﻿using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.SalesmanTrack
{
    public class Totaldurationmonthly
    {
        public DataSet GetTotalDurationmonthly(int month, string UserId, int Year)
        {

            DataSet ds = new DataSet();
            ProcedureExecute proc = new ProcedureExecute("FTS_GetShopsVisitSpentDuration_Monthly");
            proc.AddPara("@Month", month);
            proc.AddPara("@Year", Year);
            proc.AddPara("@user_Id", UserId);
            ds = proc.GetDataSet();
            return ds;

        }

    }
}
