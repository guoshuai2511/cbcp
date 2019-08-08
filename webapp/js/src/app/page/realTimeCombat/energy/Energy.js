import { EnergySound } from '../sound/EnergySound.js';

export class Energy {

    /* 是否显示能量*/
    static getEnergyDisplay(hit) {
        if (hit) {
            return 'block';
        } else {
            return 'none';
        }
    }

    /* 能量最大值*/
    static getEnergyMaxValue(energy) {
        let maxVal = Number(energy[0]);
        let maxIndex = 0;
        /* 找到数组中的最大值 */
        for (let i = 0; i < 4; i++) {
            if (maxVal < Number(energy[i])) {
                maxVal = Number(energy[i]);
                maxIndex = i;
            }
        }
        let eng = Number(energy[maxIndex]);
        return eng;
    }

    /* 能量图标*/
    static getEnergyImg(energy) {
        let maxVal = Number(energy[0]);
        let maxIndex = 0;
        /* 找到数组中的最大值 */
        for (let i = 0; i < 4; i++) {
            if (maxVal < Number(energy[i])) {
                maxVal = Number(energy[i]);
                maxIndex = i;
            }
        }
        let eng = Number(energy[maxIndex]);
        let src = '';
        if (eng >= 0 && eng <= 49) {
            src = 'carE-level-1.png';
        } else if (eng >= 50 && eng < 100) {
            src = 'carE-level-2.png';
        } else if (eng >= 100 && eng < 150) {
            src = 'carE-level-3.png';
        } else if (eng >= 150 && eng < 200) {
            src = 'carE-level-4.png';
        } else if (eng >= 200 && eng <= 255) {
            src = 'carE-level-5.png';
        }
        return src;
    }
/**add by gaochao start */
    /* 方块能量图标*/
    static getEnergyBlockImg(energy) {
        let maxVal = Number(energy[0]);
        let maxIndex = 0;
        /* 找到数组中的最大值 */
        for (let i = 0; i < 4; i++) {
            if (maxVal < Number(energy[i])) {
                maxVal = Number(energy[i]);
                maxIndex = i;
            }
        }
        let eng = Number(energy[maxIndex]);
        let src = '';
        if (eng >= 0 && eng <= 49) {
            src = 'car-level-1.png';
        } else if (eng >= 50 && eng < 100) {
            src = 'car-level-2.png';
        } else if (eng >= 100 && eng < 150) {
            src = 'car-level-3.png';
        } else if (eng >= 150 && eng < 200) {
            src = 'car-level-4.png';
        } else if (eng >= 200 && eng <= 255) {
            src = 'car-level-5.png';
        }
        return src;
    }
/**add by gaochao end*/
    /* 能量颜色*/
    static getEnergyColor(eng, isHit) {
        let color = '';
        if (isHit) {
            if (eng >= 0 && eng <= 49) {
                color = 'rgb(255, 203, 203)';
            } else if (eng >= 50 && eng <= 99) {
                color = 'rgb(255, 176, 176)';
            } else if (eng >= 100 && eng <= 149) {
                color = 'rgb(255, 127, 127)';
            } else if (eng >= 150 && eng <= 199) {
                color = 'rgb(255, 86, 86)';
            } else if (eng >= 200 && eng <= 255) {
                color = 'rgb(255, 0, 0)';
            }
        } else {
            color = 'rgb(130, 130, 130)';
        }
        return color;
    }

    /* 能量指示角度*/
    static getEnergyOrientation(energy, northAng) {
        /**add by gaochao start */
        function outputMaxPrice(array) {
           let item1 = Math.max.apply(Math, array);
           let item2 = Math.min.apply(Math, array);
           return item1 - item2;
		}
        /**add by gaochao end*/
        let maxVal = Number(energy[0]);
        let maxIndex = 0;
        /* 找到数组中的最大值 */
        for (let i = 0; i < 4; i++) {
            if (maxVal < Number(energy[i])) {
                maxVal = Number(energy[i]);
                maxIndex = i;
            }
        }
        /* 确定最大值的个数*/
        let maxEngArr = [];
        for (let i = 0; i < 4; i++) {
            if (maxVal == Number(energy[i])) {
                maxEngArr.push(i);
            }
        }
        let deg = 0;
        let engSoundDeg = 0;
        switch (maxEngArr.length) {
            case 1:
                /* 一个最大值*/
                deg = Number(northAng) + 90 * maxIndex;
                engSoundDeg = 90 * maxIndex;;
                break;
            case 2:
                /* 两个最大值*/
                if (maxEngArr[0] == 0 && maxEngArr[1] == 3) {
                    deg = Number(northAng) + 90 * 3.5;
                    engSoundDeg = 90 * 3.5;
                } else if (maxEngArr[0] == 0 && maxEngArr[1] == 2) {
                    deg = Number(northAng) + 90 * 0;
                    engSoundDeg = 90 * 0;
                } else if (maxEngArr[0] == 1 && maxEngArr[1] == 3) {
                    deg = Number(northAng) + 90 * 3;
                    engSoundDeg = 90 * 3;
                } else {
                    deg = Number(northAng) + 90 * (maxEngArr[1] - 0.5);
                    engSoundDeg = 90 * (maxEngArr[1] - 0.5);
                }
                break;
            case 3:
                /* 三个最大值*/
                if (maxEngArr[0] == 0 && maxEngArr[2] == 3) {
                    deg = Number(northAng);
                    engSoundDeg = 0;
                } else if (maxEngArr[0] == 0 && maxEngArr[1] == 2) {
                    deg = Number(northAng) + 90 * 3;
                    engSoundDeg = 90 * 3;
                } else {
                    deg = Number(northAng) + 90 * (maxEngArr[1] - 0.5);
                    engSoundDeg = 90 * (maxEngArr[1] - 0.5);
                }
                break;
            case 4:
                /* 四个最大值*/
                deg = Number(northAng);
                break;
            default:
                break;
        }
        /**add by gaochao start */
        if(outputMaxPrice(energy) <= 10){
            deg = 1000;
        }
        /**add by gaochao end*/
        /* 语音播报
        if (thisPageType == 'RTC' && soundPlay) {
            for (let i = 0; i < audioPlayerCache.length; i++) {
                if (audioPlayerCache[i].devCode == devCode && audioPlayerCache[i].isPlay) {
                    if (!audioPlayerStatus) {
                        audioPlayerStatus = true;
                        if (maxEngArr == 4) {
                            EnergySound.playSingleAudio(maxVal);
                        } else {
                            EnergySound.playCarAudio(engSoundDeg, maxVal);
                        }
                    }
                }
            }
        }*/
        return deg;
    }

}