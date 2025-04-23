import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { auth } from "../../firebase";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required(),
    }),
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        Cookies.set("token", user.accessToken, { expires: 1 });

        const fullName = `${values.firstName} ${values.lastName}`;
        Cookies.set("user", JSON.stringify({ user_name: fullName }), {
          expires: 1,
        });

        navigate("/projects");
      } catch (error) {
        setErrors({ api: "Error creating account" });
      }

      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h1>Sign Up</h1>
        <p>Create an account to continue</p>
        <label>
          First Name
          <input
            className="input"
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="errorMsg">{formik.errors.firstName}</div>
          )}
        </label>
        <label>
          Last Name
          <input
            className="input"
            type="text"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="errorMsg">{formik.errors.lastName}</div>
          )}
        </label>
        <label>
          Email
          <input
            className="input"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="errorMsg">{formik.errors.email}</div>
          )}
        </label>
        <label>
          Password
          <input
            className="input"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="errorMsg">{formik.errors.password}</div>
          )}
        </label>
        <label>
          Confirm Password
          <input
            className="input"
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="errorMsg">{formik.errors.confirmPassword}</div>
          )}
        </label>
        {formik.errors.api && (
          <div className="errorMsg">{formik.errors.api}</div>
        )}
      </div>
      <div>
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default Signup;
