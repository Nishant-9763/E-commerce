const express=require("express")
const router=express.Router()
const {createUser,userLogin,getData,putData}=require("../controller/userController")
const {authentication,authorisation}=require("../middleware/auth")
const {createProduct,getProduct,getProductbyId,updateProduct,deleteProductbyId}=require("../controller/productController")
const {createCart,getCart,updateCart,deleteCart}=require("../controller/cartController")

//===============================user====================================
router.post("/register",createUser)
router.post("/login",userLogin)

router.get("/user/:userId/profile",authentication,authorisation,getData)
router.put("/user/:userId/profile",authentication,authorisation,putData)

//===============================product====================================

router.post("/products",createProduct)
router.get("/products",getProduct)
router.get("/products/:productId",getProductbyId)
router.delete("/products/:productId",deleteProductbyId)
router.put("/products/:productId",updateProduct)

//=================================cart ====================================
router.post("/users/:userId/cart",authentication,authorisation,createCart)
router.put("/users/:userId/cart",updateCart)
router.get("/users/:userId/cart",authentication,authorisation,getCart)
router.delete("/users/:userId/cart",deleteCart)



router.all("/*",function(req,res){
    return res.status(400).send({status:false,message:"invalid path"})
})

module.exports=router