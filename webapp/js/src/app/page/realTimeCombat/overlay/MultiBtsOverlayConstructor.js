import { BaiduMapInit } from '../../../common/baiduMap/Init.BaiduMap.js';
import { BtsValue } from '../bts/BtsValue.js';

export class MultiBtsOverlayConstructor {

    constructor(point, data) {
        let type = data.type;
        if(type == 1) {
            //普通基站
            return this.drawNormalBts(point, data.mcc, data.mnc, data.mode, data.sid, data.nid, data.bid, data.lacTac, data.radius, data.cellId, data.btsId, data.hitTimes, data.dlHitTimes, data.credibility);
        }else if(type == 2) {
            //复合基站
            return this.drawMultiBts(point, data.mcc, data.mnc, data.mode, data.sid, data.nid, data.bid, data.lacTac, data.radius, data.cellId, data.btsId, data.hitTimes, data.dlHitTimes, data.child, data.credibility);
        }
    }
    /**
     * 绘制普通基站
     */
    drawNormalBts(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, credibility) {
         /* 自定义覆盖物的构造函数 */
         function BtsDivOverlay(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, credibility) {
            this._point = point;
            this._mcc = mcc;
            this._mnc = mnc;
            this._mode = mode;
            this._sid = sid;
            this._nid = nid;
            this._bid = bid;
            this._lacTac = lacTac;
            this._radius = radius;
            this._cellId = cellId;
            this._btsId = btsId;
            this._hitTimes = hitTimes;
            this._dlHitTimes = dlHitTimes;
            this._credibility = credibility;
        }
        /* 继承API的BMap.Overlay */
        BtsDivOverlay.prototype = new BMap.Overlay();
        /* 实现初始化方法 */
        BtsDivOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            let div = this._div = document.createElement('div');
            let btsCredibilityColor = "#666666";
            switch(this._credibility) {
                case 1:
                    //省厅准确基站表
                    btsCredibilityColor = "#36B21D";
                    break;
                case 2:
                    //enodeb表
                    btsCredibilityColor = "#FFD800";
                    break;
                case 3:
                    //手动上报的基站表
                    btsCredibilityColor = "#2588B4";
                    break;
                case 4:
                    //TA上报的基站表
                    btsCredibilityColor = "#648DA0";
                    break;
                case 5:
                    //计算后的基站表
                    btsCredibilityColor = "#CC25E0";
                    break;
                default:
                    break;    
            }
            div.style.position = 'absolute';
            div.style.zIndex = 5000;
            $(div).attr('class', `bts-click-unhit bts-click-${this._btsId}`);
            $(div).attr('data-open-status', 'close');
            div.style.display = 'inline-block';
            let btsImg = '';
            let btsHitStatus = '';
            let btsHitGray = '';
            let hitTimesValue = '';
            if (this._hitTimes == 0 || this._hitTimes == null) {
                btsImg = 'btsicon'; // 默认图片为蓝色
                btsHitStatus = 'bts-img-unhit';
                btsHitGray = 'gray-cover'
            } else {
                btsImg = 'btsiconhit'; // 命中后图片为红色
                hitTimesValue = this._hitTimes;
            }
            let dlHitTimesValue = '';
            if (this._dlHitTimes == 0 || this._dlHitTimes == null) {
            } else {
                btsImg = 'btsiconhit'; // 命中后图片为红色
                dlHitTimesValue = this._dlHitTimes;
            }
            div.innerHTML = `
                <!--基站图片-->
                <img class="bts-img bts-img-${this._btsId} ${btsHitStatus} ${btsHitGray}" data-bts-mode="${this._mode}" data-bts-id="${this._btsId}" src="img/btsicon/${btsImg}-${this._mode}.png">
                <div class="bts-hit-count bts-hit-count-${this._btsId}" data-bts-id="${this._btsId}">${(hitTimesValue == '' && dlHitTimesValue == "") ? "" : (hitTimesValue == "" ? 0 : hitTimesValue) + "/" + (dlHitTimesValue == "" ? 0 : dlHitTimesValue)}</div>
                <div class="bts-hit-count-shadow bts-hit-count-shadow-${this._btsId}"></div>
                <div class="bts-credibility" style="background:${btsCredibilityColor}"></div>
                <img class="bts-active-img bts-active-img-${this._btsId}" src="img/icon/activeImg.png">
                <!--选中框-->
                <div class="bts-selectedCircle bts-selectedCircle-${this._btsId}" style="display:none;"></div>
                <!--基站获取数值-->
                <div style="z-index:8000;" class="bts-value bts-value-${this._btsId}" style="display:none;">${BtsValue.btsTag(this._mode, this._mcc, this._mnc, this._lacTac, this._sid, this._nid, this._bid, this._cellId)}</div>
                <!--基站信息框-->
                <div style="z-index:8000;" class="bts-info-panel bts-info-panel-${this._btsId}" style="display:none;">
                    <div class="bts-info-panel-close bts-info-panel-close-${this._btsId}" data-bts-id="${this._btsId}">
                        <span class="glyphicon iconfont icon-close"></span>
                    </div>
                    <div class="bts-info-panel-decoration"></div>
                    <img class="bts-name-icon" src="img/${BtsValue.btsNameIcon(this._mnc)}.png">
                    <span class="bts-name">${BtsValue.btsName(this._mnc)}&nbsp;${this._mode.toUpperCase()}</span>
                    <span class="bts-identifier">基站标识：${BtsValue.btsTag(this._mode, this._mcc, this._mnc, this._lacTac, this._sid, this._nid, this._bid, this._cellId)}</span>
                    <span class="bts-range">覆盖范围：${this._radius}m</span>
                    <button class="myCosButton-inner show-range-button show-range-button-${this._btsId}" data-bts-id="${this._btsId}" data-open-status="close">显示半径</button>
                </div>
            `;
            /* 将div添加到覆盖物容器中 */
            map.getPanes().labelPane.appendChild(div);
            /* 保存div实例 */
            this._div = div;
            /* 需要将div元素作为方法的返回值 */
            return div;
        }
         /* 绘制覆盖物,实现绘制方法 */
         BtsDivOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new BtsDivOverlay(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, credibility);
    }
    /**
     * 绘制多基站
     * 复合基站图标则以子基站优先级顺序显示红(带特效)   红   粉红   黄   蓝   灰
     */
    drawMultiBts(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, childBts, credibility) {
        function BtsDivOverlay(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, childBts, credibility) {
            this._point = point;
            this._mcc = mcc;
            this._mnc = mnc;
            this._mode = mode;
            this._sid = sid;
            this._nid = nid;
            this._bid = bid;
            this._lacTac = lacTac;
            this._radius = radius;
            this._cellId = cellId;
            this._btsId = btsId;
            this._hitTimes = hitTimes;
            this._dlHitTimes = dlHitTimes;
            this._childBts = childBts;
            this._credibility = credibility;
        }
         /* 继承API的BMap.Overlay */
         BtsDivOverlay.prototype = new BMap.Overlay();
         /* 实现初始化方法 */
         BtsDivOverlay.prototype.initialize = function (map) {
             /* 保存map对象实例 */
             this._map = map;
             /* 创建div元素，作为自定义覆盖物的容器 */
             let div = this._div = document.createElement('div');
             div.style.position = 'absolute';
             div.style.zIndex = 5000;
             $(div).attr('class', `multi-bts-click-unhit multi-bts-click-${this._btsId}`);
             $(div).attr('data-open-status', 'close');
             div.style.display = 'inline-block';
             let maxCredibility = this._credibility;
             let maxHitTimes = this._hitTimes;
             let maxDlHitTimes = this._dlHitTimes;
             //生成子基站内置html
             let childBtsHTML = '';
             if(this._childBts.length > 0) {
                for(let i = 0; i < this._childBts.length; i++) {
                    let childBts = this._childBts[i];
                    let childBtsCredibilityColor = "#666666";
                    switch(childBts.credibility) {
                        case 1:
                            //省厅准确基站表
                            childBtsCredibilityColor = "#36B21D";
                            break;
                        case 2:
                            //enodeb表
                            childBtsCredibilityColor = "#FFD800";
                            break;
                        case 3:
                            //手动上报的基站表
                            childBtsCredibilityColor = "#2588B4";
                            break;
                        case 4:
                            //TA上报的基站表
                            childBtsCredibilityColor = "#648DA0";
                            break;
                        case 5:
                            //计算后的基站表
                            childBtsCredibilityColor = "#CC25E0";
                            break;
                        default:
                            break;    
                    }
                    if(maxCredibility > childBts.credibility) {
                        maxCredibility = childBts.credibility;
                    }
                    let childBtsImg = '';
                    let childBtsHitStatus = '';
                    let childBtsHitGray = '';
                    let childHitTimesValue = '';
                    if (childBts.hitTimes == 0 || childBts.hitTimes == null) {
                        childBtsImg = 'btsicon'; // 默认图片为蓝色
                        childBtsHitStatus = 'bts-img-unhit';
                        childBtsHitGray = 'gray-cover'
                    } else {
                        childBtsImg = 'btsiconhit'; // 命中后图片为红色
                        childHitTimesValue = childBts.hitTimes;
                        //以hitTimes最大值基站优先级最高
                        if(maxHitTimes < childBts.hitTimes) {
                            maxHitTimes = childBts.hitTimes;
                            maxDlHitTimes = childBts.dlHitTimes;
                        }
                    }
                    let childDlHitTimesValue = '';
                    if (childBts.dlHitTimes == 0 || childBts.dlHitTimes == null) {
                    } else {
                        childBtsImg = 'btsiconhit'; // 命中后图片为红色
                        childBtsHitStatus = '';
                        childBtsHitGray = '';
                        childDlHitTimesValue = childBts.dlHitTimes;
                    }
                    childBtsHTML += `
                    <div class="multi-sub-bts bts-click-unhit multi-sub-bts-click-${childBts.btsId}" data-open-status="close" style="display:block;left:6px;position:relative;top:8px;width:100px;height:100px">
                        <!--基站图片-->
                        <img class="multi-sub-bts-img bts-img-${childBts.btsId} ${childBtsHitStatus} ${childBtsHitGray}" source-color="${childBtsCredibilityColor}" data-bts-mode="${childBts.mode}" data-bts-id="${childBts.btsId}"  data-bts-repetition="${childBtsImg}" src="img/btsicon/${childBtsImg}-${childBts.mode}.png">
                        <div class="multi-sub-bts-hit-count multi-sub-bts-hit-count-${childBts.btsId}" data-bts-id="${childBts.btsId}">${(childHitTimesValue == '' && childDlHitTimesValue == "") ? "" : (childHitTimesValue == "" ? 0 : childHitTimesValue) + "/" + (childDlHitTimesValue == "" ? 0 : childDlHitTimesValue)}</div>
                        <div class="multi-sub-bts-hit-count-shadow multi-sub-bts-hit-count-shadow-${childBts.btsId}"></div>
                        <div class="multi-sub-bts-credibility" style="background:${childBtsCredibilityColor}"></div>
                        <img class="multi-sub-bts-active-img multi-sub-active-img-${childBts.btsId}" src="img/icon/activeImg.png">
                        <div class="multi-sub-bts-ci">${childBts.btsId.split("-")[3]}</div>
                        <div class="add-bts-hit-effection hot-id-${childBts.btsId}"></div>
                        <!--选中框-->
                        <div class="multi-sub-bts-selectedCircle multi-sub-bts-selectedCircle-${childBts.btsId}" style="display:none;"></div>
                        <!--基站获取数值-->
                        <div style="z-index:9000;" class="multi-sub-bts-value bts-value-${childBts.btsId}" style="display:none;">${BtsValue.btsTag(childBts.mode, childBts.mcc, childBts.mnc, childBts.lacTac, childBts.sid, childBts.nid, childBts.bid, childBts.cellId)}</div>
                        <!--基站信息框-->
                        <div style="z-index:9000;" class="multi-sub-bts-info-panel multi-sub-bts-info-panel-${childBts.btsId}" style="display:none;">
                            <div class="multi-sub-bts-info-panel-close multi-sub-bts-info-panel-close-${childBts.btsId}" data-bts-id="${childBts.btsId}">
                                <span class="glyphicon iconfont icon-close"></span>
                            </div>
                            <div class="bts-info-panel-decoration"></div>
                            <img class="bts-name-icon" src="img/${BtsValue.btsNameIcon(childBts.mnc)}.png">
                            <span class="bts-name">${BtsValue.btsName(childBts.mnc)}&nbsp;${childBts.mode.toUpperCase()}</span>
                            <span class="bts-identifier">基站标识：${BtsValue.btsTag(childBts.mode, childBts.mcc, childBts.mnc, childBts.lacTac,childBts.sid, childBts.nid, childBts.bid, childBts.cellId)}</span>
                            <span class="bts-range">覆盖范围：${childBts.radius}m</span>
                            <button class="myCosButton-inner show-range-button show-range-button-${childBts.btsId}" data-bts-id="${childBts.btsId}" data-open-status="close">显示半径</button>
                        </div>
                    </div>
                        `;
                }
             }
             let btsCredibilityColor = "#666666";
             switch(maxCredibility) {
                case 1:
                    //省厅准确基站表
                    btsCredibilityColor = "#36B21D";
                    break;
                case 2:
                    //enodeb表
                    btsCredibilityColor = "#FFD800";
                    break;
                case 3:
                    //手动上报的基站表
                    btsCredibilityColor = "#2588B4";
                    break;
                case 4:
                    //TA上报的基站表
                    btsCredibilityColor = "#648DA0";
                    break;
                case 5:
                    //计算后的基站表
                    btsCredibilityColor = "#CC25E0";
                    break;
                default:
                    break;    
            }
             let btsImg = '';
             let btsHitStatus = '';
             let btsHitGray = '';
             let hitTimesValue = '';
             if (maxHitTimes == 0 || maxHitTimes == null) {
                 btsImg = 'btsicon'; // 默认图片为蓝色
                 btsHitStatus = 'bts-img-unhit';
                 btsHitGray = 'gray-cover'
             } else {
                 btsImg = 'btsiconhit'; // 命中后图片为红色
                 hitTimesValue = maxHitTimes;
             }
             let dlHitTimesValue = '';
             if (maxDlHitTimes == 0 || maxDlHitTimes == null) {
             } else {
                 btsImg = 'btsiconhit'; // 命中后图片为红色
                 dlHitTimesValue = maxDlHitTimes;
             }
             div.innerHTML = `
                 <!--基站图片-->
                 <img class="multi-bts-img multi-bts-img-${this._btsId} ${btsHitStatus} ${btsHitGray}" data-bts-mode="${this._mode}" data-bts-id="${this._btsId}" src="img/multibtsicon/${btsImg}-${this._mode}.png">
                 <!--<img class="multi-bts-img multi-bts-img-${this._btsId} ${btsHitStatus} ${btsHitGray}" btsicontarget-sum="0"  btsicon-sum="0" source-color="${btsCredibilityColor}" style="z-index:6050;height: 42px;left: -29px;top: -38px;cursor: pointer;"  data-bts-mode="${this._mode}" data-bts-id="${this._btsId}" src="img/multibtsicon/${btsImg}-${this._mode}.png">-->
                 <div class="multi-bts-hit-count multi-bts-hit-count-${this._btsId}" data-bts-id="${this._btsId}"></div>
                 <div class="multi-bts-hit-count-shadow multi-bts-hit-count-shadow-${this._btsId}"></div>
                 <div class="multi-bts-credibility" style="background:${btsCredibilityColor}"></div>
                 <img class="multi-bts-active-img multi-bts-active-img-${this._btsId}" src="img/icon/activeImg.png">
                 <!--选中框-->
                 <div class="multi-bts-selectedCircle multi-bts-selectedCircle-${this._btsId}" style="display:none;"></div>
                 <!--基站获取数值-->
                 <div style="z-index:8000;" class="bts-value bts-value-${this._btsId}" style="display:none;">${BtsValue.btsTag(this._mode, this._mcc, this._mnc, this._lacTac, this._sid, this._nid, this._bid, this._cellId)}</div>
                 <!--基站信息框-->
                 <div style="z-index:8000;display:none;" class="multi-bts-info-panel multi-bts-info-panel-${this._btsId}"  data-open-status="close">
                    <div style="display: flex;background: #fff;position: absolute;left:-128px;top: -190px;  border-radius: 5px;box-shadow:0px 0px 20px 4px #ccc;height:140px;padding-right: 32px;padding-top:10px;z-index:6100">
                    <div class="multi-bts-info-panel-close multi-bts-info-panel-close-${this._btsId}" data-bts-id="${this._btsId}">
                        <span class="icon-close"></span>
                    </div>
                        ${childBtsHTML}
                    <div class="bts-info-panel-decoration" style="border-top:10px solid #fff;left:50%;top:100%"></div>
                 </div>   
                `;
                /** 
            div.innerHTML = `
                <!--基站图片-->
                <img class="bts-img bts-img-${this._btsId} ${btsHitStatus} ${btsHitGray}" data-bts-mode="${this._mode}" data-bts-id="${this._btsId}" src="img/btsicon/${btsImg}-${this._mode}.png">
                <div class="bts-hit-count bts-hit-count-${this._btsId}" data-bts-id="${this._btsId}">${(hitTimesValue == '' && dlHitTimesValue == "") ? "" : (hitTimesValue == "" ? 0 : hitTimesValue) + "/" + (dlHitTimesValue == "" ? 0 : dlHitTimesValue)}</div>
                <div class="bts-hit-count-shadow bts-hit-count-shadow-${this._btsId}"></div>
                <div class="bts-credibility" style="background:${btsCredibilityColor}"></div>
                <!--选中框-->
                <div class="bts-selectedCircle bts-selectedCircle-${this._btsId}" style="display:none;"></div>
                <!--基站获取数值-->
                <div style="z-index:8000;" class="bts-value bts-value-${this._btsId}" style="display:none;">${BtsValue.btsTag(this._mode, this._mcc, this._mnc, this._lacTac, this._sid, this._nid, this._bid, this._cellId)}</div>
                <!--基站信息框-->
                <div style="z-index:8000;" class="bts-info-panel bts-info-panel-${this._btsId}" style="display:none;">
                    <div class="bts-info-panel-close bts-info-panel-close-${this._btsId}" data-bts-id="${this._btsId}">
                        <span class="glyphicon iconfont icon-close"></span>
                    </div>
                    <div class="bts-info-panel-decoration"></div>
                    <img class="bts-name-icon" src="img/${BtsValue.btsNameIcon(this._mnc)}.png">
                    <span class="bts-name">${BtsValue.btsName(this._mnc)}&nbsp;${this._mode.toUpperCase()}</span>
                    <span class="bts-identifier">基站标识：${BtsValue.btsTag(this._mode, this._mcc, this._mnc, this._lacTac, this._sid, this._nid, this._bid, this._cellId)}</span>
                    <span class="bts-range">覆盖范围：${this._radius}m</span>
                    <button class="myCosButton-inner show-range-button show-range-button-${this._btsId}" data-bts-id="${this._btsId}" data-open-status="close">显示半径</button>
                </div>
            `;*/
             /* 将div添加到覆盖物容器中 */
             map.getPanes().labelPane.appendChild(div);
             /* 保存div实例 */
             this._div = div;
             /* 需要将div元素作为方法的返回值 */
             return div;
         }
          /* 绘制覆盖物,实现绘制方法 */
          BtsDivOverlay.prototype.draw = function () {
             /* 根据地理坐标转换为像素坐标，并设置给容器 */
             let position = this._map.pointToOverlayPixel(this._point);
             this._div.style.left = position.x + 'px';
             this._div.style.top = position.y + 'px';
         }
         return new BtsDivOverlay(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, childBts, credibility);        
    }
}