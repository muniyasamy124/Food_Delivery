import userModel from "../models/userModel.js";

// add item to user

const addToCard = async (req, res) => {
    // console.log("Received addToCart request:", req.body);
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


export { addToCard}