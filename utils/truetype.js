function truetype(val) {
    const { toString } = {};
    const s = toString.call(val);
    if (s.indexOf('Array') > -1) return 'Array';
    if (s.indexOf('Object') > -1) return 'Object';
    if (s.indexOf('String') > -1) return 'String';
    if (s.indexOf('Number') > -1) return 'Number';
    if (s.indexOf('Date') > -1) return 'Date';
    if (s.indexOf('Function') > -1) return 'Function';
    if (s.indexOf('Class') > -1) return 'Class';
    throw new Error('Не один из типов не совпал');
}


export default truetype;