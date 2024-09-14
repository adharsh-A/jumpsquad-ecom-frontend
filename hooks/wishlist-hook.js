import axios from "axios";
import { toast } from "react-toastify";

const useWishlist = () => {
  const saveWishlist = async (userId, filteredWishlistItems) => {
    const payload = {
      userId,
      items: filteredWishlistItems,
    };

    let domainName;
    if (process.env.NODE_ENV === "production") {
      domainName = `https://jumpsquad-backend.vercel.app`;
    } else {
      domainName = import.meta.env.VITE_API_URL;
    }
    try {
      const response = await axios.post(
        `${domainName}/api/wishlist/add`,
        payload
      );

    } catch (error) {
      toast.error(error, {
        position: "bottom-right",
      });
    }
  };

  return {
    saveWishlist,
  };
};

export default useWishlist;
