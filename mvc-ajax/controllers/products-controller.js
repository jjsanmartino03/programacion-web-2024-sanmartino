// CRUD for PRODUCTS
import Product from "../models/product.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
};

// Create new product
export const createProduct = async (req, res) => {
    try {
        const {name, description, price, stock} = req.body;
        await Product.create({name, description, price, stock});
        res.status(201).json({message: 'Producto creado'});
    } catch (error) {
        res.status(500).send('Error al crear el producto');
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        await Product.destroy({where: {id}});
        res.json({message: 'Producto eliminado'});
    } catch (error) {
        res.status(500).send('Error al eliminar el producto');
    }
}

// Update product
export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, description, price, stock} = req.body;
        await Product.update({name, description, price, stock}, {where: {id}});
        res.json({message: 'Producto actualizado'});
    } catch (error) {
        res.status(500).send('Error al actualizar el producto');
    }
}