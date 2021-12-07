import { useState } from 'react';

export function usePromiseTracker<T>(promise: Promise<T>): {
    resolved: boolean,
    result?: T,
    setResolved(v: boolean): any,
    setResult(v?: T): any,
} {
    const [ resolved, setResolved ] = useState(false);
    const [ result, setResult ] = useState<T>();

    promise.then((r: T) => {
        setResolved(true);
        setResult(r);
    });

    return {
        resolved,
        result,
        setResolved,
        setResult,
    };
}