import Channel from "../models/Channel.model.js";

//Create a new channel for the logged-in user
export const createChannel = async (req, res) => {
  try {
    /// Check if the user already has a channel
    const existingChannel = await Channel.findOne({ userId: req.user.id });
    if (existingChannel) {
      return res.status(400).json({ message: "User already has a channel" });
    }

    const { name, avatar } = req.body;
    const channel = new Channel({
      name,
      avatar,
      userId: req.user.id,
    });

    // Save to database
    await channel.save();
    res.status(201).json(channel);
  } catch (error) {
    console.error("Create Channel Error:", error);
    res.status(500).json({ message: "Failed to create channel" });
  }
};

//Get the current user's channel
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ userId: req.user.id });
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    res.status(200).json(channel);
  } catch (error) {
    console.error("Get Channel Error:", error);
    res.status(500).json({ message: "Failed to fetch channel" });
  }
};

// Get any public channel by ID
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.status(200).json(channel);
  } catch (error) {
    console.error("Get Channel By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch channel" });
  }
};

//Subscribe or unsubscribe to a channel
export const toggleSubscribe = async(req,res)=>{
    try {
      const channelId = req.params.id;
      const userId = req.user.id;

      // Find channel by ID
      const channel = await Channel.findById(channelId);
      if (!channel) return res.status(404).json({ message: "Channel not found" });
          const isSubscribed = channel.subscribedUsers.includes(userId);

      // Toggle subscription
      if (isSubscribed) {
        channel.subscribedUsers.pull(userId);
        channel.subscribers--;
      } else {
        channel.subscribedUsers.push(userId);
        channel.subscribers++;
      }

    await channel.save();

    res.status(200).json({
      subscribed: !isSubscribed,
      subscribers: channel.subscribers,
    });
    } catch (error) {
        console.error("Subscribe Error:", error);
        res.status(500).json({ message: "Failed to toggle subscription" });
    }
}