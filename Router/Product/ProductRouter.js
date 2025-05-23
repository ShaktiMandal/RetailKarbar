import express from 'express';
import Product from '../../Model/ProductModel/ProductModel.js';

const router = express.Router();

router.post('/AddProduct', (req, res, next) => {
    
    
    let requestData = new Product({
        ProductName: req.body.ProductName,
        Price      : req.body.Price,
        Stock      : req.body.Stock,
        Manufacturer: req.body.Manufacturer,
        ExpairyDate : req.body.ExpairyDate,
        IsFavourite: req.body.IsFavourite
    });
   
    Product.findOne({ProductName: requestData.ProductName})
    .then(result => {
        if(result)
        {
            Product.updateOne(
                {ProductName: requestData.ProductName},
                {$set : {
                Price: requestData.Price, 
                Stock : requestData.Stock,
                Manufacturer : requestData.Manufacturer,
                ExpairyDate: requestData.ExpairyDate,
                IsFavourite : requestData.IsFavourite
                }})
                .then( result => {
                    if(result)
                    {
                        res.status(200).send({
                            Success: true
                        })
                    }
                })
                .catch(error => {
                    
                    res.status(400).send({
                        Success: false,
                        error: "Unable to save product details. Please try again"
                    })
                })
        }
        else
        {
            requestData.save()
               .then( result => {
                   if(result)
                   {
                       res.status(200).send({
                           Success: true
                       })
                   }
               })
               .catch(error => {
                   res.status(400).send({
                       Success: false,
                       error: "Unable to save product details. Please try again"
                   })
               });
        }
    })
    
});

router.post('/RemoveProduct', (req, res, next) => {
    
    let requestData = new Product({
        ProductId: req.body.ProductId,
    });

    Product.findOne({
        id: req.body.requestData.ProductId
    })
    .then(result => {
        if(result)
        {
           Product.deleteOne({id: result.id}).then( isDeleted => {
               if(isDeleted)
               {
                    res.status(200).send({
                        Success: true, 
                    })
               }
               else{
                        res.status(404).send({
                            Success: false, 
                            error: "Unable to delete the product. Please try again."
                        });                        
               }
           })

        }
        else
        {
            res.status(404).send({
                Success: false, 
                error: "Unable to find the product.Please try again."
            })
        }
    })
    .catch(error => {

        res.status(404).send({
            Success: false, 
            error: "Unable to find the product.Please try again."
        })
    })
})

router.get('/FetchProduct', (req, res, next) =>{

    let requestParam = {};
    for (const key in req.query) {
        requestParam[key.trim()] = req.query[key].trim();
    }

    Product.find({ProductName :{$regex: new RegExp(requestParam.Product)}})
           .then( result => {
                if(result)
                {
                    res.status(200).send({
                        Success: true,
                        IsProductFound : true,
                        ProductList: result
                    })
                }
                else{
                        res.status(200).send({
                            Success: false,
                            IsProductFound : false,
                            ProductList: []
                        })
                }
           })
           .catch(error => {

                res.status(400).send({
                    Success: false,
                    ProductList: [],
                    error: "Unable to retrieve the product"
                })
           })
})

router.get('/GetOutOfStockProducts', (req, res, next) =>{
    Product.find({Stock: {$lt: 2}})
    .then( result => {
         if(result)
         {            
             res.status(200).send({
                 Success: true,
                 ProductList: result
             })
         }
         else
         {
                 res.status(200).send({
                     Success: false,
                     ProductList: [],
                     error: "There is no out of stock product"
                 })
         }
    })
    .catch(error => {

         res.status(400).send({
             Success: false,
             ProductList: [],
             error: "Unable to retrieve the product"
         })
    })
})

router.post('/AddToFavourite', (req, res, next) =>{

    let productId = req.body._id;
    Product.findById({_id: productId})
        .then(result => {
            let isFavourite;
            if(result)
            {                
                if(result.IsFavourite)
                {
                    isFavourite= false;
                }
                else
                {
                    isFavourite= true;
                }
                
                Product.updateOne(
                    {_id: productId}, 
                    {$set :{IsFavourite: isFavourite}})
                .then( result => {                    
                    if(result)
                    {
                        Product.find({IsFavourite : true})
                        .then(favouriteProducts => {
                            res.status(200).send({
                                Success: true,
                                ProductList: favouriteProducts
                            })
                        }) 
                    }
                    else
                    {
                       res.status(200).send({
                           Success: false,
                           ProductList: [],
                           error: "There is no out of stock product"
                       })
                    }
               })
               .catch(error => {
           
                    res.status(400).send({
                        Success: false,
                        ProductList: [],
                        error: "Unable to retrieve the product"
                    })
               })
            }
            else
            {
                res.status(400).send({
                        Success: false,
                        ProductList: [],
                        error: "There is no out of stock product"
                    })
            
            }
        })
        .catch(error => {
           
            res.status(400).send({
                Success: false,
                ProductList: [],
                error: "Unable to retrieve the product"
            })
       })
})

router.get('/GetYourFavourites', (req, res, next) =>{

    Product.find({IsFavourite: true})
        .then(result => {           
            if(result)
            {                
                res.status(200).send({
                    Success: true,
                    ProductList: result
                })
            }
            else
            {
                res.status(200).send({
                        Success: false,
                        ProductList: [],
                        error: "There is no favourite products."
                    })
            
            }
        })
        .catch(error => {

            res.status(400).send({
                Success: false,
                ProductList: [],
                error: "Unable to retrieve the product"
            })
       })
})


export default router;