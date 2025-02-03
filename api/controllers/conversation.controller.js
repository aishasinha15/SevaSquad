import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isWorker ? { expertId: req.userId } : { clientId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (error) {
    next(error);
  }
};

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isWorker ? req.userId + req.body.to : req.body.to + req.userId,
    expertId: req.isWorker ? req.userId : req.body.to,
    clientId: req.isWorker ? req.body.to : req.userId,
    readByExpert: req.isWorker,
    readByClient: !req.isWorker,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (error) {
    next(error);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (error) {
    next(error);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readByExpert: req.isWorker,
          // readByClient: !req.isWorker,
          ...(req.isWorker ? { readByExpert: true } : { readByClient: true }),
        },
      },
      { new: true }
    );
    res.status(200).send(updatedConversation);
  } catch (error) {
    next(error);
  }
};

export const deleteConversation = async (req, res, next) => {
  try {
    const deletedConversation = await Conversation.findOneAndDelete({
      id: req.params.id,
    });

    if (!deletedConversation) {
      return next(createError(404, "Conversation not found"));
    }

    res.status(200).send({ message: "Conversation deleted successfully" });
  } catch (error) {
    next(error);
  }
};
