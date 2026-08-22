import { PrismaClient } from "../generated/prisma/client.js";


const prisma = new PrismaClient();

// community
export const getCommunity = async (req, res) => {
  try {
    const {
      search,
      category,
      sort,
    } = req.query;

    const posts = await prisma.communityPost.findMany({
      where: {
        AND: [
          search
            ? {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {},

          category
            ? {
                category,
              }
            : {},
        ],
      },
      orderBy:
        sort === "oldest"
          ? { createdAt: "asc" }
          : { createdAt: "desc" },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch community",
      error: error.message,
    });
  }
};


export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await prisma.communityPost.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch post",
      error: error.message,
    });
  }
};


export const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      tripId,
    } = req.body;

    const post = await prisma.communityPost.create({
      data: {
        title,
        content,
        category,
        tripId,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};


export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    await prisma.communityPost.delete({
      where: {
        id: Number(postId),
      },
    });

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete post",
      error: error.message,
    });
  }
};


// sharing

export const shareTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await prisma.trip.update({
      where: {
        id: Number(tripId),
      },
      data: {
        isPublic: true,
      },
    });

    res.status(200).json({
      message: "Trip shared successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to share trip",
      error: error.message,
    });
  }
};


export const unshareTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await prisma.trip.update({
      where: {
        id: Number(tripId),
      },
      data: {
        isPublic: false,
      },
    });

    res.status(200).json({
      message: "Trip is no longer public",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to unshare trip",
      error: error.message,
    });
  }
};


// public trip

export const getSharedTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await prisma.trip.findFirst({
      where: {
        id: Number(tripId),
        isPublic: true,
      },
      include: {
        stops: {
          include: {
            activities: true,
          },
        },
        expenses: true,
      },
    });

    if (!trip) {
      return res.status(404).json({
        message: "Public trip not found",
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch public trip",
      error: error.message,
    });
  }
};
