export class QueryReplay {

    static query(data) {
        $('#table-tbody').html('');
        $('.loading-word').html('正在搜索...');
        $('.search-loading').css('display', 'block');
        let url = 'commandManage/combatReplay/getHistoryCombatInfoList';
        return new Promise((resolve) => {
            $.ajax({
                url: url,
                type: 'POST',
                async: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                dataType: 'json'
            }).then((result) => {
                $('.search-loading').css('display', 'none');
                resolve(result);
            });
        });
    }

}