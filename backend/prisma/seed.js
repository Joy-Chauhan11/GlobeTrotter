import dotenv from "dotenv";
dotenv.config();
import prisma from "../libs/prisma.js";
async function main() {
  console.log("Cleaning existing data...");
  // Due to onDelete: Cascade, deleting users and cities clears almost everything
  await prisma.user.deleteMany();
  await prisma.city.deleteMany();

  console.log("Seeding Users...");
  const user1 = await prisma.user.create({
    data: {
      email: "demo@globetrotter.com",
      passwordHash: "hashed_password", // Placeholder
      firstName: "Alex",
      lastName: "Traveler",
      city: "New York",
      country: "USA",
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "jane@globetrotter.com",
      passwordHash: "hashed_password",
      firstName: "Jane",
      lastName: "Doe",
      role: "USER",
    },
  });

  console.log("Seeding Global Cities...");
  const tokyo = await prisma.city.create({
    data: {
      name: "Tokyo",
      country: "Japan",
      region: "Asia",
      activities: {
        create: [
          { name: "Tokyo Tower", type: "Sightseeing", cost: 20, duration: "2 hours" },
          { name: "Shibuya Crossing", type: "Experience", cost: 0, duration: "1 hour" },
          { name: "Tsukiji Fish Market", type: "Food", cost: 50, duration: "3 hours" }
        ]
      }
    }
  });

  const paris = await prisma.city.create({
    data: {
      name: "Paris",
      country: "France",
      region: "Europe",
      activities: {
        create: [
          { name: "Eiffel Tower", type: "Sightseeing", cost: 30, duration: "3 hours" },
          { name: "Louvre Museum", type: "Culture", cost: 25, duration: "4 hours" }
        ]
      }
    }
  });

  console.log("Seeding Trips...");
  const trip1 = await prisma.trip.create({
    data: {
      userId: user1.id,
      title: "A week in Japan",
      description: "Exploring the best of Tokyo and Kyoto.",
      startDate: new Date("2026-10-12T00:00:00Z"),
      endDate: new Date("2026-10-21T00:00:00Z"),
      budget: 3500.0,
      isPublic: true,
      stops: {
        create: [
          {
            city: "Tokyo",
            country: "Japan",
            startDate: new Date("2026-10-12T00:00:00Z"),
            endDate: new Date("2026-10-16T00:00:00Z"),
            activities: {
              create: [
                { name: "Sushi Making Class", cost: 80, duration: "3 hours" }
              ]
            }
          },
          {
            city: "Kyoto",
            country: "Japan",
            startDate: new Date("2026-10-16T00:00:00Z"),
            endDate: new Date("2026-10-21T00:00:00Z"),
          }
        ]
      },
      expenses: {
        create: [
          { category: "Flights", amount: 1200, description: "Round trip NYC to HND" },
          { category: "Accommodation", amount: 800, description: "Hotels in Tokyo and Kyoto" }
        ]
      }
    }
  });

  const trip2 = await prisma.trip.create({
    data: {
      userId: user1.id,
      title: "Mediterranean escape",
      description: "Relaxing along the coast of France and Italy.",
      startDate: new Date("2026-06-08T00:00:00Z"),
      endDate: new Date("2026-06-19T00:00:00Z"),
      budget: 4500.0,
      isPublic: true,
      stops: {
        create: [
          { city: "Barcelona", country: "Spain", startDate: new Date("2026-06-08T00:00:00Z"), endDate: new Date("2026-06-12T00:00:00Z") },
          { city: "Nice", country: "France", startDate: new Date("2026-06-12T00:00:00Z"), endDate: new Date("2026-06-15T00:00:00Z") },
          { city: "Rome", country: "Italy", startDate: new Date("2026-06-15T00:00:00Z"), endDate: new Date("2026-06-19T00:00:00Z") }
        ]
      }
    }
  });

  console.log("Seeding Community Posts...");
  await prisma.communityPost.create({
    data: {
      userId: user1.id,
      tripId: trip1.id,
      title: "My incredible week in Japan",
      content: "Japan was amazing! Highly recommend visiting Tokyo in October.",
      category: "Trip Report"
    }
  });

  console.log("Seeding Complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
