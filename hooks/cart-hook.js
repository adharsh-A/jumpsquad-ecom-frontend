    import { useState } from 'react';
    import axios from 'axios';
import { toast } from 'react-toastify';

    const useSaveCart = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(null);

    const saveCart = async (cartItems, totalPrice, userId) => {
        setIsSaving(true);
        setSaveError(null);  // Reset error state before each request
        setSaveSuccess(null);  // Reset success state

        try {
        const response = await axios.post('http://localhost:8080/api/cart/save-cart', {
            userId,
            items: cartItems,
            totalPrice,
        });

        if (response.status === 200) {
            setSaveSuccess('Cart saved successfully');
            console.log('Cart saved successfully:', response.data);
        }
        } catch (error) {
        setSaveError('Error saving cart',error);
        console.error('Error saving cart:', error);
        } finally {
        setIsSaving(false);  // Reset the loading state
        }
    };

    return {
        isSaving,       // Returns the loading state
        saveError,      // Returns any error that occurred
        saveSuccess,    // Returns success message
        saveCart,       // The function to call to save the cart
    };
    };

    export default useSaveCart;
