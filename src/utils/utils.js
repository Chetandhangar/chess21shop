

export const checkLikes = ({productId,wishlist}) => {
    return wishlist?.find((item) => item?._id === productId) ? true : false; 
}

export const checkCart = ({productId,cart}) => {
    return cart?.find((item) => item?.product?._id === productId) ? true : false;
}