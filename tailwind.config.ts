import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/application/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/application/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  },
  plugins: [],
};
export default config;
