export class WebSocketConnection {

    constructor(url) {
        return this.openWebSocket(url);
    }

    openWebSocket(url) {
        let websocket = null;
        let isFirst = false;
        if ('WebSocket' in window) {
            websocket = new WebSocket(url[0]);
        }
        else if ('MozWebSocket' in window) {
            websocket = new MozWebSocket(url[1]);
        }
        else {
            websocket = new SockJS(url[2]);
        }
        return websocket;
    }

}