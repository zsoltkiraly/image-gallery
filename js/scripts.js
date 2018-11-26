var imageGallery=function(){"use strict";function a(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function b(){document.addEventListener("keydown",function(a){var b=document.querySelector(".body-image-gallery");if(b){var c=b.querySelector(".navigation.next"),d=b.querySelector(".navigation.prev"),e=b.querySelector(".icon-cancel");39==a.keyCode?c.click():37==a.keyCode?d.click():27==a.keyCode&&e.click()}},!1)}function c(a){if(!document.querySelector(".body-image-gallery")){var b=document.createElement("section");b.classList.add("body-image-gallery","in-active"),b.innerHTML='<div class="body-image-gallery-overlay"></div><div class="body-image-gallery-container"><div class="image-gallery-sidebar"><div class="image-gallery-close"><i class="icon-cancel"></i></div><div class="image-gallery-header"></div><div class="body-image"><div class="loading in-active"></div><img class="in-active" src=""><div class="navigation prev"><i class="icon-left-arrow"></i></div><div class="navigation next"><i class="icon-right-arrow"></i></div></div><div class="sidebar-container"><div class="details-toggle"><div class="counter mobile"><span class="number"></span> / <span class="number-max"></span></div><div class="details-button"><span>Details</span> <i class="arrow"></i></div></div><div class="toggle-wrapper"><div class="toggle-wrapper-container"><div class="sidebar-content details"><div class="image-gallery-header"></div><div class="lead"></div><div class="counter desktop"><span><span class="number"></span> / <span class="number-max"></span></span></div></div><div class="sidebar-content thumb"><div class="thumb-container"><div class="bottom"><ul></ul></div></div></div></div></div></div></div></div>',document.body.insertBefore(b,document.body.firstChild)}}function d(a,b){if(a)var c=a.querySelector(".thumb ul");c&&C(b,function(a,b){c.innerHTML+='<li data-image-src="'+b.getAttribute("data-image-src")+'" data-thumb-id="'+parseFloat(a+1)+'"><img src="'+b.querySelector("img").getAttribute("src")+'" alt="'+b.querySelector("img").alt+'" /><span>'+b.querySelector("span").innerHTML+"</span></li>"})}function e(){var a;return a=window.innerHeight<window.innerWidth||90===window.orientation||-90===window.orientation?!0:!1}function f(a){e()?a.classList.add("landscape"):a.classList.remove("landscape")}function g(){window.matchMedia("(min-width: 992px)").matches?document.documentElement.clientWidth<window.innerWidth&&document.body.classList.add("overflow-hidden"):document.body.classList.add("overflow-hidden")}function h(){document.body.classList.remove("overflow-hidden")}function i(){function a(){var a=document.querySelector(".ps__rail-x"),d=document.querySelector(".ps__rail-y");window.matchMedia("(min-width: 769px)").matches?(!b||a||d||(c=new PerfectScrollbar(b)),c.update()):c.destroy(),b&&(b.scrollTop=0)}var b=document.querySelector(".body-image-gallery .thumb ul"),c=new PerfectScrollbar(b);a(),window.addEventListener("resize",function(){a()},!1)}function j(a){C(a,function(a,b){b.setAttribute("data-user-id",parseFloat(a+1))})}function k(a){a&&(a.classList.remove("in-active"),setTimeout(function(){a.classList.add("active")},50),setTimeout(function(){g()},550))}function l(a){function b(){c.classList.remove("active"),setTimeout(function(){document.body.removeChild(c)},550),h();var b=a.querySelector("ul.user-image-gallery-container li.active");b&&b.classList.remove("active"),document.documentElement.scrollTop=document.body.scrollTop=document.body.getAttribute("data-scroll"),document.body.removeAttribute("data-scroll")}var c=document.querySelector(".body-image-gallery");if(c&&a){var d=c.querySelector(".icon-cancel");d.addEventListener("click",function(){b()},!1)}}function m(a){a&&(a.classList.remove("in-active"),setTimeout(function(){a.classList.add("active")},50))}function n(a){a&&(setTimeout(function(){a.classList.remove("active")},50),setTimeout(function(){a.classList.add("in-active")},100))}function o(a,b,c){var d=c.querySelector("img"),e=c.querySelector("span");d&&e&&(C(a,function(a,b){b.innerHTML=e.innerHTML}),b.innerHTML=d.alt)}function p(a,b,c,d,e){a.classList.add("in-active"),setTimeout(function(){e?d?a.setAttribute("src",c[0].getAttribute("data-image-src")):a.setAttribute("src",c.getAttribute("data-image-src")):d?a.setAttribute("src",c[c.length-1].getAttribute("data-image-src")):a.setAttribute("src",c.getAttribute("data-image-src")),m(b)},350),a.addEventListener("load",function(){n(b),a.classList.remove("in-active")},!1)}function q(a,b,c,d,e){if(x){x=!1,setTimeout(function(){x=!0},750);var f=c.querySelector("ul.user-image-gallery-container li.active"),g=d.querySelectorAll(".thumb ul li"),h=d.querySelectorAll(".counter span.number"),i=d.querySelectorAll(".image-gallery-header"),j=d.querySelector(".lead"),k=parseFloat(f.getAttribute("data-user-id"));if(null!=k)var l=k+1;C(h,function(a,b){b.innerHTML=l}),l<=a.length?(C(a,function(a,c){c.classList.remove("active"),parseFloat(c.getAttribute("data-user-id"))==l&&(c.classList.add("active"),p(b,e,c,!1,!0),o(i,j,c))}),C(g,function(a,b){b.classList.remove("active"),parseFloat(b.getAttribute("data-thumb-id"))==l&&b.classList.add("active")})):(a[a.length-1].classList.remove("active"),a[0].classList.add("active"),g[g.length-1].classList.remove("active"),g[0].classList.add("active"),C(h,function(a,b){b.innerHTML="1"}),p(b,e,a,!0,!0),o(i,j,a[0]))}}function r(a,b,c,d,e){if(x){x=!1,setTimeout(function(){x=!0},750);var f=c.querySelector("ul.user-image-gallery-container li.active"),g=d.querySelectorAll(".thumb ul li"),h=d.querySelectorAll(".counter span.number"),i=d.querySelectorAll(".image-gallery-header"),j=d.querySelector(".lead"),k=parseFloat(f.getAttribute("data-user-id"));if(null!=k)var l=k-1;C(h,function(a,b){b.innerHTML=l}),l>0?(C(a,function(a,c){c.classList.remove("active"),parseFloat(c.getAttribute("data-user-id"))==l&&(c.classList.add("active"),p(b,e,c,!1,!1),o(i,j,c))}),C(g,function(a,b){b.classList.remove("active"),parseFloat(b.getAttribute("data-thumb-id"))==l&&b.classList.add("active")})):(a[a.length-1].classList.add("active"),a[0].classList.remove("active"),g[g.length-1].classList.add("active"),g[0].classList.remove("active"),C(h,function(b,c){c.innerHTML=""+a.length}),p(b,e,a,!0,!1),o(i,j,a[a.length-1]))}}function s(a){var b=document.querySelector(".body-image-gallery");if(b){var c=b.querySelector(".body-image"),d=c.querySelector(".loading"),e=c.querySelector(".body-image img"),f=b.querySelectorAll(".thumb ul li"),g=b.querySelectorAll(".image-gallery-header"),h=b.querySelector(".lead");C(f,function(c,i){i.addEventListener("click",function(){if(x){x=!1,setTimeout(function(){x=!0},750);var c=this;C(f,function(a,b){b.classList.remove("active")}),C(a,function(a,b){b.classList.remove("active"),parseFloat(c.getAttribute("data-thumb-id"))==parseFloat(b.getAttribute("data-user-id"))&&b.classList.add("active")}),c.classList.add("active");var i=b.querySelectorAll("span.number");C(i,function(a,b){b.innerHTML=c.getAttribute("data-thumb-id")}),p(e,d,c,!1,!0),o(g,h,c)}},!1)})}}function t(a,b){var c=document.querySelector(".body-image-gallery");if(c){var d=c.querySelector(".body-image"),e=d.querySelector(".loading"),f=d.querySelector(".body-image img"),g=c.querySelector(".navigation.next"),h=c.querySelector(".navigation.prev");g.addEventListener("click",function(){q(a,f,b,c,e)},!1),h.addEventListener("click",function(){r(a,f,b,c,e)},!1);var i=0,j=0,k=0;d&&(d.addEventListener("touchstart",function(a){var b=a.changedTouches[0];i=parseInt(b.clientX)},!1),d.addEventListener("touchend",function(d){if(0==d.touches.length){var g=d.changedTouches[0],h=parseInt(g.clientX)-i;h>70?r(a,f,b,c,e):-70>h&&q(a,f,b,c,e)}},!1),window.matchMedia("(min-width: 768px)").matches&&d.addEventListener("mousedown",function(g){j=event.clientX,g.preventDefault(),d.addEventListener("mouseup",function(d){k=j-event.clientX,k>100?q(a,f,b,c,e):-100>k&&r(a,f,b,c,e),d.preventDefault()},!1)},!1))}}function u(){var a=document.querySelector(".body-image-gallery");if(a){var b=a.querySelector(".sidebar-container");if(b){var c=b.querySelector(".details-toggle .details-button");c.addEventListener("click",function(){var a=b.querySelector(".toggle-wrapper"),d=a.querySelector(".toggle-wrapper-container");d.classList.contains("active")?(c.classList.remove("active"),d.classList.remove("active"),setTimeout(function(){d.classList.remove("block")},250)):(c.classList.add("active"),d.classList.add("block"),setTimeout(function(){d.classList.add("active")},50))},!1)}}}function v(a,b){C(a,function(e,g){g.addEventListener("click",function(){document.body.setAttribute("data-scroll",window.pageYOffset),j(a),c(a),l(b),t(a,b),u();var e=document.querySelector(".body-image-gallery");if(e){var g=e.querySelector(".body-image"),h=g.querySelector(".loading"),p=g.querySelector(".body-image img"),q=e.querySelectorAll(".image-gallery-header"),r=e.querySelector(".lead");d(e,a);var v=this,w=v.getAttribute("data-image-src"),x=parseFloat(v.getAttribute("data-user-id"));v.classList.add("active");var y=e.querySelectorAll(".thumb ul li");p.setAttribute("src",w),p.classList.remove("in-active"),m(h),p.addEventListener("load",function(){n(h)},!1),C(y,function(a,b){parseFloat(b.getAttribute("data-thumb-id"))==x&&b.classList.add("active")});var z=e.querySelectorAll("span.number");C(z,function(a,b){b.innerHTML=x});var A=e.querySelectorAll("span.number-max");C(A,function(b,c){c.innerHTML=a.length}),o(q,r,v),k(e),i(),s(a),f(e),window.addEventListener("orientationchange",function(){f(e)},!1),window.addEventListener("resize",function(){f(e)},!1)}},!1)})}function w(){var a=document.querySelector("#"+config.render);if(a){var b=a.querySelectorAll("ul.user-image-gallery-container li");v(b,a)}}var x=!0;if(a())try{for(var y in document.styleSheets){var z=document.styleSheets[y];if(z.rules)for(var A=z.rules.length-1;A>=0;A--)z.rules[A].selectorText&&z.rules[A].selectorText.match(":hover")&&z.deleteRule(A)}}catch(B){}var C=function(a,b,c){for(var d=0;d<a.length;d++)b.call(c,d,a[d])};return{app:w,keydown:b}}();window.addEventListener("load",function(){imageGallery.keydown()},!1);