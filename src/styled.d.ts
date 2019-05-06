import 'styled-components';

declare module 'styled-components' {
    export interface MainTheme {
        borderRadius: string;
        fontSize: string;
        fontWeight: string;
        colors: {
            main: string;
            secondary: string;
        },

        border: string;
    }
}
