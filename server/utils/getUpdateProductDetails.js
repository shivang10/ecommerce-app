const updateProductProperties = ["name", "price", "tags", "description", "stockQuantity"];

const getUpdateProductDetails = (data) => {
    const dataToBeUpdated = {};
    Object.keys(data).forEach((productProperty) => {
        if (updateProductProperties.includes(productProperty)) {
            dataToBeUpdated[productProperty] = data[productProperty];
        }
    });
    return dataToBeUpdated;
};

module.exports = getUpdateProductDetails;
