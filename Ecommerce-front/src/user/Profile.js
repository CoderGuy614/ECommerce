import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <div className="form-group">
      <label htmlFor="" className="text-muted">
        {" "}
        Name
      </label>
      <input
        className="form-control"
        type="text"
        onChange={handleChange("name")}
        value={name}
      />
      <label htmlFor="" className="text-muted">
        {" "}
        Email
      </label>
      <input
        className="form-control"
        type="email"
        onChange={handleChange("email")}
        value={email}
      />
      <label htmlFor="" className="text-muted">
        {" "}
        Password
      </label>
      <input
        className="form-control"
        type="password"
        onChange={handleChange("password")}
        value={password}
      />
      <button className="btn btn-primary" onClick={clickSubmit}>
        Submit
      </button>
    </div>
  );

  return (
    <Layout
      title="Update Profile"
      description="Make changes to your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile Update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
