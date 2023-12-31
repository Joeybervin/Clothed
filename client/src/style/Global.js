import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

//'Major Mono Display'

:root {
    font-family: monospace , Inter, system-ui, Montserrat, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
}

* {
	box-sizing: border-box;
}

html, body, div, span, h1, h2, h3, p, a,img,ol, ul, li, form, label, legend, article, aside, figure, figcaption, footer, header, nav, output, section {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
html, body {
	overflow-x: hidden;
	max-width: 100vw;
	-ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
}
body::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
body {
    min-height: 100vh;
    min-width: 300px;
}
a {
	text-decoration: none;
	color: #000000;
}
ol, ul {
	list-style: none;
}

/* Make images easier to work with */
img,
picture {
max-width: 100%;
display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
font: inherit;
}











`;
