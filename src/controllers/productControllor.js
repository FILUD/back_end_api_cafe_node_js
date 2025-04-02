// controllers/productController.js
const { Product, Category } = require('../models');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{
                model: Category,
                as: 'category',
            }]
        });

        const totalProduct = products.length;

        return res.status(200).json({
            total: totalProduct,
            products,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


exports.createProduct = async (req, res) => {
    const { category_id, name, description, price, image, is_available, points_earned } = req.body;
    try {
        const existingPro = await Product.findOne({ where: { name } })
        if (existingPro) {
            return res.status(400).json({ message: 'Product name is already' })
        }

        const newPro = await Product.create({
            category_id,
            name,
            description,
            price,
            image,
            is_available,
            points_earned
        })

        return res.status(201).json({ success: true, message: "Create Product successe", newPro })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

exports.getByIDProduct = async (req, res) => {
    const { product_id } = req.params; 
    try {
        if (!product_id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const product = await Product.findByPk(product_id, {
            include: [{
                model: Category,
                as: 'category', 
            }]
        }); 
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({
            product, 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteByIDProduct = async (req, res) => {
    try {
        const { product_id } = req.query; 
        console.log(product_id)
        if(isNaN(product_id)) {
            return res.status(400).json({ error: "Invalid Product ID" });
        }

        const result = await Product.destroy({
            where: { product_id: product_id }
        });

        if(result === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json({ 
            success: true,
            message: "Product deleted successfully" 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateProduct = async (req, res) => {
    const { product_id } = req.params;
    const { category_id, name, description, price, image, is_available, points_earned } = req.body;
    
    try {
        // Check if product exists
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if new name is already taken by another product
        if (name && name !== product.name) {
            const existingProduct = await Product.findOne({ where: { name } });
            if (existingProduct) {
                return res.status(400).json({ message: 'Product name is already taken' });
            }
        }

        // Update product fields
        const updatedFields = {};
        if (category_id !== undefined) updatedFields.category_id = category_id;
        if (name !== undefined) updatedFields.name = name;
        if (description !== undefined) updatedFields.description = description;
        if (price !== undefined) updatedFields.price = price;
        if (image !== undefined) updatedFields.image = image;
        if (is_available !== undefined) updatedFields.is_available = is_available;
        if (points_earned !== undefined) updatedFields.points_earned = points_earned;

        // Perform the update
        await Product.update(updatedFields, {
            where: { product_id: product_id }
        });

        // Get the updated product to return
        const updatedProduct = await Product.findByPk(product_id, {
            include: [{
                model: Category,
                as: 'category',
            }]
        });

        return res.status(200).json({ 
            success: true, 
            message: "Product updated successfully", 
            product: updatedProduct 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}