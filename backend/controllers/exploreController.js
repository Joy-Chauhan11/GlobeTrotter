import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// city

export const getCities = async (req, res) => {
  try {
    const {
      search,
      country,
      region,
    } = req.query;

    const cities = await prisma.city.findMany({
      where: {
        AND: [
          search
            ? {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {},

          country
            ? {
                country: {
                  equals: country,
                  mode: "insensitive",
                },
              }
            : {},

          region
            ? {
                region: {
                  equals: region,
                  mode: "insensitive",
                },
              }
            : {},
        ],
      },
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cities",
      error: error.message,
    });
  }
};


export const getCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    const city = await prisma.city.findUnique({
      where: {
        id: Number(cityId),
      },
    });

    if (!city) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch city",
      error: error.message,
    });
  }
};


// activities

export const getActivities = async (req, res) => {
  try {
    const {
      search,
      city,
      type,
      maxCost,
      duration,
    } = req.query;

    const activities = await prisma.exploreActivity.findMany({
      where: {
        AND: [
          search
            ? {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {},

          city
            ? {
                city: {
                  name: {
                    contains: city,
                    mode: "insensitive",
                  },
                },
              }
            : {},

          type
            ? {
                type,
              }
            : {},

          maxCost
            ? {
                cost: {
                  lte: Number(maxCost),
                },
              }
            : {},

          duration
            ? {
                duration: {
                  lte: Number(duration),
                },
              }
            : {},
        ],
      },
      include: {
        city: true,
      },
    });

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};


export const getActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const activity =
      await prisma.exploreActivity.findUnique({
        where: {
          id: Number(activityId),
        },
        include: {
          city: true,
        },
      });

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch activity",
      error: error.message,
    });
  }
};