const { Product, Inventory, Category } = require('../models');
const { Op } = require('sequelize');

exports.getInventory = async (req, res) => {
    try {
        const { 
            category_id, 
            search,
            page = 1,       
            pageSize = 10  
        } = req.query;

        const currentPage = parseInt(page);
        const limit = parseInt(pageSize);
        const offset = (currentPage - 1) * limit;

        const queryOptions = {
            include: [{
                model: Product,
                as: 'product',
                attributes: ['product_id', 'name', 'description', 'price', 'image', 'is_available', 'points_earned'],
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['category_id', 'name'],
                    ...(category_id && { where: { category_id } })
                }],
                ...(search && {
                    where: {
                        name: { [Op.like]: `%${search}%` }
                    }
                })
            }],
            order: [['product_id', 'ASC']],
            limit: limit,
            offset: offset
        };

        const { count: totalItems, rows: data } = await Inventory.findAndCountAll(queryOptions);
        const totalPages = Math.ceil(totalItems / limit);

        return res.status(200).json({
            pagination: {
                totalItems,
                totalPages,
                currentPage,
                pageSize: limit,
                hasNextPage: currentPage < totalPages,
                hasPrevPage: currentPage > 1
            },
            data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Server error',
            error: error.message
        });
    }
}