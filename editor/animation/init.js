//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function riverCrossingCanvas(dom, data) {

            if (! data || ! data.ext) {
                return
            }

            const explanation = data.ext.explanation
            const input = data.in

            /*----------------------------------------------*
             *
             * attr
             *
             *----------------------------------------------*/
            const MARGIN_TOP = 0
            const MARGIN_BOTTOM = 40
            const RIVER_WIDTH = 290
            const UNIT_WIDTH = 40
            const LANDSCAPE_HEIGHT = 95 + MARGIN_TOP + MARGIN_BOTTOM

            const attr = {
                bank: {
                    'stroke-width': 1,
                    'fill': '#294270',
                    'stroke': '#294270',
                },
                boat: {
                    'fill': '#F0801A',
                    'stroke-width': 0,
                },
                step: {
                    'font-size': '12px',
                },
                number: {
                    load: {
                        'stroke-width': 0,
                        'fill': 'white',
                        'font-weight': 'bold',
                    },
                    boat: {
                        'stroke-width': 0,
                        'fill': '#294270',
                        'font-weight': 'bold',
                    }
                },
                wolf: {
                    'fill': '#294270',
                    'stroke': '#294270',
                    'stroke-linejoin': 'round',
                },
                goat: {
                    'fill': '#294270',
                    'stroke': '#294270',
                    'stroke-linejoin': 'round',
                },
                cabbage: {
                    'fill': '#294270',
                    'stroke': '#294270',
                    'stroke-width': 0,
                },
            }

            /*----------------------------------------------*
             *
             * paper
             *
             *----------------------------------------------*/
            let zoom
            let left_bank_num
            let right_bank_num
            let step_num
            let payload
            let p_width
            let p_height

            // Basics & Extra
            if (explanation) {
                zoom = .32
                left_bank_len = explanation[0][0].length
                right_bank_len = explanation[0][2].length
                step_num = explanation.length
                payload = explanation[0][1].length
                p_width = ((left_bank_len+right_bank_len)*UNIT_WIDTH + RIVER_WIDTH) * zoom
                p_height = LANDSCAPE_HEIGHT * step_num * zoom

            // Randoms
            } else {
                zoom = .6
                payload = input[3]
                p_width = (UNIT_WIDTH*3+40+2)*zoom
                p_height = 40
            }

            const paper = Raphael(dom, p_width, p_height, 0, 0)

            /*----------------------------------------------*
             *
             * draw steps (Basics & Extra)
             *
             *----------------------------------------------*/
            if (explanation) {
                // each landscape
                explanation.forEach((loads, step)=>{
                    landscape(step, ...loads)
                })
            } else {

            /*----------------------------------------------*
             *
             * draw boat (Randoms)
             *
             *----------------------------------------------*/
                draw_boat(0, 0, 3, payload)
                const [wolves, goats, cabbages] = input
                const num = [wolves, goats, cabbages].map(x=>x>0 ? 1 : 0).reduce((a, b)=>a+b)
                const offset_left = (3-num)*(UNIT_WIDTH/2)+20+1
                let j = 0
                const funcs = [draw_wolf, draw_goat, draw_cabbage]
                input.slice(0, 3).forEach((v, i)=>{
                    if (v > 0) {
                        funcs[i]((offset_left+UNIT_WIDTH*j)*zoom, 0, v)
                        j += 1
                    }
                })
            }

            /*----------------------------------------------*
             *
             * landscape
             *
             *----------------------------------------------*/
            function landscape(step, left_baggage, boat_contents, right_baggage) {

                const top = LANDSCAPE_HEIGHT * step * zoom

                // step
                if (step > 0) {
                    paper.text((9*zoom), top+MARGIN_TOP+(50*zoom), step).attr(attr.step)
                }

                // banks
                draw_bank(top+MARGIN_TOP+(35*zoom))

                // boat
                const BOAT_WIDTH = UNIT_WIDTH*payload+20
                const boat_start = (left_bank_len*40 + [0, RIVER_WIDTH-BOAT_WIDTH][step % 2]) * zoom
                draw_boat(boat_start, top+MARGIN_TOP+(35*zoom), payload)

                // baggage
                const funcs = {w: draw_wolf, g: draw_goat, c: draw_cabbage}
                function draw_baggage(items, left) {
                    items.split('').forEach((b, i)=>{
                        const bx = left + i*UNIT_WIDTH*zoom
                        const by = top+MARGIN_TOP+35*zoom
                        if (b != ' ') {
                            funcs[b](bx, by)
                        }
                    })
                }

                [[boat_contents, boat_start],
                 [left_baggage, 0],
                 [right_baggage, (UNIT_WIDTH*left_bank_len + RIVER_WIDTH)*zoom]].forEach(([items, os])=>{
                    draw_baggage(items, os)
                 })
            }

            /*----------------------------------------------*
             *
             * bank
             *
             *----------------------------------------------*/
            function draw_bank(y) {
                const z = zoom
                paper.rect(0, y+(50*z), (UNIT_WIDTH*left_bank_len-2)*z, 7*z, 5*z).attr(attr.bank)
                paper.rect((40*left_bank_len+RIVER_WIDTH+2)*z, y+(50*z), (40*right_bank_len-2)*z, 7*z, 5*z).attr(attr.bank)

                // river
                paper.path(['M', (UNIT_WIDTH*left_bank_len-4)*z, y+(50+6.7)*z, 'h', (RIVER_WIDTH+8)*z]).attr(attr.bank)
            }

            /*----------------------------------------------*
             *
             * boat
             *
             *----------------------------------------------*/
            function draw_boat(x, y, size, number) {
                const z = zoom * 1
                const extend = number ? 20 : 0
                const r = 10 + (number ? 1 : 0)
                paper.path([
                    'M', x, y+(50*z),
                    'h', (40*size+20+extend)*z,
                    'a', r*z, r*z, 45, 0, 1, -r*z, r*z,
                    'h', (-40*size-extend)*z,
                    'a', r*z, r*z, 45, 0, 1, -r*z, -r*z,
                    'z'
                ]).attr(attr.boat)

                // man
                paper.circle(x+(40*size+10+extend)*z, y+(11*z), 5*z).attr(attr.boat)
                paper.rect(x+(40*size+5+extend)*z, y+(18*z), 10*z, 34*z, 4*z).attr(attr.boat)

                // payload
                if (number) {
                    paper.text(x+((40*size+42)/2*z), y+((7+49)*z), number).attr(
                        attr.number.boat).attr({'font-size': z*20})
                }
            }

            /*----------------------------------------------*
             *
             * cabbage
             *
             *----------------------------------------------*/
            function draw_cabbage(x, y, number) {
                const z = zoom * 1
                paper.circle(x+(20*z), y+(30*z), 15*z).attr(attr.cabbage)
                if (number) {
                    paper.text(x+(19.5*z), y+(30*z), number).attr(
                        attr.number.load).attr({'font-size': z*14.5})
                }
            }

            /*----------------------------------------------*
             *
             * goat
             *
             *----------------------------------------------*/
            function draw_goat(x, y, number) {
                const z = zoom * 1.4
                attr.goat['stroke-width'] = z + 'px'
                paper.path([
                    'M', x+(17*z), y+(16*z),
                    'c', 0*z, -6.25*z,
                        10*z, -8.75*z,
                        10*z, -6.25*z,
                    'c', 0*z, -1.25*z,
                        -7.5*z, 0*z,
                        -7.5*z, 6.25*z,
                    'l', 0*z, 2*z,
                    'l', 5*z, 2.5*z,
                    'l', -5*z, 0*z,
                    'l', -1.25*z, 12.25*z,
                    'h', -7.5*z,
                    'l', -1.25*z, -12.25*z,
                    'l', -5*z, 0*z,
                    'l', 5*z, -2.5*z,
                    'l', 0*z, -2*z,
                    'c', 0*z, -6.25*z,
                        -7.5*z, -7.5*z,
                        -7.5*z, -6.25*z,
                    'c', 0*z, -2.5*z,
                        10*z, 0*z,
                        10*z, 6.25*z,
                    'z'
                ]).attr(attr.goat)
                if (number) {
                    paper.text(x+(14.5*z), y+(21*z), number).attr(
                        attr.number.load).attr({'font-size': z*10})
                }
            }

            /*----------------------------------------------*
             *
             * wolf
             *
             *----------------------------------------------*/
            function draw_wolf(x, y, number) {
                const z = zoom * 1
                attr.wolf['stroke-width'] = z*5 + 'px'
                paper.path(
                        ['M', x+(4*z) , y+(31*z),
                        'l', 16*z, -6*z,
                        'l', 0*z, -10*z,
                        'l', 2*z, 0*z,
                        'l', 8*z, 10*z,
                        'l', 6*z, 10*z,
                        'l', -10*z, 10*z,
                        'l', -4*z, -10*z,
                        'l', -12*z, 0*z,
                        'Z']).attr(attr.wolf)
                if (number) {
                    paper.text(x+(25*z), y+(30*z), number).attr(
                        attr.number.load).attr({'font-size': z*14})
                }
            }
        }

        var $tryit;
        var io = new extIO({
            multipleArguments: true,
            functions: {
                python: 'river_crossing',
                js: 'riverCrossing'
            },
            animation: function($expl, data){
                riverCrossingCanvas(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
