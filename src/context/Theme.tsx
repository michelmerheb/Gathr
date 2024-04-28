interface Theme {
    backgroundColor: string;
    color: string;
}

export const themes: Record<'light' | 'dark', Theme> = {
    light: {
        backgroundColor: '#5B2C6F',
        color: '#000',
    },
    dark: {
        backgroundColor: '#333',
        color: '#fff',
    },
};

export type ThemeName = keyof typeof themes;
