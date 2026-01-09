// background.js

let currentText = "";

function appendAndFlush(newLine) {
  currentText += newLine + "\r\n";

  // 1) 直接编码成 Data URI
  const dataUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(currentText);

  chrome.downloads.download({
    url: dataUrl,
    filename: "log.txt",
    conflictAction: "overwrite",
    saveAs: false
  });
}

// 每 5 秒写一行日志到 Downloads/log.txt
setInterval(() => {
  const now = new Date().toLocaleString();
  appendAndFlush(`写入时间：${now}`);
}, 10000);

let mes = 'a'
if (2> 1) {
  const res = await api()
  if (res.data > 0) {
    mes = 'bbb'
  }
}
this.$message({
  title: '提示',
  message
})


var a = [
  {
    id:1-1,
    pid: 0
  }, {
    id:1,
    pid: 1-1
  }, {
    id:2,
    pid: 1-1
  }, {
    id:2-2,
    pid: 1-1
  }, {
    id:3,
    pid: 2-2
  }
]