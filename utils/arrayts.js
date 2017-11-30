import truetype from './truetype';


function arrayts(a, s) {
    if (truetype(a) === 'Array') {
        const A = [];
        for (let i = 0, k = 0, j = 0; i < a.length; i += 1, k += 1) {
            if (k === s) {
                k = 0;
                j += 1;
            }
            if (!(A[j])) {
                A[j] = [];
            }
            A[j].push(a[i]);
        }
        return A;
    }
    throw new Error('Значение не является масивом');
}


export default arrayts;