var app = (app !== undefined) ? app : {};

app.utilities = (function (my) {
    "use strict";
 
    /*-------------------------------------------
        Main scripts used by theme
    ---------------------------------------------*/
    //
    //  Function maked all .box selector is draggable, to disable for concrete element add class .no-drop
    //
    var WinMove = function () {
        $("div.box").not('.no-drop')
            .draggable({
                revert: true,
                zIndex: 2000,
                cursor: "crosshair",
                handle: '.box-name',
                opacity: 0.8
            })
            .droppable({
                tolerance: 'pointer',
                drop: function (event, ui) {
                    var draggable = ui.draggable;
                    var droppable = $(this);
                    var dragPos = draggable.position();
                    var dropPos = droppable.position();
                    draggable.swap(droppable);
                    setTimeout(function () {
                        var dropmap = droppable.find('[id^=map-]');
                        var dragmap = draggable.find('[id^=map-]');
                        if (dragmap.length > 0 || dropmap.length > 0) {
                            dragmap.resize();
                            dropmap.resize();
                        }
                        else {
                            draggable.resize();
                            droppable.resize();
                        }
                    }, 50);
                    setTimeout(function () {
                        draggable.find('[id^=map-]').resize();
                        droppable.find('[id^=map-]').resize();
                    }, 250);
                }
            });
    };
    //
    // Swap 2 elements on page. Used by WinMove function
    //
    jQuery.fn.swap = function (b) {
        b = jQuery(b)[0];
        var a = this[0];
        var t = a.parentNode.insertBefore(document.createTextNode(''), a);
        b.parentNode.insertBefore(a, b);
        t.parentNode.insertBefore(b, t);
        t.parentNode.removeChild(t);
        return this;
    };
    //
    //  Screensaver function
    //  used on locked screen, and write content to element with id - canvas
    //
    var ScreenSaver = function () {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        // Size of canvas set to fullscreen of browser
        var W = window.innerWidth;
        var H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        // Create array of particles for screensaver
        var particles = [];
        for (var i = 0; i < 25; i++) {
            particles.push(new Particle());
        }
        var Particle = function () {
            // location on the canvas
            this.location = { x: Math.random() * W, y: Math.random() * H };
            // radius - lets make this 0
            this.radius = 0;
            // speed
            this.speed = 3;
            // random angle in degrees range = 0 to 360
            this.angle = Math.random() * 360;
            // colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var a = Math.random();
            this.rgba = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
        };
        // Draw the particles
        var draw = function () {
            // re-paint the BG
            // Lets fill the canvas black
            // reduce opacity of bg fill.
            // blending time
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
            ctx.fillRect(0, 0, W, H);
            ctx.globalCompositeOperation = "lighter";
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                ctx.fillStyle = "white";
                ctx.fillRect(p.location.x, p.location.y, p.radius, p.radius);
                // Lets move the particles
                // So we basically created a set of particles moving in random direction
                // at the same speed
                // Time to add ribbon effect
                for (var n = 0; n < particles.length; n++) {
                    var p2 = particles[n];
                    // calculating distance of particle with all other particles
                    var yd = p2.location.y - p.location.y;
                    var xd = p2.location.x - p.location.x;
                    var distance = Math.sqrt(xd * xd + yd * yd);
                    // draw a line between both particles if they are in 200px range
                    if (distance < 200) {
                        ctx.beginPath();
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.location.x, p.location.y);
                        ctx.lineTo(p2.location.x, p2.location.y);
                        ctx.strokeStyle = p.rgba;
                        ctx.stroke();
                        //The ribbons appear now.
                    }
                }
                // We are using simple vectors here
                // New x = old x + speed * cos(angle)
                p.location.x = p.location.x + p.speed * Math.cos(p.angle * Math.PI / 180);
                // New y = old y + speed * sin(angle)
                p.location.y = p.location.y + p.speed * Math.sin(p.angle * Math.PI / 180);
                // You can read about vectors here:
                // http://physics.about.com/od/mathematics/a/VectorMath.htm
                if (p.location.x < 0) p.location.x = W;
                if (p.location.x > W) p.location.x = 0;
                if (p.location.y < 0) p.location.y = H;
                if (p.location.y > H) p.location.y = 0;
            }
        };
        setInterval(draw, 30);
    };
    //
    // Helper for draw Google Chart
    //
    var drawGoogleChart = function (chart_data, chart_options, element, chart_type) {
        // Function for visualize Google Chart
        var data = google.visualization.arrayToDataTable(chart_data);
        var chart = new chart_type(document.getElementById(element));
        chart.draw(data, chart_options);
    };
    //
    //  Function for Draw Knob Charts
    //
    var DrawKnob = function (elem) {
        elem.knob({
            change: function (value) {
                //console.log("change : " + value);
            },
            release: function (value) {
                //console.log(this.$.attr('value'));
                console.log("release : " + value);
            },
            cancel: function () {
                console.log("cancel : ", this);
            },
            draw: function () {
                // "tron" case
                if (this.$.data('skin') == 'tron') {
                    var a = this.angle(this.cv);  // Angle
                    var sa = this.startAngle;          // Previous start angle
                    var sat = this.startAngle;         // Start angle
                    var ea;                            // Previous end angle
                    var eat = sat + a;                 // End angle
                    var r = 1;
                    this.g.lineWidth = this.lineWidth;
                    this.o.cursor
                        && (sat = eat - 0.3)
                        && (eat = eat + 0.3);
                    if (this.o.displayPrevious) {
                        ea = this.startAngle + this.angle(this.v);
                        this.o.cursor
                            && (sa = ea - 0.3)
                            && (ea = ea + 0.3);
                        this.g.beginPath();
                        this.g.strokeStyle = this.pColor;
                        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                        this.g.stroke();
                    }
                    this.g.beginPath();
                    this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                    this.g.stroke();
                    this.g.lineWidth = 2;
                    this.g.beginPath();
                    this.g.strokeStyle = this.o.fgColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                    this.g.stroke();
                    return false;
                }
            }
        });
        // Example of infinite knob, iPod click wheel
        var v;
        var up = 0;
        var down = 0;
        var i = 0;
        var $idir = $("div.idir");
        var $ival = $("div.ival");
        var incr = function () { i++; $idir.show().html("+").fadeOut(); $ival.html(i); }
        var decr = function () { i--; $idir.show().html("-").fadeOut(); $ival.html(i); };
        $("input.infinite").knob(
            {
                min: 0,
                max: 20,
                stopper: false,
                change: function () {
                    if (v > this.cv) {
                        if (up) {
                            decr();
                            up = 0;
                        } else {
                            up = 1; down = 0;
                        }
                    } else {
                        if (v < this.cv) {
                            if (down) {
                                incr();
                                down = 0;
                            } else {
                                down = 1; up = 0;
                            }
                        }
                    }
                    v = this.cv;
                }
            });
    }
    //
    // Create OpenLayers map with required options and return map as object
    //
    var drawMap = function (lon, lat, elem, layers) {
        var LayersArray = [];
        // Map initialization
        var map = new OpenLayers.Map(elem);
        // Add layers on map
        map.addLayers(layers);
        // WGS 1984 projection
        var epsg4326 = new OpenLayers.Projection("EPSG:4326");
        //The map projection (Spherical Mercator)
        var projectTo = map.getProjectionObject();
        // Max zoom = 17
        var zoom = 10;
        map.zoomToMaxExtent();
        // Set longitude/latitude
        var lonlat = new OpenLayers.LonLat(lon, lat);
        map.setCenter(lonlat.transform(epsg4326, projectTo), zoom);
        var layerGuest = new OpenLayers.Layer.Vector("You are here");
        // Define markers as "features" of the vector layer:
        var guestMarker = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(lon, lat).transform(epsg4326, projectTo)
        );
        layerGuest.addFeatures(guestMarker);
        LayersArray.push(layerGuest);
        map.addLayers(LayersArray);
        // If map layers > 1 then show checker
        if (layers.length > 1) {
            map.addControl(new OpenLayers.Control.LayerSwitcher({ 'ascending': true }));
        }
        // Link to current position
        map.addControl(new OpenLayers.Control.Permalink());
        // Show current mouse coords
        map.addControl(new OpenLayers.Control.MousePosition({ displayProjection: epsg4326 }));
        return map
    };
    //
    //  Function for create 2 dates in human-readable format (with leading zero)
    //
    var PrettyDates = function () {
        var currDate = new Date();
        var year = currDate.getFullYear();
        var month = currDate.getMonth() + 1;
        var startmonth = 1;
        if (month > 3) {
            startmonth = month - 2;
        }
        if (startmonth <= 9) {
            startmonth = '0' + startmonth;
        }
        if (month <= 9) {
            month = '0' + month;
        }
        var day = currDate.getDate();
        if (day <= 9) {
            day = '0' + day;
        }
        var startdate = year + '-' + startmonth + '-01';
        var enddate = year + '-' + month + '-' + day;
        return [startdate, enddate];
    };
    //
    //  Function set min-height of window (required for this theme)
    //
    var SetMinBlockHeight = function (elem) {
        elem.css('min-height', window.innerHeight - 49)
    };
    //
    //  Helper for correct size of Messages page
    //
    var MessagesMenuWidth = function () {
        var W = window.innerWidth;
        var W_menu = $('#sidebar-left').outerWidth();
        var w_messages = (W - W_menu) * 16.666666666666664 / 100;
        $('#messages-menu').width(w_messages);
    };
    //
    // Function for change panels of Dashboard
    //
    var DashboardTabChecker = function () {
        $('#content').on('click', 'a.tab-link', function (e) {
            e.preventDefault();
            $('div#dashboard_tabs').find('div[id^=dashboard]').each(function () {
                $(this).css('visibility', 'hidden').css('position', 'absolute');
            });
            var attr = $(this).attr('id');
            $('#' + 'dashboard-' + attr).css('visibility', 'visible').css('position', 'relative');
            $(this).closest('.nav').find('li').removeClass('active');
            $(this).closest('li').addClass('active');
        });
    };
    //
    // Helper for run TinyMCE editor with textarea's
    //
    var TinyMCEStart = function (elem, mode) {
        var plugins = [];
        if (mode == 'extreme') {
            plugins = ["advlist anchor autolink autoresize autosave bbcode charmap code contextmenu directionality ",
                "emoticons fullpage fullscreen hr image insertdatetime layer legacyoutput",
                "link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace",
                "tabfocus table template textcolor visualblocks visualchars wordcount"]
        }
        tinymce.init({
            selector: elem,
            theme: "modern",
            plugins: plugins,
            //content_css: "css/style.css",
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
            style_formats: [
                { title: 'Header 2', block: 'h2', classes: 'page-header' },
                { title: 'Header 3', block: 'h3', classes: 'page-header' },
                { title: 'Header 4', block: 'h4', classes: 'page-header' },
                { title: 'Header 5', block: 'h5', classes: 'page-header' },
                { title: 'Header 6', block: 'h6', classes: 'page-header' },
                { title: 'Bold text', inline: 'b' },
                { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
                { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
                { title: 'Example 1', inline: 'span', classes: 'example1' },
                { title: 'Example 2', inline: 'span', classes: 'example2' },
                { title: 'Table styles' },
                { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' }
            ]
        });
    };
    //
    // Helper for draw Sparkline plots on Dashboard page
    //
    var SparkLineDrawBarGraph = function (elem, arr, color) {
        if (color) {
            var stacked_color = color;
        }
        else {
            stacked_color = '#6AA6D6'
        }
        elem.sparkline(arr, { type: 'bar', barWidth: 7, highlightColor: '#000', barSpacing: 2, height: 40, stackedBarColor: stacked_color });
    };
    //
    //  Helper for open ModalBox with requested header, content and bottom
    //
    //
    var OpenModalBox = function (header, inner, bottom) {
        var modalbox = $('#modalbox');
        modalbox.find('.modal-header-name span').html(header);
        modalbox.find('.devoops-modal-inner').html(inner);
        modalbox.find('.devoops-modal-bottom').html(bottom);
        modalbox.fadeIn('fast');
        $('body').addClass("body-expanded");
    };
    //
    //  Close modalbox
    //
    //
    var CloseModalBox = function () {
        var modalbox = $('#modalbox');
        modalbox.fadeOut('fast', function () {
            modalbox.find('.modal-header-name span').children().remove();
            modalbox.find('.devoops-modal-inner').children().remove();
            modalbox.find('.devoops-modal-bottom').children().remove();
            $('body').removeClass("body-expanded");
        });
    };
    //
    //  Beauty tables plugin (navigation in tables with inputs in cell)
    //  Created by DevOOPS.
    //
    (function ($) {
        $.fn.beautyTables = function () {
            var table = this;
            var string_fill = false;
            this.on('keydown', function (event) {
                var target = event.target;
                var tr = $(target).closest("tr");
                var col = $(target).closest("td");
                if (target.tagName.toUpperCase() == 'INPUT') {
                    if (event.shiftKey === true) {
                        switch (event.keyCode) {
                            case 37: // left arrow
                                col.prev().children("input[type=text]").focus();
                                break;
                            case 39: // right arrow
                                col.next().children("input[type=text]").focus();
                                break;
                            case 40: // down arrow
                                if (string_fill == false) {
                                    tr.next().find('td:eq(' + col.index() + ') input[type=text]').focus();
                                }
                                break;
                            case 38: // up arrow
                                if (string_fill == false) {
                                    tr.prev().find('td:eq(' + col.index() + ') input[type=text]').focus();
                                }
                                break;
                        }
                    }
                    if (event.ctrlKey === true) {
                        switch (event.keyCode) {
                            case 37: // left arrow
                                tr.find('td:eq(1)').find("input[type=text]").focus();
                                break;
                            case 39: // right arrow
                                tr.find('td:last-child').find("input[type=text]").focus();
                                break;
                            case 40: // down arrow
                                if (string_fill == false) {
                                    table.find('tr:last-child td:eq(' + col.index() + ') input[type=text]').focus();
                                }
                                break;
                            case 38: // up arrow
                                if (string_fill == false) {
                                    table.find('tr:eq(1) td:eq(' + col.index() + ') input[type=text]').focus();
                                }
                                break;
                        }
                    }
                    if (event.keyCode == 13 || event.keyCode == 9) {
                        event.preventDefault();
                        col.next().find("input[type=text]").focus();
                    }
                    if (string_fill == false) {
                        if (event.keyCode == 34) {
                            event.preventDefault();
                            table.find('tr:last-child td:last-child').find("input[type=text]").focus();
                        }
                        if (event.keyCode == 33) {
                            event.preventDefault();
                            table.find('tr:eq(1) td:eq(1)').find("input[type=text]").focus();
                        }
                    }
                }
            });
            table.find("input[type=text]").each(function () {
                $(this).on('blur', function (event) {
                    var target = event.target;
                    var col = $(target).parents("td");
                    if (table.find("input[name=string-fill]").prop("checked") == true) {
                        col.nextAll().find("input[type=text]").each(function () {
                            $(this).val($(target).val());
                        });
                    }
                });
            })
        };
    })(jQuery);
    //
    // Beauty Hover Plugin (backlight row and col when cell in mouseover)
    //
    //
    (function ($) {
        $.fn.beautyHover = function () {
            var table = this;
            table.on('mouseover', 'td', function () {
                var idx = $(this).index();
                var rows = $(this).closest('table').find('tr');
                rows.each(function () {
                    $(this).find('td:eq(' + idx + ')').addClass('beauty-hover');
                });
            })
            .on('mouseleave', 'td', function (e) {
                var idx = $(this).index();
                var rows = $(this).closest('table').find('tr');
                rows.each(function () {
                    $(this).find('td:eq(' + idx + ')').removeClass('beauty-hover');
                });
            });
        };
    })(jQuery);
    //
    //  Function convert values of inputs in table to JSON data
    //
    //
    var Table2Json = function (table) {
        var result = {};
        table.find("tr").each(function () {
            var oneRow = [];
            var varname = $(this).index();
            $("td", this).each(function (index) { if (index != 0) { oneRow.push($("input", this).val()); } });
            result[varname] = oneRow;
        });
        var result_json = JSON.stringify(result);
        OpenModalBox('Table to JSON values', result_json);
    };
    //
    // Function for Dynamically Change input size on Form Layout page
    //
    var FormLayoutExampleInputLength = function (selector) {
        var steps = [
            "col-sm-1",
            "col-sm-2",
            "col-sm-3",
            "col-sm-4",
            "col-sm-5",
            "col-sm-6",
            "col-sm-7",
            "col-sm-8",
            "col-sm-9",
            "col-sm-10",
            "col-sm-11",
            "col-sm-12"
        ];
        selector.slider({
            range: 'min',
            value: 1,
            min: 0,
            max: 11,
            step: 1,
            slide: function (event, ui) {
                if (ui.value < 1) {
                    return false;
                }
                var input = $("#form-styles");
                var f = input.parent();
                f.removeClass();
                f.addClass(steps[ui.value]);
                input.attr("placeholder", '.' + steps[ui.value]);
            }
        });
    };
    //
    // Function for Knob clock
    //
    var RunClock = function () {
        var second = $(".second");
        var minute = $(".minute");
        var hour = $(".hour");
        var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();
        var h = d.getHours();
        if (h > 11) { h = h - 12; }
        $('#knob-clock-value').html(h + ':' + m + ':' + s);
        second.val(s).trigger("change");
        minute.val(m).trigger("change");
        hour.val(h).trigger("change");
    };

    return {
        init: function (options) {
            $('.show-sidebar').on('click', function (e) {
                e.preventDefault();
                $('div#main').toggleClass('sidebar-show');
                setTimeout(MessagesMenuWidth, 250);
            });

            $('.main-menu').on('click', 'a', function (e) {
                var parents = $(this).parents('li');
                var li = $(this).closest('li.dropdown');
                var another_items = $('.main-menu li').not(parents);
                another_items.find('a').removeClass('active');
                another_items.find('a').removeClass('active-parent');
                if ($(this).hasClass('dropdown-toggle') || $(this).closest('li').find('ul').length == 0) {
                    $(this).addClass('active-parent');
                    var current = $(this).next();
                    if (current.is(':visible')) {
                        li.find("ul.dropdown-menu").slideUp('fast');
                        li.find("ul.dropdown-menu a").removeClass('active')
                    }
                    else {
                        another_items.find("ul.dropdown-menu").slideUp('fast');
                        current.slideDown('fast');
                    }
                }
                else {
                    if (li.find('a.dropdown-toggle').hasClass('active-parent')) {
                        var pre = $(this).closest('ul.dropdown-menu');
                        pre.find("li.dropdown").not($(this).closest('li')).find('ul.dropdown-menu').slideUp('fast');
                    }
                }
                if ($(this).hasClass('active') == false) {
                    $(this).parents("ul.dropdown-menu").find('a').removeClass('active');
                    $(this).addClass('active')
                }
                if ($(this).hasClass('ajax-link')) {
                    e.preventDefault();
                    if ($(this).hasClass('add-full')) {
                        $('#content').addClass('full-content');
                    }
                    else {
                        $('#content').removeClass('full-content');
                    }
                }
                if ($(this).attr('href') == '#') {
                    e.preventDefault();
                }
            });
            var height = window.innerHeight - 49;
            $('#main').css('min-height', height)
                .on('click', '.expand-link', function (e) {
                    var body = $('body');
                    e.preventDefault();
                    var box = $(this).closest('div.box');
                    var button = $(this).find('i');
                    button.toggleClass('fa-expand').toggleClass('fa-compress');
                    box.toggleClass('expanded');
                    body.toggleClass('body-expanded');
                    var timeout = 0;
                    if (body.hasClass('body-expanded')) {
                        timeout = 100;
                    }
                    setTimeout(function () {
                        box.toggleClass('expanded-padding');
                    }, timeout);
                    setTimeout(function () {
                        box.resize();
                        box.find('[id^=map-]').resize();
                    }, timeout + 50);
                })
                .on('click', '.collapse-link', function (e) {
                    e.preventDefault();
                    var box = $(this).closest('div.box');
                    var button = $(this).find('i');
                    var content = box.find('div.box-content');
                    content.slideToggle('fast');
                    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    setTimeout(function () {
                        box.resize();
                        box.find('[id^=map-]').resize();
                    }, 50);
                })
                .on('click', '.close-link', function (e) {
                    e.preventDefault();
                    var content = $(this).closest('div.box');
                    content.remove();
                });
            $('#locked-screen').on('click', function (e) {
                e.preventDefault();
                $('body').addClass('body-screensaver');
                $('#screensaver').addClass("show");
                ScreenSaver();
            });
            $('body').on('click', 'a.close-link', function (e) {
                e.preventDefault();
                CloseModalBox();
            });
            $('#top-panel').on('click', 'a', function (e) {
                if ($(this).hasClass('ajax-link')) {
                    e.preventDefault();
                    if ($(this).hasClass('add-full')) {
                        $('#content').addClass('full-content');
                    }
                    else {
                        $('#content').removeClass('full-content');
                    }
                    var url = $(this).attr('href');
                    window.location.hash = url;
                }
            });
            $('#search').on('keydown', function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    $('#content').removeClass('full-content');
                }
            });
            $('#screen_unlock').on('mouseover', function () {
                var header = 'Enter current username and password';
                var form = $('<div class="form-group"><label class="control-label">Username</label><input type="text" class="form-control" name="username" /></div>' +
                            '<div class="form-group"><label class="control-label">Password</label><input type="password" class="form-control" name="password" /></div>');
                var button = $('<div class="text-center"><a href="index.html" class="btn btn-primary">Unlock</a></div>');
                OpenModalBox(header, form, button);
            });
        }
    };

}(app.utilities || {}));

$(function () {
    app.utilities.init({});
});