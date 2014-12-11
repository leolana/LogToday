var app = (app !== undefined) ? app : {};

app = (function (app) {
    'use strict';

    app.views = (function (views) {

        views.OpenModalBox = function (header, bottom) {
            var modalbox = $('#modalbox');
            modalbox.find('.modal-header-name span').html(header);
            modalbox.find('.devoops-modal-bottom').html(bottom);
            modalbox.fadeIn('fast');
            $('body').addClass("body-expanded");
        };
        views.CloseModalBox = function () {
            var modalbox = $('#modalbox');
            modalbox.fadeOut('fast', function () {
                modalbox.find('.modal-header-name span').children().remove();
                modalbox.find('.devoops-modal-bottom').children().remove();
                $('body').removeClass("body-expanded");
            });
        };
        views.DateDiff = function Diferenca(dtInicio, dtFim) {
            var inicio = new Date(dtInicio);
            var fim = new Date(dtFim);
            var data = new Date();
            var minutos = null;
            var horas = null;

            if (inicio.getMinutes() > fim.getMinutes()) {
                minutos = 60 - inicio.getMinutes();
                minutos = minutos + fim.getMinutes();
                fim.setHours(fim.getHours() - 1);
            }
            else {
                minutos = fim.getMinutes() - inicio.getMinutes();
            }
            if (inicio.getHours() <= fim.getHours())
                horas = fim.getHours() - inicio.getHours();
            else {
                horas = 24 - inicio.getHours();
                horas = horas + fim.getHours();
            }
            if (minutos >= 60) {
                minutos = minutos - 60;
                horas += 1;
            }
            data.setMinutes(minutos);
            data.setHours(horas);
            return data;
        },
        views.formataAgendaWeek = function (e) {
            return "<b>" + e.client + "</b><br />" + e.project + "<br />" + e.module;
        },
        views.formataAgendaDay = function (e) {
            return "<b>" + e.client + " / " + e.project + " / " + e.module + " / " + e.category + "</b><br />" + e.description;
        },
        views.formataHora = function (e) {
            return $.fullCalendar.formatDate(e.start, "HH:mm") + " - " + $.fullCalendar.formatDate(e.end, "HH:mm") + " (" + ($.fullCalendar.formatDate(views.DateDiff(e.start, e.end), "HH:mm")) + ")";
        },
        views.drawCalendar = function () {
            /* initialize the external events
            -----------------------------------------------------------------*/
            $('#external-events div.external-event').each(function () {
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                var eventObject = {
                    title: $.trim($(this).text()) // use the element's text as the event title
                };
                // store the Event Object in the DOM element so we can get to it later
                $(this).data('eventObject', eventObject);
                // make the event draggable using jQuery UI
                $(this).draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });
            });
            /* initialize the calendar
            -----------------------------------------------------------------*/
            var calendar = $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                selectable: true,
                selectHelper: true,
                select: function (start, end, allDay) {
                    var buttons = $('<button id="event_cancel" type="cancel" class="btn btn-default btn-label-left">' +
                                    '<span><i class="fa fa-clock-o txt-danger"></i></span>' +
                                    'Cancelar' +
                                    '</button>' +
                                    '<button type="submit" id="event_submit" class="btn btn-primary btn-label-left pull-right">' +
                                    '<span><i class="fa fa-clock-o"></i></span>' +
                                    'Salvar' +
                                    '</button>');
                    views.OpenModalBox('Incluir log de horas', buttons);
                    $('#event_cancel').on('click', function () {
                        views.CloseModalBox();
                    });
                    $('#event_submit').on('click', function () {
                        var new_event_name = $('#newevent_name').val();
                        if (new_event_name != '') {
                            calendar.fullCalendar('renderEvent',
                                {
                                    title: new_event_name,
                                    description: $('#newevent_desc').val(),
                                    start: start,
                                    end: end,
                                    allDay: allDay
                                },
                                true // make the event "stick"
                            );
                        }
                        views.CloseModalBox();
                    });
                    calendar.fullCalendar('unselect');
                },
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar !!!
                eventLimit: true,
                drop: function (date, allDay) { // this function is called when something is dropped
                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);
                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;
                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
                events: [
				{
				    title: 'All Day Event',
				    start: '2014-11-01',
				    end: '2014-11-01'
				},
				{
				    title: 'Aqui',
				    start: '2014-11-0707:10',
				    end: '2014-11-0708:10',
				    project: 'iNeocPack',
				    module: 'Cadastro de Fornecedores',
				    customer: 'NeocPack',
				    description: 'Realizado o desenvolvimento...'
				},
				{
				    id: 670,
				    title: 'Desenvolvimento',
				    start: '2014-11-09T16:15:15',
				    end: '2014-11-09T16:15:15',
				    color: '#257e4a'
				},
				{
				    id: 590,
				    title: 'Desenvolvimento',
				    start: '2014-11-16T16:15:00',
				    end: '2014-11-16T16:15:00'
				},
				{
				    title: 'Análise',
				    start: '2014-11-1107:15:00',
				    end: '2014-11-13'
				},
				{
				    title: 'Levantamento',
				    start: '2014-11-12T10:30:00',
				    end: '2014-11-12T12:30:00'
				},
				{
				    title: 'Levantamento',
				    start: '2014-11-12T12:15:00',
				    color: '#257e4a'
				},
				{
				    title: 'Levantamento',
				    start: '2014-11-12T14:30:00',
				    color: '#257e4a'
				},
				{
				    title: 'Desenvolvimento',
				    start: '2014-11-12T17:30:00',
				    color: '#257e4a'
				},
				{
				    title: 'Desenvolvimento',
				    start: '2014-11-12T20:15:00',
				    color: '#257e4a'
				},
				{
				    title: 'Desenvolvimento',
				    start: '2014-11-13T0715:00',
				    color: '#257e4a'
				},
				{
				    title: 'Desenvolvimento',
				    start: '2014-11-2807:15:00'
				},
                {
                    title: 'Desenvolvimento',
                    start: '2014-11-12T17:30:00',
                    color: '#257e4a'
                },
				{
				    title: 'Desenvolvimento',
				    start: '2014-11-12T20:15:00',
				    color: '#257e4a'
				},
				{
				    title: 'Desenvolvimento',
				    start: '2014-11-13T0715:00',
				    color: '#257e4a'
				},s
				{
				    title: 'Desenvolvimento',
				    start: '2014-11-2807:15:00'
				}
                ],
                eventRender: function (event, element, view) {
                    if (event.description != "") {
                        element.attr('title', event.description);
                    }
                    //if (view.name != 'month') {
                    //    element.find('.fc-event-time').html(views.formataHora(event));
                    //    if (view.name == 'agendaDay') {
                    //        element.find('.fc-event-title').html(views.formataAgendaDay(event));
                    //    }
                    //    else {
                    //        element.find('.fc-event-title').html(views.formataAgendaWeek(event));
                    //    }

                    //}
                },
                eventClick: function (calEvent, jsEvent, view) {
                    var buttons = $('<button id="event_cancel" type="cancel" class="btn btn-default btn-label-left">' +
                                    '<span><i class="fa fa-clock-o txt-danger"></i></span>' +
                                    'Cancelar' +
                                    '</button>' +
                                    '<button id="event_delete" type="cancel" class="btn btn-danger btn-label-left">' +
                                    '<span><i class="fa fa-clock-o txt-danger"></i></span>' +
                                    'Excluir' +
                                    '</button>' +
                                    '<button type="submit" id="event_change" class="btn btn-primary btn-label-left pull-right">' +
                                    '<span><i class="fa fa-clock-o"></i></span>' +
                                    'Salvar alterações' +
                                    '</button>');
                    views.OpenModalBox('Editar log de horas', buttons);
                    $('#event_cancel').on('click', function () {
                        views.CloseModalBox();
                    });
                    $('#event_delete').on('click', function () {
                        calendar.fullCalendar('removeEvents', function (ev) {
                            return (ev._id == calEvent._id);
                        });
                        views.CloseModalBox();
                    });
                    $('#event_change').on('click', function () {
                        calEvent.title = $('#newevent_name').val();
                        calEvent.description = $('#newevent_desc').val();
                        calendar.fullCalendar('updateEvent', calEvent);
                        views.CloseModalBox()
                    });
                }
            });
            $('#new-event-add').on('click', function (event) {
                event.preventDefault();
                var event_name = $('#new-event-title').val();
                var event_description = $('#new-event-desc').val();
                if (event_name != '') {
                    var event_template = $('<div class="external-event" data-description="' + event_description + '">' + event_name + '</div>');
                    $('#events-templates-header').after(event_template);
                    var eventObject = {
                        title: event_name,
                        description: event_description
                    };
                    // store the Event Object in the DOM element so we can get to it later
                    event_template.data('eventObject', eventObject);
                    event_template.draggable({
                        zIndex: 999,
                        revert: true,
                        revertDuration: 0
                    });
                }
            });
        };
        views.init = function () {
            views.drawCalendar();
        };

        return views;
    }(app.views || {}));

    app.views.model = (function (model) {
        model.schedule = (function (schedule) {
            schedule.select2 = function (data) {
                data.list = ko.observableArray(data.list);
                data.value = ko.observable('');
                data.options = {
                    placeholder: data.options.placeholder,
                    allowClear: data.options.allowClear,
                    minimumInputLength: data.options.minimumInputLength,
                    formatResult: data.options.formatResult,
                    formatSelection: data.options.formatResult,
                    escapeMarkup: data.options.escapeMarkup
                };

                return data;
            };

            schedule.fieldWithMask = function (observable, data) {
                data.value = observable;
                data.options = {
                    mask: data.options.mask,
                    placeholder: data.options.allowClear,
                    minimumInputLength: data.options.placeholder
                };

                return data;
            };

            return schedule;
        }(model.schedule || {}));

        return model;
    }(app.views.model || {}));

    return app;
}(app || {}));

$(function () {
    app.views.init();

    if (app.views && app.views.model)
        ko.applyBindings(app.views.model);
});