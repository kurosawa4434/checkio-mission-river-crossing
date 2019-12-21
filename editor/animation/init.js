//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        var $tryit;
        var io = new extIO({
            multipleArguments: true,
            functions: {
                python: 'river_crossing',
                js: 'riverCrossing'
            },
            /*
            animation: function($expl, data){
                riverCrossingCanvas(
                    $expl[0],
                    data,
                );
            }
            */
        });
        io.start();
    }
);
