export class DrawTable {

    static blackBoxLogTable(result) {
        console.log(result);
        $('#table-tbody').html(`
            <tr class="tbody-th">
                <td class="caseName">案件名称</td>
                <td class="workTarget">工作对象</td>
                <td class="phone">电信标识码</td>
                <td class="imsi">IMSI码</td>
                <td class="imei">IMEI码</td>
                <td class="devCode">设备名称</td>
                <td class="applicantAccount">办案人账号</td>
                <td class="applicantName">办案人</td>
                <td class="applicantDeptName">所属机构</td>
                <td class="applicantTime">办案时间</td>     
                <td class="remaker">备注</td>
            </tr>
        `);
        let htmlValue = ``;
        /* 防止出现null*/
        function removeNull(tmp) {
            if (tmp && typeof(tmp) != "undefined") {
                return tmp;
            } else {
                return '';
            }
        }
        for (let i = 0; i < result.length; i++) {
            
            htmlValue = htmlValue + `
                <tr class="tbody-tr">
                    <td title="${result[i].caseName}">
                    	<div class="realCL-caseName">
                    		${result[i].caseName}
                    	</div>
                    </td>
                    <td title="${result[i].workTarget}">
                    	<div class="realCL-workTarget">
                    		 ${result[i].workTarget}
                    	</div>
                   </td>
                    <td title="${removeNull(result[i].phone)}">
	                    <div class="realCL-phone">
                            ${removeNull(result[i].phone)}
	                    </div>
	                </td>
                    <td title="${removeNull(result[i].imsi)}">
                    	<div class="realCL-imsi">
	                    	${removeNull(result[i].imsi)}
	                    </div>
                    </td>
                    <td title="${removeNull(result[i].imei)}">
            			<div class="realCL-imei">
                    		${removeNull(result[i].imei)}
            			</div>
                    </td>
                    <td title="${result[i].devCode}">
                    	<div class="realCL-devCode">
                    		${result[i].devCode}
                    	</div>
                    </td>
                    <td title="${removeNull(result[i].applicantName)}">
                    	<div class="realCL-realName">
                    		 ${removeNull(result[i].applicantName)}
                    	</div>
                    </td>
                    <td title="${removeNull(result[i].applicantRealName)}">
                    	<div class="realCL-realName">
                    		 ${removeNull(result[i].applicantRealName)}
                    	</div>
                    </td>
                    <td title="${removeNull(result[i].applicantDeptName)}">
                    	<div class="realCL-deptName">
                    		 ${removeNull(result[i].applicantDeptName)}
                    	</div>
                    </td>
                    <td title="${removeNull(result[i].applyTime)}">
	                    <div class="realCL-time">
	                    	${removeNull(result[i].applyTime)}
	                    </div>
                    </td>
                    <td title="${removeNull(result[i].remark)}">
                    	<div class="realCL-remark">
                    		${removeNull(result[i].remark)}
                    	</div>
                    </td>
                </tr>
            `;
            
        }
        $('#table-tbody').append(htmlValue);

        $('.realCL-imsi').width($(window).width()*0.06);
        $('.realCL-imei').width($(window).width()*0.06);
        $(window).resize(function () {
            $('.realCL-imsi').width($(window).width()*0.06);
            $('.realCL-imei').width($(window).width()*0.06);
        })
    }

}