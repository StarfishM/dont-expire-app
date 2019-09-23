import * as io from "socket.io-client";
import {} from "./actions";

export let socket;

export const init = store => {
  if (!socket) {
    socket = io.connect();
    //all our dispatches of actions will go here
  }
};
