const express = require('express');
const router  = express.Router();
const cors   = require("cors");
const DealerDetails = require('../../Model/CustomersModel/DealerDetails');

router.post('/AddDealer', (req,res,next) => {

    let Dealer = new DealerDetails ({
        CompanyName : req.body.CompanyName,
        DealerName : req.body.DealerName,
        PhoneNumber: req.body.PhoneNumber,
        DealerId: req.body.DealerId,
        OrderId: req.body.OrderId
    });

    DealerDetails.findOne({DealerId: Dealer.DealerId})
          .then(result => {
              if(result)
              {
                  res.status(200).send({
                    Success: true,
                    response: result,
                    error: "Dealer already exists"  
                  })
              }
              else
              {
                Dealer.save()
                      .then( result => {
                        res.status(200).send({
                            Success: true,
                            response: result,
                            error: ""  
                          })
                      })
                      .catch(error  => {
                        res.status(400).send({
                            Success: false,
                            response: result,
                            error: error  
                          })
                      })
              }

          })
          .catch(error => {
            res.status(400).send({
                Success: false,
                response: result,
                error: error  
              })
          })
});

router.get('/GetDealers', (req,res,next) => {

  DealerDetails.find()
          .then(result => {
              if(result)
              {
                  res.status(200).send({
                    Success: true,
                    response: result,
                    error: ""  
                  })
              }
              else
              {
                res.status(200).send({
                    Success: true,
                    response: result,
                    error: "There is no dealer added yet"  
                  })
              }
          })
          .catch(error => {
            res.status(400).send({
                Success: false,
                response: result,
                error: error  
              })
          })
})

module.exports = router;