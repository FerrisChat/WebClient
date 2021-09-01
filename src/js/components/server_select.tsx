import { ServerSelectData } from "../types";
import Server from "./server";

// @ts-ignore
export default class ServerSelect extends React.Component {
    data: ServerSelectData;

    constructor(props: ServerSelectData) {
        super(props);
        this.data = props;
    }

    render() {
        return (
            <div class="servers">
                {this.data.servers.map(s => (
                    <Server id={s.id} name={s.name} iconUrl={s.iconUrl} />
                ))}
            </div>
        )
    }
}
