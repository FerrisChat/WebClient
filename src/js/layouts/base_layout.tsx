// @ts-nocheck
import Client from '../internal/client.js';

export default abstract class BaseLayout extends React.Component {
    client: Client;

    constructor(props: { client: Client }) {
        super(props);
        this.client = props.client!; 
    }
}
