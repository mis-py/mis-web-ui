const socketMiddleware = (socket) => (params) => (next) => (action) => {
    const { dispatch, getState } = params;
    const { type } = action;
  
    switch (type) {
      case 'socket/connect':
        socket.connect();
  
        socket.on('open', () => console.log("WebSocket: Connected!"));
        socket.on('message', (data) => {});
        socket.on('close', () => {});
        socket.on('error', (e) => console.log(e));

        break;
  
      case 'socket/disconnect':
        socket.disconnect();
        break;
  
      default:
        break;
    }
  
    return next(action)
  }

export default socketMiddleware;