export const getJwt = () => {
	let userInfo = JSON.parse(localStorage.getItem('user-Details'));
	if (userInfo) {
		let Info = {
			userName: userInfo[0].userName,
			userId: userInfo[1].userId,
			userToken: userInfo[2].token
		};
		return Info;
	} else {
		let Info = {
			noToken: true
		};
		return Info;
	}
	//console.log(userInfo[0].userName, userInfo[1].userId, userInfo[2].token);
};
