export const theme = {

    
    colors: {
        primary : '#507255',
        secondary : '#26532B ',
        tertiary: '#2CF6B3',
        black: '#000000',
        white: '#ffffff',
        background: '#ffffff',
        primaryTextColor: '#000000',
        secondaryTextColor: '#303030',
        
        buttonsStateColors : {
            hover : '#26532B' ,
            active: "#507255",
            disabled : "#303030",
            focus: "#507255"
        },
        /* notifications */
        danger: '#FD3838',
        warning : '#FFA115',
        success: '#00644F',

    },
    fonts: {
        primaryFont: 'Poppins',
        secondaryFont: 'sans-serif',
        titleFonth1 : '',
    },
    fontSize : {
        paragraphe : {
            small : 'clamp(0.75rem, 0.7321rem + 0.0893vw, 0.8125rem);', /* min: 12px | max: 13px */
            regular : 'clamp(0.9375rem, 0.8839rem + 0.2679vw, 1.125rem);;', /* min: 15px | max: 16px */
            medium : 'clamp(1rem, 0.9643rem + 0.1786vw, 1.125rem);', /* min: 16px | max: 18px */
            large : 'clamp(1.125rem, 1.0536rem + 0.3571vw, 1.375rem);', /* 16px */
        },
        title : {
            h1 : 'clamp(1.8125rem, 1.5rem + 1.6667vw, 3rem)', /* min: 16px | max: 18px */
            h2 : 'clamp(1.125rem, 1.0536rem + 0.3571vw, 1.375rem);', /* min: 16px | max: 18px */
            h3 : 'clamp(0.875rem, 0.8393rem + 0.1786vw, 1rem);', /* min: 16px | max: 18px */
        }
    },
    fontWeight : {
        thin : 100,
        regular : 300,
        bold : 600,
        extraBold : 800,
    },
    
    paddings: {
        textPadding: 5,
        
    },
    margins: {
    
    },
    sizes: {
        navbar : '75px',
    }
}