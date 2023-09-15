/*********************************************************************************************************
 * 1.0     V2.0.41     Sanchita    02/06/2023      FSM - Message will be fired from first tab when logged out from the 2nd tab. Refer: 26273  
 *********************************************************************************************************************************/
using BusinessLogicLayer;
using DataAccessLayer;
using DocumentFormat.OpenXml.Drawing.Charts;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

using System.Web.Http;
using System.Web.Http.Cors;

namespace MyShop.Models
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class FSMDashboard
    {
        //public List<string> Parameter { get; set; }
        //public List<int> Not_Login { get; set; }
        //public List<int> At_Work { get; set; }
        //public List<int> On_Leave { get; set; }

        //For Attendanc Part
        public Int32 lblAtWork { get; set; }
        public Int32 lblOnLeave { get; set; }
        public Int32 lblNotLoggedIn { get; set; }
        public Int32 lblTotal { get; set; }
        ////////////////////////////////


        ///////////////For Shop visit part /////////////////////

        public int TotalVisit { get; set; }
        public int NewVisit { get; set; }
        public int ReVisit { get; set; }

        public decimal AvgPerDay { get; set; }

        public string AvgDurationPerShop { get; set; }



        ///////////////////////////////////////////////////

        ////////Sales Performance ///////////////////////
        public string TODAYSALES { get; set; }
        public string AVGSALES { get; set; }
        public string TOTALSALES { get; set; }

        //////////////////////////////////////////////////




    }
    public class FSMDashboardGridView
    {
        public string Employee { get; set; }
        public string Designation { get; set; }
        public string Branch { get; set; }
        public string Department { get; set; }
        public string State { get; set; }
        public string Supervisor { get; set; }
        public string ContactNo { get; set; }
        public string FirstInTime { get; set; }
        public string LastLogoutTime { get; set; }
        public string CurrentStatus { get; set; }
        public string GPSInactivity { get; set; }
        public string ShopsVisited { get; set; }
        public string OrderValue { get; set; }
        public string CollectionAmt { get; set; }
        public string EMPID { get; set; }
        public string AppliedLeaveDate { get; set; }
    }

    public class FSMDashboardGridViewFV
    {
        public string Employee { get; set; }
        public string Designation { get; set; }
        public string EmployeeID { get; set; }
        public string Branch { get; set; }
        public string LoginID { get; set; }
        public string Department { get; set; }
        public string State { get; set; }
        public string Supervisor { get; set; }
        public string ContactNo { get; set; }
        public string FirstInTime { get; set; }
        public string LastLogoutTime { get; set; }
        public string CurrentStatus { get; set; }
        public string GPSInactivity { get; set; }
        public string ShopsVisited { get; set; }
        public string SalesValue { get; set; }
        public string OrderValue { get; set; }
        public string CollectionAmt { get; set; }
        public string EMPID { get; set; }
        public string AppliedLeaveDate { get; set; }
        public string SupervisorID { get; set; }
    }

    public class FSMDashboardGridViewShopDetails
    {
        public string ShopName { get; set; }
        public string Address { get; set; }
        public string ShopMobile { get; set; }
        public string Type { get; set; }
        public string VisitedDateTime { get; set; }
        public string DurationSpent { get; set; }
        public string Image { get; set; }
        public string PartyStatus { get; set; }
        public string ShopVisitimage { get; set; }

    }

    public class FSMDashboardGridViewATWORK
    {
        public string Employee { get; set; }
        public string Designation { get; set; }
        public string Branch { get; set; }
        public string Department { get; set; }
        public string MobileNo { get; set; }
        public string FirstInTime { get; set; }
        public string LastLogoutTime { get; set; }
        public string CurrentStatus { get; set; }
        public string GPSInactivity { get; set; }
        public string ShopsVisited { get; set; }
        public string OrderValue { get; set; }
        public string CollectionAmt { get; set; }

    }
    public class FSMDashBoardFilter
    {
        public string Type { get; set; }
        public string FilterName { get; set; }
        // leavelist 
        public string selectedusrid { get; set; }
        public string Is_PageLoad { get; set; }
        public string Fromdate { get; set; }
        public string Todate { get; set; }
        public int Uniquecont { get; set; }
        // leavelist End
        public string StateId { get; set; }
        public string EMPCODE { get; set; }

        public string designation { get; set; }

        public string statefilterid { get; set; }

        public int WindowSize { get; set; }
        public string KeyId { get; set; }
        public List<DashboardSettingMapped> DashboardSettingMappedList { get; set; }

        public System.Data.DataTable gridData { get; set; }
        public List<StateData> StateDs { get; set; }
        // Rev Sachita
        public string BranchId { get; set; }
        public string BranchIdTV { get; set; }

        // End of Rev Sachita

        public List<StateData> GetStateList(Int32 userid)
        {
            List<StateData> lststate = new List<StateData>();
            DBEngine objdb = new DBEngine();
            //string query = "select * from (select '' id , 'All' [name] union all select id,state [name] from tbl_master_state ) tbl order by name";
            //string query = "SELECT '' ID , 'All' [Name] Union all SELECT CAST(id as varchar(20)),state [name] FROM TBL_MASTER_STATE WHERE ID IN (SELECT DISTINCT ADD_STATE FROM TBL_MASTER_ADDRESS TMA INNER JOIN tbl_master_contact TMC ON TMC.cnt_internalId = TMA.add_cntId AND cnt_contactType='EM') ";
            //DataTable statetable= objdb.GetDataTable(query);
            System.Data.DataTable statetable = new System.Data.DataTable();
            ProcedureExecute proc = new ProcedureExecute("prc_Dashboard");
            proc.AddPara("@DASHBOARDACTION", "DashboardStateList");
            proc.AddPara("@USERID", userid);
            statetable = proc.GetTable();
            lststate = (from DataRow dr in statetable.Rows
                        select new StateData()
                        {
                            id = dr["id"].ToString(),
                            name = dr["Name"].ToString(),
                        }).ToList();
            return lststate;

        }

        // Mantis Issue 24729
        public List<BranchData> GetBranchList(Int32 userid, String stateIdList)
        {
            List<BranchData> lstbranch = new List<BranchData>();
            DBEngine objdb = new DBEngine();
            System.Data.DataTable branchtable = new System.Data.DataTable();
            ProcedureExecute proc = new ProcedureExecute("prc_Dashboard");
            proc.AddPara("@DASHBOARDACTION", "DashboardBranchList");
            proc.AddPara("@USERID", userid);
            proc.AddPara("@STATEIDLIST", stateIdList);
            branchtable = proc.GetTable();
            lstbranch = (from DataRow dr in branchtable.Rows
                        select new BranchData()
                        {
                            BranchID = Convert.ToInt32( dr["id"]),
                            name = dr["Name"].ToString(),
                        }).ToList();
            return lstbranch;

        }
        // End of Mantis Issue 24729
    }

    public class StateData
    {
        public Int32 StateID { get; set; }
        public string id { get; set; }
        public string name { get; set; }

    }

    // Mantis Issue 24729
    public class BranchData
    {
        public Int32 BranchID { get; set; }
        public string id { get; set; }
        public string name { get; set; }

    }
    // End of Mantis Issue 24729

    public class attendanceResult
    {
        public string TOTAL_EMPLOYEE { get; set; }
        public string TOTAL_ONTIME_PERCENTAGE { get; set; }
        public string TOTAL_ONTIME { get; set; }
        public string TOTAL_LATETODAY { get; set; }
        public string TOTAL_ABSENT { get; set; }
    }
    public class monthlyAttResult
    {
        public string MONTH { get; set; }
        public string EMP_COUNT { get; set; }
        public string ord { get; set; }

    }
    public class userClass
    {
        public string NAME { get; set; }
        public string USER_ID { get; set; }

    }
    public class calenderClass
    {
        public string name { get; set; }
        public string date { get; set; }

    }
    public class leaveClass
    {
        public string name { get; set; }
        public string LeaveStartdate { get; set; }
        public string LeaveEnddate { get; set; }
        public string LEAVETYPE { get; set; }
        public string LEAVE_REASON { get; set; }
        public string CURRENT_STATUS { get; set; }

    }
    public class TotalOrderCount
    {
        public string ORDCNT { get; set; }

    }
    public class TotalOrderValue
    {
        public string ORDVALUE { get; set; }

    }
    public class AvgOrderValue
    {
        public string AVGORDVALUE { get; set; }

    }
    public class OrderDelivered
    {
        public string ORDDELV { get; set; }

    }
    public class OrderValueTopClass
    {
        public string PRODUCT { get; set; }
        public string ORDVALUE { get; set; }

    }
    public class OrderQuantityTopClass
    {
        public string PRODUCT { get; set; }
        public string ORDQTY { get; set; }

    }

    public class topCustomerClass
    {
        public string SHOPNAME { get; set; }
        public string ORDVALUE { get; set; }

    }

    public class topOrderStateClass
    {
        public string STCODE { get; set; }
        public string STATENAME { get; set; }
        public string ORDVALUE { get; set; }

    }
    public class orderCountChartClass
    {
        public string ORDERDATE { get; set; }
        public string ORDCNT { get; set; }

    }
    	
  public class UserListClass {
      public string UserId { get; set; }
      public string UserName { get; set; }
}
    public class orderTotalChartClass
    {
        public string ORDERDATE { get; set; }
        public string ORDVALUE { get; set; }

    }
    public class orderDeliveredChartClass
    {
        public string ORDERDATE { get; set; }
        public string BILLVALUE { get; set; }

    }

    public class getboxClass
    {
        public string total  { get; set; }
        public string approved { get; set; }
        public string rejected { get; set; }
        public string pending { get; set; }

    }
    public class remchart1Class
    {
        public string Amount { get; set; }
        public string months { get; set; }
        
    }
    public class remchart2Class
    {
        public string Amount { get; set; }
        public string Expence_type { get; set; }

    }
    // VIEWpARTYcLASS
    public class ViewpartyClass
    {

         public string Shop_Name	{ get; set; }
         public string Address	{ get; set; }
         public string Shop_Owner	{ get; set; }
         public string Shop_Lat	{ get; set; }
         public string Shop_Long	{ get; set; }
         public string Shop_Owner_Contact	{ get; set; }
         public string PARTYSTATUS	{ get; set; }
         public string MAP_COLOR { get; set; }

    }
    public class TargetAchievementBoxData
    {
        public string Stage { get; set; }
        public string target { get; set; }
        public string Achievement { get; set; }


    }

    public class TargetAchievementMonthData
    {
        public string MONTHYEAR { get; set; }
        public string ENQ_TGT { get; set; }
        public string ENQ_ACH { get; set; }
        public string LEAD_TGT { get; set; }
        public string LEAD_ACH { get; set; }
        public string TD_TGT { get; set; }
        public string TD_ACH { get; set; }
        public string BOOKING_TGT { get; set; }
        public string BOOKING_ACH { get; set; }
        public string RT_TGT { get; set; }
        public string RT_ACH { get; set; }
    }

    public class TargetAchievementEmployeeData
    {
        public string EMP_NAME { get; set; }
        public string DESIG { get; set; }
        public string DEPT { get; set; }        
        public string ENQ_TGT { get; set; }
        public string ENQ_ACH { get; set; }
        public string LEAD_TGT { get; set; }
        public string LEAD_ACH { get; set; }
        public string TD_TGT { get; set; }
        public string TD_ACH { get; set; }
        public string BOOKING_TGT { get; set; }
        public string BOOKING_ACH { get; set; }
        public string RT_TGT { get; set; }
        public string RT_ACH { get; set; }
    }


    public class TgtVsAch
    {
        public List<TargetAchievementBoxData> boxdata { get; set; }
        public List<TargetAchievementMonthData> monthwisedata { get; set; }
        public List<TargetAchievementEmployeeData> employeewisedata { get; set; }
    }

    // Rev 1.0
    public class SessionLogoutCheck
    {
        public string SessionLoddedOut;
    }
    // End of Rev 1.0
}