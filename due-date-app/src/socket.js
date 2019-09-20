import * as io from "socket.io-client";
import { chatHistory, chatMessagePosted, newRequest } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        //all our dispatches of actions will go here

        socket.on("chatHistory", msgs => store.dispatch(chatHistory(msgs)));
        socket.on("newMsgPosted", msgPosted =>
            store.dispatch(chatMessagePosted(msgPosted))
        );
        socket.on("NewFriendRequest", reqObj =>
            store.dispatch(newRequest(reqObj))
        );
    }
};
