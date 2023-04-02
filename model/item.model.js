const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ItemsSchema = Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  chartOfAccount: {
    type: String,
    required: true,
  },
  hasProductionNumber: {
    type: Boolean,
  },
  hasExpiryDate: {
    type: Boolean,
  },
  unit: {
    type: String,
    required: true,
  },
  converter: [
    {
      name: {
        type: String,
      },
      multiply: {
        type: Number,
      },
    },
  ],
  createdAt: {
    type: Date,
  },
  createdBy_id: {
    type: Schema.ObjectId,
    ref: "User",
  },
  isArchived: {
    type: Boolean,
  },
});

const Items = mongoose.model("Items", ItemsSchema);

module.exports = Items;
