export default class Server extends React.Component {
    data;
    constructor(props) {
        super(props);
        this.data = props;
    }
    render() {
        return (React.createElement("div", { class: "servers__server", id: this.data.id },
            React.createElement("a", { class: "servers__server__link" },
                React.createElement("img", { src: this.data.iconUrl }))));
    }
}
//# sourceMappingURL=server.js.map