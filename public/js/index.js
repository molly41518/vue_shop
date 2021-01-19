var oHTML = document.querySelector('html');
var aWidth = oHTML.clientWidth;

// 設計寬度:375px
// 預設字體:16px

oHTML.style.fontSize=(aWidth/375)* 16 +'px';