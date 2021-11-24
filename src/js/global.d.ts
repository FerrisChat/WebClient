import API from './api/API';
import ThemeManager from './ThemeManager';

type P = any;
type S = any;

declare global {
    interface Window {
        api?: API;
        themeManager: ThemeManager;
        waitForAPI(): Promise<API>;
        showLoading(): void;
        startApp(): void;
        updateChat(): void;
        updateMembers(): void;
        appSetState<K extends keyof S>(
            state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
            callback?: () => void
        ): void;
        _apiPromise: Promise<API>;
        _resolver: Function;
    }
}