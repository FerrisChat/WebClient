import { useState } from "react";

export function useForceUpdate() {
    const [_, setValue] = useState(0);
    return () => setValue(value => ++value);
}