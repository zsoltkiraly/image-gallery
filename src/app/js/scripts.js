/*
Image gallery - Code by Zsolt Király
v1.0.1 - 2018-11-26
*/

var imageGallery = function() {

    'use strict';

    var clickPermission = true;


    var forEach = function (array, callback, scope) {
        var i = 0;
        for (; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    }

    function qS(pre, eLclass, all) {
        return all ? pre.querySelectorAll('' + eLclass +'') : pre.querySelector('' + eLclass +'');
    }

    function keydown() {
        document.addEventListener('keydown', function(e) {
            var bodyImageGallery = qS(document, '.body-image-gallery', false);
            if(bodyImageGallery) {

                var next = qS(bodyImageGallery, '.navigation.next', false),
                    previous = qS(bodyImageGallery, '.navigation.prev', false),
                    closeIcon = qS(bodyImageGallery, '.icon-cancel', false); 

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
        var nodeList = '';

        if(i.length == 1) {
            nodeList = 'in-active';
        }

        if(!qS(document, '.body-image-gallery', false)) {
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
                        '<div class="navigation prev '+ nodeList +'"><i class="icon-left-arrow"></i></div>' + 
                        '<div class="navigation next '+ nodeList +'"><i class="icon-right-arrow"></i></div>' + 
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
            var thumb = qS(bIG, '.thumb ul', false);
        }

        var spanElement;

        if(thumb) {
            forEach(element, function (index, el) {
                if(qS(el, 'span', false)) {
                    spanElement = qS(el, 'span', false).innerHTML;
                } else {
                    spanElement = '';
                }

                thumb.innerHTML += '<li data-image-src="' + el.getAttribute('data-image-src') + '" data-thumb-id="' + parseFloat(index + 1) + '"><img src="' + qS(el, 'img', false).getAttribute('src') +'" alt="' + qS(el, 'img', false).alt +'" /><span>' + spanElement +'</span></li>';
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


    function _disableScroll() {
        if (window.matchMedia("(min-width: 992px)").matches) {
            if(document.documentElement.clientWidth < window.innerWidth) {
                document.body.classList.add('overflow-hidden');
            }
        } else {
            document.body.classList.add('overflow-hidden');
        }
    }
    function _enableScroll() { document.body.classList.remove('overflow-hidden'); }


    //PerfectScrollbar
    function _scroll() {
        var thumb = qS(document, '.body-image-gallery .thumb ul', false),
            ps = new PerfectScrollbar(thumb);
        
        function updateScroll() {
            var ps__railX = qS(document, '.ps__rail-x', false),
                ps__railY = qS(document, '.ps__rail-y', false);

            if (window.matchMedia("(min-width: 769px)").matches) {
                if(thumb && !ps__railX && !ps__railY) {
                    ps = new PerfectScrollbar(thumb);
                }
                ps.update();

            } else {
                ps.destroy();
            }

            if(thumb) {
                thumb.scrollTop = 0;
            }
        }

        updateScroll();

        window.addEventListener('resize', function() {
            updateScroll();
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

            setTimeout(function() {
                _disableScroll();
            }, 550);
        }
    }


    function _closeGalleryClick(id) {
        var bodyImageGallery = qS(document, '.body-image-gallery', false);

        var closeGallery = true;

        if(bodyImageGallery && id) {
            var closeIcon = qS(bodyImageGallery, '.icon-cancel', false);


            function close() {
                bodyImageGallery.classList.remove('active');

                setTimeout(function() {
                    document.body.removeChild(bodyImageGallery);
                }, 550);

                _enableScroll();

                var itemActive = qS(id, 'ul.user-image-gallery-container li.active', false);

                if(itemActive) {
                    itemActive.classList.remove('active');
                }

                document.documentElement.scrollTop = document.body.scrollTop = document.body.getAttribute('data-scroll');
                document.body.removeAttribute('data-scroll');
            }


            closeIcon.addEventListener('click', function() {
                if(closeGallery) {
                    close();
                    closeGallery = false;
                }
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
        var img = qS(o, 'img', false),
            span = qS(o, 'span', false);

        if(img && span) {

            forEach(header, function (index, h) {
                h.innerHTML = span.innerHTML;
            });

            leadParam.innerHTML = img.alt;
        }
    }


    function _imageDimension(image) {
        image.addEventListener('load', function() {
            var width = image.naturalWidth,
                height = image.naturalHeight;

            if(width < height) {
                image.classList.add('portrait');

            } else {
                image.classList.remove('portrait');
            }

        }, false);
    }


    function _imageRender(image, loading, element, end, direction) {
        image.classList.add('in-active');

        _imageDimension(image);

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

            var actualActive = qS(id, 'ul.user-image-gallery-container li.active', false),
                thumb = qS(bIG, '.thumb ul li', true),
                counter = qS(bIG, '.counter span.number', true),
                imageGalleryHeader = qS(bIG, '.image-gallery-header', true),
                lead = qS(bIG, '.lead', false);

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

            var actualActive = qS(id, 'ul.user-image-gallery-container li.active', false),
                thumb = qS(bIG, '.thumb ul li', true),
                counter = qS(bIG, '.counter span.number', true),
                imageGalleryHeader = qS(bIG, '.image-gallery-header', true),
                lead = qS(bIG, '.lead', false);

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
        var bodyImageGallery = qS(document, '.body-image-gallery', false);

        if(bodyImageGallery) {
            var bodyImage = qS(bodyImageGallery, '.body-image', false),
                loading = qS(bodyImage, '.loading', false),
                bodyImageSrc = qS(bodyImage, '.body-image img', false),
                thumb = qS(bodyImageGallery, '.thumb ul li', true),
                imageGalleryHeader = qS(bodyImageGallery, '.image-gallery-header', true),
                lead = qS(bodyImageGallery, '.lead', false);

            forEach(thumb, function (index, elThumb) {

                elThumb.addEventListener('click', function() {

                    if(thumb.length > 1) {
                        if(clickPermission) {
                            clickPermission = false;

                            setTimeout(function() {
                                clickPermission = true;
                            }, 700 + 50);

                            var obj = this;

                            forEach(thumb, function (index, elThumb) {
                                elThumb.classList.remove('active');
                            });

                            forEach(elUser, function (index, user) {
                                user.classList.remove('active');

                                if(parseFloat(obj.getAttribute('data-thumb-id')) == parseFloat(user.getAttribute('data-user-id'))) {
                                    user.classList.add('active');
                                }
                            });

                            obj.classList.add('active');

                            //Set number 
                            var number = qS(bodyImageGallery, 'span.number', true);
                            forEach(number, function (index, num) {
                                num.innerHTML = obj.getAttribute('data-thumb-id');
                            });

                            _imageRender(bodyImageSrc, loading, obj, false, true);
                            _setTitleAndLead(imageGalleryHeader, lead, obj);
                        }
                    }
                }, false);

            });
        }
    }



    function _navigation(element, id) {
        var bodyImageGallery = qS(document, '.body-image-gallery', false);

        if(bodyImageGallery) {
            var bodyImage = qS(bodyImageGallery, '.body-image', false),
                loading = qS(bodyImage, '.loading', false),
                bodyImageSrc = qS(bodyImage, '.body-image img', false);

            var next = qS(bodyImageGallery, '.navigation.next', false),
                previous = qS(bodyImageGallery, '.navigation.prev', false);

            next.addEventListener('click', function() {
                if(element.length > 1) {
                    _next(element, bodyImageSrc, id, bodyImageGallery, loading);
                }
            }, false);

            previous.addEventListener('click', function() {
                if(element.length > 1) {
                    _previous(element, bodyImageSrc, id, bodyImageGallery, loading);
                }
            }, false);


            var startxTouch = 0,
                distTouch = 0,
                startxMouse = 0,
                distMouse = 0;

            if (bodyImage) {

                bodyImage.addEventListener('touchstart', function(e) {
                    if(element.length > 1) {
                        var touchobj = e.changedTouches[0];
                        startxTouch = parseInt(touchobj.clientX);
                    }
                }, false);


                bodyImage.addEventListener('touchend', function(e) {
                    if(element.length > 1) {
                        if(e.touches.length == 0) {
                            var touchobj = e.changedTouches[0];
                            var distTouch = parseInt(touchobj.clientX) - startxTouch;

                            if (distTouch > 70) {
                                _previous(element, bodyImageSrc, id, bodyImageGallery, loading);

                            } else if (distTouch < -70) {
                                _next(element, bodyImageSrc, id, bodyImageGallery, loading);
                            }
                        }
                    }
                }, false);


                if (window.matchMedia("(min-width: 768px)").matches) {
                    if(element.length > 1) {
                        bodyImage.addEventListener('mousedown', function(e) {
                            startxMouse = e.clientX;

                            e.preventDefault();

                             bodyImage.addEventListener('mouseup', function(e) {
                                distMouse = startxMouse - e.clientX;
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
    }


    function _mobileToggleDetails() {
        var bodyImageGallery = qS(document, '.body-image-gallery', false);

        if(bodyImageGallery) {
            var sidebarContainer = qS(bodyImageGallery, '.sidebar-container', false);

            if(sidebarContainer) {
                var button = qS(sidebarContainer, '.details-toggle .details-button', false);

                button.addEventListener('click', function() {
                    var toggleWrapper = qS(sidebarContainer, '.toggle-wrapper', false),
                        toggleWrapperContainer = qS(toggleWrapper, '.toggle-wrapper-container', false);


                    if(toggleWrapperContainer.classList.contains('active')) {
                        button.classList.remove('active');

                        toggleWrapperContainer.classList.remove('active');

                        setTimeout(function() {
                            toggleWrapperContainer.classList.remove('block');
                        }, 250);

                    } else {
                        toggleWrapperContainer.classList.add('block');

                        setTimeout(function() {
                            button.classList.add('active');
                            toggleWrapperContainer.classList.add('active');
                        }, 50);
                    }
                }, false);
            }
        }
    }


    function _renderGallery(element, id) {

        forEach(element, function (index, el) {
            el.addEventListener('click', function() {

                document.body.setAttribute('data-scroll', window.pageYOffset);

                _indexUserGallery(element);
                _renderGalleryDOM(element);
                _closeGalleryClick(id);
                _navigation(element, id);
                _mobileToggleDetails();

                var bodyImageGallery = qS(document, '.body-image-gallery', false);

                if(bodyImageGallery) {
                    var bodyImage = qS(bodyImageGallery, '.body-image', false),
                        loading = qS(bodyImage, '.loading', false),
                        bodyImageSrc = qS(bodyImage, '.body-image img', false),
                        imageGalleryHeader = qS(bodyImageGallery, '.image-gallery-header', true),
                        lead = qS(bodyImageGallery, '.lead', false);
                
                    //Render thumb
                    _renderThumbImageDOM(bodyImageGallery, element);

                    var obj = this,
                        objSrc = obj.getAttribute('data-image-src'),
                        objUserId = parseFloat(obj.getAttribute('data-user-id'));

                    //Set active
                    obj.classList.add('active');

                    var bodyThumbs = qS(bodyImageGallery, '.thumb ul li', true);


                    //Render first load
                    bodyImageSrc.setAttribute('src', objSrc);
                    bodyImageSrc.classList.remove('in-active');

                    _imageDimension(bodyImageSrc);
                    
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
                    var number = qS(bodyImageGallery, 'span.number', true);

                    forEach(number, function (index, num) {
                        num.innerHTML = objUserId;
                    });

                    var numberMax = qS(bodyImageGallery, 'span.number-max', true);
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

            }, false);
        });
    }


    function app() {
        var imageGalleryId = qS(document, '#' + config.render + '', false);

        if(imageGalleryId) {
            var item = qS(imageGalleryId, 'ul.user-image-gallery-container li', true);

            _renderGallery(item, imageGalleryId);
        }
    }

    return {
        app:app,
        keydown:keydown
    }

}();

window.addEventListener('load', function() {
    imageGallery.keydown();
}, false);