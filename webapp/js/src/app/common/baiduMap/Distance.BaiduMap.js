let myDis;

export class BaiduMapDistance {

    static initDistanceTools(map) {

        /* 初始化测距工具*/
        myDis = new BMapLib.DistanceTool(map);
        /* 按钮点击事件*/
        $('#distance-measurement').click(function () {
            if ($(this).attr('data-is-open') == 1) {
                // 关闭测距工具
                myDis.close();
                /**add by gaochao start */
                // $(this).addClass('gray-cover');
                $(this).css('background','url(img/icon/rule.png)');
                /**add by gaochao end */
                $(this).attr('data-is-open', '0');
                $('#drawing-remove').removeClass('gray-cover');
            } else {
                // 开启测距工具
                myDis.open();
                /**add by gaochao start */
                // $(this).removeClass('gray-cover');
                $(this).css('background','url(img/icon/rule_active.png)');
                /**add by gaochao end */
                $(this).attr('data-is-open', '1');
                $('#drawing-remove').addClass('gray-cover');
            }
        });
        /* 监听事件*/
        myDis.addEventListener("drawend", function (e) {
            /**add by gaochao start */
            // $('#distance-measurement').addClass('gray-cover');
            $('#distance-measurement').css('background','url(img/icon/rule.png)');
            /**add by gaochao end */
            $('#distance-measurement').attr('data-is-open', '0');
            $('#drawing-remove').removeClass('gray-cover');
        });
        /*
        myDis.addEventListener("addpoint", function (e) {
            console.log("addpoint");
        });
        myDis.addEventListener("removepolyline", function (e) {
            console.log("removepolyline");
            console.log(e);        
        });*/

    }

    static getDistanceToolInstance() {
        return myDis;
    }

}