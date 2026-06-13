// наповнення БД
import 'dotenv/config';
import fs from 'fs/promises';
import { connectMongoDB } from './connectMongoDB.js';

import { Category } from '../models/categoryModel.js';
import { Ingredient } from '../models/ingredientModel.js';
import Recipe from '../models/recipeModel.js';
import { User } from '../models/userModel.js';

const seed = async () => {
  try {
    await connectMongoDB();

    const users = JSON.parse(
      await fs.readFile('./src/db/data/users.json', 'utf-8'),
    );
    await User.deleteMany();
    await User.insertMany(users);

    const categories = JSON.parse(
      await fs.readFile('./src/db/data/categories.json', 'utf-8'),
    );
    await Category.deleteMany();
    await Category.insertMany(categories);

    const ingredients = JSON.parse(
      await fs.readFile('./src/db/data/ingredients.json', 'utf-8'),
    );
    await Ingredient.deleteMany();
    await Ingredient.insertMany(ingredients);

    const recipes = JSON.parse(
      await fs.readFile('./src/db/data/recipes.json', 'utf-8'),
    );
    await Recipe.deleteMany();
    await Recipe.insertMany(recipes);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
