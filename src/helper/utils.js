function getBaseName(path) {
    return path.replace(/\.[^/.]+$/, "");
}

const getSortedPaths = (imagePaths) => {
    return imagePaths.sort((a, b) => {
        const baseA = getBaseName(a).toLowerCase();
        const baseB = getBaseName(b).toLowerCase();
        if (baseA < baseB) return -1;
        if (baseA > baseB) return 1;
        return 0;
    });
}

export {
    getSortedPaths
}