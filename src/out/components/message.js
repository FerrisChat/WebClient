export default class Message extends React.Component {
    data;
    constructor(props) {
        super(props);
        this.data = props;
    }
    render() {
        return (React.createElement("div", { class: "message", id: this.data.id },
            React.createElement("div", { class: "message__content" }, this.data.content)));
    }
}
//# sourceMappingURL=message.js.map