﻿/*
* author : mozilla
*   date : 20160926
*/
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
        value: function (callback, type, quality) {

            var binStr = atob(this.toDataURL(type, quality).split(",")[1]),
                len = binStr.length,
                arr = new Uint8Array(len);

            for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
            }

            callback(new Blob([arr], { type: type || "image/png" }));
        }
    });
}