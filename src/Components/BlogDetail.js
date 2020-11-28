import { MDBModal } from 'mdbreact';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const BlogDetail = (props) => {
	const [blog,setBlog] = useState({});
	const [input,setInput] = useState('');
	const [like,setLike] = useState(false);

	const posts = useSelector((state)=>state.posts);
	const comments = useSelector((state)=>state.comments);
	const users = useSelector((state)=>state.users);

	const post = posts.filter(post=> post.id == props.byPostId );

	const onChange = (e) => {
		setInput(e.target.value)
	}

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch({
			type: 'COMMENT_POST',
			payload: {
				user_id: props.user_id,
				comment: input,
				post_id: props.byPostId
			}
		})

		setInput("")
	}

	const love = () => {
		if(props.user.length === 0) {
			props.history.push('/login')
		} else {
			if(!like){
				dispatch({
					type: 'LIKE_POST',
					payload: {
						id: post[0].id,
						like: post[0].liked+1,
						post_id: props.byPostId
					}
				})
				setLike(!like)
			} else {
				dispatch({
					type: 'LIKE_POST',
					payload: {
						id: post[0].id,
						like: post[0].liked-1,
						post_id: props.byPostId
					}
				})
				setLike(!like);
			}
		}
	}

	const commentArr = [];

	return (
		<MDBModal isOpen={props.modalDetail} toggle={props.toggleDetail} centered>
			<div className="px-5 py-4 position-relative">
				<h1>{post.length !== 0 ? post[0].title : ""}</h1>
				<hr/>
				<p>{post.length !== 0 ? post[0].description : ""}</p>
				<div className="d-flex text-center pb-3">
					<label className="btn btn-link p-0 m-0" for="comment">
						<i className="fas fa-comment" style={{fontSize:'20px'}} aria-hidden="true"></i>
						<div>{comments.map(comment=>{
							if(comment.post_id === props.byPostId){
								commentArr.push(comment);
							}
						})}
						{commentArr.length}
						</div>
					</label>
					<button className="btn btn-link py-0 m-0 pr-3" onClick={love}>
						<i className={like ? "fas fa-heart text-danger" : "fas fa-heart"} style={{fontSize:'20px'}} aria-hidden="true"></i>
						<div>{post.length !== 0 ? post[0].liked : ""}</div>
					</button>
				</div>
				<div className="mb-5 pb-3">
				{comments.map(comment=>
					users.map(user=>{
						if(comment.post_id === props.byPostId){
							if(comment.user_id === user.id){
								return (
								<div className="d-flex align-items-center py-2">
									<div className="profile_pic" style={{width:"30px",height:"30px"}}>
										<img src={user.profile_pic} className="w-100"/>
									</div>
									<div className="pl-2">
										<button className="btn btn-link p-0 m-0" onClick={()=>props.toggleProfile(user.id)}>
											<span className="font-weight-bold" style={{fontSize:"13px"}}>{user.username}</span>
										</button>
										<p className="m-0" style={{fontSize:"13px"}}>{comment.comment}</p>
									</div>
								</div>
								)
							}
						}
					})
				)}
				</div>
				{props.user.length !== 0 ?
					<div className="commentForm shadow w-100 px-5">
						<form onSubmit={onSubmit}>
							<div className="md-form">
								<input type="text" id="comment" value={input} name="comment" className="form-control" onChange={(e)=>onChange(e)} placeholder="Comment to this post..."/>
							</div>
						</form>
					</div> : ""
				}
			</div>
		</MDBModal>
	)
}

export default BlogDetail;