"use strict";(self.webpackChunkol_mapbox_style=self.webpackChunkol_mapbox_style||[]).push([[670],{2628:(e,t,o)=>{o(9789);var s=o(707),a=document.cookie.replace(/(?:(?:^|.*;\s*)maptiler_access_token\s*\=\s*([^;]*).*$)|^.*$/,"$1");a||(a=window.prompt("Enter your MapTiler API access token:"),document.cookie="maptiler_access_token="+a+"; expires=Fri, 31 Dec 9999 23:59:59 GMT"),fetch("https://api.maptiler.com/maps/outdoor-v2/style.json?key="+a).then((function(e){return e.json()})).then((function(e){(0,s.ZP)("map",Object.assign({},e,{center:[13.783578,47.609499],zoom:11,metadata:Object.assign(e.metadata,{"ol:webfonts":"https://fonts.googleapis.com/css?family={Font+Family}:{fontweight}{fontstyle}"})}))}))}},e=>{e(e.s=2628)}]);
//# sourceMappingURL=maptiler-hillshading.js.map