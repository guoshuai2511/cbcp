export class RankTable {

    static drawTable(data) {
        let htmlValue = `
            <!--
            <tr>
                <td class="rank-list-rowno">排名</td>
                <td class="rank-list-name">账号</td>
                <td>作战次数</td>
                <td>评分</td>
                <td>排名变化</td>
            </tr>
            -->
        `;
        for (let i = 0; i < data.length; i++) {
            function getRaneChange(last, current) {
                if (last > current) {
                    return `<div class="rand-rise-icon">&nbsp;&nbsp;&nbsp;${last - current}</div>`;
                } else if (last < current) {
                    return `<div class="rand-drop-icon">&nbsp;&nbsp;&nbsp;${current - last}</div>`;
                } else {
                    return `<div class="rand-flat-icon"></div>`;
                }
            }
            htmlValue = htmlValue + `
                <tr>
                    <td>${data[i].rowno}</td>
                    <td style="overflow:hidden;text-overflow: ellipsis;padding-left:2px;padding-right:11px;" title='${data[i].userName}'>${data[i].userName}</td>
                    <td>${data[i].combatCount}</td>
                    <td>${data[i].totalScore}</td>
                    <td>${getRaneChange(data[i].lastRowno, data[i].rowno)}</td>
                </tr>
            `;
        }
        $('#table-tbody').html(htmlValue);
        /*add by guoshuai start 2018-9-27*/
        if($('.rank-list-table tr:eq(1) td:eq(0)').text()==1){
            //$('#rlc-pic3').css({'display':'block'});
            $('.rank-list-table tr:eq(1) td:eq(1)').css({'background':'url(".../../img/iconpic/first.png") 96% 2px no-repeat','padding-right':'11px;'});
        }
        if($('.rank-list-table tr:eq(2) td:eq(0)').text()==2){
            //$('#rlc-pic4').css({'display':'block'});
            $('.rank-list-table tr:eq(2) td:eq(1)').css({'background':'url(".../../img/iconpic/second.png") 96% 2px no-repeat','padding-right':'11px;'});
        }
        if($('.rank-list-table tr:eq(3) td:eq(0)').text()==3){
            //$('#rlc-pic5').css({'display':'block'});
            $('.rank-list-table tr:eq(3) td:eq(1)').css({'background':'url(".../../img/iconpic/third.png") 96% 2px no-repeat','padding-right':'11px;'});
        }
        /*add by guoshuai start 2018-9-27*/
    }

}