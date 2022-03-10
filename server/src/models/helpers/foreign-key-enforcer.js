module.exports = (FKModel, FK_id) => {
    return new Promise((resolve, reject) => {
        if (FK_id === null) { return resolve(true); }

        FKModel.findById(FK_id).then((FKResource) => {
            console.log(FKResource);
            console.log(FKResource !== null);
            return (FKResource !== null ? resolve(true) : reject(false));
        })
    })
}