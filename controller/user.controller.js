const User = require("../model/user.model");
const Items = require("../model/item.model");
const httpStatus = require("http-status");
const ApiError = require("../utility/ApiError");
const { parse, stringify } = require("flatted/cjs");

const itemsPost = async (req, res) => {
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  if (req.user.username === "user") {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }
  if (req.user.username === "admin") {
    const sameCode = await Items.findOne({ code: req.body.code });
    if (sameCode) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "code is exists");
    }
    const nameCode = await Items.findOne({ code: req.body.name });
    if (nameCode) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "name is exists");
    }

    if (!req.body.name) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "name is required");
    }
    if (!req.body.chartOfAccount) {
      throw new ApiError(
        httpStatus.UNPROCESSABLE_ENTITY,
        "chart of account is required"
      );
    }
    if (!req.body.unit) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "unit is required");
    }

    const itemsPost = await Items.create({ ...req.body });

    return res.status(httpStatus.OK).send(itemsPost);
  }
};

const itemsPatch = async (req, res) => {
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  if (req.user.username === "user") {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }
  if (req.user.username === "admin") {
    const sameCode = await Items.findOne({ code: req.body.code });
    if (sameCode) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "code is exists");
    }
    const nameCode = await Items.findOne({ code: req.body.name });
    if (nameCode) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "name is exists");
    }

    if (!req.body.name) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "name is required");
    }
    if (!req.body.chartOfAccount) {
      throw new ApiError(
        httpStatus.UNPROCESSABLE_ENTITY,
        "chart of account is required"
      );
    }
    if (!req.body.unit) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "unit is required");
    }

    const filter = { id: _id };
    const itemsPost = await Items.findOneAndUpdate({ filter, ...req.body });
    return res.status(httpStatus.OK).send(itemsPost);
  }
};

const itemsDelete = async (req, res) => {
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  if (req.user.username === "user") {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }
  if (req.user.username === "admin") {
    const itemsDestroy = await Items.deleteOne({ _id: req.params._id });
    return res.status(httpStatus.NO_CONTENT).send(itemsDestroy);
  }
};

const itemsGet = async (req, res) => {
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  if (req.user.username === "user") {
    return res.status(403).send("Forbidden Access");
    // throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }
  if (req.user.username === "admin") {
    const getAll = await Items.find();
    return res.status(httpStatus.OK).send(getAll);
  }
};

const itemsGetById = async (req, res) => {
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  if (req.user.username === "user") {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }
  if (req.user.username === "admin") {
    const getSingle = await Items.findOne({
      _id: req.params._id,
    });

    return res.status(httpStatus.OK).send(getSingle);
  }
};

const itemsPatchArchive = async (req, res) => {
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  if (req.user.username === "user") {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }
  if (req.user.username === "admin") {
    const filter = { id: _id };
    const itemsPost = await Items.findOneAndUpdate({
      filter,
      isArchived: true,
    });
    return res.status(httpStatus.OK).send(itemsPost);
  }
};
module.exports = {
  itemsPost,
  itemsDelete,
  itemsGet,
  itemsPatch,
  itemsGetById,
  itemsPatchArchive,
};
