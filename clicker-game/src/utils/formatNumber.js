function format(number) {
  const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "De", "UDe"];
    let tier = 0;
    let finalNum = number;

    while (finalNum >= 1000 && tier < suffixes.length - 1) {
        finalNum /= 1000;
        tier++;
    }
    
    let digits = Math.floor(finalNum).toString().length;
    let decimals = Math.max(0, 3 - digits);

    return finalNum.toFixed(decimals) + suffixes[tier];
}

export default format;
