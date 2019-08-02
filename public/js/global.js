
(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });

        var myCalendar = $('.js-datepicker');
        var isClick = 0;

        $(window).on('click', function () {
            isClick = 0;
        });

        $(myCalendar).on('apply.daterangepicker', function (ev, picker) {
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));

        });

        $('.js-btn-calendar').on('click', function (e) {
            e.stopPropagation();

            if (isClick === 1) isClick = 0;
            else if (isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(myCalendar).on('click', function (e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click', function (e) {
            e.stopPropagation();
        });

        // 

    } catch (er) { console.log(er); }
    /*[ Select 2 Config ]
        ===========================================================*/

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }

    //==================================================================

    var sortedMatch = [
        {
            user_id: 1,
            name: "Mark",
            teach: [
                {
                    id: 4,
                    name: "singing",
                    desc: "I can't sing"
                },
                {
                    id: 6,
                    name: "Gardening",
                    desc: "I want to grow vegi"
                }
            ],
            learn: [
                {
                    id: 3,
                    name: "cooking",
                    desc: "I cook everyday"
                }
            ]
        },
        {
            user_id: 1,
            name: 'Hanna',
            teach: [
                {
                    id: 4,
                    name: "singing",
                    desc: "I can't sing"
                },
                {
                    id: 6,
                    name: "Gardening",
                    desc: "I want to grow vegi"
                }
            ],
            learn: [
                {
                    id: 3,
                    name: "cooking",
                    desc: "I cook everyday"
                }
            ]
        },
        {
            user_id: 1,
            name: 'Jason',
            teach: [
                {
                    id: 4,
                    name: "singing",
                    desc: "I can't sing"
                },
                {
                    id: 6,
                    name: "Gardening",
                    desc: "I want to grow vegi"
                }
            ],
            learn: [
                {
                    id: 3,
                    name: "cooking",
                    desc: "I cook everyday"
                }
            ]
        }

    ];

    var i;
    for (i = 0; i < sortedMatch.length; i++) {
        let person = sortedMatch[i];
        let card = `
            '<div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                 <div class="card-body">
                    <h5 class="card-title">${person.name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                <div class="card-body">

                </div>
            </div>`;

        // var body = document.getElementById("body");
        // body.appendChild(card);

        $("#body").append(card);
    }







    //==================================================================

})(jQuery);
