import Server from "./server.js";
export default class ServerSelect extends React.Component {
    data;
    constructor(props) {
        super(props);
        this.data = props;
    }
    render() {
        return (React.createElement("div", { class: "servers" }, this.data.servers.map(s => (React.createElement(Server, { id: s.id, name: s.name, iconUrl: s.iconUrl })))));
    }
}
//# sourceMappingURL=server_select.js.map