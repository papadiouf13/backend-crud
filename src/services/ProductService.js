const prisma      = require('../config/database');
const BaseService = require('./BaseService');


class ProductService extends BaseService {
  constructor() { super(prisma.product); }
}


module.exports = new ProductService();