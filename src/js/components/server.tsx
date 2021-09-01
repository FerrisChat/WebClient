import { ServerData } from '../types';

// @ts-ignore
export default class Server extends React.Component {
    data: ServerData;

    constructor(props: ServerData) {
        super(props);
        this.data = props;
    }

    render() {
        return (
            <div class="servers__server" id={this.data.id}>
                <a class="servers__server__link">
                    <img src={this.data.iconUrl} />
                </a>
            </div>
        )
    }
}
