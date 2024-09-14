    import { useState } from "react";
    import axios from "axios";
    import { toast } from "react-toastify";

    const useSaveCart = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(null);

    const saveCart = async (filteredCartItems, totalPrice, userId) => {
        setIsSaving(true);
        setSaveError(null); // Reset error state before each request
        setSaveSuccess(null); // Reset success state
        const payload = { userId, items: filteredCartItems, totalPrice };

        let domainName;
        if(process.env.NODE_ENV === "production"){
             domainName = `https://jumpsquad-backend.vercel.app`;
            }else{
            domainName = import.meta.env.VITE_API_URL;
            }
        try {
        const response = await axios.post(
            `${domainName}/api/cart/save-cart`,
            payload
        );

        if (response.status === 200) {
            setSaveSuccess("Cart saved successfully");

        }
        } catch (error) {
        const errorMessage =
            error.response?.data?.message || "Error saving cart, please try again";
        setSaveError(errorMessage);
        toast.error(errorMessage,{
            position: "bottom-right",
        });
        } finally {
        setIsSaving(false); // Reset the loading state
        }
    };

    return {
        isSaving, // Returns the loading state
        saveError, // Returns any error that occurred
        saveSuccess, // Returns success message
        saveCart, // The function to call to save the cart
    };
    };

    export default useSaveCart;
