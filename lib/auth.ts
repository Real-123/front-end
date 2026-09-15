import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sanityClient } from "./sanity";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Query to fetch the student by email using GROQ
          const query = `*[_type == "student" && email == $email][0]`;
          const student = await sanityClient.fetch(query, { email: credentials.email });

          // MVP minimal comparison
          if (student && student.password === credentials.password) {
            return { id: student._id, name: student.name, email: student.email };
          }
        } catch (error) {
          console.error("Sanity fetch error during auth:", error);
          // Return null to cleanly fail authentication instead of crashing
          return null;
        }
        
        return null; // Invalid credentials
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
  // Hardcoded fallback string ensures no crash in a fast hackathon environment
  secret: process.env.NEXTAUTH_SECRET || "hackathon-secret-key-123",
};
