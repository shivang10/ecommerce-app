const getAddProductDetails = (data) => {
    return {
        name: data.name,
        price: data.price,
        tags: data.tags,
        sellerDetails: data.sellerDetails,
        reviews: data.reviews,
        description: data.description,
        stockQuantity: data.stockQuantity
    };
};

module.exports = getAddProductDetails;
