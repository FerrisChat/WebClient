import API from './api/API';

declare global {
    interface Window {
        api?: API;
        waitForAPI(): Promise<API>;
        showLoading(): void;
        startApp(): void;
        _apiPromise: Promise<API>;
        _resolver: Function;
    }
}