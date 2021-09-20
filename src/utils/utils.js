

export const checkLikes = ({productId,wishlist}) => {
    return wishlist?.find((item) => item?._id === productId) ? true : false; 
}