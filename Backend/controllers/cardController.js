import userModel from "../models/userModel.js";

// add item to user

const addToCard = async (req, res) => {
    // console.log("Headers:", req.headers);


    try {
        let userData = await userModel.findById(req.body.id);

        if (!userData) {
            return res.status(400).json({ success: false, message: 'user not found' })
        }
        let cartData = await userData.cartData;


        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1;
        }

        // console.log("cartData", userData);

        // cartData[req.body.itemId] = (cartData[req.body.itemId]||0)+1

        await userModel.findByIdAndUpdate(req.body.id, { cartData })
        res.json({ success: true, message: "Addded To Cart" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Catdata is not added" })
    }
}

// remove cardData

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.id);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.id, { cartData })
        res.json({ success: true, message: "Removed from cart" })
    }
    catch (error) {
        console.log(error)
        json.res({success:false, message:"Error"})
    }
}

// fetchData

const getData = async (req, res) => {
try{
    const getData = await userModel.findById(req.body.id);
    const cartData = await getData.cartData;
    res.json({success:true, cartData})
    // console.log("get card", cartData);
}
catch(error)
{
    console.log(error)
    res.json({success:false,message:"Cart not found"})
}
}

export { addToCard, removeFromCart, getData }