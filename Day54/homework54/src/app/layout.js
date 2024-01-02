import "@/sass/style.scss";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};
export async function generateStaticParams() {
    return [{ lang: "en-US" }, { lang: "de" }];
}
export default function RootLayout({ children, params }) {
    return (
        <html lang={params.lang}>
            <body>{children}</body>
        </html>
    );
}