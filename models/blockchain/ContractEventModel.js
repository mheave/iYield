function ContractEvent(eventName, args, txReceipt){
    return {
        eventName: eventName,
        args: args,
        txReceipt: txReceipt
    };
}

module.exports = ContractEvent;