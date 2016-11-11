/*!
 * Jquery JQClockPicker
 * Based on: http://weareoutman.github.io/clockpicker
 * Copyright 2016 Gustavo Real.
 * MIT Licence
 */

;(function() {
    var $ = window.jQuery,
        $win = $(window),
        $doc = $(document),
        $body;

    // Can I use inline svg ?
    var svgNS = 'http://www.w3.org/2000/svg',
        svgSupported = 'SVGAngle' in window && (function() {
        var supported,
        el = document.createElement('div');
        el.innerHTML = '<svg/>';
        supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
        el.innerHTML = '';
        return supported;
    })();

    // Can I use transition ?
    var transitionSupported = (function() {
        var style = document.createElement('div').style;
        return 'transition' in style ||
            'WebkitTransition' in style ||
            'MozTransition' in style ||
            'msTransition' in style ||
            'OTransition' in style;
    })();

    // Listen touch events in touch screen device, instead of mouse events in desktop.
    var touchSupported = 'ontouchstart' in window,
        mousedownEvent = 'mousedown' + ( touchSupported ? ' touchstart' : ''),
        mousemoveEvent = 'mousemove.jqclockpicker' + ( touchSupported ? ' touchmove.jqclockpicker' : ''),
        mouseupEvent = 'mouseup.jqclockpicker' + ( touchSupported ? ' touchend.jqclockpicker' : '');

    // Vibrate the device if supported
    var vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

    // Template
    var tpl = [
        '<div class="jqclockpicker-container">',
            '<div class="jqclockpicker-header">',
                '<div class="jqclockpicker-time">',
                    '<span class="jqclockpicker-hours-label jqclockpicker-clickable"></span>',
                    '<span class="jqclockpicker-label-separator">:</span>',
                    '<span class="jqclockpicker-minutes-label jqclockpicker-clickable"></span>',
                '</div>',
                '<div class="jqclockpicker-am-pm-block"></div>',
            '</div>',
            '<div class="jqclockpicker-body">',
                '<div class="jqclockpicker-plate">',
                    '<div class="jqclockpicker-canvas"></div>',
                    '<div class="jqclockpicker-dial jqclockpicker-hours"></div>',
                    '<div class="jqclockpicker-dial jqclockpicker-minutes jqclockpicker-dial-out"></div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');

    // Clock Time Object
    var ClockTime = function(hours, minutes, amOrPm) {
        this.hours = hours || 0;
        this.minutes = minutes || 0;
        this.amOrPm = amOrPm || 'AM';
    };

    // Default options
    JQClockPicker.DEFAULTS = {
        autoClose: true,
        appendActions: true, // Add ok and cancel buttons when autoClose is disabled
        format: '24h',
        okText: 'OK',
        cancelText: 'Cancel',
        defaultTime: '', // default time, 'now' or '13:14' e.g.
        timeFromNow: 0, // set default time to * milliseconds from now (using with default = 'now')
        minTime: null, // min time, 'now' or '13:14' e.g.
        vibrate: true,
        position: 'bottom',
        alignment: 'left',
        template: tpl,
        beforeShow: doNothing,
        afterShow: doNothing,
        beforeHide: doNothing,
        afterHide: doNothing,
        beforeShowHours: doNothing,
        afterShowHours: doNothing,
        beforeShowMinutes: doNothing,
        afterShowMinutes: doNothing,
        beforeHourSelect: doNothing,
        afterHourSelect: doNothing,
        beforeMinuteSelect: doNothing,
        afterMinuteSelect: doNothing,
        beforeDone: doNothing,
        afterDone: doNothing,
    };

    function createSvgElement(name) {
        return document.createElementNS(svgNS, name);
    }

    function leadingZero(num) {
        return (num < 10 ? '0' : '') + num;
    }

    // Get a unique id
    var idCounter = 0;
  
    function uniqueId(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    }

    function getMeridian(hours) {
        return (hours > 11) ? 'PM' : 'AM';
    }

    function doNothing() {};

    // Clock size
    var dialRadius = 100,
        outerRadius = 83,
        // innerRadius = 80 on 12 hour clock
        innerRadius = 60,
        tickRadius = 13,
        diameter = dialRadius * 2,
        duration = transitionSupported ? 350 : 1;

    // JQClockPicker
    function JQClockPicker(element, options) {
        var template = $(options.template),
            plate = template.find('.jqclockpicker-plate'),
            hoursView = template.find('.jqclockpicker-hours'),
            minutesView = template.find('.jqclockpicker-minutes'),
            amPmBlock = template.find('.jqclockpicker-am-pm-block'),
            isInput = element.prop('tagName') === 'INPUT',
            input = isInput ? element : element.find('input'),
            self = this,
            timer;

        this.id = uniqueId('jqcp');
        this.element = element;
        this.options = options;
        this.isAppended = false;
        this.isShown = false;
        this.currentView = 'hours';
        this.isInput = isInput;
        this.input = input;
        this.template = template;
        this.plate = plate;
        this.hoursView = hoursView;
        this.minutesView = minutesView;
        this.amPmBlock = amPmBlock;
        this.hoursLabel = template.find('.jqclockpicker-hours-label');
        this.minutesLabel = template.find('.jqclockpicker-minutes-label');
        this.spanAmPm = template.find('.jqclockpicker-span-am-pm');
        this.amOrPm = "PM";
        this.lastVal;

        // Setup for for 12 hour clock if option is selected
        if (options.format === '12h') {
            var amPmButtonsTemplate = [
                '<div class="jqclockpicker-am-button jqclockpicker-clickable">AM</div>',
                '<div class="jqclockpicker-pm-button jqclockpicker-clickable">PM</div>',
            ].join('');

            var amPmButtons = $(amPmButtonsTemplate);

            this.amPmBlock.on('click', '.jqclockpicker-am-button', function () {
                self.amOrPm = "AM";
                self.amPmBlock.find('.jqclockpicker-am-button').addClass('jqclockpicker-active');
                self.amPmBlock.find('.jqclockpicker-pm-button').removeClass('jqclockpicker-active');

                self._checkTimeLimits();
            });

            this.amPmBlock.on('click', '.jqclockpicker-pm-button', function () {
                self.amOrPm = "PM";
                self.amPmBlock.find('.jqclockpicker-pm-button').addClass('jqclockpicker-active');
                self.amPmBlock.find('.jqclockpicker-am-button').removeClass('jqclockpicker-active');

                self._checkTimeLimits();
            });

            amPmButtons.appendTo(this.amPmBlock);
        }

        if (!options.autoClose) {
            if (options.appendActions) {
                var actionsTemplate = [
                    '<div class="jqclockpicker-footer">',
                        '<div class="jqclockpicker-actions">',
                            '<button type="button" class="jqclockpicker-cancel-button jqclockpicker-button jqclockpicker-clickable">' + options.cancelText + '</button>',
                            '<button type="button" class="jqclockpicker-ok-button jqclockpicker-button jqclockpicker-clickable">' + options.okText + '</button>',
                        '</div>',
                    '</div>',
                ].join('');

                $(actionsTemplate).appendTo(template);
            }

            template.on('click', '.jqclockpicker-ok-button', $.proxy(this.done, this));
            template.on('click', '.jqclockpicker-cancel-button', $.proxy(this.hide, this));
        }

        template.addClass('jqclockpicker-position-' + options.position);
        template.addClass('jqclockpicker-align-' + options.alignment);

        this.hoursLabel.click($.proxy(this.toggleView, this, 'hours'));
        this.minutesLabel.click($.proxy(this.toggleView, this, 'minutes'));

        // Show or toggle
        input.on('focus.jqclockpicker click.jqclockpicker', $.proxy(this.show, this));

        // Bind input events
        input.on('keyup', $.proxy(this._doKeyUp, this));
        input.on('blur', $.proxy(function() {
            if (this.options.autoClose) {
                this._updateInput();
            }
        }, this));

        // Build ticks
        var tickTpl = $('<div class="jqclockpicker-tick"></div>'),
            i, tick, radian, radius;

        // Hours view
        if (options.format === '12h') {
            for (i = 1; i < 13; i += 1) {
                tick = tickTpl.clone();
                radian = i / 6 * Math.PI;
                radius = outerRadius;
                tick.css('font-size', '115%');
                tick.css({
                    left: dialRadius + Math.sin(radian) * radius - tickRadius,
                    top: dialRadius - Math.cos(radian) * radius - tickRadius
                });
                tick.html(i === 0 ? '00' : i);
                hoursView.append(tick);
                tick.on(mousedownEvent, mousedown);
            }
        } else {
            for (i = 0; i < 24; i += 1) {
                tick = tickTpl.clone();
                radian = i / 6 * Math.PI;
                var inner = i > 0 && i < 13;
                radius = inner ? innerRadius : outerRadius;
                tick.css({
                    left: dialRadius + Math.sin(radian) * radius - tickRadius,
                    top: dialRadius - Math.cos(radian) * radius - tickRadius
                });
                if (inner) {
                    tick.css('font-size', '115%');
                }
                tick.html(i === 0 ? '00' : i);
                hoursView.append(tick);
                tick.on(mousedownEvent, mousedown);
            }
        }

        // Minutes view
        for (i = 0; i < 60; i += 5) {
            tick = tickTpl.clone();
            radian = i / 30 * Math.PI;
            tick.css({
                left: dialRadius + Math.sin(radian) * outerRadius - tickRadius,
                top: dialRadius - Math.cos(radian) * outerRadius - tickRadius
            });
            tick.css('font-size', '115%');
            tick.html(leadingZero(i));
            minutesView.append(tick);
            tick.on(mousedownEvent, mousedown);
        }

        // Clicking on minutes view space
        plate.on(mousedownEvent, function(e) {
            if ($(e.target).closest('.jqclockpicker-tick').length === 0) {
                mousedown(e, true);
            }
        });

        // Mousedown or touchstart
        function mousedown(e, space) {
            var offset = plate.offset(),
                isTouch = /^touch/.test(e.type),
                x0 = offset.left + dialRadius,
                y0 = offset.top + dialRadius,
                dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
                dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
                z = Math.sqrt(dx * dx + dy * dy),
                moved = false;

            // When clicking on minutes view space, check the mouse position
            if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
                return;
            }
            e.preventDefault();

            // Set cursor style of body after 200ms
            var movingTimer = setTimeout(function() {
                $body.addClass('jqclockpicker-moving');
            }, 200);

            // Place the canvas to top
            if (svgSupported) {
                plate.append(self.canvas);
            }

            // Clock
            self.setHand(dx, dy, !space, true);

            // Mousemove on document
            $doc.off(mousemoveEvent).on(mousemoveEvent, function(e) {
                e.preventDefault();
                
                var isTouch = /^touch/.test(e.type),
                    x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
                    y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
                
                if (!moved && x === dx && y === dy) {
                    // Clicking in chrome on windows will trigger a mousemove event
                    return;
                }
                moved = true;
                self.setHand(x, y, false, true);
            });

            // Mouseup on document
            $doc.off(mouseupEvent).on(mouseupEvent, function(e) {
                $doc.off(mouseupEvent);
                e.preventDefault();

                var raiseAfterHourSelect = false;
                var raiseAfterMinuteSelect = false;
                if (self.currentView === 'hours') {
                    raiseCallback(self.options.beforeHourSelect);
                    raiseAfterHourSelect = true;
                } else {
                    raiseCallback(self.options.beforeMinuteSelect);
                    raiseAfterMinuteSelect = true;
                }
                
                var isTouch = /^touch/.test(e.type),
                    x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
                    y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
                    
                if ((space || moved) && x === dx && y === dy) {
                    self.setHand(x, y);
                }
                if (self.currentView === 'hours') {
                    self.toggleView('minutes', duration / 2);
                } else {
                    if (options.autoClose) {
                        self.minutesView.addClass('jqclockpicker-dial-out');
                        setTimeout(function() {
                            self.done();
                        }, duration / 2);
                    }
                }
                plate.prepend(canvas);

                // Reset cursor style of body
                clearTimeout(movingTimer);
                $body.removeClass('jqclockpicker-moving');

                // Unbind mousemove event
                $doc.off(mousemoveEvent);

                if (raiseAfterHourSelect) {
                    raiseCallback(self.options.afterHourSelect);
                }

                if (raiseAfterMinuteSelect) {
                    raiseCallback(self.options.afterMinuteSelect);
                }
            });
        }

        if (svgSupported) {
            // Draw clock hands and others
            var canvas = template.find('.jqclockpicker-canvas'),
                svg = createSvgElement('svg');
          
            svg.setAttribute('class', 'jqclockpicker-svg');
            svg.setAttribute('width', diameter);
            svg.setAttribute('height', diameter);
          
            var g = createSvgElement('g');
            
            g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
            
            var bearing = createSvgElement('circle');
            
            bearing.setAttribute('class', 'jqclockpicker-canvas-bearing');
            bearing.setAttribute('cx', 0);
            bearing.setAttribute('cy', 0);
            bearing.setAttribute('r', 2);
              
            var hand = createSvgElement('line');
            
            hand.setAttribute('x1', 0);
            hand.setAttribute('y1', 0);
            
            var bg = createSvgElement('circle');
            
            bg.setAttribute('class', 'jqclockpicker-canvas-bg');
            bg.setAttribute('r', tickRadius);
              
            var fg = createSvgElement('circle');
            
            fg.setAttribute('class', 'jqclockpicker-canvas-fg');
            fg.setAttribute('r', 3.5);

            g.appendChild(hand);
            g.appendChild(fg);
            g.appendChild(bg);
            g.appendChild(bearing);

            svg.appendChild(g);
            canvas.append(svg);

            this.hand = hand;
            this.bg = bg;
            this.fg = fg;
            this.bearing = bearing;
            this.g = g;
            this.canvas = canvas;
        }

        raiseCallback(this.options.init);
    }

    function raiseCallback(callbackFunction) {
        if (callbackFunction && typeof callbackFunction === "function") {
            callbackFunction();
        }
    }

    $.extend(JQClockPicker.prototype, {

        // Show or hide template
        toggle: function() {
            this[this.isShown ? 'hide' : 'show']();
        },

        // Set template position
        locate: function() {
            var element = this.element,
                template = this.template,
                offset = element.offset(),
                width = element.outerWidth(),
                height = element.outerHeight(),
                position = this.options.position,
                alignment = this.options.alignment,
                styles = {},
                self = this;

            template.show();

            // Place the template
            switch (position) {
                case 'bottom':
                    styles.top = offset.top + height;
                    break;
                case 'right':
                    styles.left = offset.left + width;
                    break;
                case 'top':
                    styles.top = offset.top - template.outerHeight();
                    break;
                case 'left':
                    styles.left = offset.left - template.outerWidth();
                    break;
            }

            // Align the template arrow
            switch (alignment) {
                case 'left':
                    styles.left = offset.left;
                    break;
                case 'right':
                    styles.left = offset.left + width - template.outerWidth();
                    break;
            }

            template.css(styles);
        },

        // Show picker
        show: function(e) {
            // Not show again
            if (this.isShown) {
                return;
            }

            raiseCallback(this.options.beforeShow);

            var self = this;

            // Initialize
            if (!this.isAppended) {
                // Append template to body
                $body = $(document.body).append(this.template);

                // Reset position when resize
                $win.on('resize.jqclockpicker' + this.id, function() {
                    if (self.isShown) {
                        self.locate();
                    }
                });

                this.isAppended = true;
            }

            var value = this.input.prop('value') || this.options.defaultTime || '';

            var time = this._parseTime(value, this.options.timeFromNow);

            this._setTime(time);

            this._updateLabels();

            // Toggle to hours view
            this.toggleView('hours');

            // Set position
            this.locate();

            this.isShown = true;

            // Hide when clicking or tabbing on any element except the clock and input
            $doc.on('click.jqclockpicker.' + this.id + ' focusin.jqclockpicker.' + this.id, function(e) {
                var target = $(e.target);
                if (target.closest(self.template).length === 0 &&
                    target.closest(self.input).length === 0) {
                    self.hide();
                }
            });

            // Hide when ESC is pressed
            $doc.on('keyup.jqclockpicker.' + this.id, function(e) {
                if (e.keyCode === 27) {
                    self.hide();
                }
            });

            raiseCallback(this.options.afterShow);
        },

        // Set time
        setTime: function(value) {
            this._setTime(this._parseTime(value));
        },

        // Hide template
        hide: function() {
            raiseCallback(this.options.beforeHide);

            this.isShown = false;

            // Unbinding events on document
            $doc.off('click.jqclockpicker.' + this.id + ' focusin.jqclockpicker.' + this.id);
            $doc.off('keyup.jqclockpicker.' + this.id);

            this.template.hide();

            raiseCallback(this.options.afterHide);
        },

        // Toggle to hours or minutes view
        toggleView: function(view, delay) {
            var self = this;

            var raiseAfterShowHours = false;
            var raiseAfterShowMinutes = false;
            if (view === 'hours') {
                raiseCallback(this.options.beforeShowHours);
                raiseAfterShowHours = true;
            }
            if (view === 'minutes') {
                raiseCallback(this.options.beforeShowMinutes);
                raiseAfterShowMinutes = true;
            }
            var isHours = view === 'hours',
                nextView = isHours ? this.hoursView : this.minutesView,
                hideView = isHours ? this.minutesView : this.hoursView;

            this.currentView = view;

            this._checkTimeLimits();

            this.hoursLabel.toggleClass('jqclockpicker-active', isHours);
            this.minutesLabel.toggleClass('jqclockpicker-active', !isHours);

            // Let's make transitions
            hideView.addClass('jqclockpicker-dial-out');
            nextView.css('visibility', 'visible').removeClass('jqclockpicker-dial-out');

            // Reset clock hand
            this.resetClock(delay);

            // After transitions ended
            clearTimeout(this.toggleViewTimer);
            this.toggleViewTimer = setTimeout(function() {
                hideView.css('visibility', 'hidden');
            }, duration);

            if (raiseAfterShowHours) {
                raiseCallback(this.options.afterShowHours);
            }

            if (raiseAfterShowMinutes) {
                raiseCallback(this.options.afterShowMinutes);
            }
        },

        // Reset clock hand
        resetClock: function(delay) {
            var view = this.currentView,
                value = this[view],
                isHours = view === 'hours',
                unit = Math.PI / (isHours ? 6 : 30),
                radian = value * unit,
                radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
                x = Math.sin(radian) * radius,
                y = - Math.cos(radian) * radius,
                self = this;
            
            if (svgSupported && delay) {
                self.canvas.addClass('jqclockpicker-canvas-out');
                setTimeout(function() {
                    self.canvas.removeClass('jqclockpicker-canvas-out');
                    self.setHand(x, y);
                }, delay);
            } else {
                this.setHand(x, y);
            }
        },

        // Set clock hand to (x, y)
        setHand: function(x, y, roundBy5, dragging) {
            var radian = Math.atan2(x, - y),
                isHours = this.currentView === 'hours',
                unit = Math.PI / (isHours || roundBy5 ? 6 : 30),
                z = Math.sqrt(x * x + y * y),
                options = this.options,
                inner = isHours && z < (outerRadius + innerRadius) / 2,
                radius = inner ? innerRadius : outerRadius,
                value;

            if (options.format === '12h') {
                radius = outerRadius;
            }

            // Radian should in range [0, 2PI]
            if (radian < 0) {
                radian = Math.PI * 2 + radian;
            }

            // Get the round value
            value = Math.round(radian / unit);

            // Get the round radian
            radian = value * unit;

            // Correct the hours or minutes
            if (options.format === '12h') {
                if (isHours) {
                    if (value === 0) {
                        value = 12;
                    }
                } else {
                    if (roundBy5) {
                        value *= 5;
                    }
                    if (value === 60) {
                        value = 0;
                    }
                }
            } else {
                if (isHours) {
                    if (value === 12) {
                        value = 0;
                    }
                    value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
                } else {
                    if (roundBy5) {
                        value *= 5;
                    }
                    if (value === 60) {
                        value = 0;
                    }
                }
            }

            // Ignore out of range ticks.
            var minTime = this._parseTime(this.options.minTime);

            if (isHours) {
                if (value < minTime.hours) {
                    return;
                }
            } else {
                var hours = this.hours;
                if (this.options.format === '12h') {
                    if (this.amOrPm === 'PM') {
                        hours += 12;
                    }
                }
                if (hours <= minTime.hours && value < minTime.minutes) {
                    return;
                }
            }

            // Once hours or minutes changed, vibrate the device
            if (this[this.currentView] !== value) {
                if (vibrate && this.options.vibrate) {
                    // Do not vibrate too frequently
                    if (!this.vibrateTimer) {
                        navigator[vibrate](10);
                        this.vibrateTimer = setTimeout($.proxy(function() {
                            this.vibrateTimer = null;
                        }, this), 100);
                    }
                }
            }

            this[this.currentView] = value;
            this[isHours ? 'hoursLabel' : 'minutesLabel'].html(leadingZero(value));

            // Add active class to current tick
            this[isHours ? 'hoursView' : 'minutesView'].find('.jqclockpicker-tick').each(function() {
                var tick = $(this);
                tick.toggleClass('jqclockpicker-tick-active', value === + tick.html());
            });

            if (!svgSupported) {
                return;
            }

            // Set clock hand and others' position
            var cx = Math.sin(radian) * radius,
                cy = - Math.cos(radian) * radius,
                x2 = Math.sin(radian) * (radius - this.bg.getAttribute('r')),
                y2 = - Math.cos(radian) * (radius - this.bg.getAttribute('r'));
            
            this.hand.setAttribute('x2', x2);
            this.hand.setAttribute('y2', y2);
            this.bg.setAttribute('cx', cx);
            this.bg.setAttribute('cy', cy);
            this.fg.setAttribute('visibility', 'hidden');
            this.bg.setAttribute('class', 'jqclockpicker-canvas-bg');

            if (!isHours && value % 5) {
                this.fg.setAttribute('cx', cx);
                this.fg.setAttribute('cy', cy);
                this.fg.setAttribute('visibility', 'visible');
            }

            // Place clock hand at the top when dragging
            if (dragging) {
                this.g.insertBefore(this.hand, this.bearing);
            } else {
                // Or place it at the bottom
                this.g.insertBefore(this.hand, this.bg);
            }

            return true;
        },

        // Hours and minutes are selected
        done: function() {
            raiseCallback(this.options.beforeDone);
            this.hide();
        
            this._updateInput();

            if (this.options.autoClose) {
                this.input.trigger('blur');
            }

            raiseCallback(this.options.afterDone);
        },

        // Remove jqclockpicker from input
        remove: function() {
            this.element.removeData('jqclockpicker');
            this.input.off('focus.jqclockpicker click.jqclockpicker')
                .off('keyup', this._doKeyUp);
            if (this.isShown) {
                this.hide();
            }
            if (this.isAppended) {
                $win.off('resize.jqclockpicker' + this.id);
                this.template.remove();
            }
        },

        // Update time labels
        _updateLabels: function() {
            this.hoursLabel.html(leadingZero(this.hours));
            this.minutesLabel.html(leadingZero(this.minutes));

            if (this.options.format === '12h') {
                if (this.amOrPm === 'AM') {
                    this.amPmBlock.find('.jqclockpicker-am-button').addClass('jqclockpicker-active');
                    this.amPmBlock.find('.jqclockpicker-pm-button').removeClass('jqclockpicker-active');
                } else {
                    this.amPmBlock.find('.jqclockpicker-pm-button').addClass('jqclockpicker-active');
                    this.amPmBlock.find('.jqclockpicker-am-button').removeClass('jqclockpicker-active');
                }
            }
        },

        _parseTime: function(value, addMilliseconds) {
            var trimedValue = (value + '').replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
                hours,
                minutes,
                amOrPm;

            if (trimedValue === 'now') {
                var now = new Date( +new Date() + (addMilliseconds || 0));

                hours = now.getHours();
                minutes = now.getMinutes();
                amOrPm = getMeridian(this.hours);
            } else {
                var val = (value + '').replace(/^\s\s*/, '').replace(/\s\s*$/, '').toUpperCase(),
                    match = val.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3])(?::)?(?:(?::)([0-5][0-9])\s*(AM|PM)?)?$/);
                if (match) {
                    hours = match[1] ? +match[1] : 0;
                    minutes = match[2] ? +match[2] : 0;
                    amOrPm = match[3] || null;
                } else {
                    hours = 0;
                    minutes = 0;
                }
            }

            return new ClockTime(hours, minutes, amOrPm);
        },

        // Set time from ClockTime object
        _setTime: function(timeObject) {
            this.hours = timeObject.hours;
            this.minutes = timeObject.minutes;
            this.amOrPm = timeObject.amOrPm;

            this._checkTimeLimits();

            this._updateLabels();

            this.resetClock();
        },

        _checkTimeLimits: function() {
            this._checkMinTime();
        },

        _checkMinTime: function() {
            var self = this;

            var minTime = this._parseTime(this.options.minTime);

            var hours = this.hours;
            if (self.options.format === '12h') {
                if (self.amOrPm === 'PM') {
                    hours += 12;
                }
            }
            if (hours < minTime.hours || (hours == minTime.hours && this.minutes < minTime.minutes)) {
                this.hours = minTime.hours;
                this.minutes = minTime.minutes;
            }

            var isHours = this.currentView == 'hours';

            // Add disabled class to out of range ticks.
            if (isHours) {
                this[isHours ? 'hoursView' : 'minutesView'].find('.jqclockpicker-tick').each(function() {
                    var tick = $(this),
                        hours = parseInt(tick.html());

                    if (self.options.format === '12h') {
                        if (self.amOrPm === 'PM') {
                            hours += 12;
                        }
                    }

                    tick.toggleClass('disabled', hours < minTime.hours);
                });
            } else {
                var hours = this.hours;

                if (self.options.format === '12h') {
                    if (self.amOrPm === 'PM') {
                        hours += 12;
                    }
                }
                if (hours <= minTime.hours) {
                    this[isHours ? 'hoursView' : 'minutesView'].find('.jqclockpicker-tick').each(function() {
                        var tick = $(this);
                        tick.toggleClass('disabled', tick.html() < minTime.minutes);
                    });
                } else {
                    this['minutesView'].find('.jqclockpicker-tick').removeClass('disabled');
                }
            }
        },

        _updateInput: function() {
            if (this.hasOwnProperty('hours') && this.hasOwnProperty('minutes')) {
                var last = this.input.prop('value'),
                    value = leadingZero(this.hours) + ':' + leadingZero(this.minutes);
            
                if (this.options.format === '12h') {
                    value = value + this.amOrPm;
                }

                this.input.prop('value', value);
                this.lastVal = this.input.prop('value');
                if (value !== last) {
                    this.input.trigger('change');
                    this.input.triggerHandler('change');
                    if (! this.isInput) {
                        this.element.trigger('change');
                    }
                }
            }
        },

        // Synchronise manual entry
        _doKeyUp: function(event) {
            if (this.input.val() !== this.lastVal) {
                this.setTime(this.input.val());
            }
            return true;
        },

        _setOption: function(name, value) {
            if (name in JQClockPicker.DEFAULTS) {
                if (value === 'default') {
                    this.options[name] = JQClockPicker.DEFAULTS[name];
                } else {
                    this.options[name] = value;
                }

                this._checkTimeLimits();
                this._updateInput();
            }
        },
    });

    // Extends $.fn.jqclockpicker
    $.fn.jqclockpicker = function(option) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var $this = $(this),
                data = $this.data('jqclockpicker');
            
            if (!data) {
                var options = $.extend({}, JQClockPicker.DEFAULTS, $this.data(), typeof option == 'object' && option);
                $this.data('jqclockpicker', new JQClockPicker($this, options));
            } else {
                if (option === 'option' && args.length === 2 && typeof args[1] === 'string') {
                    data._setOption.apply(data, args);
                } else if (typeof data[option] === 'function') {
                    // Manual operations. show, hide, remove, e.g.
                    data[option].apply(data, args);
                }
            }
        });
    };
}());
