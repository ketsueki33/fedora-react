/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                graphite: "#1a1f26",
                metablue: "#5b9bf8",
            },
        },
    },
    plugins: [],
};
