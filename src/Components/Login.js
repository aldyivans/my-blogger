import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Login = (props) => {

	const [login, setLogin] = useState('');

	const users = useSelector((state)=>state.users);

	const onChange = (e) => {
		setLogin(prev=>({...prev,[e.target.name]:e.target.value}))
	}

	const user = users.filter(user=> user.username == login.username && user.password == login.password );

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();

		console.log(user)

		if(user.length !== 0){
			localStorage.setItem('user_id',user[0].id);
			props.loginAuth();
			props.history.push('/');
		}
	}

	return (
		<div className="login">
			<div className="border shadow w-50 p-3">
				<h3>Login</h3>
				<form onSubmit={onSubmit}>
					<div className="md-form">
						<input type="text" className="form-control" name="username" onChange={(e)=>onChange(e)} placeholder="Username" required/>
					</div>
					<div className="md-form">
						<input type="text" className="form-control" name="password" onChange={(e)=>onChange(e)} placeholder="Password" required/>
					</div>
					<button type="submit" className="btn btn-info" onClick={props.toggleCreate}>Login</button>
				</form>
			</div>
		</div>
	)
}

export default withRouter(Login);