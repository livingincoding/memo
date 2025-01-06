function utf8ToBase64(str) {
            var encoded = unescape(encodeURIComponent(str));
            return btoa(encoded);
        }

        function base64ToUtf8(encoded) {
            var decoded = atob(encoded);
            return decodeURIComponent(escape(decoded));
        }

        function updateURLWithMemo() {
            var memoHTML = document.getElementById("memo").innerHTML;
            var encodedMemo = utf8ToBase64(memoHTML);
            var newURL = window.location.origin + window.location.pathname + "#" + encodedMemo;
            window.history.replaceState({ path: newURL }, '', newURL);
        }

        function createLink() {
            var url = prompt("링크를 입력하세요:");
            if (url) {
                document.execCommand('createLink', false, url);
                var links = document.getElementById("memo").getElementsByTagName("a");
                for (var i = 0; i < links.length; i++) {
                    links[i].setAttribute("contenteditable", "false");
                    links[i].setAttribute("title", "Ctrl 클릭으로 열기");
                }
            }
        }

        document.getElementById("fontColor").addEventListener("input", function () {
            document.execCommand('foreColor', false, this.value);
        });

        document.getElementById("highlightColor").addEventListener("input", function () {
            document.execCommand('backColor', false, this.value);
        });

        document.getElementById("fontSize").addEventListener("change", function () {
            if (this.value) {
                document.execCommand('fontSize', false, this.value);
            }
        });

        document.getElementById("memo").addEventListener("click", function (event) {
            if (event.target.tagName === "A") {
                if (event.ctrlKey) {
                    window.open(event.target.href, "_blank");
                } else {
                    event.preventDefault();
                }
            }
        });

        window.onload = function () {
            var hash = window.location.hash.substr(1);
            if (hash) {
                var decodedMemo = base64ToUtf8(hash);
                document.getElementById("memo").innerHTML = decodedMemo;
                var links = document.getElementById("memo").getElementsByTagName("a");
                for (var i = 0; i < links.length; i++) {
                    links[i].setAttribute("contenteditable", "false");
                    links[i].setAttribute("title", "Ctrl 클릭으로 열기");
                }
            }

            document.getElementById("memo").addEventListener("input", updateURLWithMemo);
        };
function showNotification(message, type) {
            new Noty({
                text: message,
                type: type,
                timeout: 3000 
            }).show();
        }

      
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleInfo = console.info;
const originalConsoleWarn = console.warn;


console.log = function(message) {
    originalConsoleLog.apply(console, arguments);
    showNotification(message, 'info');
}

console.error = function(message) {
    originalConsoleError.apply(console, arguments);
    showNotification(message, 'error');
}

console.info = function(message) {
    originalConsoleInfo.apply(console, arguments);
    showNotification(message, 'info');
}

console.warn = function(message) {
    originalConsoleWarn.apply(console, arguments);
  
showNotification(message, 'warning');
}
const allowedDomain = "메모.온라인.한국";

const currentDomain = window.location.hostname;

const punycodeDomain = "xn--h32b2f.xn--oi2b61z32a.xn--3e0b707e";

if (currentDomain !== allowedDomain && currentDomain !== punycodeDomain) {
  
  alert("허용되지 않은 도메인입니다. 접속할 수 없습니다.");
  window.location.href = "about:blank";
}
