// route.ts
import connectMongoDB from "@/lib/mongodb";
import User from "@/Model/userModel";

export async function POST(req: Request) {
  await connectMongoDB();

  try {
    const { username, title, url } = await req.json();

    // Find the user with the provided username
    const user = await User.findOne({ username });

    // If user is found, update the user's anime list
    if (user) {
      user.animes.push({ title, image_url: url }); // Assuming image_url corresponds to the provided URL
      await user.save();
      console.log(`Added anime ${title} for user ${username}`);
      return new Response(JSON.stringify({
        message: "success"
      }));
    } else {
      console.log(`User ${username} not found`);
    }
  } catch (error) {
    console.error(error);
  }
}
