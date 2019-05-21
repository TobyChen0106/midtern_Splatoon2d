export const getKeyDownState = (e, state) => {
    var KeyDownState;
    var dir = state.playerMoveDir;

    switch (e.key) {
        case 'w':
        case 'W':
            KeyDownState = {
                keyDownStatus: {
                    a: state.keyDownStatus.a,
                    w: 1,
                    s: state.keyDownStatus.s,
                    d: state.keyDownStatus.d,
                }
            };
            dir.y  = -1;
            break;
        case 's':
        case 'S':
            KeyDownState = {
                keyDownStatus: {
                    a: state.keyDownStatus.a,
                    w: state.keyDownStatus.w,
                    s: 1,
                    d: state.keyDownStatus.d,
                }
            };
            dir.y  = 1;
            break;
        case 'a':
        case 'A':
            KeyDownState = {
                keyDownStatus: {
                    a: 1,
                    w: state.keyDownStatus.w,
                    s: state.keyDownStatus.s,
                    d: state.keyDownStatus.d,
                }
            };
            dir.x  = -1;
            break;
        case 'd':
        case 'D':
            KeyDownState = {
                keyDownStatus: {
                    a: state.keyDownStatus.a,
                    w: state.keyDownStatus.w,
                    s: state.keyDownStatus.s,
                    d: 1,
                }
            };
            dir.x  = 1;
            break;
        default:
            break;
    }
    return [KeyDownState, dir];
}
export const getKeyUpState = (e, state) => {
    var KeyUpState;
    var dir = state.playerMoveDir;

    // console.log(e.key);
    switch (e.key) {
        case 'w':
        case 'W':
        KeyUpState = {
                keyDownStatus: {
                    a: state.keyDownStatus.a,
                    w: 0,
                    s: state.keyDownStatus.s,
                    d: state.keyDownStatus.d,
                }
            };
            if(state.keyDownStatus.s === 1){
                dir.y = 1;
            }else{
                dir.y = 0;
            }
            break;
        case 's':
        case 'S':
        KeyUpState = {
                keyDownStatus: {
                    a: state.keyDownStatus.a,
                    w: state.keyDownStatus.w,
                    s: 0,
                    d: state.keyDownStatus.d,
                }
            };
            if(state.keyDownStatus.w === 1){
                dir.y = -1;
            }else{
                dir.y = 0;
            }
            break;
        case 'a':
        case 'A':
        KeyUpState = {
                keyDownStatus: {
                    a: 0,
                    w: state.keyDownStatus.w,
                    s: state.keyDownStatus.s,
                    d: state.keyDownStatus.d,
                }
            };
            if(state.keyDownStatus.d === 1){
                dir.x = 1;
            }else{
                dir.x = 0;
            }
            break;
        case 'd':
        case 'D':
        KeyUpState = {
                keyDownStatus: {
                    a: state.keyDownStatus.a,
                    w: state.keyDownStatus.w,
                    s: state.keyDownStatus.s,
                    d: 0,
                }
            };
            if(state.keyDownStatus.a === 1){
                dir.x = -1;
            }else{
                dir.x = 0;
            }
            break;
        default:
            break;
    }
    return [KeyUpState, dir];
}

export const encodeBase64 = (input) => {
    var keyStr =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
   
    while (i < input.length) {
      chr1 = input[i++];
      chr2 = i < input.length ? input[i++] : Number.NaN;
      chr3 = i < input.length ? input[i++] : Number.NaN;
   
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
   
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
  }