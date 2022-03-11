module.exports = (FKModel, FK_id) => {
    return new Promise((resolve, reject) => {
        if (FK_id === null) { return resolve(true); }

        FKModel.findById(FK_id).then((FKResource) => {
            return (FKResource !== null ? resolve(true) : reject(false));
        })
    })
}