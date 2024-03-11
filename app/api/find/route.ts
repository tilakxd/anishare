// route.ts
import connectMongoDB from "@/lib/mongodb";
import User from "@/Model/userModel";

export async function POST(req: Request) {
  await connectMongoDB();

  try {
    const { username } = await req.json();

    // Find the user with the provided username
    const user = await User.findOne({ username });

    // If user is found, update the user's anime list
    if (user) {
      const responseData = {
        message: "success",
        animes: user.animes,
      };

      return new Response(JSON.stringify(responseData));
    } else {
      return new Response(
        JSON.stringify({
          message: "No user found register this username to claim this page",
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
}
