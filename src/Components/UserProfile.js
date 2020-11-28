import { MDBModal } from 'mdbreact';
import { useSelector } from 'react-redux';

const UserProfile = (props) => {

	const users = useSelector((state)=>state.users);
	const user = users.filter(user=> user.id === props.byUserId);

	const logout = () => {
		props.logout();
		localStorage.removeItem('user_id');
		window.location.reload(false);
	}

	return (
		<MDBModal isOpen={props.profileOpen} toggle={props.toggleProfile} centered size="sm">
			<div className="position-relative">
				<div className="profile_pic_md">
					<img src={user.length !== 0 ? user[0].profile_pic : ""} className="w-100"/>
				</div>
			</div>
			<div className="px-5 pb-3 pt-5 text-center">
				<h5>{user.length !== 0 ? user[0].fullname : ""}</h5>
				<h6 className="text-black-50">{user.length !== 0 ? "@"+user[0].username : ""}</h6>
				{props.user.length !== 0 ?
					<button className="btn btn-info" onClick={logout}>Logout</button> : ""
				}
			</div>
		</MDBModal>
	)
}

export default UserProfile;