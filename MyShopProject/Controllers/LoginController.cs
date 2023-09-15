using MyShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BusinessLogicLayer;
using UtilityLayer;
using System.Configuration;

using System.Web.Http;
using System.Web.Http.Cors;

namespace MyShop.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/


        LoginModel model = new LoginModel();
        DBEngine oDBEngine = new DBEngine(ConfigurationManager.AppSettings["DBConnectionDefault"]);


        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Logout()
        {
            return Redirect("/OMS/Signoff.aspx");
        }

        public ActionResult ChangePassword()
        {
            //Mantise issue: 0025122
            //return Redirect("/OMS/Management/ToolsUtilities/frmchangepassword.aspx");
            return Redirect("/OMS/Management/ToolsUtilities/frmchangeuserspassword.aspx");
            //End of  Mantise issue: 0025122
        }

       
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]

        public ActionResult SubmitForm([FromBody] LoginModel omodel)
        {

            Encryption epasswrd = new Encryption();
            string Encryptpass = epasswrd.Encrypt(omodel.password.Trim());

            string Validuser;
            Validuser = oDBEngine.AuthenticateUser(omodel.username, Encryptpass).ToString();
            if (Validuser == "Y")
            {
                var token = GenerateJwtToken(omodel.username);
                //return RedirectToAction("FSMDashboard", "MYSHOP/DashboardMenu");
                return Json(new { Validuser = "Y" });
            }

            else
            {
                //return View();
                return Json(new { Validuser = "N" });
            }
        }

        private object GenerateJwtToken(string username)
        {
            throw new NotImplementedException();
        }
    }
}