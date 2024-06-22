const Product = require('../models/product');

// GET /api/products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/products
exports.createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (req.body.name != null) {
            product.name = req.body.name;
        }
        if (req.body.description != null) {
            product.description = req.body.description;
        }
        if (req.body.price != null) {
            product.price = req.body.price;
        }
        if (req.body.quantity != null) {
            product.quantity = req.body.quantity;
        }
        if (req.body.category != null) {
            product.category = req.body.category;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.findByIdAndDelete();
        res.json({ message: 'Deleted Product  ' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// GET /api/products
exports.getAllProducts = async (req, res) => {
    try {
        let filter = {};
        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: 'i' }; // 'i' for case-insensitive
        }
        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// DELETE /api/products
exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: 'Deleted All Products' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};