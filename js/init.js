'use strict';

(function($) {
    $(function() {

        $('ul.tabs').tabs();


        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });


        var last_date = '';

        setInterval(function() {
            get_data();
        }, 1000 * 5);

        function get_data() {
            $.getJSON('http://raven.tm:8080/cms_changes?insert_date=' + last_date)
                .done(function(data) {
                    data.forEach(function(a, index) {
                        switch (a.action) {
                            case 'unlinked':
                                a.action = 'has been unlinked from ' + a.cms;
                                break;

                            case 'terminated by YouTube':
                                a.action = 'from ' + a.cms + ' was terminated by YouTube';
                                break;

                            case 'added':
                                a.action = 'added to ' + a.cms;
                                break;
                        }

                        $('#all tbody').prepend('<tr>' + '<td><span title="' + a.change_date + '">' + a.change_date_now + '</span></td>' +
                            '<td><a href="https://www.youtube.com/channel/' + a.channel_id +
                            '" target="_blank"><img src="http://raven.tm:8080/channel/' + a.channel_id + '/thumb" width="40px" height="40px"/> ' +
                            a.title + '</a></td><td>' + a.linked_date + '</td><td>' + a.action + '</td>' + '<td>' + (a.note || '') +
                            '</td>' + '<td><a href="#modal1" class="info-trigger' + a.channel_id + '"><i class="material-icons">info_outline</i></a></td></tr>');
                        
                        $('.info-trigger' + a.channel_id).leanModal();

                        if (index === data.length - 1) {
                            last_date = a.change_date;
                        }
                    });

                });

        }

        get_data();


    }); // end of document ready
})(jQuery); // end of jQuery name space
