import { NextApiRequest, NextApiResponse } from 'next';
import connectMongoDB from '@/lib/mongodb';
import User from '@/Model/userModel';

export async function PUT(req: Request) {
  try {
    await connectMongoDB();
    const { _id } = await req.json();

    const user = await User.findOne({ 'animes._id': _id });

    if (user) {
      const updatedAnimes = user.animes.map((anime: { _id: { toString: () => any; }; completed: boolean; }) => {
        if (anime._id.toString() === _id) {
          anime.completed = !anime.completed;
          return anime; // Return the updated anime object
        }
        return anime;
      });

      user.animes = updatedAnimes;
      await user.save();

      // Find the updated anime object
      const updatedAnime = updatedAnimes.find((anime: { _id: { toString: () => any; }; completed: boolean; }) => anime._id.toString() === _id);

      return new Response(JSON.stringify(updatedAnime));
    } else {
      return new Response(JSON.stringify({
        'message': 'Anime not found'
      }));
    }
  } catch (error) {
    console.error(error);
    // You may want to return an error response here
  }
}

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { _id } = await req.json();

    const user = await User.findOne({ 'animes._id': _id });

    if (user) {
      // Find the anime with the specified _id
      const anime = user.animes.find((anime: { _id: { toString: () => any; } }) => anime._id.toString() === _id);

      if (anime) {
        return new Response(JSON.stringify(anime));
      } else {
        return new Response(JSON.stringify({
          'message': 'Anime not found'
        }));
      }
    } else {
      return new Response(JSON.stringify({
        'message': 'User not found'
      }));
    }
  } catch (error) {
    console.error(error);
    // You may want to return an error response here
  }
}
