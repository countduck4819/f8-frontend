import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
export const authOptions = {
    // Configure one or more authentication providers

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    pages: {
        signIn: "/auth",
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            console.log(token.accessToken, account);
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                // token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token, user }) {
            console.log(session, token, user);
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken;
            session.user.id = token.id;

            return session;
        },
    },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
