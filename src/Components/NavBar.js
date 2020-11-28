import { useSelector } from 'react-redux';
import { useState } from "react";

const NavBar = (props) => {
	const users = useSelector((state)=>state.users);
	const user = users.filter(user=> user.id === props.id);

	const pushLogin = () => {
		if(props.user.length === 0) {
			props.history.push('/login')
		} else {
			props.toggleCreate()
		}
	}

	return (
		<div className="navbar navbar-dark blue-gradient">
			<div className="container position-relative">
				<h3 className="navbar-brand font-weight-bold">My Blogger</h3>
				<div className="d-flex">
					<button type="button" className="btn btn-info px-3 waves-effect font-weight-bold" onClick={pushLogin}>
						<i className="fas fa-pencil-alt pr-3" aria-hidden="true"></i>
						Create a Blog
					</button>
					{user.map(user=>{
						return (
							<div className="d-flex" key={user.id}>
								<div className="user d-flex align-items-center pl-2" key={user.id}>
									<div className="profile_pic" onClick={(e)=>props.toggleProfile(user.id)}>
										<img src={user.profile_pic} className="w-100"/>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default NavBar;