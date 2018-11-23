/*
Image gallery - Code by Zsolt Király
v1.0.1 - 2018-11-21
*/

var imageGallery = function() {

    'use strict';

    var clickPermission = true;

    function hasTouch() {
        return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    if (hasTouch()) {
        try {
            for (var si in document.styleSheets) {
                var styleSheet = document.styleSheets[si];
                if (!styleSheet.rules) continue;

                for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                    if (!styleSheet.rules[ri].selectorText) continue;

                    if (styleSheet.rules[ri].selectorText.match(':hover')) {
                        styleSheet.deleteRule(ri);
                    }
                }
            }
        } catch (ex) {}
    }


    var forEach = function (array, callback, scope) {
        var i = 0;
        for (; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    }

    function keydown() {
        document.addEventListener('keydown', function(e) {
            var bodyImageGallery = document.querySelector('.body-image-gallery');
            if(bodyImageGallery) {

                var next = bodyImageGallery.querySelector('.navigation.next'),
                    previous = bodyImageGallery.querySelector('.navigation.prev'),
                    closeIcon = bodyImageGallery.querySelector('.icon-cancel'); 

                if (e.keyCode == 39) {
                    next.click();

                } else if (e.keyCode == 37) {
                    previous.click();
                    
                } else if (e.keyCode == 27) {
                    closeIcon.click();
                }
            }
        }, false);
    }


    function _renderGalleryDOM(i) {
        if(!document.querySelector('.body-image-gallery')) {
            var bodyGallery = document.createElement('section');
            bodyGallery.classList.add('body-image-gallery', 'in-active');

            bodyGallery.innerHTML = 
            '<div class="body-image-gallery-overlay"></div>' +
            '<div class="body-image-gallery-container">' +

                '<div class="image-gallery-sidebar">' +
                    '<div class="image-gallery-close"><i class="icon-cancel"></i></div>' + 

                    '<div class="image-gallery-header"></div>' + 

                    '<div class="body-image">' +

                        '<div class="loading in-active"></div><img class="in-active" src="">' +
                        '<div class="navigation prev"><i class="icon-left-arrow"></i></div>' + 
                        '<div class="navigation next"><i class="icon-right-arrow"></i></div>' + 
                    '</div>' + 

                    '<div class="sidebar-container">' +
                        '<div class="details-toggle">' +
                            '<div class="counter mobile">' +
                                '<span class="number"></span> / <span class="number-max"></span>' + 
                            '</div>' + 
                            '<div class="details-button"><span>Részletek</span> <i class="arrow"></i></div>' +
                        '</div>' + 

                        '<div class="toggle-wrapper">' +
                            '<div class="toggle-wrapper-container">' + 

                                '<div class="sidebar-content details">' + 

                                    '<div class="image-gallery-header"></div>' +

                                    '<div class="lead"></div>' + 
                                    '<div class="counter desktop">' +
                                        '<span><span class="number"></span> / <span class="number-max"></span></span>' + 
                                    '</div>' + 
                                '</div>' + 

                                '<div class="sidebar-content thumb">' + 
                                    '<div class="thumb-container">' + 
                                        '<div class="bottom">' +
                                            '<ul></ul>' +
                                        '</div>' +
                                    '</div>' + 
                                '</div>' +

                            '</div>' +
                        '</div>' +

                    '</div>' + 

                '</div>' +
            '</div>';

            document.body.insertBefore(bodyGallery, document.body.firstChild);
        }
    }


    function _renderThumbImageDOM(bIG, element) {
        if(bIG) {
            var thumb = bIG.querySelector('.thumb ul');
        }

        if(thumb) {
            forEach(element, function (index, el) {
                thumb.innerHTML += '<li data-image-src="' + el.getAttribute('data-image-src') + '" data-thumb-id="' + parseFloat(index + 1) + '"><img src="' + el.querySelector('img').getAttribute('src') +'" alt="' + el.querySelector('img').alt +'" /><span>' + el.querySelector('span').innerHTML +'</span></li>';
            });  
        }
    }


    function _isLandscape() {
        var landscape;

        if(window.innerHeight < window.innerWidth || window.orientation === 90 || window.orientation === -90) {
            landscape = true;
        } else {
            landscape = false;
        }

        return landscape;
    }

       
    function _setLandscape(l) {
        if(_isLandscape()) {
            l.classList.add('landscape');

        } else {
            l.classList.remove('landscape');
        } 
    }           


    //function _disableScroll() { document.body.classList.add('overflow-hidden'); }
    //function _enableScroll() { document.body.classList.remove('overflow-hidden'); }


    //PerfectScrollbar
    function _scroll() {

        function perfectScroll() {
            var thumb = document.querySelector('.body-image-gallery .thumb ul'),
                ps__railX = document.querySelector('.ps__rail-x'),
                ps__railY = document.querySelector('.ps__rail-y');

            if (window.matchMedia("(min-width: 768px)").matches) {
                if(thumb && !ps__railX && !ps__railY) {
                    var ps = new PerfectScrollbar(thumb);

                    ps.update();
                }
            } else {
                if(thumb && ps__railX && ps__railY) {
                    thumb.removeChild(ps__railX);
                    thumb.removeChild(ps__railY);
                }
            }

            if(thumb) {
                thumb.scrollTop = 0;
            }
        }

        perfectScroll();

        window.addEventListener('resize', function(){
            perfectScroll();
        }, false);

    }


    function _indexUserGallery(element) {
        forEach(element, function (index, el) {
            el.setAttribute('data-user-id', parseFloat(index + 1));
        });
    }


    function _openImageGallery(bIG) {
        if(bIG) {
            bIG.classList.remove('in-active');

            setTimeout(function() {
                bIG.classList.add('active');
            }, 50);

            //_disableScroll();
            scrollDestroy.disableScroll();
        }
    }


    function _closeGalleryClick(id) {
        var bodyImageGallery = document.querySelector('.body-image-gallery');

        if(bodyImageGallery && id) {
            var closeIcon = bodyImageGallery.querySelector('.icon-cancel');


            function close() {
                bodyImageGallery.classList.remove('active');

                setTimeout(function() {
                    document.body.removeChild(bodyImageGallery);
                }, 550);

                //_enableScroll();
                scrollDestroy.enableScroll();

                var itemActive = id.querySelector('ul.user-image-gallery-container li.active');

                if(itemActive) {
                    itemActive.classList.remove('active');
                }

                //document.documentElement.scrollTop = document.body.scrollTop = document.body.getAttribute('data-scroll');
                //document.body.removeAttribute('data-scroll');
            }

            closeIcon.addEventListener('click', function() {
                close();
            }, false);
        }
    }


    function _loaderRender(l) {
        if(l) {
            l.classList.remove('in-active');

            setTimeout(function() {
                l.classList.add('active');
            }, 50);
        }
    }


    function _loaderDestroy(l) {
        if(l) {
            setTimeout(function() {
                l.classList.remove('active');
            }, 50);

            setTimeout(function() {
                l.classList.add('in-active');
            }, 100);
        }
    }


    function _setTitleAndLead(header, leadParam, o) {
        var img = o.querySelector('img'),
            span = o.querySelector('span');

        if(img && span) {

            forEach(header, function (index, h) {
                h.innerHTML = img.alt;
            });

            leadParam.innerHTML = span.innerHTML;
        }
    }


    function _imageRender(image, loading, element, end, direction) {
        image.classList.add('in-active');

        setTimeout(function() {
            if(direction) {
                if(end) {
                    image.setAttribute('src', element[0].getAttribute('data-image-src'));
                } else {
                    image.setAttribute('src', element.getAttribute('data-image-src'));
                }

            } else {
                if(end) {
                    image.setAttribute('src', element[element.length - 1].getAttribute('data-image-src'));
                } else {
                    image.setAttribute('src', element.getAttribute('data-image-src'));
                }
            }
            _loaderRender(loading);
        }, 700 / 2);

        image.addEventListener('load', function() {
            _loaderDestroy(loading);
            image.classList.remove('in-active');
        }, false);
    }



    function _next(elParam, bIS, id, bIG, l) {
        if(clickPermission) {
            clickPermission = false;

            setTimeout(function() {
                clickPermission = true;
            }, 700 + 50);

            var actualActive = id.querySelector('ul.user-image-gallery-container li.active'),
                thumb = bIG.querySelectorAll('.thumb ul li'),
                counter = bIG.querySelectorAll('.counter span.number'),
                imageGalleryHeader = bIG.querySelectorAll('.image-gallery-header'),
                lead = bIG.querySelector('.lead');

            var actualActiveId = parseFloat(actualActive.getAttribute('data-user-id'));

            if(actualActiveId != null) {
                 var nextElement = actualActiveId + 1;
            }


            forEach(counter, function (index, count) {
                count.innerHTML = nextElement;
            });


            if(nextElement <= elParam.length) {

                forEach(elParam, function (index, el) {

                    el.classList.remove('active');

                    if(parseFloat(el.getAttribute('data-user-id')) == nextElement) {
                        el.classList.add('active');

                        _imageRender(bIS, l, el, false, true);
                        _setTitleAndLead(imageGalleryHeader, lead, el);

                    }
                });

                forEach(thumb, function (index, elThumb) {
                    elThumb.classList.remove('active');

                    if(parseFloat(elThumb.getAttribute('data-thumb-id')) == nextElement) {
                        elThumb.classList.add('active');
                    }
                });

            } else {
                elParam[elParam.length - 1].classList.remove('active');
                elParam[0].classList.add('active');

                thumb[thumb.length - 1].classList.remove('active');
                thumb[0].classList.add('active');

                forEach(counter, function (index, count) {
                    count.innerHTML = '1';
                });

                _imageRender(bIS, l, elParam, true, true);
                _setTitleAndLead(imageGalleryHeader, lead, elParam[0]);
            }
        }
    }


    function _previous(elParam, bIS, id, bIG, l) {

        if(clickPermission) {
            clickPermission = false;

            setTimeout(function() {
                clickPermission = true;
            }, 700 + 50);

            var actualActive = id.querySelector('ul.user-image-gallery-container li.active'),
                thumb = bIG.querySelectorAll('.thumb ul li'),
                counter = bIG.querySelectorAll('.counter span.number'),
                imageGalleryHeader = bIG.querySelectorAll('.image-gallery-header'),
                lead = bIG.querySelector('.lead');

            var actualActiveId = parseFloat(actualActive.getAttribute('data-user-id'));

            if(actualActiveId != null) {
                var previousElement = actualActiveId - 1;
            }

            forEach(counter, function (index, count) {
                count.innerHTML = previousElement;
            });

            if(previousElement > 0) {

                forEach(elParam, function (index, el) {

                    el.classList.remove('active');

                    if(parseFloat(el.getAttribute('data-user-id')) == previousElement) {
                        el.classList.add('active');

                        _imageRender(bIS, l, el, false, false);
                        _setTitleAndLead(imageGalleryHeader, lead, el);
                    }
                });

                forEach(thumb, function (index, elThumb) {
                    elThumb.classList.remove('active');

                    if(parseFloat(elThumb.getAttribute('data-thumb-id')) == previousElement) {
                        elThumb.classList.add('active');
                    }
                });

            } else {
                elParam[elParam.length - 1].classList.add('active');
                elParam[0].classList.remove('active');

                thumb[thumb.length - 1].classList.add('active');
                thumb[0].classList.remove('active');

                forEach(counter, function (index, count) {
                    count.innerHTML = '' + elParam.length + '';
                });

                _imageRender(bIS, l, elParam, true, false);
                _setTitleAndLead(imageGalleryHeader, lead, elParam[elParam.length - 1]);
            }
        }

    }


    function _thumb(elUser) {
        var bodyImageGallery = document.querySelector('.body-image-gallery');

        if(bodyImageGallery) {
            var bodyImage = bodyImageGallery.querySelector('.body-image'),
                loading = bodyImage.querySelector('.loading'),
                bodyImageSrc = bodyImage.querySelector('.body-image img'),
                thumbs = bodyImageGallery.querySelectorAll('.thumb ul li'),
                imageGalleryHeader = bodyImageGallery.querySelectorAll('.image-gallery-header'),
                lead = bodyImageGallery.querySelector('.lead');

            forEach(thumbs, function (index, thumb) {

                thumb.addEventListener('click', function() {

                    if(clickPermission) {
                        clickPermission = false;

                        setTimeout(function() {
                            clickPermission = true;
                        }, 700 + 50);

                        var obj = this;

                        forEach(thumbs, function (index, el) {
                            el.classList.remove('active');
                        });

                        forEach(elUser, function (index, user) {
                            user.classList.remove('active');

                            if(parseFloat(obj.getAttribute('data-thumb-id')) == parseFloat(user.getAttribute('data-user-id'))) {
                                user.classList.add('active');
                            }
                        });

                        obj.classList.add('active');

                        //Set number 
                        var number = bodyImageGallery.querySelectorAll('span.number');
                        forEach(number, function (index, num) {
                            num.innerHTML = obj.getAttribute('data-thumb-id');
                        });

                        _imageRender(bodyImageSrc, loading, obj, false, true);
                        _setTitleAndLead(imageGalleryHeader, lead, obj);
                    }
                }, false);

            });
        }
    }



    function _navigation(element, id) {
        var bodyImageGallery = document.querySelector('.body-image-gallery');

        if(bodyImageGallery) {
            var bodyImage = bodyImageGallery.querySelector('.body-image'),
                loading = bodyImage.querySelector('.loading'),
                bodyImageSrc = bodyImage.querySelector('.body-image img');

            var next = bodyImageGallery.querySelector('.navigation.next'),
                previous = bodyImageGallery.querySelector('.navigation.prev');

            next.addEventListener('click', function() {
                _next(element, bodyImageSrc, id, bodyImageGallery, loading);
            }, false);

            previous.addEventListener('click', function() {
                _previous(element, bodyImageSrc, id, bodyImageGallery, loading);
            }, false);


            var startxTouch = 0,
                distTouch = 0,
                startxMouse = 0,
                distMouse = 0;

            if (bodyImage) {

                bodyImage.addEventListener('touchstart', function(e) {
                    var touchobj = e.changedTouches[0];
                    startxTouch = parseInt(touchobj.clientX);
                }, false);


                bodyImage.addEventListener('touchend', function(e) {
                    if(e.touches.length == 0) {
                        var touchobj = e.changedTouches[0];
                        var distTouch = parseInt(touchobj.clientX) - startxTouch;

                        if (distTouch > 70) {
                            _previous(element, bodyImageSrc, id, bodyImageGallery, loading);

                        } else if (distTouch < -70) {
                            _next(element, bodyImageSrc, id, bodyImageGallery, loading);
                        }
                    }
                }, false);


                if (window.matchMedia("(min-width: 768px)").matches) {
                    bodyImage.addEventListener('mousedown', function(e) {
                        startxMouse = event.clientX;

                        e.preventDefault();

                         bodyImage.addEventListener('mouseup', function(e) {
                            distMouse = startxMouse - event.clientX;
                            if (distMouse > 100) {
                                _next(element, bodyImageSrc, id, bodyImageGallery, loading);

                            } else if (distMouse < -100) {
                                _previous(element, bodyImageSrc, id, bodyImageGallery, loading);
                            }

                            e.preventDefault();
                        }, false);
                    }, false);
                }
            }
        }
    }


    function _mobileToggleDetails() {
        if (window.matchMedia("(max-width: 768px)").matches) {
            var bodyImageGallery = document.querySelector('.body-image-gallery');

            if(bodyImageGallery) {
                var sidebarContainer = bodyImageGallery.querySelector('.sidebar-container');

                if(sidebarContainer) {
                    var button = sidebarContainer.querySelector('.details-toggle .details-button');

                    button.addEventListener('click', function() {
                        var toggleWrapper = sidebarContainer.querySelector('.toggle-wrapper'),
                            toggleWrapperContainer = toggleWrapper.querySelector('.toggle-wrapper-container');

                        if(toggleWrapperContainer.classList.contains('active')) {
                           toggleWrapperContainer.classList.remove('active');
                           button.classList.remove('active');

                        } else {
                            toggleWrapperContainer.classList.add('active');
                            button.classList.add('active');
                        }
                    }, false);
                }
            }
        }
    }


    function _renderGallery(element, id) {

        forEach(element, function (index, el) {
            el.addEventListener('click', function() {

                //document.body.setAttribute('data-scroll', window.pageYOffset);

                _indexUserGallery(element);
                _renderGalleryDOM(element);
                _closeGalleryClick(id);
                _navigation(element, id);
                _mobileToggleDetails();

                var bodyImageGallery = document.querySelector('.body-image-gallery');

                if(bodyImageGallery) {
                    var bodyImage = bodyImageGallery.querySelector('.body-image'),
                        loading = bodyImage.querySelector('.loading'),
                        bodyImageSrc = bodyImage.querySelector('.body-image img'),
                        imageGalleryHeader = bodyImageGallery.querySelectorAll('.image-gallery-header'),
                        lead = bodyImageGallery.querySelector('.lead');
                
                    //Render thumb
                    _renderThumbImageDOM(bodyImageGallery, element);

                    var obj = this,
                        objSrc = obj.getAttribute('data-image-src'),
                        objUserId = parseFloat(obj.getAttribute('data-user-id'));

                    //Set active
                    obj.classList.add('active');

                    var bodyThumbs = bodyImageGallery.querySelectorAll('.thumb ul li');


                    //Render first load
                    bodyImageSrc.setAttribute('src', objSrc);
                    bodyImageSrc.classList.remove('in-active');

                    _loaderRender(loading);

                    bodyImageSrc.addEventListener('load', function() {
                        _loaderDestroy(loading);
                    }, false);


                    //Active thumb
                    forEach(bodyThumbs, function (index, elThumb) {
                        if(parseFloat(elThumb.getAttribute('data-thumb-id')) == objUserId) {
                            elThumb.classList.add('active');
                        }
                    });


                    //Set number 
                    var number = bodyImageGallery.querySelectorAll('span.number');

                    forEach(number, function (index, num) {
                        num.innerHTML = objUserId;
                    });

                    var numberMax = bodyImageGallery.querySelectorAll('span.number-max');
                    forEach(numberMax, function (index, numMax) {
                        numMax.innerHTML = element.length;
                    });


                    _setTitleAndLead(imageGalleryHeader, lead, obj);
                    _openImageGallery(bodyImageGallery);
                    _scroll();
                    _thumb(element);
                    _setLandscape(bodyImageGallery);

                    window.addEventListener('orientationchange', function() {
                        _setLandscape(bodyImageGallery);
                    }, false);

                    window.addEventListener('resize', function() {
                        _setLandscape(bodyImageGallery);
                    }, false);
                }
            }, false);
        });
    }


    function app() {
        var imageGalleryId = document.querySelector('#' + config.render + '');

        if(imageGalleryId) {
            var item = imageGalleryId.querySelectorAll('ul.user-image-gallery-container li');

            _renderGallery(item, imageGalleryId);
        }
    }

    return {
        app:app,
        keydown:keydown
    }

}();


var scrollDestroy = function() {
    var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1};

    function preventDefault(e) {
        e = e || window.event;

        if (e.preventDefault) {
            e.preventDefault();
        }

        e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        }
        window.onwheel = preventDefault;
        window.onmousewheel = document.onmousewheel = preventDefault;
        window.ontouchmove  = preventDefault;
        document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        }
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }

    return {
        disableScroll:disableScroll,
        enableScroll:enableScroll
    }

}();

window.addEventListener('load', function() {
    imageGallery.keydown();
}, false);