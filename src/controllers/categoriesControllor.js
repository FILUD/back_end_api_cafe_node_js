const authMiddleware = require('../middleware/authMiddleware')
const Category = require('../models/categories')
const { Op } = require('sequelize');


exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        const totalCategories = categories.length;

        return res.status(200).json({
            total: totalCategories,
            categories,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getByIDCategories = async (req, res) => {
    const { category_id } = req.params; 
    try {
        if (!category_id) {
            return res.status(400).json({ message: 'Category ID is required' });
        }

        const categories = await Category.findByPk(category_id); 
        
        if (!categories) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({
            categories, 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteByIDCategories = async (req, res) => {
    try {
        const { category_id } = req.query; 
        console.log(category_id)
        if(isNaN(category_id)) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        const result = await Category.destroy({
            where: { category_id: category_id }
        });

        if(result === 0) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.status(200).json({ 
            success: true,
            message: "Category deleted successfully" 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


exports.createCategories = async (req, res) => {
    const { name, description, image } = req.body;
    try {
        const existingCat = await Category.findOne({ where: { name } });
        if (existingCat) {
            return res.status(400).json({ message: 'Category is already' });
        }
        const newCat = await Category.create({
            name,
            description,
            image,
        });
        return res.status(201).json({ message: 'Create Category successful', newCat });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


exports.updateCategory = async (req, res) => {
    const { category_id } = req.params;
    const { name, description, image } = req.body;

    try {
        if (!category_id || isNaN(category_id)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid category ID' 
            });
        }

        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({ 
                success: false,
                message: 'Category not found' 
            });
        }

        if (name) {
            const existingCat = await Category.findOne({ 
                where: { 
                    name,
                    category_id: { [Op.ne]: category_id }
                } 
            });
            
            if (existingCat) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Category name already exists' 
                });
            }
        }

        if (name) category.name = name;
        if (description) category.description = description;
        if (image) category.image = image;

        await category.save();

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: category
        });

    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
