import { createStitches } from "@stitches/react";

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config
} = createStitches({
    theme: {
        colors: {
            primaryAccent1: '#BB2649',
            primaryAccent2: '#E85F5C',
            primaryAccent3: '#BFBFBF',
            secondaryAccent1: '#1C2826',
            secondaryAccent2: '#48392A',
            grayLight1: '#FAFAFA',
            grayLight2: '#BFBFBF',
            grayLight3: '#606060',
            grayDark1: '#060606',
            grayDark2: '#222222',
            grayDark3: '#606060',
        },
        fonts: {
            heading: 'CodeNext-Trial, sans-serif',
            text: 'SF Pro Display, sans-serif',
            mono: 'Menlo, monospace',
        },
        fontSizes: {
            presentationTitle: '60px',
            presentationSubtitle: '40px',
            presentationTextButton: '24px',
            presentationText: '20px',
            navBarButtonLabel: '20px',
            navMenuLinkLabel: '64px',
        }
    },
    media: {},
    utils: {},
})