import dotenv from "dotenv";
dotenv.config();
import prisma from "../libs/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Cleaning existing data...");
  await prisma.user.deleteMany();
  await prisma.city.deleteMany();

  console.log("Seeding Users...");
  const passwordHash = await bcrypt.hash("test", 12);
  
  const user1 = await prisma.user.create({
    data: {
      email: "test@test.com",
      passwordHash,
      firstName: "Alex",
      lastName: "Traveler",
      city: "New York",
      country: "USA",
      role: "ADMIN",
      profilePictureUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "jane@globetrotter.com",
      passwordHash,
      firstName: "Jane",
      lastName: "Doe",
      city: "London",
      country: "UK",
      role: "USER",
      profilePictureUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "marc@globetrotter.com",
      passwordHash,
      firstName: "Marc",
      lastName: "Smith",
      city: "Berlin",
      country: "Germany",
      role: "USER",
      profilePictureUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80",
    },
  });

  console.log("Seeding Global Cities & Activities...");
  
  const tokyo = await prisma.city.create({
    data: {
      name: "Tokyo",
      country: "Japan",
      region: "Asia",
      imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      activities: {
        create: [
          { name: "Tokyo Tower", type: "Sightseeing", cost: 20, duration: "2 hours", imageUrl: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=80" },
          { name: "Shibuya Crossing", type: "Experience", cost: 0, duration: "1 hour", imageUrl: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=600&q=80" },
          { name: "Tsukiji Fish Market", type: "Food", cost: 50, duration: "3 hours", imageUrl: "https://images.unsplash.com/photo-1551334915-b2866943cce1?w=600&q=80" }
        ]
      }
    }
  });

  const paris = await prisma.city.create({
    data: {
      name: "Paris",
      country: "France",
      region: "Europe",
      imageUrl: "https://images.unsplash.com/photo-1502602881462-8c9dfc1c9c41?w=800&q=80",
      activities: {
        create: [
          { name: "Eiffel Tower", type: "Sightseeing", cost: 30, duration: "3 hours", imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80" },
          { name: "Louvre Museum", type: "Culture", cost: 25, duration: "4 hours", imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" },
          { name: "Seine River Cruise", type: "Experience", cost: 18, duration: "1 hour", imageUrl: "https://images.unsplash.com/photo-1555562772-2ea90021570d?w=600&q=80" }
        ]
      }
    }
  });

  const rome = await prisma.city.create({
    data: {
      name: "Rome",
      country: "Italy",
      region: "Europe",
      imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
      activities: {
        create: [
          { name: "Colosseum Tour", type: "Sightseeing", cost: 25, duration: "2 hours", imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80" },
          { name: "Vatican Museums", type: "Culture", cost: 35, duration: "4 hours", imageUrl: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&q=80" }
        ]
      }
    }
  });

  const bali = await prisma.city.create({
    data: {
      name: "Bali",
      country: "Indonesia",
      region: "Asia",
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      activities: {
        create: [
          { name: "Ubud Monkey Forest", type: "Nature", cost: 10, duration: "2 hours", imageUrl: "https://images.unsplash.com/photo-1588661642232-a25e9ed01004?w=600&q=80" },
          { name: "Tegallalang Rice Terrace", type: "Nature", cost: 5, duration: "3 hours", imageUrl: "https://images.unsplash.com/photo-1552601726-17a3a9ec1a6f?w=600&q=80" },
          { name: "Scuba Diving", type: "Adventure", cost: 80, duration: "5 hours", imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80" }
        ]
      }
    }
  });

  const newyork = await prisma.city.create({
    data: {
      name: "New York",
      country: "USA",
      region: "North America",
      imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
      activities: {
        create: [
          { name: "Central Park Walk", type: "Nature", cost: 0, duration: "3 hours", imageUrl: "https://images.unsplash.com/photo-1595180436440-42861edbb26b?w=600&q=80" },
          { name: "Top of the Rock", type: "Sightseeing", cost: 40, duration: "2 hours", imageUrl: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=600&q=80" },
          { name: "Broadway Show", type: "Entertainment", cost: 150, duration: "3 hours", imageUrl: "https://images.unsplash.com/photo-1551694247-495cc55d04cc?w=600&q=80" }
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
      imageUrl: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80",
      stops: {
        create: [
          {
            city: "Tokyo",
            country: "Japan",
            startDate: new Date("2026-10-12T00:00:00Z"),
            endDate: new Date("2026-10-16T00:00:00Z"),
            activities: {
              create: [
                { name: "Sushi Making Class", cost: 80, duration: "3 hours" },
                { name: "Shinjuku Night Tour", cost: 40, duration: "4 hours" }
              ]
            }
          },
          {
            city: "Kyoto",
            country: "Japan",
            startDate: new Date("2026-10-16T00:00:00Z"),
            endDate: new Date("2026-10-21T00:00:00Z"),
            activities: {
              create: [
                { name: "Fushimi Inari Hike", cost: 0, duration: "3 hours" }
              ]
            }
          }
        ]
      },
      expenses: {
        create: [
          { category: "Flights", amount: 1200, description: "Round trip NYC to HND" },
          { category: "Accommodation", amount: 800, description: "Hotels in Tokyo and Kyoto" },
          { category: "Food", amount: 400, description: "Sushi, Ramen, Street food" }
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
      imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
      stops: {
        create: [
          { city: "Barcelona", country: "Spain", startDate: new Date("2026-06-08T00:00:00Z"), endDate: new Date("2026-06-12T00:00:00Z") },
          { city: "Nice", country: "France", startDate: new Date("2026-06-12T00:00:00Z"), endDate: new Date("2026-06-15T00:00:00Z") },
          { city: "Rome", country: "Italy", startDate: new Date("2026-06-15T00:00:00Z"), endDate: new Date("2026-06-19T00:00:00Z") }
        ]
      }
    }
  });

  const trip3 = await prisma.trip.create({
    data: {
      userId: user1.id,
      title: "Bali Retreat",
      description: "Finding peace and adventure in Indonesia.",
      startDate: new Date("2026-12-01T00:00:00Z"),
      endDate: new Date("2026-12-14T00:00:00Z"),
      budget: 2000.0,
      isPublic: true,
      imageUrl: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
      stops: {
        create: [
          { city: "Ubud", country: "Indonesia", startDate: new Date("2026-12-01T00:00:00Z"), endDate: new Date("2026-12-07T00:00:00Z") },
          { city: "Seminyak", country: "Indonesia", startDate: new Date("2026-12-07T00:00:00Z"), endDate: new Date("2026-12-14T00:00:00Z") }
        ]
      }
    }
  });

  console.log("Seeding Community Posts...");
  const post1 = await prisma.communityPost.create({
    data: {
      userId: user1.id,
      tripId: trip1.id,
      title: "My incredible week in Japan",
      content: "Japan was amazing! Highly recommend visiting Tokyo in October. The weather was perfect and the sushi was incredible. Make sure to book a class!",
      category: "Trip Report",
      imageUrl: "https://images.unsplash.com/photo-1542051842920-607400403ce1?w=800&q=80",
      likes: {
        create: [
          { userId: user2.id },
          { userId: user3.id }
        ]
      },
      comments: {
        create: [
          { userId: user2.id, text: "Wow, sounds amazing! Did you go to Kyoto too?" },
          { userId: user1.id, text: "Yes! Kyoto is included in the itinerary, check it out!" }
        ]
      }
    }
  });

  await prisma.communityPost.create({
    data: {
      userId: user2.id,
      title: "Hidden gems in Paris",
      content: "Avoid the main tourist traps and check out these secret local spots in Le Marais. The coffee at Fragments is out of this world.",
      category: "Tips",
      imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
      likes: {
        create: [
          { userId: user1.id }
        ]
      },
      comments: {
        create: [
          { userId: user3.id, text: "I'll be there next month, saving this!" }
        ]
      }
    }
  });

  await prisma.communityPost.create({
    data: {
      userId: user3.id,
      tripId: trip3.id,
      title: "Do you need a visa for Bali?",
      content: "Planning my trip to Bali next month. Has anyone been recently? Do I need a visa if I'm staying for just 2 weeks as a US citizen?",
      category: "Questions",
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"
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
