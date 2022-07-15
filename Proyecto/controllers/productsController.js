const { hyphenToCamel } = require("ejs/lib/utils");
const fs = require("fs");
const path = require("path");
let db = require("../src/database/models");

const productsPath = path.join(__dirname, "../views/products");

const productsController = {
  // VER TODOS LOS PRODUCTOS ** VER TODOS LOS PRODUCTOS
  list: (req, res) => {
    let producto = db.Producto.findAll();
    let imagen = db.Imagen.findAll();
    Promise
    .all([producto, imagen])    
    .then(function ([producto, imagen]) {
      return res.render(productsPath + "/productList", {producto, imagen});

    });
  },

  // CREAR UN PRODUCTO ** CREAR UN PRODUCTO
  create: (req, res) => {
      let categorias = db.Categoria.findAll();
      let talles = db.Talle.findAll();
      Promise
      .all([categorias, talles])
      .then(function ([categorias, talles]) {
        return res.render(productsPath + "/productAdd", {categorias, talles});
      });
  },

  // GUARDAR UN PRODUCTO CREADO ** GUARDAR UN PRODUCTO CREADO
  store: (req, res) => {
    let idProduct_image;
    console.log(req.file);
    if (req.files[0] != undefined) {
      idProduct_image = req.files[0].filename;
    } else {
      idProduct_image = "default-image.png";
    }
    db.Producto.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      idCategoryFK: req.body.category,
      idSizeFK: req.body.size,
    },
      db.Imagen.create({
        name: idProduct_image
      })
    );
    console.log(req.body)
    res.redirect("/");
  },

  // DETALLE DE UN PRODUCTO ** DETALLE DE UN PRODUCTO
  productDetail: (req, res) => {
    let promesaProducto = db.Producto.findByPk(req.params.id);
    let promesaTalle = db.Talle.findAll();
    let promesaImagen = db.Imagen.findByPk(req.params.id);
    Promise
    .all([promesaProducto, promesaTalle, promesaImagen])
    .then(function ([promesaProducto, promesaTalle, promesaImagen]) {
      return res.render(productsPath + "/productDetail", { promesaProducto, promesaTalle, promesaImagen });
    });
  },
  // EDICION DE UN PRODUCTO ** EDICION DE UN PRODUCTO
  edit: (req, res) => {
    let promesaImagen = db.Imagen.findByPk(req.params.id);
    let promesaProducto = db.Producto.findByPk(req.params.id);
    Promise
    .all([promesaImagen, promesaProducto])
    .then(function ([promesaImagen, promesaProducto]) {
      res.render(productsPath + "/productEdit", { promesaImagen, promesaProducto });
    });
  },
  // ACTUALIZACION DE DATOS ** ACTUALIZACION DE DATOS
  confirm: (req, res) => {
    let productFind = db.Imagen.findByPk(req.params.id);

    // let idProduct_image;
    // console.log(req.file);
    // if (req.files) {
    //   idProduct_image = req.files;
    // } else {
    //   idProduct_image = productFind.name;
    // }


    db.Producto.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      idCategoryFK: req.body.category,
      idSizeFK: req.body.size,
    }),
      // db.Imagen.update({
      //   name: idProduct_image
      // })
    {
      where: {
        id: req.params.id,
      },
    };
    res.redirect("/");
  },
  // DELETE ** DELETE
  delete: (req, res) => {
    db.Producto.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/");
  },
  // CARRITO ** CARRITO
  cart: (req, res) => {
    db.Producto.findByPk(req.params.id).then(function (detalle) {
      return res.render(productsPath + "/productCart", { detalle });
    });
  },
};

module.exports = productsController;
