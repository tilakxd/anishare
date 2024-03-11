import { serialize } from "cookie";

export async function GET(req: Request) {
  try {
    const seralized = serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    const response = {
      message: "Logged out successfully!",
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": seralized },
    });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
      }
    );
  }
}