import Channel from "../models/Channel.model.js";

export const createChannel = async (req, res) => {
  try {
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

    await channel.save();
    res.status(201).json(channel);
  } catch (error) {
    console.error("Create Channel Error:", error);
    res.status(500).json({ message: "Failed to create channel" });
  }
};


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
