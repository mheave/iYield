function contractNonceModelDto(id, contractId, currentNonceValue, currentLastUpdated, allocatedNonceValue, allocatedLastUpdated ){
    return {
        id: id,
        contractId: contractId,
        currentNonceValue: currentNonceValue,
        currentLastUpdated: currentLastUpdated,
        allocatedNonceValue: allocatedNonceValue,
        allocatedLastUpdated: allocatedLastUpdated
    };
}

module.exports = contractNonceModelDto;