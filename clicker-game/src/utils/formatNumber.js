function format(number) {
  const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "De", "UDe"];
    let tier = 0;

    while (number >= 1000 && tier < suffixes.length - 1) {
        number /= 1000;
        tier++;
    }

    let digits = Math.floor(number).toString().length;
    let decimals = Math.max(0, 3 - digits);

    return number.toFixed(decimals) + suffixes[tier];
}

export default format;
