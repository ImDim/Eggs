(function( $ ){

    $.fn.compare = function(start_pos) {

        return this.each(function(start_pos) {

            var $this = $(this);

            var element = this;

            var compare_before = $this.find('.compare_before');


            //Задаем ширину и высоту родительского блока, относительно параметров изображения
            $this.width( compare_before.width() ).height( compare_before.height() );

            var separator = '<div class="compare_separator">'+

                    '<span class="arrow top_arrow"></span>'+
                    '<span class="line"></span>'+
                    '<span class="arrow bottom_arrow"></span>'+

                '</div>';

            //Добавляем разделитель
            if( $this.prepend(separator) ) {



            }


            //Оборачиваем второе изображение в блок
            compare_before.wrap('<div class="moved_block"></div>');

            //Двигаем мышью
            function go_position(e, x) {

                //Позиция compare блока на странице
                var r = element.getBoundingClientRect();

                //Mobile touch detect
                if( event.targetTouches ) {

                    var touch = event.targetTouches[0];
                    var event_x = touch.pageX;

                } else {

                    var event_x = e.clientX;

                }


                //Насколько переместилась мышь влево от левого края блока compare
                if( x === false || x === undefined ) var left = event_x - r.left;
                else var left = x;

                var separator = $(element).find(".compare_separator");

                //Двигаем разделитель и блок обрезки
                if( left >= 0 && left <= $(element).width() && ( left - separator.width()/2 > 0 ) && ( left < $(element).width() - separator.width() / 2) ) {


                    $(element).find(".moved_block").css({"left": left+'px'});


                    separator.css({"left": left - separator.width()/2 + 'px'});
                    compare_before.css({"left": -left+"px"});

                //Защита от дурака
                } else if( left < 0 ) {

                    $(element).find(".moved_block").css({"left": 0+'px'});
                    separator.css({"left": '0px'});
                    compare_before.css({"left": 0+"px"});

                } else if( left > $(element).width() || ( left >= $(element).width() - separator.width())  ) {

                    $(element).find(".moved_block").css({"left": $(element).width()+'px'});
                    separator.css({"left": $(element).width() - separator.width() + 'px'});
                    compare_before.css({"left": -$(element).width()+"px"});



                }


                //Показываем достижение рабивки яйца

                if( left > $(element).width() / 2 ) {

                    if( !attainment ) {

                        attainment = true;
                        message( "Поздравляем!",  "Вы открыли новое достижение - 'Гроза Яиц'" );


                    }

                }

            }

            //Функция посредник, для передачи данных
            var move_separator = function(e) {

                go_position(e, false);

            }

            //Функция привязки событий
            var bind_move = function() {
                $(document).bind('mousemove touchmove', move_separator);
            }

            //Отвязываем события когда отпускаем левую кнопку мыши
            var unbind_move = function() {
                $(document).unbind('mousemove touchmove', move_separator);
            }

            //Mobile touch



            $($this.find(".compare_separator")).bind("mousedown touchstart", bind_move);
            $(document).bind("mouseup touchend", unbind_move);

            //При клике по блоку compare перемещаем на соответсвующую позицию
            $(element).bind("click", function(e) {
                go_position(e);
            });


            //Отцентровка
            if( start_pos === undefined ) var start_pos = $(element).width() / 2;
            else var start_pos = ( start_pos + 1 ) /100 * $(element).width();

            go_position(false, start_pos );

        })
    }
})( jQuery );
