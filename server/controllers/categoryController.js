import { err, ok } from "../helper/utils.js";
import { Category } from "../models/shopModel.js";

export const getCategories = async (req, res) => {
  try {
    // const data = await Category.find().sort("name");
    const data = await Category.find({});
    ok(res, 200, `getCategories`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findById(id);
    if (!data) return err(res, 404, `category id not found`);
    ok(res, 200, `getCategoryById`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

export const postCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name === "") return err(res, 400, `category name is required`);
    const dup = await Category.findOne({ name });
    if (dup) return err(res, 409, `category name listed, input another`);
    const data = await Category.create(req.body);
    ok(res, 200, `post ${data.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Category.findById(id);
    if (!match) return err(res, 404, `category id not found`);
    const { name } = req.body;
    if (!name || name === "") return err(res, 400, `category name is required`);
    const dup = await Category.findOne({ name });
    if (dup && name !== match.name)
      return err(res, 409, `category name listed, input another`);
    const data = await Category.findByIdAndUpdate(match._id, req.body, {
      new: true,
    });
    ok(res, 200, `update ${data.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Category.findById(id);
    if (!match) return err(res, 404, `category id not found`);
    const data = await Category.findByIdAndDelete(match._id);
    ok(res, 200, `delete ${data.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};
