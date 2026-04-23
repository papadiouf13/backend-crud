const BaseController = require('./BaseController');
const productService = require('../services/ProductService');
const cloudinary     = require('../config/cloudinary');
const fs             = require('fs');
const path           = require('path');


class ProductController extends BaseController {
  constructor() {
    super(productService);
  }


  // override create
  async create(req, res, next) {
    try {
      let imageUrl = null;
      if (req.file) {
        // upload sur Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'products'
        });
        imageUrl = result.secure_url;
        // supprimer le fichier local
        fs.unlinkSync(req.file.path);
      }
      const data = { ...req.body, price: parseFloat(req.body.price), imageUrl };
      const newProd = await this.service.create(data);
      res.status(201).json(newProd);
    } catch (err) { next(err); }
  }


  // override update (optionnel)
  async update(req, res, next) {
    try {
      let imageUrl = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'products'
        });
        imageUrl = result.secure_url;
        fs.unlinkSync(req.file.path);
      }
      const payload = { ...req.body };
      if (payload.price) payload.price = parseFloat(payload.price);
      if (imageUrl)   payload.imageUrl = imageUrl;
      const updated = await this.service.update(+req.params.id, payload);
      res.json(updated);
    } catch (err) { next(err); }
  }
}


module.exports = new ProductController();


