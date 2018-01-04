function contractModel(contractAddress, ownerAddress, ownerPrivateKey, abi){
    return {
        contractAddress: contractAddress,
        ownerAddress: ownerAddress,
        ownerPrivateKey: ownerPrivateKey,
        abi: abi
    };
}

module.exports = contractModel;