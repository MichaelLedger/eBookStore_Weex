export default {
  encryptionMxr: function (data, boolEncryption) {
    const packetHeaderSize = 5
    let sndBuf = stringToByte(data)
    let size = sndBuf.length

    let tempBuffer = []
    if (boolEncryption) {
      do {
        let intRand = Math.random() * 255
        tempBuffer.push(parseInt(intRand))
      } while (tempBuffer[0] === 0)
    } else {
      tempBuffer.push(0)
    }

    let byteLength = int32ToBytes(size + packetHeaderSize)

    tempBuffer[1] = byteLength[0]
    tempBuffer[2] = byteLength[1]
    tempBuffer[3] = byteLength[2]
    tempBuffer[4] = byteLength[3]

    if (tempBuffer[0] !== 0) {
      for (let i = 0; i < size; i++) {
        tempBuffer[packetHeaderSize + i] = parseInt((sndBuf[i] + (i ^ (parseInt(tempBuffer[0])))) % 256)
        tempBuffer[packetHeaderSize + i] = parseInt((tempBuffer[packetHeaderSize + i] ^ (parseInt(tempBuffer[0]) ^ (size - i))) % 256)
      }
    } else {
      for (let i = 0; i < size; i++) {
        tempBuffer[packetHeaderSize + i] = sndBuf[i]
      }
    }

    let result = arrayBufferToBase64(tempBuffer)
    return result
  },

  decryptionMxr: function (data) {
    try {
      if (data === undefined || data === '') {
        return ''
      }
      const packetHeaderSize = 5

      let arrayBuffer = base64ToArrayBuffer(data.replace(/ /g, '+'))
      let buffer = new Uint8Array(arrayBuffer)
      let newBuffer = []
      let size = buffer.byteLength

      if (buffer[0] === '\0') {
        for (let i = packetHeaderSize; i < size; i++) {
          newBuffer[i - packetHeaderSize] = buffer[i]
        }

        return arrayBufferToBase64(newBuffer)
      }

      for (let i = packetHeaderSize; i < size; i++) {
        let t1 = parseInt((buffer[i] ^ (buffer[0] ^ (size - i))) % 256)

        if (t1 < 0) {
          t1 += 256
        }

        newBuffer[i - packetHeaderSize] = t1

        let t2 = parseInt((newBuffer[i - packetHeaderSize] - ((i - packetHeaderSize) ^ buffer[0])) % 256)

        if (t2 < 0) {
          t2 += 256
        }

        newBuffer[i - packetHeaderSize] = t2
      }

      let result = bytesToString(newBuffer)
      return result
    } catch (e) {
      return data
    }
  }
}

function int32ToBytes (num) {
  let byte = []
  for (let i = 0; i < 4; i++) {
    byte[i] = num >> 24 - i * 8
  }
  return byte.reverse()
}

function bytesToString (arr) {
  if (typeof arr === 'string') {
    return arr
  }
  let str = ''
  let _arr = arr
  for (let i = 0; i < _arr.length; i++) {
    let one = _arr[i].toString(2)
    let v = one.match(/^1+?(?=0)/)
    if (v && one.length === 8) {
      let bytesLength = v[0].length
      let store = _arr[i].toString(2).slice(7 - bytesLength)
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2)
      }
      str += String.fromCharCode(parseInt(store, 2))
      i += bytesLength - 1
    } else {
      str += String.fromCharCode(_arr[i])
    }
  }
  return str
}

function arrayBufferToBase64 (buffer) {
  let binary = ''
  let bytes = new Uint8Array(buffer)
  let len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function base64ToArrayBuffer (base64) {
  let binaryString = atob(base64)
  let len = binaryString.length
  let bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

function stringToByte (str) {
  let bytes = []
  let len, c
  len = str.length
  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0)
      bytes.push(((c >> 12) & 0x3F) | 0x80)
      bytes.push(((c >> 6) & 0x3F) | 0x80)
      bytes.push((c & 0x3F) | 0x80)
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0)
      bytes.push(((c >> 6) & 0x3F) | 0x80)
      bytes.push((c & 0x3F) | 0x80)
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0)
      bytes.push((c & 0x3F) | 0x80)
    } else {
      bytes.push(c & 0xFF)
    }
  }
  return bytes
}

let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

function btoa (input) {
  let str = String(input)
  let output = ''
  for (
    // initialize result and counter
    let block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4)
    if (charCode > 0xFF) {
      console.error('>>>> \'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.')
    }
    block = block << 8 | charCode
  }
  return output
}

function atob (input) {
  let str = (String(input)).replace(/[=]+$/, '') // #31: ExtendScript bad parse of /=
  let output = ''
  if (str.length % 4 === 1) {
    console.error("'atob' failed: The string to be decoded is not correctly encoded.")
  }
  for (
    // initialize result and counters
    let bc = 0, bs, buffer, idx = 0;
    // get next character
    buffer = str.charAt(idx++); // eslint-disable-line no-cond-assign
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, // and if not first of each 4 characters, // convert the first 8 bits to one ascii character
    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer)
  }
  return output
}
