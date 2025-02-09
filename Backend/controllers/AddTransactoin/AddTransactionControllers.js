const expressAsyncHandler = require("express-async-handler");
const Trans = require("../../Models/AddTransaction/AddTransactionSchema");
const Auth = require("../../Models/Auth/AuthSchema")


// Add Transaction
const AddTrans = expressAsyncHandler(async (req, res) => {
    const { name, amount, type, category1 } = req.body;

    // Validate input
    if (!name || !amount || !type) {
        res.status(400);
        throw new Error("Fill All Details");
    }

    // Ensure req.user is available
    if (!req.user || !req.user._id) {
        res.status(401);
        throw new Error("Not authorized, no user found");
    }

    // Create transaction
    const newTransaction = await Trans.create({
        user: req.user._id,
        name,
        amount,
        category1,
        type,
    });

    if (!newTransaction) {
        res.status(400);
        throw new Error("Transaction Not Created");
    }

    res.status(201).json({
        message: "Transaction and Category Created Successfully",
        transaction: newTransaction,
    });
});


// Update Transaction
const UpdateTrans = expressAsyncHandler(async (req, res) => {
    const { name, amount, type, category1 } = req.body;

    // Validate user existence
    const user = await Auth.findById(req.user._id);
    if (!user || user._id.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("User Not Authorized");
    }

    // Update the transaction
    const updatedTransaction = await Trans.findByIdAndUpdate(
        req.params.id,
        { name, amount, category1, type },
        { new: true }
    );

    if (!updatedTransaction) {
        res.status(404);
        throw new Error("Transaction Not Updated");
    }

    // Update or create the associated category
    // const updatedCategory = await Category.findOneAndUpdate(
    //     { user: req.user._id, trans: req.params.id }, // Match user and transaction
    //     { category1, type }, // Update fields
    //     { new: true, upsert: true } // Create if not found
    // );

    // if (!updatedCategory) {
    //     res.status(400);
    //     throw new Error("Category Not Updated");
    // }

    res.status(200).json({
        message: "Transaction and Category Updated Successfully",
        transaction: updatedTransaction,
        // category: updatedCategory,
    });
});


// Get all transactions and categories for a particular user
const GetUserData = expressAsyncHandler(async (req, res) => {
    // Ensure the user is authenticated
    if (!req.user || !req.user._id) {
        res.status(401);
        throw new Error("Not authorized, no user found");
    }

    try {

        const userId = req.user._id; // Logged-in user's ID

       // Find all transactions for the logged-in user
       const transactions = await Trans.find({ user: userId });

       // Find all categories associated with the logged-in user
    //    const categories = await Category.find({ user: userId });

        res.status(200).json({
            message: "Logged-in User Transactions and Categories Fetched Successfully",
            transactions,
            // categories,
        });
    } catch (error) {
        res.status(500);
        throw new Error("Failed to fetch transactions and categories");
    }
});


// Remove Transaction
const RemoveTrans = expressAsyncHandler(async (req, res) => {
    try {
        const transaction = await Trans.findByIdAndDelete(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found!!!" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = { AddTrans , UpdateTrans , GetUserData , RemoveTrans };
