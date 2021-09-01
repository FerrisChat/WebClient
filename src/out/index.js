// @ts-nocheck
import handle from './internal/handle.js';
const MESSAGE = "Don't paste anything into this console without knowing "
    + "what you're doing first. Your account could get compromised!";
console.log('%c' + MESSAGE, 'font-size:23px;');
handle();
// Debug
import ServerLayout from './layouts/server_layout.js';
import Client from './internal/client.js';
ReactDOM.render(React.createElement(ServerLayout, { client: new Client() }), document.getElementById('app'));
//# sourceMappingURL=index.js.map