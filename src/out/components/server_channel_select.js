import ServerChannel from "./server_channel.js";
export default class ServerChannelSelect extends React.Component {
    data;
    constructor(props) {
        super(props);
        this.data = props;
    }
    render() {
        return (React.createElement("div", { class: "channels" }, this.data.channels.map(c => (React.createElement(ServerChannel, { name: c.name, id: c.id, type: c.type })))));
    }
}
//# sourceMappingURL=server_channel_select.js.map