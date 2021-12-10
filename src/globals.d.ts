import type { ThemeTemplate } from './core/Theme';

declare global {
    type Child = React.ElementType | React.ReactNode;
    type Children = Child | Child[] | Children[];

    type RequiresChildren<P = {}> = { children: Children } & P;
    type SupportsChildren<P = {}> = { children?: Children | [] } & P;

    interface Window {
        app: {
            setTheme?(theme: ThemeTemplate): void;
            updateTheme?(theme: ThemeTemplate): void;
        };
    }
}