import { createCategoryService } from "../../services/category/createCategory.service";
import { iCategory } from "../../interfaces/category.interface";
import { Request, Response } from "express";
import { listCategoriesService } from "../../services/category/listCategories.service";
import { listRealEstateByCategoryService } from "../../services/category/listRealEstateByCate.service";

export const createCategoryController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userCategory: iCategory = request.body;
  const newCategory = await createCategoryService(userCategory);

  return response.status(201).json(newCategory);
};

export const listCategoriesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categories = await listCategoriesService();

  return response.json(categories);
};

export const listCategoryByRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: number = parseInt(request.params.id);
  const realEstate = await listRealEstateByCategoryService(id);

  return response.json(realEstate);
};
