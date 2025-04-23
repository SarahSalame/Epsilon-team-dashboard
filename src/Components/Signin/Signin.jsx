import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        // تخزين التوكن
        Cookies.set("token", user.accessToken, { expires: 1 });

        // استخراج اسم من الإيميل (قبل @)
        const emailName = user.email.split("@")[0];
        Cookies.set("user", JSON.stringify({ user_name: emailName }), {
          expires: 1,
        });

        navigate("/projects");
      } catch (error) {
        setErrors({ api: "Invalid email or password" });
      }

      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h1>Sign In</h1>
        <p>Please enter your email and password to continue</p>
        <label htmlFor="email">
          Email
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="errorMsg">{formik.errors.email}</div>
          )}
        </label>
        <label htmlFor="password">
          Password
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="********"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="errorMsg">{formik.errors.password}</div>
          )}
        </label>
        {formik.errors.api && (
          <div className="errorMsg">{formik.errors.api}</div>
        )}
      </div>
      <div>
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Signing In..." : "Sign In"}
        </button>
        <p>
          Don’t have an account? <Link to="/signup">Sign Up</Link>{" "}
        </p>
      </div>
    </form>
  );
};

export default Signin;
