import type API from './api/API';
import type { ThemeTemplate } from './core/theming/Theme';

declare global {
    type Child = React.ElementType | React.ReactNode;
    type Children = Child | Child[] | Children[];

    type RequiresChildren<P = {}> = { children: Children } & P;
    type SupportsChildren<P = {}> = { children?: Children | [] } & P;

    interface Window {
        app: {
            api: API;
            setTheme?(theme: ThemeTemplate): void;
            updateTheme?(theme: ThemeTemplate): void;
        };
    }
}