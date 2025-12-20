import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Here you can add your own authentication logic
        // For now, we'll do a simple check - replace this with your actual auth logic
        if (credentials.email === "test@example.com" && credentials.password === "password") {
          return {
            id: "1",
            email: credentials.email,
            name: "Test User",
          };
        }

        // You can integrate with your existing user database here
        // For example, check against a database or API
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/signin',
    error: '/signin', // Redirect errors back to signin
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true; // Allow all sign-ins for now
    },
    async redirect({ url, baseUrl }) {
      // Redirect to product page with checkout after successful sign in
      if (url.startsWith("/")) return `${baseUrl}/product/screentimejourney?checkout=true`;
      if (new URL(url).origin === baseUrl) return `${baseUrl}/product/screentimejourney?checkout=true`;
      return baseUrl;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };