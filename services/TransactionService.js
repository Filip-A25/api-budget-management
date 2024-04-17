const handleDataValidation = (dataObj) => {
    console.log(dataObj.transactor);
    //newDataArray.date = dataArray.date.toISOString().slice(0, 13).replace("T", " ");
    if (dataObj.transactor === "" || dataObj.transactor.length > 120) return;
    dataObj.amount = +parseFloat(dataObj.amount).toFixed(2);
    return dataObj;
}

const getTableType = (flow) => {
    let type;
    switch (flow) {
        case 0:
            type = "transaction_income";
            break;
        case 1:
            type = "transaction_expense";
            break;
        case 2:
            type = "transaction_all";
            break;
        default:
            type = "";
    }

    return type;
}

module.exports = {handleDataValidation, getTableType};