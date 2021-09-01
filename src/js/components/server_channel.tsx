import { ServerChannelData, ServerChannelType } from "../types";

// @ts-ignore
export default class ServerChannel extends React.Component {
    data: ServerChannelData;

    constructor(props: ServerChannelData) {
        super(props);
        this.data = props;
    }

    get _iconUrl(): string {
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
        return (
            <div class="channels__channel" id={this.data.id}>
                <img src={this._iconUrl} />
                <span class="channels__channel__name">
                    {this.data.name}
                </span>
            </div>
        )
    }
}
