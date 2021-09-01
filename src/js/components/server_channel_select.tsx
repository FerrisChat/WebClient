// @ts-nocheck
import { ServerChannelSelectData } from "../types";
import ServerChannel from "./server_channel.js";

export default class ServerChannelSelect extends React.Component {
    data: ServerChannelSelectData;

    constructor(props: ServerChannelSelectData) {
        super(props);
        this.data = props;
    }

    render() {
        return (
            <div class="channels">
                {this.data.channels.map(c => (
                    <ServerChannel name={c.name} id={c.id} type={c.type} />
                ))}
            </div>
        )
    }
}
