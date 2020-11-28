import { createStore } from 'redux';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
	posts:[
		{
			id: 1,
			user_id: "aldy_id",
			liked: 10,
			title: "My Experience being a programmer",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
		},
		{
			id: 2,
			user_id: "ratna_id",
			liked: 2,
			title: "A vacantion to bali",
			description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
		}
	],
	comments:[
		{
			id: 1,
			post_id: 1,
			user_id: "aldy_id",
			comment: "that's beautiful!"
		},
		{
			id: 2,
			post_id: 1,
			user_id: "ratna_id",
			comment: "awesome!"
		}
	],
	users: [
		{
			id: "aldy_id",
			profile_pic: "https://scontent.fbdo9-1.fna.fbcdn.net/v/t1.0-9/125479735_3557134427695539_4280950182300390129_n.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGR9-LXd_8YVRaPoDjKxBxQUVFEFGhk1XtRUUQUaGTVe6IxeN1NepvmYcizxhjbq1TGyC1rWq5J2rV7kRPKtBKf&_nc_ohc=fvtP1G0e4VsAX8SppoP&_nc_ht=scontent.fbdo9-1.fna&oh=337e188ac9cb87b8e0dbffe8db6a02d5&oe=5FE7AE60",
			username: "aldyivans",
			fullname: "Aldy Ivan Syahputra",
			password: "12345"
		},
		{
			id: "ratna_id",
			profile_pic: "https://scontent.fbdo9-1.fna.fbcdn.net/v/t31.0-8/15937307_1406346542741399_4004330123092970167_o.jpg?_nc_cat=109&ccb=2&_nc_sid=cdbe9c&_nc_eui2=AeExrLqma1EcRN1_Hznrcho6ZscgVPqdNBNmxyBU-p00E_eGaMCdxxC_hjbvF2Uc7imNy1xCvRe21R1TB8tiHLUb&_nc_ohc=IdvBr-IdIGAAX9Hc7KD&_nc_ht=scontent.fbdo9-1.fna&oh=b1204afd02781f1e36532daff3e6ef8f&oe=5FE87007",
			username: "ratnananaz",
			fullname: "Tri Ratna Sari",
			password: "666666"
		}
	]
}

export const store = createStore(
	reducer,
	initialState,
	window.devToolsExtension && window.devToolsExtension()
)

function reducer(state,{type,payload}) {
	switch(type){
		case 'CREATE_POST':
			return {
				...state,
				posts: [...state.posts,{
					id: uuidv4(),
					user_id: payload.user_id,
					title: payload.title,
					description: payload.description,
					liked: 0
				}]
			}
		case 'DELETE_POST':
			return {
				...state,
				posts: state.posts.filter(post=>post.id !== payload)
			}
		case 'COMMENT_POST':
			return {
				...state,
				comments: [...state.comments,{
					id: uuidv4(),
					user_id: payload.user_id,
					comment: payload.comment,
					post_id: payload.post_id
				}]
			}
		case 'LIKE_POST':
			return {
				...state,
				posts: state.posts.map(post=> (post.id == payload.id) ? {...post, liked: payload.like} : post)
			}
		default:
			return state;
	}
}