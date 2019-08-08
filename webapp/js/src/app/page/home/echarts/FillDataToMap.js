import { Query } from '../ajax/Query.js';
import { CaseStatisticsEcharts } from './CaseStatisticsEcharts.js';
import { CaseDistributionEcharts } from './CaseDistributionEcharts.js';
export class FillDataToMap {
    static parsingData() {
        function transform(val){
            if(val == null){
                return val
            }else{
                let value = val.toString();
                if(value.indexOf("-")!=-1){
                    return val
                }else{
                    return (val).Format("yyyy-MM-dd hh:mm:ss");
                }
            }
            
        }
        if(queryGrade != 0) {
            let queryParam = {"areaCode" :  queryAreaCode, "grade" : queryGrade, "startTime" : transform(queryStartTime), "endTime" : transform(queryEndTime)};
            getCaseStatistics(queryParam, queryAreaName, queryCaseStatisticsType);
        }else {
            let queryParam = {"startTime" : transform(queryStartTime), "endTime" : transform(queryEndTime)};
            getCaseStatistics(queryParam, "", queryCaseStatisticsType);
        }
        function getCaseStatistics(data, clickedAreaName, caseStatisticsType) {
            $('.new-map-echarts-mask').css('display', 'block');
            $('.case-distribution-echarts').css('visibility','hidden');
            Query.query(data, 'home/getCombatInfoStatistics', 'POST').then((result) => {
                $('.new-map-echarts-mask').css('display', 'none');
                $('.case-distribution-echarts').css('visibility','visible');
                console.log(result);
                let grade = 0;
                if(data.grade) {
                    grade = data.grade;
                }
                $('#case-history-statistics-value').html(result.dataMap.totalCombatInfoNum.totalNum); // 历史办案数量
                CaseDistributionEcharts.parsingData(result.dataMap.areaCombatInfoStatistics, result.dataMap.areaCodesInfo, data.startTime, data.endTime, caseStatisticsType, grade, clickedAreaName); // 地图显示
                CaseStatisticsEcharts.parsingData(caseStatisticsType, result.dataMap.monthCombatInfoStatistics); // 折线图统计
            });
        }
    }

}