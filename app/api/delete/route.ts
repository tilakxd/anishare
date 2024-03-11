import connectMongoDB from "@/lib/mongodb";
import User from "@/Model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  await connectMongoDB();

  try {
    const url = new URL(req.url);
    const animeId = url.searchParams.get("a");

    // Find the user with the provided anime ID and pull the anime from the list
    const updatedUser = await User.findOneAndUpdate(
      { 'animes._id': animeId },
      { $pull: { animes: { _id: animeId } } },
      { new: true }
    );

    if (!updatedUser) {
      // If the user is not found or the anime with the given ID doesn't exist, return an error response
      return new Response(JSON.stringify({ message: "Anime not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Anime deleted successfully" }));

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
