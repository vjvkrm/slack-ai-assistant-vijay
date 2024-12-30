let prisma;
try {
  const { PrismaClient } = require("@prisma/client");
  prisma = new PrismaClient();
} catch (error) {
  console.log("Prisma client not available");
}
const cache = require("../middlewares/cacheStore");

const identifyUser = async ({ client, context, next }) => {
  const { userId } = context;
 
  if (!userId) {
    console.log("User ID not found in context");
  }

  if (cache.get(userId)) {
    return next();
  }

  try {
    const userInfo = await client.users.info({
      user: userId,
    });

    if (prisma) {
      const user = await prisma.users.findUnique({
        where: {
          email: userInfo.user.profile.email,
        },
      });

      if (!user) {
        console.log("User not authorized or inactive");
        return { success: false, message: "User not authorized or inactive" };
      }
    }

    cache.set(userId, userInfo);
    return next();
  } catch (error) {
    console.error("Error in user identification:", error);
    return { success: false, message: "Error in user identification" };
  }
};

module.exports = { identifyUser };
