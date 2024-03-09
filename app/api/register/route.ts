// route.ts
import connectMongoDB from "@/lib/mongodb";
import User from "@/Model/userModel";

export async function POST(req: Request) {
  await connectMongoDB();
  try {
    const { username, password } = await req.json();
    if (!username) {
        return new Response(JSON.stringify({
            error: "no username"
        }))
    }
    if (!password) {
        return new Response(JSON.stringify({
            error: "no password"
        }))
    }
    const exist = await User.findOne({ username: username });
    if (exist) {
        return new Response(JSON.stringify({
            error: "Username already exists"
        }))
    }
    const user = await User.create({
        username,
        password,
      });
      return new Response(user);
  } catch (error) {
    console.log(error)
  }
}

  