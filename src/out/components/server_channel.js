import { ServerChannelType } from "../types.js";
export default class ServerChannel extends React.Component {
    data;
    constructor(props) {
        super(props);
        this.data = props;
    }
    get _iconUrl() {
        // If custom channel icons/emojis are implemented, 
        // do it here
        switch (this.data.type) {
            case ServerChannelType.TEXT: return "";
            case ServerChannelType.VOICE: return "";
            case ServerChannelType.STAGE: return "";
            case ServerChannelType.ANNOUNCEMENT: return "";
            default: return "";
        }
    }
    render() {
        return (React.createElement("div", { class: "channels__channel", id: this.data.id },
            React.createElement("img", { src: this._iconUrl }),
            React.createElement("span", { class: "channels__channel__name" }, this.data.name)));
    }
}
//# sourceMappingURL=server_channel.js.map