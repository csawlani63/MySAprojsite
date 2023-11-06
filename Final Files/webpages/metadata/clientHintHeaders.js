const getBrandsConcatenated = (brands) => {
    return brands.map(value => {
        let brandEscaped = escapeDoubleQuoteAndBackslash(value.brand);
        return `"${brandEscaped}";v="${value.version}"`;
    }).join(", ");
}

const doubleQuoteEscape = (value) => {
    return value.replace(/"/g, '\\"');
}

const backslashEscape = (value) => {
    return value.replace(/\\/, "\\\\");
}

const escapeDoubleQuoteAndBackslash = (value) => {
    if (typeof value === 'string' && value){
        value = backslashEscape(value);
        value = doubleQuoteEscape(value);
    }

    return value;
}

const isValidArray = (fullVersionList) => {
    return typeof fullVersionList !== 'undefined' && Array.isArray(fullVersionList);
}

const getBrowserList = (fullVersionList, brands) => {
    if (isValidArray(fullVersionList) ){
        return getBrandsConcatenated(fullVersionList);
    } else if (isValidArray(brands) ){
        return getBrandsConcatenated(brands);
    }
}

const getHintsValues = () => {
    return [
        'brands',
        'mobile',
        'platform',
        'architecture',
        'bitness',
        'fullVersionList',
        'model',
        'platformVersion',
        'wow64',
    ];
}

function getPropertyQuoted(property) {
    if (property !== undefined){
        let valueEscaped = escapeDoubleQuoteAndBackslash(property);
        return `"${valueEscaped}"`;
    }

    return property;
}

export const clientHintHeaders = (new Promise(resolve => {
    const navUAData = navigator && navigator.userAgentData
    if (navUAData) {
        navUAData.getHighEntropyValues(getHintsValues()).then(ua => {
            const headers = {
                'User-Agent': navigator.userAgent,
                'Sec-CH-UA': getBrowserList(ua.brands),
                'Sec-CH-UA-Arch': getPropertyQuoted(ua.architecture),
                'Sec-CH-UA-Platform': getPropertyQuoted(ua.platform),
                'Sec-CH-UA-Platform-Version': getPropertyQuoted(ua.platformVersion),
                'Sec-CH-UA-Bitness': getPropertyQuoted(ua.bitness),
            };

            resolve(headers);
        })
    } else if (navigator) {
        resolve({
            'User-Agent': navigator.userAgent,
        });
    } else {
        resolve({});
    }
}));