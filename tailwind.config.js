export default {
    content: ["./src/**/*.{html,js,vue}"],
    theme: {
        extend: {
            colors: {
                'beige': '#F4E9E1',
                'mustard': '#f2cb50',
            },
            screens: {
                // This is just to allow 1 more breakpoint than the default, can be changed to something else as long as its equal or smaller than 576px
                'xs': '476px',
            },
        },
    },
    plugins: [],
};
