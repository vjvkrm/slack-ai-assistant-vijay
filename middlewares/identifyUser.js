const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
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

    const user = await prisma.users.findUnique({
      where: {
        email: userInfo.user.profile.email,
      },
    });

    if (!user ) {
      console.log("User not authorized or inactive");
      return { success: false, message: "User not authorized or inactive" };
    }

    // Update slackUser ID if not set
    if (!user?.slackUser) {
      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          slackUser: userId,
        },
      });
    }

    // Cache the userId for future requests
    cache.set(userId, true);
    return next();
  } catch (error) {
    console.error("Error in identifyUser middleware:", error);
    return { success: false, message: "Error identifying user" };
  }
};

module.exports = { identifyUser };
