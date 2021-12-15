export class MessageManager<T extends (children: Children) => void> {
    setChildren: T;

    constructor(setChildren: T) {
        this.setChildren = setChildren;
    }

    
}

export default function MessageView() {}