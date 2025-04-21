import { initDB } from "~/database";
import { IProductModel } from "~/types/interfaces/product";

export class ProductService {
    static getAll = async () => {
        const db = await initDB();
        const products = await db.all('SELECT * FROM products');
        return products;
    }

    static create = async (model: IProductModel) => {
        const db = await initDB();
        const result = await db.run('INSERT INTO products (name, price) VALUES (?, ?)', [model.name, model.price]);
        const product = await db.get('SELECT * FROM products WHERE id = ?', [result.lastID]);
        return product;
    }
}
