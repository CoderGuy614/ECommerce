import React from "react";
import Layout from "../core/Layout";
import { API } from "../config";

const Signin = () => (
  <Layout title="Sign In" description="Sign In To Node React App">
    {API}
  </Layout>
);

export default Signin;
