import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/login";
			axios.post(url, data).then(res => {
				sessionStorage.setItem("STUDENT_DATA", JSON.stringify([res.data]))
				window.location = "/student_home";
			})
			//localStorage.setItem("token", res.data);


		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};


	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<br /><br />
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
					<div className="col">
						<br /><br />
						<center>
							<a href="/supervisors/login" className="btn " style={{ fontSize: "14px", fontWeight: "bold", backgroundColor: "#3bb19b", color: "white", borderRadius: "100px", padding: "10px" }}>
								Supervisor </a> <br /><br />
							<a href="/panelMember" className="btn" style={{ fontSize: "14px", fontWeight: "bold", backgroundColor: "#3bb19b", color: "white", borderRadius: "100px", padding: "10px" }}>
								Panel Member
							</a>
						</center>
					</div>

				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/add">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div >
	);
};

export default Login;
