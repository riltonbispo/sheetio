"use server";

import {auth} from "@/lib/auth";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: email,
        password: password
      }
    });

    return {success: true, message: "User signed in successfully"};

  } catch (error) {
    const e = error as Error
    return {success: false, message: e.message || "An error occurred during sign in"};
  }
}

export const signUp = async (name: string, email: string, password: string) => {
  await auth.api.signUpEmail({
    body: {
      name: name,
      email: email,
      password: password
    }
  });
}