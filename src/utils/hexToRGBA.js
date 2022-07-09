const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

const getChunksFromString = (st, chunkSize) => {
  return st.match(new RegExp(`.{${chunkSize}}`, "g"));
}

const convertHexUnitTo256 = (hexStr) => {
  return parseInt(hexStr.repeat(2 / hexStr.length), 16);
}

const getAlphafloat = (a, alpha) => {
    if (typeof a !== "undefined") {return a / 255}
    
    // Assume 1 for omitted or unclear alpha
    if ((typeof alpha != "number") || (alpha < 0) || (alpha > 1)) {
      return 1;
    }

    return alpha;
}

export default function hexToRGBA(hex, alpha) {
    if (!isValidHex(hex)) {
      throw new Error("Invalid hex: ", hex);
    }

    const chunkSize = Math.floor((hex.length - 1) / 3);
    const hexArr = getChunksFromString(hex.slice(1), chunkSize);
    const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
    const fullString = `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;

    return {
      fullString, r, g, b, a: getAlphafloat(a, alpha)
    }
}