import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css';
/*import Images from '../Images';*/
/*import $ from 'jquery';*/
import axios from 'axios';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // const usenavigate=useNavigate();

    localStorage.setItem("theme", "screenLight");

    // For theme change
    const ThemeChange = () => {

        var input = $(".switch input").is(':checked');
            var bodyClass = $("#themeClass").hasClass("screenDark");
            var theme = localStorage.getItem('theme');

            //alert(bodyClass)
            if (bodyClass) {
                $("#themeClass").removeClass("screenDark").addClass("screenLight");
                localStorage.setItem('theme', 'screenLight');
            } else {
                $("#themeClass").removeClass("screenLight").addClass("screenDark");
                localStorage.setItem('theme', 'screenDark');
            }
    }
    
    window.addEventListener('load', function (event) {
        var theme = localStorage.getItem('theme');
        console.log(theme)
        if (theme !== '' || theme !== undefined) {
            $("#themeClass").attr('class', '').addClass(theme);
        } else {
            $("#themeClass").addClass('screenDark');
        }

    });

    // $(document).ready(function () {
    //     $(".secToggler").on("click", function () {
    //         $(".droper").toggleClass("active");
    //     });
    //     $("#clCr").click(function () {
    //         $(".droper").removeClass("active");
    //     });
    // });
    // For Team members
    const secToggler = () => {
        $(".droper").toggleClass("active");
    }

    const TeamHide = () => {
        $(".droper").removeClass("active");
    }


    const passWordEye = () => {
        $(".passWordView").toggleClass("shActive");
        var icon = $(".passWordView").find(".fa");
        if (icon.hasClass("fa-eye")) {
            icon.removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
            icon.removeClass("fa-eye-slash").addClass("fa-eye");
        }
        var x = document.getElementById("txtPassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }


    // const LoginSubmit = (e) => {
    //     e.preventDefault();
    //     if (Validate()) {
    //         console.log(username, password)
    //         fetch('http://localhost:5738/Login/SubmitForm', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //         username: username,
    //         password: password
    //       }),
      
    // })
    //     .then(res => res.json())
    //     .then((result) => {
    //       if(result.Validuser === "Y"){
    //         console.log(result);
    //         navigate('/dashboard');
    //         toast.success('Login Successfully.');
    //        } else {
    //         //    alert("Please check your login information.");
    //            toast.error('Please check your login information!');
    //        }
    //     })
    //     .catch(err => console.log(err))
    //     }
        
    //   }

    const LoginSubmit = (e) => {
        e.preventDefault();
        if (Validate()) {
          console.log({ username: username, password: password });

          const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            console.log('formData', formData);
          axios.post('http://localhost:5738/Login/SubmitForm', formData)
            .then((response) => {
              const result = response.data;
              console.log('data:', result);
              if (result.Validuser === "Y") {
                navigate('/dashboard');
                toast.success('Login Successfully.');
              } else {
                toast.error('Please check your login information!');
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
      

    const Validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }


  return (
    <>
    <div id="switchArea" className="">
        <label className="switch">
          <input type="checkbox" onClick={ThemeChange} defaultChecked />
          <span className="slider round"></span>
        </label>
    </div>

    <div id="themeClass" className="mainLogin screenLight">
         <div className="flexArea">
             <div className="contentArea img-wrapper">
                 
                      {/*<img src={Images.LoginLeftDesign} className="left-top-image light-design" alt='' />*/}
                      <img src="/assests/images/NLogin/left-top-image.png" className="left-top-image light-design" alt='' />
             </div>
            
             <div className="formArea">
                
                      {/*<div><img src={Images.Logo} className="mlogos" alt='' /></div>*/}
                      <div><img src="/assests/images/NLogin/logo.png" className="mlogos" alt='' /></div>
                 <div className="login-part">
                    {/* <div className="event-img">
                         <img id="EV1" runat="server" src="" />
                     </div> */}
                     <div className='login-form-heading'>Login to your Account</div>
                    <form action="" method="post" runat="server" noValidate="novalidate" onSubmit={(e) => LoginSubmit(e)}>
                    <input id="rurl" name="rurl" runat="server" type="hidden" value="" />
                     <div className="formBox">

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                                      {/*<img src={Images.UserIcon} className="inputIcons" alt='' />*/}
                                      <img src="/assests/images/NLogin/user-2.png" className="inputIcons" alt='' />
                            {/* <input type="text" className="form-control" id="txtUserName" value={username} onChange={e=>setUsername(e.target.value)}></input> */}
                            <input type="text" className="form-control" id="txtUserName" value={username} onChange={e=>setUsername(e.target.value)}></input>
                         </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                                      {/*<img src={Images.PasswordIcon} className="inputIcons" alt='' />*/}
                                      <img src="/assests/images/NLogin/password-2.png" className="inputIcons" alt='' />
                            {/* <input type="password" className="form-control" id="txtPassword" value={password} onChange={e=>setPassword(e.target.value)}></input> */}
                            <input type="password" className="form-control" id="txtPassword" value={password} onChange={e=>setPassword(e.target.value)}></input>
                            {/*<span onClick={passWordEye} className="passWordView"><i className="fa fa-eye-slash"></i></span>*/}
                        </div>

                         <div className='app-best-view-text'>Application best viewed at <a href="/">1280 x 720</a> resolution in <a href="/">Google Chrome</a> 59 or above</div>
                         <input type="submit" value="Sign in"  className="btn btn-block loginbtn" />
						{/* <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="False" TabIndex="4" CssclassName="compemail hide" OnClick="LinkButton1_Click1">Forgot  Password?</asp:LinkButton> */}

                         <div className="ftFooter">
                             {/* © Copyright <span id="yearCP"></span> Indus Net Technologies */}
                             {/* <asp:Label ID="lblVersion" runat="server" Text="1.0.4" />  */}
                             <div className="ftFooter">
                                    © Copyright 2023 Indus Net Technologies.<br />
                                    [BreezeERP Version <span id="lblVersion">2.0.29]</span>
                                </div>
                            
                         </div>
                     </div>
                    </form>
                     </div>
                </div>
         </div>


         

     </div>


     
    </>
  )
}
