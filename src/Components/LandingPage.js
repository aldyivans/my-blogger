import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const LandingPage = (props) => {
	const users = useSelector((state)=>state.users);
	const posts = useSelector((state)=>state.posts);

	const [filter,setFilter] = useState('');
	const [result,setResult] = useState(posts);

	const onChange = (e) => {
		setFilter(e.target.value)
	}

	const dispatch = useDispatch();

	useEffect(()=>{
		onChoose()
	},[posts])

	const onChoose = () => {
		if(filter===props.id){
			setResult(posts.filter(post=> post.user_id == props.id ))
		} else {
			setResult(posts)
		}

		console.log(result)
	}

	const deletePost = (id) => {
		dispatch({
			type: 'DELETE_POST',
			payload: id
		})
	}

	return (
		<div className="mt-5">
			<h5>Filter</h5>
			<select className="browser-default custom-select" onChange={onChange} onClick={onChoose} name="filter">
				<option value="showAll">Show All</option>
				{props.user.length !== 0 ?
					<option value={props.id}>Show My Blog</option> : ""	
				}
			</select>
			<div className="mt-3">
				<div className="list-group">
					{result.length !== 0 ? result.map(post=> {
						return (
						<div className="list-group-item mb-3" key={post.id}>
							{users.map(user=>{
								if(user.id === post.user_id){
									return (
										<div className="d-flex justify-content-between align-items-center pb-3 border-bottom" key={user.id}>
											<div className="user d-flex align-items-center">
												<button className="btn btn-link p-0 m-0" onClick={(e)=>props.toggleProfile(user.id)}>
													<div className="profile_pic">
														<img src={user.profile_pic} className="w-100"/>
													</div>
												</button>
												<button className="btn btn-link p-0 m-0" onClick={(e)=>props.toggleProfile(user.id)}>
													<span className="pl-2 font-weight-bold">{user.username}</span>
												</button>
											</div>
											{user.id === props.id ? 
											<button className="btn btn-link p-0 m-0" onClick={()=>deletePost(post.id)}>
												<i className="fas fa-trash-alt pr-3 text-danger" style={{fontSize:'20px'}} aria-hidden="true"></i>
											</button> : ""
											}
										</div>
									)
								}
							})}
							<div className="post pt-3">
								<button className="btn btn-link p-0 m-0" onClick={(e)=>props.toggleDetail(post.id)}>
									<h5 className="font-weight-bold text-info">{post.title}</h5>
								</button>
								<p>{post.description.length > 30 ? post.description.substr(0,30)+'...' : post.description}</p>
								<button type="button" className="btn btn-link p-0 m-0" onClick={(e)=>props.toggleDetail(post.id)}>
									<span className="text-info">Read More...</span>
								</button>
							</div>
						</div>
						)
					}) : ""}
				</div>
			</div>
		</div>
	)
}

export default LandingPage;