export class DevUsingrateEcharts {

    static parsingData(data) {
        function sortMap(mapData) {
            let mapKeyTemp = [];
            for (let key of mapData.keys()) {
                mapKeyTemp.push(key);
            }
            for (var i = 0; i < mapKeyTemp.length - 1; i++) {
                for (var j = i + 1; j < mapKeyTemp.length; j++) {
                    if (mapKeyTemp[i] > mapKeyTemp[j]) {
                        var temp = mapKeyTemp[i];
                        mapKeyTemp[i] = mapKeyTemp[j];
                        mapKeyTemp[j] = temp;
                    }
                }
            }
            let sortedMap = new Map();
            for (let i = 0; i < mapKeyTemp.length; i++) {
                sortedMap.set(mapKeyTemp[i], mapData.get(mapKeyTemp[i]));
            }
            return sortedMap;
        }

        let minValue = 1;
        let maxValue = 1;
        let valueNumMap = new Map();
        for (let i = 0; i < data.length; i++) {
            /* delete by guoshuai  start 2018-9-27
            let timeHour = parseInt(data[i].timeLength / 3600);
            if (timeHour == 0) {
                timeHour = 1;
            }
            */
            let timeHour;
            let time = data[i].timeLength;
            if(time <= 1800 ){
                timeHour = 0.5;
            }
            if(1800 <time && time<= 3600 ){
                timeHour = 1;
            }
            if(3600 < time && time <= 5400 ){
                timeHour = 1.5;
            }
            if(5400 < time && time <= 7200 ){
                timeHour = 2;
            }
            if(7200 <time ){
                timeHour = 2.5;
            }
            if (minValue > timeHour) {
                minValue = timeHour
            }
            if (timeHour > maxValue) {
                maxValue = timeHour;
            }
            /** */
            if (valueNumMap.get(timeHour) == null) {
                valueNumMap.set(timeHour, { time: timeHour, count: 1 });
            } else {
                let countTemp = valueNumMap.get(timeHour).count;
                countTemp = countTemp + 1;
                valueNumMap.set(timeHour, { time: timeHour, count: countTemp });
            }
            /* delete by guoshuai  end 2018-9-27*/
            /*add by guoshuai start 2018-9-27
            if (valueNumMap.get(timeHour) == null) {
                valueNumMap.set(timeHour, { time: timeHour, count: 1 });
            } 
            if( valueNumMap.get(timeHour)<=0.5){
                let countTemp = valueNumMap.get(timeHour).count;
                countTemp = countTemp + 1;
                valueNumMap.set(timeHour, { time: timeHour, count: countTemp });
            } 
            if(0.5< valueNumMap.get(timeHour)<=1){
                let countTemp = valueNumMap.get(timeHour).count;
                countTemp = countTemp + 1;
                valueNumMap.set(timeHour, { time: timeHour, count: countTemp });
            } 
            if(1< valueNumMap.get(timeHour)<=1.5){
                let countTemp = valueNumMap.get(timeHour).count;
                countTemp = countTemp + 1;
                valueNumMap.set(timeHour, { time: timeHour, count: countTemp });
            }
            if(1.5< valueNumMap.get(timeHour)<=2){
                let countTemp = valueNumMap.get(timeHour).count;
                countTemp = countTemp + 1;
                valueNumMap.set(timeHour, { time: timeHour, count: countTemp });
            }
            if( valueNumMap.get(timeHour)>2){
                let countTemp = valueNumMap.get(timeHour).count;
                countTemp = countTemp + 1;
                valueNumMap.set(timeHour, { time: timeHour, count: countTemp });
            }
           /*add by guoshuai end 2018-9-27*/
            data[i].timeLength = timeHour;
        }
        valueNumMap = sortMap(valueNumMap);
        console.log(valueNumMap);
        let echartsData = [];
        // valueNumMap.forEach((each) => {
        //     echartsData.push({ value: each.count, name: each.time + '小时' });
        // });
        if (valueNumMap.size <= 6) {
            /*delete by guoshuai start 2018-9-28*/
            valueNumMap.forEach((each) => {
                //echartsData.push({ value: each.count, name: each.time + '小时' });
                /*delete by guoshuai end 2018-9-28*/
                if( each.time == 0.5){
                    echartsData.push({ value:  each.count, name:  '< 0.5小时' });
                }
                if( each.time == 1){
                    echartsData.push({ value:  each.count, name:  '0.5~1小时' });
                }
                if( each.time == 1.5){
                    echartsData.push({ value:  each.count, name:  '1~1.5小时' });
                }
                if( each.time == 2){
                    echartsData.push({ value:  each.count, name:  '1.5~2小时' });
                }
                if( each.time == 2.5){
                    echartsData.push({ value:  each.count, name:  '>2小时' });
                }
            }); 
        } else {
            let mapArr = [];
            for (let [key, value] of valueNumMap) {
                mapArr.push({ key: key, value: value });
            }
            let tempLast;
            let tempCount = 0;
            for (let i = 0; i < mapArr.length; i++) {
                /* delete by guoshuai  start 2018-9-27
                if (tempLast == null) {
                    echartsData.push({ value: mapArr[i].value.count, name: mapArr[i].value.time + '小时' });
                    tempLast = mapArr[i];
                } else {
                    if (Math.abs(tempLast.key - mapArr[i].key) <= 2 && Math.abs(tempLast.value.time - mapArr[i].value.time) <= 3) {
                        echartsData.push({ value: tempLast.value.count + mapArr[i].value.time, name: tempLast.value.time + '~' + mapArr[i].value.time + '小时' });
                        tempLast = mapArr[i];
                    } else {
                        echartsData.push({ value: mapArr[i].value.count, name: mapArr[i].value.time + '小时' });
                        tempLast = null;
                    }
                }
                /* delete by guoshuai  end 2018-9-27*/
                /*add by guoshuai start 2018-9-27*/
                if( mapArr[i].value.time == 0.5){
                    echartsData.push({ value:  mapArr[i].value.count, name:  '< 0.5小时' });
                }
                if( mapArr[i].value.time == 1){
                    echartsData.push({ value:  mapArr[i].value.count, name:  '0.5~1小时' });
                }
                if( mapArr[i].value.time == 1.5){
                    echartsData.push({ value:  mapArr[i].value.count, name:  '1~1.5小时' });
                }
                if( mapArr[i].value.time == 2){
                    echartsData.push({ value:  mapArr[i].value.count, name:  '1.5~2小时' });
                }
                if( mapArr[i].value.time == 2.5){
                    echartsData.push({ value:  mapArr[i].value.count, name:  '>2小时' });
                }
                 /*add by guoshuai end 2018-9-27*/
            }
        }
        DevUsingrateEcharts.draw(echartsData);
    }

    static draw(data) {
        console.log(data);
        let devUsingrateEchartsDom = document.getElementById('dev-usingrate-echarts-dom');
        let devUsingrateChart = echarts.init(devUsingrateEchartsDom, 'cbcp-theme');
        if (data.length == 0) {
            devUsingrateChart.dispose();
            $('#dev-usingrate-echarts-dom').html(`<div class="dev-usingrate-no-data">暂无数据</div>`);
        } else {
            let devUsingrateEchartsOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                /*add by guoshuai start 2018-9-27*/
                legend:{
                    y:'85%',
                    itemWidth: 18,
                    itemHeight: 18,
                    borderRadius:4
                },
                /*add by guoshuai end 2018-9-27*/
                series: [
                    {
                        name: '设备工作时长',
                        type: 'pie',
                        /*delete by guoshuai start 2018-9-27
                        radius: '65%',
                        center: ['50%', '50%'],
                        delete by guoshuai end 2018-9-27*/
                        /*add by guoshuai start 2018-9-27*/
                        center: ['48%', '43%'],
                        /*add by guoshuai end 2018-9-27*/
                        data: data,
                        // [
                        //     { value: 2, name: '1~2小时' },
                        //     { value: 6, name: '2~3小时' },
                        //     { value: 5, name: '3~4小时' },
                        //     { value: 7, name: '4~5小时' },
                        //     { value: 7, name: '5~6小时' },
                        //     { value: 5, name: '6小时以上' }
                        // ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        /*add by guoshuai start 2018-9-27*/
                        color:[
                            '#4572ff',
                            '#ea4ba8',
                            '#6901d2',
                            '#fff',
                            '#02eee2'
                        ]
                        /*add by guoshuai end 2018-9-27*/
                    }
                ]
            };
            devUsingrateChart.setOption(devUsingrateEchartsOption);
            devUsingrateChart.resize();
            window.addEventListener('resize', function () {
                devUsingrateChart.resize();
            });
        }

    }

}