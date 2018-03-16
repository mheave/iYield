function NonceModel(address, nextAvailble, lastSent, currentBlockValue){
    return {
        address: address,
        nextAvailble: nextAvailble,
        lastSent: lastSent,
        currentBlockValue: currentBlockValue
    };
}

module.exports = NonceModel;