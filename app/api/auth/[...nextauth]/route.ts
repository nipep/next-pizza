import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";
import { signIn } from "next-auth/react";
import { authOptions } from "@/shared/constants/auth-options";



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
