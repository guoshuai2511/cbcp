export class cRAndRTCommon {

    static commonFunction() {
        //点击出现远程指挥下拉选项菜单
        $(document).on('click', '.selecte-button', function(){
            let dr = $(this).attr('data-dr');
            $('.rc_message-type-ul-' + dr).toggle();
        })

        //触发界面的相关项选择
        $(document).on('click', '.rc_selector_message_type', function(){
            $('.rc_message_type').html($(this).html());
            $('.rc_message_type').attr('data-message', $(this).attr('data-message'));
            $('.rc_message-type-ul-1').css('display','none');
        })
        $(document).on('click', '.rc_selector_decode_type', function(){
            $('.rc_decode_type').html($(this).html());
            $('.rc_decode_type').attr('data-decode', $(this).attr('data-decode'));
            $('.rc_message-type-ul-2').css('display','none');
        })
        $(document).on('click', '.rc_selector_switch_type', function(){
            $('.rc_switch_type').html($(this).html());
            $('.rc_switch_type').attr('data-switch', $(this).attr('data-switch'));
            $('.rc_message-type-ul-3').css('display','none');
        })

        //远程指挥内容切换
        $(document).on('click','.click_div',function(){
            let sw = $(this).attr('data-switch');
            $('.remote-command-main-' + sw).css('display','block');
            $('.remote-command-main-' + sw).siblings(".remote-command-main").css('display','none');
            $(this).addClass('click_active');
            $(this).siblings().removeClass('click_active');
        })

        /*远程指挥弹框*/
        $(document).on("mousedown", ".remote-command-containers-header_title", function () {
            let isMove = true;
            let abs_x = event.pageX - $(`.remote-command-containers`).offset().left;
            let abs_y = event.pageY - $(`.remote-command-containers`).offset().top;
            $(document).mousemove(function (event) {
                if (isMove) {
                    let obj = $(`.remote-command-containers`);
                    let left_x = event.pageX - abs_x;
                    let top_y = event.pageY - abs_y;
                    obj.css({
                        'left': left_x,
                        'top': top_y
                    });
                    if (obj.offset().left < 0) {
                        obj.css({
                            'left': 0,
                        });
                    }
                    if (obj.offset().left > (window.innerWidth - 320)) {
                        obj.css({
                            'left': window.innerWidth - 320,
                        });
                    }
                    if (obj.offset().top < 50) {
                        obj.css({
                            'top': 50,
                        });
                    }
                    if (obj.offset().top > (window.innerHeight - 240)) {
                        obj.css({
                            'top': window.innerHeight - 240,
                        });
                    }
                }
            }).mouseup(function () {
                isMove = false;
            });
        });

        /**打开/关闭被远程指挥的列表 */
        $(document).on('click', '#judge-command', function () {
            $('.dev_lsit').toggle();
        });

        /** 点击打开/关闭远程指挥按钮 */
        $(document).on('click', '.dev_name', function () {
            let disCode = $(this).attr('data-dev');
            let userName = $(this).attr('data-name');
            let dis = $('.remote-command-containers').attr('data-dis');
            if(disCode != dis){
                $('.remote-command-containers').css('display','block');
                $('.remote-command-containers').attr('data-dis',disCode);
            }else{
                $('.remote-command-containers').css('display','none');
                $('.remote-command-containers').attr('data-dis',0);
            }
            $('.rc_footer_disCode').html(`
                ${disCode}&nbsp;&nbsp;&nbsp;&nbsp;(${userName})
            `);
            $(this).css('color','#17C1F4');
            $(this).siblings().css('color','#fff');
            $('.remote-command-containers-content').css('display','none');
        });

        /** */
        $(document).on('click', '#cr_reject', function () {
            $('.remote-command-containers-content').css('display','block');
        });
        
        /**关闭远程指挥模态框 */
        $(document).on('click', '.remote-command-containers-header_close', function () {
            $('.remote-command-containers').toggle();
        });

         //通道下拉菜单
         $(document).on('click', '.channel_dr_button', function(){
            let dr = $(this).attr('data-index');
            $('.channel_rc_freq_dr-' + dr).toggle();
        })

        //主动式界面的相关项选择
        $(document).on('click', '.channel_freq_active_se', function(event){
            let index = $(this).parents('.channel_dr_button').attr('data-index');
            $('.channel_freq_active-' + index).html($(this).html());
            $('.channel_rc_freq_dr-' + index).css('display','none');
            event.stopPropagation(); 
        })
        $(document).on('click', '.channel_pci_active_se', function(event){
            let index = $(this).parents('.channel_dr_button').attr('data-index');
            $('.channel_pci_active-' + index).html($(this).html());
            $('.channel_rc_freq_dr-' + index).css('display','none');
            event.stopPropagation(); 
        })
        $(document).on('click', '.channel_rf_active_se', function(event){
            let index = $(this).parents('.channel_dr_button').attr('data-index');
            $('.channel_rf_active-' + index).html($(this).html());
            $('.channel_rc_freq_dr-' + index).css('display','none');
            event.stopPropagation(); 
        })
        //主基站选择
        $(document).on('click','.select-host-block',function(){
            let status = $(this).attr('data-status');
            if(status == 0){
                $(this).addClass('select-host-block-active');
                $(this).attr('data-status',1);
            }else{
                $(this).removeClass('select-host-block-active');
                $(this).attr('data-status',0);
            }
        })
    }
}
