import React, { useState } from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Buffer } from "buffer";
import book from "../../assets/logo2.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Login = () => {
  const MySwal = withReactContent(Swal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [data, setData] = useState({
  //     email: "",
  //     password: "",

  // })
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // const handleChange = (e) => {
  //     setData({
  //         ...data,
  //         [e.target.name]: e.target.value
  //     });

  // }
  const handleSubmit = (e) => {
    e.preventDefault();

    let data2 = email + ":" + password;
    const request = Buffer.from(data2).toString("base64");
    console.log(data2);
    AuthenticationService.loginUser(request)
      .then((request) => {
        localStorage.setItem("Token", request.data);
        // if(localStorage.getItem("Token")!==null){
        AuthenticationService.getUserDetails()
          .then((details) => {
            localStorage.setItem("role", details.data.roles);
            localStorage.setItem("loggedUserId", details.data.id);
            window.location.href = "/wishlist";
          })
          .finally();
        // window.location.href="/dashboard"
      })

      .catch((err) => {
        if (err.message === "Request failed with status code 500") {
          MySwal.fire({
            title: <strong>Лозинката е неточна</strong>,
            html: "Обидете се повторно!",
            icon: "error",
          }).then();
        }
      });
  };

  return (
    <div>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={book} className="img-fluid" alt="Phone image" />
          </div>

          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h1 style={{ textAlign: "center" }}>Најава</h1>
            <form className="mt-5">
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  placeholder="Внесете емаил"
                  onChange={handleChangeEmail}
                />
                {/* <label className="form-label" for="form1Example13">Email address</label> */}
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  placeholder="Внесете лозинка"
                  onChange={handleChangePassword}
                />
                {/* <label className="form-label" for="form1Example23">Password</label> */}
              </div>

              {/* <div className="d-flex justify-content-around align-items-center mb-4" style={{float:"right"}}>
            <a href="#!" style={{float:"right"}}>Forgot password?</a>
          </div> */}

              <br />
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn text-white btn-lg btn-block"
                style={{ width: "100%", backgroundColor: "#F58634" }}
              >
                Најави се
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
