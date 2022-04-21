const Sell = require("../models/sell");
const { resErr } = require("./ErrorHandle/res.error");
const { resSucc_data } = require("./successHandle.js/res.success");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.add_sell = async (req, res) => {
  console.log("add_sell");
  try {
    const { sellreport, totalprice } = req.body;
    const sells = [];
    console.log(sellreport, totalprice);
    sellreport.map((sell) => {
      console.log(sell);
      sells.push({ product_Id: sell._id, quantity: sell.quantity });
    });
    // console.log(sells);
    const sell = new Sell({
      adminId: req.user._id,
      totalprice,
      sellreport: sells,
    });

    await sell.save((err, sell) => {
      if (err) resErr(res, 400, err);
      if (sell) {
        resSucc_data(res, 200, sell);
      }
    });
  } catch (error) {
    resErr(res, 400, error);
  }
};

exports.get_all_sold = async (req, res) => {
  console.log("get_all_sold");
  try {
    const { admin } = req.body;
    if (admin == "All") {
      await Sell.find({})
        .populate("sellreport.product_Id", "_id name price")
        .exec((err, sold) => {
          if (err) resErr(res, 400, err);
          if (sold) {
            resSucc_data(res, 200, sold);
          }
        });
    } else {
      await Sell.find({ adminId: admin })
        .populate("sellreport.product_Id", "_id name ")
        .exec((err, sold) => {
          if (err) resErr(res, 400, err);
          if (sold) {
            resSucc_data(res, 200, sold);
          }
        });
    }
  } catch (error) {
    resErr(res, 400, error);
  }
};

// exports.get_all_sold_by_admin=async(req,res)=>{
//     console.log('get_all_sold_by_admin');
//     const id=req.params.id
//     console.log(id);
//     try {
//         await Sell.find({adminId:id})
//         .populate('sellreport.product_Id','_id name price')
//         .populate('adminId','_id email')
//         .exec((err,sold)=>{
//             if(err) resErr(res,400,err)
//             if(sold){
//                 resSucc_data(res,200,sold)
//             }
//         })
//     } catch (error) {
//         resErr(res,400,error)
//     }
// }
exports.get_totals = async (req, res) => {
  console.log("get_totals", req.body);
  try {
    //////
    
    const { admin,from,to } = req.body;
    const from_date=from ? new Date(from) :new Date()
    console.log(from_date);
    const to_date=to ? new Date(to) :new Date()
    console.log(to_date,to);
    if (admin == "All") {
      await Sell.aggregate([   {
        $match: {
          createdAt: { $lte: new Date(to_date) ,$gte:new Date(from_date)},
        },
      },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$totalprice" }, // for your case use local.user_totaldocs
            // for your case use local.user_totalthings
            billCount: { $sum: 1 }, // for no. of documents count
          },
        },
      ]).exec((err, sold) => {
        if (err) resErr(res, 400, err);
        if (sold) {
        console.log(sold[0]);
          resSucc_data(res, 200, sold[0]);
        }
      });
    } else {
     // const dat = new Date();
      // const onlydate=dat.split('T')[0]
      // console.log(dat,onlydate);
      await Sell.aggregate([
        {
          $match: {
            adminId: ObjectId(admin),
            createdAt: { $lte: new Date(to_date),$gte:new Date(from_date)  },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$totalprice" }, // for your case use local.user_totaldocs
            // for your case use local.user_totalthings
            billCount: { $sum: 1 }, // for no. of documents count
          },
        },
      ])
     
        .exec((err, sold) => {
          if (err) resErr(res, 400, err);
          if (sold) {
            console.log(sold[0]);
            resSucc_data(res, 200, sold[0]);
          }
        });
    }
  } catch (error) {
    resErr(res, 400, error);
  }
};
