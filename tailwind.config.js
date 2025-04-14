/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",       // Next.js app directory
        "./pages/**/*.{js,ts,jsx,tsx}",     // pages (for older routing)
        "./components/**/*.{js,ts,jsx,tsx}" // reusable components
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
