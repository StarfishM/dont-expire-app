export default function reducer(state = {}, action) {
    if (action.type === "GET_FRIEND_RELATIONS") {
        // console.log("GET_FRIEND_RELATIONS in reducer:", action);
        state = {
            ...state,
            friendsAndFriendRequests: action.friendsAndFriendRequests
        };
    }
    return state;
}
