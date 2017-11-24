/**
 * @author : ReversalMinute
 * @mail   : mailzy@vip.qq.com
 * @date   :20160324
 */

/**
 * @class  KeyboardListener
 * @returns {keyboard} 
 */
function KeyboardListener() {
    var me = this;

    me.keys = {
        Backspace: false,//8 Backspace
        Tab: false,//9 Tab
        Numpad5Center: false,//12 Numpad5
        NumpadEnter: false,//13 NumpadEnter
        Enter: false,//13 Enter
        ShiftLeft: false,//16 ShiftLeft
        ShiftRight: false,//16 ShiftRight
        ControlLeft: false,//17 ControlLeft
        ControlRight: false,//17 ControlRight
        AltLeft: false,//18 AltLeft
        AltRight: false,//18 AltRight
        Pause: false,//19 Pause
        CapsLock: false,//20 CapsLock
        Escape: false,//27 Escape
        Space: false,//32 Space
        Numpad9PageUp: false,//33 Numpad9
        PageUp: false,//33 PageUp
        PageDown: false,//34 PageDown
        Numpad3PageDown: false,//34 Numpad3
        Numpad1End: false,//35 Numpad1
        End: false,//35 End
        Home: false,//36 Home
        Numpad7Home: false,//36 Numpad7
        ArrowLeft: false,//37 ArrowLeft
        Numpad4ArrowLeft: false,//37 Numpad4
        ArrowUp: false,//38 ArrowUp
        Numpad8ArrowUp: false,//38 Numpad8
        ArrowRight: false,//39 ArrowRight
        Numpad6ArrowRight: false,//39 Numpad6
        ArrowDown: false,//40 ArrowDown
        Numpad2ArrowDown: false,//40 Numpad2
        Insert: false,//45 Insert
        Numpad0Insert: false,//45 Numpad0
        Delete: false,//46 Delete
        NumpadDecimalDelete: false,//46 NumpadDecimal
        Digit0: false,//48 Digit0
        Digit1: false,//49 Digit1
        Digit2: false,//50 Digit2
        Digit3: false,//51 Digit3
        Digit4: false,//52 Digit4
        Digit5: false,//53 Digit5
        Digit6: false,//54 Digit6
        Digit7: false,//55 Digit7
        Digit8: false,//56 Digit8
        Digit9: false,//57 Digit9
        KeyA: false,//65 KeyA
        KeyB: false,//66 KeyB
        KeyC: false,//67 KeyC
        KeyD: false,//68 KeyD
        KeyE: false,//69 KeyE
        KeyF: false,//70 KeyF
        KeyG: false,//71 KeyG
        KeyH: false,//72 KeyH
        KeyI: false,//73 KeyI
        KeyJ: false,//74 KeyJ
        KeyK: false,//75 KeyK
        KeyL: false,//76 KeyL
        KeyM: false,//77 KeyM
        KeyN: false,//78 KeyN
        KeyO: false,//79 KeyO
        KeyP: false,//80 KeyP
        KeyQ: false,//81 KeyQ
        KeyR: false,//82 KeyR
        KeyS: false,//83 KeyS
        KeyT: false,//84 KeyT
        KeyU: false,//85 KeyU
        KeyV: false,//86 KeyV
        KeyW: false,//87 KeyW
        KeyX: false,//88 KeyX
        KeyY: false,//89 KeyY
        KeyZ: false,//90 KeyZ
        OSLeft: false,//91 OSLeft
        ContextMenu: false,//93 ContextMenu
        Numpad0: false,//96 Numpad0
        Numpad1: false,//97 Numpad1
        Numpad2: false,//98 Numpad2
        Numpad3: false,//99 Numpad3
        Numpad4: false,//100 Numpad4
        Numpad5: false,//101 Numpad5
        Numpad6: false,//102 Numpad6
        Numpad7: false,//103 Numpad7
        Numpad8: false,//104 Numpad8
        Numpad9: false,//105 Numpad9
        NumpadMultiply: false,//106 NumpadMultiply
        NumpadAdd: false,//107 NumpadAdd
        NumpadSubtract: false,//109 NumpadSubtract
        NumpadDecimal: false,//110 NumpadDecimal
        NumpadDivide: false,//111 NumpadDivide
        F1: false,//112 F1
        F2: false,//113 F2
        F3: false,//114 F3
        F4: false,//115 F4
        F5: false,//116 F5
        F6: false,//117 F6
        F7: false,//118 F7
        F8: false,//119 F8
        F9: false,//120 F9
        F10: false,//121 F10
        F11: false,//122 F11
        F12: false,//123 F12
        NumLock: false,//144 NumLock
        ScrollLock: false,//145 ScrollLock
        Semicolon: false,//186 Semicolon
        Equal: false,//187 Equal
        Comma: false,//188 Comma
        Minus: false,//189 Minus
        Period: false,//190 Period
        Slash: false,//191 Slash
        Backquote: false,//192 Backquote
        BracketLeft: false,//219 BracketLeft
        Backslash: false,//220 Backslash
        BracketRight: false,//221 BracketRight
        Quote: false//222 Quote
    };

    window.addEventListener("keydown", function (e) {
        e.preventDefault();
        me.setKeyStatus(e, true);
    });
    window.addEventListener("keyup", function (e) {
        me.setKeyStatus(e, false);
    });
    return me.keys;
};

/**
 * @method setKeyStatus
 * @param {KeyboardEvent} keyboardEvent 
 * @param {Bool} isKeyDown 
 * @returns {void} 
 */
KeyboardListener.prototype.setKeyStatus = function (keyboardEvent, isKeyDown) {
    var keys = this.keys;
    //Backspace
    if (keyboardEvent.keyCode === 8) { keys.Backspace = isKeyDown; }
    //Tab
    else if (keyboardEvent.keyCode === 9) { keys.Tab = isKeyDown; }
    //Numpad5Center
    else if (keyboardEvent.keyCode === 12 && keyboardEvent.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) { keys.Numpad5Center = isKeyDown; }
    //NumpadEnter
    else if (keyboardEvent.keyCode === 13 && keyboardEvent.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) { keys.NumpadEnter = isKeyDown; }
    //Enter
    else if (keyboardEvent.keyCode === 13) { keys.Enter = isKeyDown; }
    //ShiftLeft
    else if (keyboardEvent.keyCode === 16) { keys.ShiftLeft = isKeyDown; }
    //ShiftRight
    else if (keyboardEvent.keyCode === 16) { keys.ShiftRight = isKeyDown; }
    //ControlLeft
    else if (keyboardEvent.keyCode === 17) { keys.ControlLeft = isKeyDown; }
    //ControlRight
    else if (keyboardEvent.keyCode === 17) { keys.ControlRight = isKeyDown; }
    //AltLeft
    else if (keyboardEvent.keyCode === 18) { keys.AltLeft = isKeyDown; }
    //AltRight
    else if (keyboardEvent.keyCode === 18) { keys.AltRight = isKeyDown; }
    //Pause
    else if (keyboardEvent.keyCode === 19) { keys.Pause = isKeyDown; }
    //CapsLock
    else if (keyboardEvent.keyCode === 20) { keys.CapsLock = isKeyDown; }
    //Escape
    else if (keyboardEvent.keyCode === 27) { keys.Escape = isKeyDown; }
    //Space
    else if (keyboardEvent.keyCode === 32) { keys.Space = isKeyDown; }
    //Numpad9PageUp
    else if (keyboardEvent.keyCode === 33 && keyboardEvent.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) { keys.Numpad9PageUp = isKeyDown; }
    //PageUp
    else if (keyboardEvent.keyCode === 33) { keys.PageUp = isKeyDown; }
    //PageDown
    else if (keyboardEvent.keyCode === 34) { keys.PageDown = isKeyDown; }
    //Numpad3PageDown
    else if (keyboardEvent.keyCode === 34 && keyboardEvent.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) { keys.Numpad3PageDown = isKeyDown; }
    //Numpad1End
    else if (keyboardEvent.keyCode === 35 && keyboardEvent.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) { keys.Numpad1End = isKeyDown; }
    //End
    else if (keyboardEvent.keyCode === 35) { keys.End = isKeyDown; }
    //Home
    else if (keyboardEvent.keyCode === 36) { keys.Home = isKeyDown; }
    //Numpad7Home
    else if (keyboardEvent.keyCode === 36 && keyboardEvent.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) { keys.Numpad7Home = isKeyDown; }
    //ArrowLeft
    else if (keyboardEvent.keyCode === 37) { keys.ArrowLeft = isKeyDown; }
    //Numpad4ArrowLeft
    else if (keyboardEvent.keyCode === 37) { keys.Numpad4ArrowLeft = isKeyDown; }
    //ArrowUp
    else if (keyboardEvent.keyCode === 38) { keys.ArrowUp = isKeyDown; }
    //Numpad8ArrowUp
    else if (keyboardEvent.keyCode === 38) { keys.Numpad8ArrowUp = isKeyDown; }
    //ArrowRight
    else if (keyboardEvent.keyCode === 39) { keys.ArrowRight = isKeyDown; }
    //Numpad6ArrowRight
    else if (keyboardEvent.keyCode === 39) { keys.Numpad6ArrowRight = isKeyDown; }
    //ArrowDown
    else if (keyboardEvent.keyCode === 40) { keys.ArrowDown = isKeyDown; }
    //Numpad2ArrowDown
    else if (keyboardEvent.keyCode === 40) { keys.Numpad2ArrowDown = isKeyDown; }
    //Insert
    else if (keyboardEvent.keyCode === 45) { keys.Insert = isKeyDown; }
    //Numpad0Insert
    else if (keyboardEvent.keyCode === 45) { keys.Numpad0Insert = isKeyDown; }
    //Delete
    else if (keyboardEvent.keyCode === 46) { keys.Delete = isKeyDown; }
    //NumpadDecimalDelete
    else if (keyboardEvent.keyCode === 46) { keys.NumpadDecimalDelete = isKeyDown; }
    //Digit0
    else if (keyboardEvent.keyCode === 48) { keys.Digit0 = isKeyDown; }
    //Digit1
    else if (keyboardEvent.keyCode === 49) { keys.Digit1 = isKeyDown; }
    //Digit2
    else if (keyboardEvent.keyCode === 50) { keys.Digit2 = isKeyDown; }
    //Digit3
    else if (keyboardEvent.keyCode === 51) { keys.Digit3 = isKeyDown; }
    //Digit4
    else if (keyboardEvent.keyCode === 52) { keys.Digit4 = isKeyDown; }
    //Digit5
    else if (keyboardEvent.keyCode === 53) { keys.Digit5 = isKeyDown; }
    //Digit6
    else if (keyboardEvent.keyCode === 54) { keys.Digit6 = isKeyDown; }
    //Digit7
    else if (keyboardEvent.keyCode === 55) { keys.Digit7 = isKeyDown; }
    //Digit8
    else if (keyboardEvent.keyCode === 56) { keys.Digit8 = isKeyDown; }
    //Digit9
    else if (keyboardEvent.keyCode === 57) { keys.Digit9 = isKeyDown; }
    //KeyA
    else if (keyboardEvent.keyCode === 65) { keys.KeyA = isKeyDown; }
    //KeyB
    else if (keyboardEvent.keyCode === 66) { keys.KeyB = isKeyDown; }
    //KeyC
    else if (keyboardEvent.keyCode === 67) { keys.KeyC = isKeyDown; }
    //KeyD
    else if (keyboardEvent.keyCode === 68) { keys.KeyD = isKeyDown; }
    //KeyE
    else if (keyboardEvent.keyCode === 69) { keys.KeyE = isKeyDown; }
    //KeyF
    else if (keyboardEvent.keyCode === 70) { keys.KeyF = isKeyDown; }
    //KeyG
    else if (keyboardEvent.keyCode === 71) { keys.KeyG = isKeyDown; }
    //KeyH
    else if (keyboardEvent.keyCode === 72) { keys.KeyH = isKeyDown; }
    //KeyI
    else if (keyboardEvent.keyCode === 73) { keys.KeyI = isKeyDown; }
    //KeyJ
    else if (keyboardEvent.keyCode === 74) { keys.KeyJ = isKeyDown; }
    //KeyK
    else if (keyboardEvent.keyCode === 75) { keys.KeyK = isKeyDown; }
    //KeyL
    else if (keyboardEvent.keyCode === 76) { keys.KeyL = isKeyDown; }
    //KeyM
    else if (keyboardEvent.keyCode === 77) { keys.KeyM = isKeyDown; }
    //KeyN
    else if (keyboardEvent.keyCode === 78) { keys.KeyN = isKeyDown; }
    //KeyO
    else if (keyboardEvent.keyCode === 79) { keys.KeyO = isKeyDown; }
    //KeyP
    else if (keyboardEvent.keyCode === 80) { keys.KeyP = isKeyDown; }
    //KeyQ
    else if (keyboardEvent.keyCode === 81) { keys.KeyQ = isKeyDown; }
    //KeyR
    else if (keyboardEvent.keyCode === 82) { keys.KeyR = isKeyDown; }
    //KeyS
    else if (keyboardEvent.keyCode === 83) { keys.KeyS = isKeyDown; }
    //KeyT
    else if (keyboardEvent.keyCode === 84) { keys.KeyT = isKeyDown; }
    //KeyU
    else if (keyboardEvent.keyCode === 85) { keys.KeyU = isKeyDown; }
    //KeyV
    else if (keyboardEvent.keyCode === 86) { keys.KeyV = isKeyDown; }
    //KeyW
    else if (keyboardEvent.keyCode === 87) { keys.KeyW = isKeyDown; }
    //KeyX
    else if (keyboardEvent.keyCode === 88) { keys.KeyX = isKeyDown; }
    //KeyY
    else if (keyboardEvent.keyCode === 89) { keys.KeyY = isKeyDown; }
    //KeyZ
    else if (keyboardEvent.keyCode === 90) { keys.KeyZ = isKeyDown; }
    //OSLeft
    else if (keyboardEvent.keyCode === 91) { keys.OSLeft = isKeyDown; }
    //ContextMenu
    else if (keyboardEvent.keyCode === 93) { keys.ContextMenu = isKeyDown; }
    //Numpad0
    else if (keyboardEvent.keyCode === 96) { keys.Numpad0 = isKeyDown; }
    //Numpad1
    else if (keyboardEvent.keyCode === 97) { keys.Numpad1 = isKeyDown; }
    //Numpad2
    else if (keyboardEvent.keyCode === 98) { keys.Numpad2 = isKeyDown; }
    //Numpad3
    else if (keyboardEvent.keyCode === 99) { keys.Numpad3 = isKeyDown; }
    //Numpad4
    else if (keyboardEvent.keyCode === 100) { keys.Numpad4 = isKeyDown; }
    //Numpad5
    else if (keyboardEvent.keyCode === 101) { keys.Numpad5 = isKeyDown; }
    //Numpad6
    else if (keyboardEvent.keyCode === 102) { keys.Numpad6 = isKeyDown; }
    //Numpad7
    else if (keyboardEvent.keyCode === 103) { keys.Numpad7 = isKeyDown; }
    //Numpad8
    else if (keyboardEvent.keyCode === 104) { keys.Numpad8 = isKeyDown; }
    //Numpad9
    else if (keyboardEvent.keyCode === 105) { keys.Numpad9 = isKeyDown; }
    //NumpadMultiply
    else if (keyboardEvent.keyCode === 106) { keys.NumpadMultiply = isKeyDown; }
    //NumpadAdd
    else if (keyboardEvent.keyCode === 107) { keys.NumpadAdd = isKeyDown; }
    //NumpadSubtract
    else if (keyboardEvent.keyCode === 109) { keys.NumpadSubtract = isKeyDown; }
    //NumpadDecimal
    else if (keyboardEvent.keyCode === 110) { keys.NumpadDecimal = isKeyDown; }
    //NumpadDivide
    else if (keyboardEvent.keyCode === 111) { keys.NumpadDivide = isKeyDown; }
    //F1
    else if (keyboardEvent.keyCode === 112) { keys.F1 = isKeyDown; }
    //F2
    else if (keyboardEvent.keyCode === 113) { keys.F2 = isKeyDown; }
    //F3
    else if (keyboardEvent.keyCode === 114) { keys.F3 = isKeyDown; }
    //F4
    else if (keyboardEvent.keyCode === 115) { keys.F4 = isKeyDown; }
    //F5
    else if (keyboardEvent.keyCode === 116) { keys.F5 = isKeyDown; }
    //F6
    else if (keyboardEvent.keyCode === 117) { keys.F6 = isKeyDown; }
    //F7
    else if (keyboardEvent.keyCode === 118) { keys.F7 = isKeyDown; }
    //F8
    else if (keyboardEvent.keyCode === 119) { keys.F8 = isKeyDown; }
    //F9
    else if (keyboardEvent.keyCode === 120) { keys.F9 = isKeyDown; }
    //F10
    else if (keyboardEvent.keyCode === 121) { keys.F10 = isKeyDown; }
    //F11
    else if (keyboardEvent.keyCode === 122) { keys.F11 = isKeyDown; }
    //F12
    else if (keyboardEvent.keyCode === 123) { keys.F12 = isKeyDown; }
    //NumLock
    else if (keyboardEvent.keyCode === 144) { keys.NumLock = isKeyDown; }
    //ScrollLock
    else if (keyboardEvent.keyCode === 145) { keys.ScrollLock = isKeyDown; }
    //Semicolon
    else if (keyboardEvent.keyCode === 186) { keys.Semicolon = isKeyDown; }
    //Equal
    else if (keyboardEvent.keyCode === 187) { keys.Equal = isKeyDown; }
    //Comma
    else if (keyboardEvent.keyCode === 188) { keys.Comma = isKeyDown; }
    //Minus
    else if (keyboardEvent.keyCode === 189) { keys.Minus = isKeyDown; }
    //Period
    else if (keyboardEvent.keyCode === 190) { keys.Period = isKeyDown; }
    //Slash
    else if (keyboardEvent.keyCode === 191) { keys.Slash = isKeyDown; }
    //Backquote
    else if (keyboardEvent.keyCode === 192) { keys.Backquote = isKeyDown; }
    //BracketLeft
    else if (keyboardEvent.keyCode === 219) { keys.BracketLeft = isKeyDown; }
    //Backslash
    else if (keyboardEvent.keyCode === 220) { keys.Backslash = isKeyDown; }
    //BracketRight
    else if (keyboardEvent.keyCode === 221) { keys.BracketRight = isKeyDown; }
    //Quote
    else if (keyboardEvent.keyCode === 222) { keys.Quote = isKeyDown; }
};
