import connectMongoDB from "@/lib/mongodb";
import User from "@/Model/userModel";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function POST(req: Request) {
  await connectMongoDB();
  try {
    const { username, password } = await req.json();
    if (!username) {
      return new Response(
        JSON.stringify({
          noti: "no username",
        })
      );
    }
    if (!password) {
      return new Response(
        JSON.stringify({
          noti: "no password",
        })
      );
    }
    const user = await User.findOne({ username: username });
    if (user) {
      if (user.password == password) {
        const secret = process.env.JWT_SECRET || "";

        const token = sign(
          {
            username,
          },
          secret,
          {
            expiresIn: MAX_AGE,
          }
        );

        const seralized = serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: MAX_AGE,
          path: "/",
        });

        const response = {
          message: "Authenticated!",
          username: username
        };

        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { "Set-Cookie": seralized },
        });
      } else {
        return new Response(
          JSON.stringify({
            noti: "password is incorrect",
          })
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          noti: "user does not exist",
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
}
