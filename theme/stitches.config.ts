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
            presentationTitleDesktop: '64px',
            presentationSubtitle: '40px',
            presentationSubtitleDesktop: '60px',
            presentationTextButton: '24px',
            presentationTextButtonDesktop: '36px',
            presentationText: '20px',
            presentationTextDesktop: '40px',
            navBarButtonLabel: '20px',
            navBarButtonLabelDesktop: '32px',
            navMenuLinkLabel: '64px',
            navMenuLinkLabelDesktop: '72px',
        }
    },
    media: {
        sm: '(min-width: 640px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 1024px)',
    },
    utils: {},
})