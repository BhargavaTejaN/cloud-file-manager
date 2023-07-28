
const getNoOfFilesByType = (data,types) => {
    const counts = {};
    types.forEach(type => {
        counts[type] = data.filter((item) => item.type === type).length
    })
    const totalCount = Object.values(counts).reduce((acc,count) => acc + count ,0);
    return totalCount;
}

export default {
    getNoOfFilesByType
}