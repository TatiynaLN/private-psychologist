"use strict";

;

(function () {
  var panel = document.querySelector('html');
  document.querySelector('.menu__btn').addEventListener('click', function (e) {
    panel.classList.toggle('ns');
  });
})();

"use strict";

;
"use strict";

; // (function () {
// полифилл CustomEven для IE11

(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  window.CustomEvent = CustomEvent;
})();

function $modal(options) {
  var _elemModal,
      _eventShowModal,
      _eventHideModal,
      _hiding = false,
      _destroyed = false,
      _animationSpeed = 200;

  function _createModal(options) {
    var elemModal = document.createElement('div'),
        //  data-dismiss="modal"
    modalTemplate = '<div class="modal__backdrop"><div class="modal__body" data-modal="content"><span class="modal__btn-close" data-dismiss="modal" title="Закрыть">×</span>{{content}}</div>{{footer}}</div>',
        modalFooterTemplate = '<div class="modal__footer">{{buttons}}</div>',
        modalButtonTemplate = '<button type="button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>',
        modalHTML,
        modalFooterHTML = '';
    elemModal.classList.add('modal');
    modalHTML = modalTemplate.replace('{{title}}', options.title || 'Новое окно');
    modalHTML = modalHTML.replace('{{content}}', options.content || '');

    if (options.footerButtons) {
      for (var i = 0, length = options.footerButtons.length; i < length; i++) {
        var modalFooterButton = modalButtonTemplate.replace('{{button_class}}', options.footerButtons[i]["class"]);
        modalFooterButton = modalFooterButton.replace('{{button_handler}}', options.footerButtons[i].handler);
        modalFooterButton = modalFooterButton.replace('{{button_text}}', options.footerButtons[i].text);
        modalFooterHTML += modalFooterButton;
      }

      modalFooterHTML = modalFooterTemplate.replace('{{buttons}}', modalFooterHTML);
    }

    modalHTML = modalHTML.replace('{{footer}}', modalFooterHTML);
    elemModal.innerHTML = modalHTML;
    document.body.appendChild(elemModal);
    return elemModal;
  }

  function _showModal() {
    if (!_destroyed && !_hiding) {
      _elemModal.classList.add('modal__show');

      document.dispatchEvent(_eventShowModal);
    }
  }

  function _hideModal() {
    _hiding = true;

    _elemModal.classList.remove('modal__show');

    _elemModal.classList.add('modal__hiding');

    setTimeout(function () {
      _elemModal.classList.remove('modal__hiding');

      _hiding = false;
    }, _animationSpeed);
    document.dispatchEvent(_eventHideModal);
  }

  function _handlerCloseModal(e) {
    if (e.target.dataset.dismiss === 'modal') {
      _hideModal();
    }
  }

  _elemModal = _createModal(options || {});

  _elemModal.addEventListener('click', _handlerCloseModal);

  _eventShowModal = new CustomEvent('show.modal', {
    detail: _elemModal
  });
  _eventHideModal = new CustomEvent('hide.modal', {
    detail: _elemModal
  });
  return {
    show: _showModal,
    hide: _hideModal,
    destroy: function destroy() {
      _elemModal.parentElement.removeChild(_elemModal), _elemModal.removeEventListener('click', _handlerCloseModal), destroyed = true;
    },
    setContent: function setContent(html) {
      _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
    },
    setTitle: function setTitle(text) {
      _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
    }
  };
}

;

(function () {
  // создадим модальное окно 1
  var modal1 = $modal({
    content: '<h5>Перезвонить вам?</h5><p>Оставьте свои контактные данные и мы свяжемся с вами в ближайшее время</p>\
        <form>\
            <input type="text" name="user-phone" placeholder="Ваш номер телефона" required="required">\
        <button> <span>Перезвонить мне</span></button>\
        <div class="form__policy">\
                    <input id="modal__chec1" type="checkbox" checked="">\
                    <label for="modal__chec1"> Вы соглашаетесь с \
                    <a target="_blank" href="#!">условиями обработки персональных данных</a></label>\
                  </div></form>'
  }); // создадим модальное окно 2

  var modal2 = $modal({
    content: '<h5>Запись на приём</h5><p>Оставьте свои контактные данные и мы свяжемся с вами в ближайшее время для уточнения деталей</p>\
        <form><div class="input-flex">\
                    <input type="text" name="name" placeholder="Ваше имя" required="required">\
                    <input type="text" name="user-phone" placeholder="Ваш номер телефона" required="required">\
                    </div><button><span>Записаться на приём</span></button>\
                  <div class="form__policy">\
                    <input id="modal__chec2" type="checkbox" checked="">\
                    <label for="modal__chec2"> \
                            Вы соглашаетесь с \
                    <a target="_blank" href="#!">условиями обработки персональных данных</a>\
                    </label>\
                  </div></form>'
  }); // создадим модальное окно 3

  var modal3 = $modal({
    content: '<h5>Запись на приём</h5><p>Оставьте свои контактные данные и мы свяжемся с вами в ближайшее время для уточнения деталей</p>\
        <form><div class="input-flex">\
                    <input type="text" name="name" placeholder="Ваше имя" required="required">\
                    <input type="text" name="user-phone" placeholder="Ваш номер телефона" required="required">\
                    </div><button><span>Записаться на приём</span></button>\
                  </form>\
                  <div class="form__policy">\
                    <input id="modal__chec3" type="checkbox" checked="">\
                    <label for="modal__chec3"> \
                                        Вы соглашаетесь с \
                    <a target="_blank" href="#!">условиями обработки персональных данных</a>\
                    </label>\
                  </div></form>'
  }); // создадим модальное окно 4

  var modal4 = $modal({
    content: '<h5>Связаться с психологом</h5><p>Оставьте свои контактные данные и мы свяжемся с вами в ближайшее время для уточнения деталей</p>\
        <form><div class="input-flex">\
            <input type="text" name="name" placeholder="Ваше имя" required="required">\
                    <input type ="text" name="user-phone" placeholder="Ваш номер телефона" required="required">\
                    </div><button><span>Записаться на приём</span></button>\
        <div class="form__policy">\
                    <input id="modal__chec4" type="checkbox" checked="">\
                    <label for="modal__chec4"> \
                Вы соглашаетесь с \
                    <a target="_blank" href="#!">условиями обработки персональных данных</a>\
                    </label>\
                  </div></form>'
  }); // создадим модальное окно СПАСИБО

  var modal5 = $modal({
    content: '<h5>Спасибо за заявку!</h5><p>Мы свяжемся с вами в ближайшее время, в рабочии часы, указанные на сайте</p>'
  }); // при клике по кнопке #show-modal-1

  document.addEventListener('click', function (e) {
    if (e.target.dataset.toggle === 'modal-1') {
      // отобразим модальное окно N1
      modal1.show();
    } else if (e.target.dataset.toggle === 'modal-2') {
      // отобразим модальное окно N2
      modal2.show();
    } else if (e.target.dataset.toggle === 'modal-3') {
      // отобразим модальное окно N3
      modal3.show();
    } else if (e.target.dataset.toggle === 'modal-4') {
      // отобразим модальное окно N4
      modal4.show();
    } else if (e.target.dataset.toggle === 'modal-5') {
      // отобразим модальное окно СПАСИБО
      modal5.show();
    }
  });
  var btns = document.querySelectorAll('.btn');
  var panel = document.getElementsByTagName('html')[0];
  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      panel.classList.add('oh');
    });
  });
  window.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal__btn-close')) {
      panel.classList.remove('oh');
    }
  });
})(); // })();


"use strict";

;
"use strict";

;

(function () {
  new Swiper('.education-slider', {
    //стрелки
    navigation: {
      nextEl: '.swiper-buton-left',
      prevEl: '.swiper-buton-right'
    },
    //колличество пролистываемых слайдов
    slidesPerGroup: 1,
    // активный слайд отсчет с 0
    initialSlide: 0,
    autoHeight: true,
    loop: true,
    breakpoints: {
      320: {
        //колличество слайдов для показа
        slidesPerView: 1
      },
      768: {
        //колличество слайдов для показа
        slidesPerView: 2
      }
    }
  });
})();

"use strict";

;
"use strict";

;

(function () {
  new Swiper('.education-sliders', {
    //стрелки
    navigation: {
      nextEl: '.swiper-buton-lefts',
      prevEl: '.swiper-buton-rights'
    },
    //колличество пролистываемых слайдов
    slidesPerGroup: 1,
    //активный слайд по центру
    // centerredSlides: true,
    //стартовый слайд отсчет с 0
    initialSlide: 0,
    autoHeight: true,
    loop: true,
    //бесконечная прокрутка
    breakpoints: {
      320: {
        //колличество слайдов для показа
        slidesPerView: 1
      },
      768: {
        //колличество слайдов для показа
        slidesPerView: 2
      }
    }
  });
})();

"use strict";

;

(function () {
  new Swiper('.reviews-slider', {
    //стрелки
    navigation: {
      nextEl: '.swiper-buton-left',
      prevEl: '.swiper-buton-right'
    },
    //колличество пролистываемых слайдов
    slidesPerGroup: 1,
    initialSlide: 1,
    spaceBetween: 60,
    centeredSlides: true,
    autoHeight: true,
    loop: true,
    breakpoints: {
      320: {
        //колличество слайдов для показа
        slidesPerView: 1
      },
      1020: {
        //колличество слайдов для показа
        slidesPerView: 2
      }
    }
  });
})();

"use strict";

;
"use strict";

;

(function () {
  new Swiper('.blog-slider', {
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    slidesPerGroup: 1,
    initialSlide: 0,
    spaceBetween: 23,
    autoHeight: true,
    loop: true,
    on: {
      init: function init() {
        var _this = this;

        this.el.addEventListener('mouseenter', function () {
          _this.autoplay.stop();
        });
        this.el.addEventListener('mouseleave', function () {
          _this.autoplay.start();
        });
      }
    },
    breakpoints: {
      320: {
        //колличество слайдов для показа
        slidesPerView: 1
      },
      411: {
        //колличество слайдов для показа
        slidesPerView: 1.2
      },
      768: {
        //колличество слайдов для показа
        slidesPerView: 1.6,
        centeredSlides: true
      },
      1024: {
        //колличество слайдов для показа
        slidesPerView: 2,
        centeredSlides: true
      },
      1200: {
        //колличество слайдов для показа
        slidesPerView: 2.5,
        centeredSlides: true
      },
      1700: {
        //колличество слайдов для показа
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 19
      }
    }
  });
})();

"use strict";

;
"use strict";

/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
(function () {
  if ("undefined" !== typeof window && window.addEventListener) {
    var e = Object.create(null),
        l,
        d = function d() {
      clearTimeout(l);
      l = setTimeout(n, 100);
    },
        m = function m() {},
        t = function t() {
      window.addEventListener("resize", d, !1);
      window.addEventListener("orientationchange", d, !1);

      if (window.MutationObserver) {
        var k = new MutationObserver(d);
        k.observe(document.documentElement, {
          childList: !0,
          subtree: !0,
          attributes: !0
        });

        m = function m() {
          try {
            k.disconnect(), window.removeEventListener("resize", d, !1), window.removeEventListener("orientationchange", d, !1);
          } catch (v) {}
        };
      } else document.documentElement.addEventListener("DOMSubtreeModified", d, !1), m = function m() {
        document.documentElement.removeEventListener("DOMSubtreeModified", d, !1);
        window.removeEventListener("resize", d, !1);
        window.removeEventListener("orientationchange", d, !1);
      };
    },
        u = function u(k) {
      function e(a) {
        if (void 0 !== a.protocol) var c = a;else c = document.createElement("a"), c.href = a;
        return c.protocol.replace(/:/g, "") + c.host;
      }

      if (window.XMLHttpRequest) {
        var d = new XMLHttpRequest();
        var m = e(location);
        k = e(k);
        d = void 0 === d.withCredentials && "" !== k && k !== m ? XDomainRequest || void 0 : XMLHttpRequest;
      }

      return d;
    };

    var n = function n() {
      function d() {
        --q;
        0 === q && (m(), t());
      }

      function l(a) {
        return function () {
          !0 !== e[a.base] && (a.useEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + a.hash), a.useEl.hasAttribute("href") && a.useEl.setAttribute("href", "#" + a.hash));
        };
      }

      function p(a) {
        return function () {
          var c = document.body,
              b = document.createElement("x");
          a.onload = null;
          b.innerHTML = a.responseText;
          if (b = b.getElementsByTagName("svg")[0]) b.setAttribute("aria-hidden", "true"), b.style.position = "absolute", b.style.width = 0, b.style.height = 0, b.style.overflow = "hidden", c.insertBefore(b, c.firstChild);
          d();
        };
      }

      function n(a) {
        return function () {
          a.onerror = null;
          a.ontimeout = null;
          d();
        };
      }

      var a,
          c,
          q = 0;
      m();
      var f = document.getElementsByTagName("use");

      for (c = 0; c < f.length; c += 1) {
        try {
          var g = f[c].getBoundingClientRect();
        } catch (w) {
          g = !1;
        }

        var h = (a = f[c].getAttribute("href") || f[c].getAttributeNS("http://www.w3.org/1999/xlink", "href") || f[c].getAttribute("xlink:href")) && a.split ? a.split("#") : ["", ""];
        var b = h[0];
        h = h[1];
        var r = g && 0 === g.left && 0 === g.right && 0 === g.top && 0 === g.bottom;
        g && 0 === g.width && 0 === g.height && !r ? (f[c].hasAttribute("href") && f[c].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a), b.length && (a = e[b], !0 !== a && setTimeout(l({
          useEl: f[c],
          base: b,
          hash: h
        }), 0), void 0 === a && (h = u(b), void 0 !== h && (a = new h(), e[b] = a, a.onload = p(a), a.onerror = n(a), a.ontimeout = n(a), a.open("GET", b), a.send(), q += 1)))) : r ? b.length && e[b] && setTimeout(l({
          useEl: f[c],
          base: b,
          hash: h
        }), 0) : void 0 === e[b] ? e[b] = !0 : e[b].onload && (e[b].abort(), delete e[b].onload, e[b] = !0);
      }

      f = "";
      q += 1;
      d();
    };

    var p = function p() {
      window.removeEventListener("load", p, !1);
      l = setTimeout(n, 0);
    };

    "complete" !== document.readyState ? window.addEventListener("load", p, !1) : p();
  }
})();