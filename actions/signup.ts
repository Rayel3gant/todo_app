"use server";

export async function signupAction(formData: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (error) {
    return { error: "Signup failed" };
  }
}
