import { MDBModal, MDBModalHeader } from 'mdbreact';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const BlogDetail = (props) => {

	const [post, setPost] = useState('');

	const onChange = (e) => {
		setPost(prev=>({...prev,[e.target.name]:e.target.value}))
	}

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch({
			type: 'CREATE_POST',
			payload: {
				user_id: props.user[0].id,
				title: post.title,
				description: post.description
			}
		})
	}

	return (
		<MDBModal isOpen={props.modalCreate} toggle={props.toggleCreate} centered>
			<div className="px-5 py-4">
				<h3>Create a blog</h3>
				<form onSubmit={onSubmit}>
					<div className="md-form">
						<input type="text" className="form-control" name="title" onChange={(e)=>onChange(e)} placeholder="Title"/>
					</div>
					<div className="md-form">
						<textarea type="text" className="form-control" name="description" onChange={(e)=>onChange(e)} rows="5" placeholder="Description"></textarea>
					</div>
					<button className="btn btn-info" onClick={props.toggleCreate}>Post</button>
				</form>
			</div>
		</MDBModal>
	)
}

export default BlogDetail;