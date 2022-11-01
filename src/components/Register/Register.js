import { useState } from "react";
import React from "react";
import UserService from "../../repository/userRepository";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import book from "../../assets/logo2.png";
const Register = () => {
  const MySwal = withReactContent(Swal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    const userHelper = {
      person: {
        firstName: firstName,
        lastName: lastName,
      },
      confirmPassword: confirmPassword,
    };
    if (
      userHelper.firstName === "" ||
      userHelper.lastName === "" ||
      email === ""
    ) {
      MySwal.fire({
        title: <strong>Ве молиме пополнете ги сите полиња.</strong>,
        icon: "info",
      }).then(() => {});
    } else {
      if (password !== confirmPassword) {
        MySwal.fire({
          title: <strong>Лозинките не се совпаѓаат</strong>,
          icon: "info",
        }).then(() => {});
      } else {
        UserService.registerUser(userHelper, email, password)
          .then((res) => {
            console.log(res.data);
            setData(res.data);
            MySwal.fire({
              title: <strong>Успешна регистрација!</strong>,
              html: "Проверете го вашиот мејл за комплетирање на регистрацијата!",
              icon: "success",
            }).then();

            // this.setState({data: res.data})
            // console.log(this.state.data)

            // this.setState({
            //     errorMessageVisible: false,
            //     successMessageVisible: true,
            //     successMessage: "Успешна регистрација! Проверете го вашиот мејл за комплетирање на регистрацијата!",
            // });
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 500") {
              // this.setState({
              //     successMessageVisible: false,
              //     errorMessageVisible: true,
              //     errorMessage: "Веќе има регистрирано корисник со тој мејл!",
              // })
            }
          });
        // }
      }
    }
  };

  return (
    <div>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={book} className="img-fluid" alt="Phone image" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h1 style={{ textAlign: "center" }}>Регистрација</h1>
            <form className="mt-5">
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Внесете име"
                  onChange={handleFirstName}
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Внесете презиме"
                  onChange={handleLastName}
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Внесете емаил"
                  onChange={handleChangeEmail}
                />
                {/* <label className="form-label" for="form1Example13">Email address</label> */}
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Внесете лозинка"
                  onChange={handlePassword}
                />
                {/* <label className="form-label" for="form1Example23">Password</label> */}
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Потврди лозинка"
                  onChange={handleConfirmPassword}
                />
                {/* <label className="form-label" for="form1Example23">Password</label> */}
              </div>

              <br />
              <button
                onClick={handlesubmit}
                type="submit"
                className="btn text-white  btn-lg btn-block"
                style={{ width: "100%", backgroundColor: "#F58634" }}
              >
                Регистрирај се
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
