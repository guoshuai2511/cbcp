export class EnergySound {

    static playCarAudio(num, deg, value, hasA) {
        let orientation;
        switch (deg) {
            case 0:
                orientation = 'front';
                break;
            case 90:
                orientation = 'right';
                break;
            case 180:
                orientation = 'back';
                break;
            case 270:
                orientation = 'left';
                break;
            case 45:
                orientation = 'front_right';
                break;
            case 135:
                orientation = 'right_back';
                break;
            case 225:
                orientation = 'back_left';
                break;
            case 315:
                orientation = 'left_front';
                break;
            /**add by gaochao start */
            case 1000:
                orientation = 'none';
            break;
            /**add by gaochao end*/
            default:
                break;
        }
        let audio = document.getElementById('engAudioPlay');
        if (value == 1) {
            // 车载四向能量为1
            switch (engAudioType) {
                case 1: // 单选
                    audio.src = 'sound/car/' + value + '.wav';
                    audio.play();
                    audio.addEventListener('ended', playEnd, false);
                    break;
                case 2: // 优选
                    audio.src = 'sound/car/car.wav'; // 车载
                    audio.play();
                    if (hasA) {
                        audio.addEventListener('ended', playIndex, false); // A
                    } else {
                        audio.addEventListener('ended', playValue, false); // 1
                    }
                    break;
                default:
                    break;
            }
        } else {
            switch (engAudioType) {
                case 1: // 单选
                    audio.src = 'sound/car/' + orientation + '.wav';
                    audio.play();
                    audio.addEventListener('ended', playValue, false);
                    break;
                case 2: // 优选
                    audio.src = 'sound/car/car.wav'; // 车载
                    audio.play();
                    if (hasA) {
                        audio.addEventListener('ended', playIndex, false); // A
                    } else {
                        audio.addEventListener('ended', playOrientation, false); // 前方
                    }
                    break;
                default:
                    break;
            }
        }
        function playIndex() {
            audio.src = 'sound/car/car_index_' + num + '.wav'; // A
            audio.play();
            if (value == 1) {
                audio.addEventListener('ended', playValue, false);
            } else {
                audio.addEventListener('ended', playOrientation, false);
            }
            audio.removeEventListener('ended', playIndex, false);
        }
        function playOrientation() {
            audio.src = 'sound/car/' + orientation + '.wav'; // 前方
            audio.play();
            audio.removeEventListener('ended', playOrientation, false);
            audio.addEventListener('ended', playValue, false);
        }
        function playValue() {
            audio.src = 'sound/car/' + value + '.wav'; // 182
            audio.play();
            audio.removeEventListener('ended', playValue, false);
            audio.addEventListener('ended', playEnd, false);
        }
        function playEnd() {
            audioPlayerStatus = false;
            audio.removeEventListener('ended', playEnd, false);
        }
    }

    static playSingleAudio(num, value, hasA) {
        let audio = document.getElementById('engAudioPlay');
        switch (engAudioType) {
            case 1: // 单选
                audio.src = 'sound/single/' + value + '.wav'; // 168
                audio.play();
                audio.addEventListener('ended', playEnd, false);
                break;
            case 2: // 优选
                audio.src = 'sound/single/single.wav'; // 单兵
                audio.play();
                if (hasA) {
                    audio.addEventListener('ended', playIndex, false); // A
                } else {
                    audio.addEventListener('ended', playValue, false); // 168
                }
                break;
            default:
                break;
        }
        function playIndex() { // A
            audio.src = 'sound/single/single_index_' + num + '.wav';
            audio.play();
            audio.removeEventListener('ended', playIndex, false);
            audio.addEventListener('ended', playValue, false);
        }
        function playValue() { // 168
            audio.src = 'sound/single/' + value + '.wav';
            audio.play();
            audio.removeEventListener('ended', playValue, false);
            audio.addEventListener('ended', playEnd, false);
        }
        function playEnd() {
            audioPlayerStatus = false;
            audio.removeEventListener('ended', playEnd, false);
        }
    }

    static playPassiveActive(isActive) {
        let value;
        if (isActive) {
            value = 'active_hit';
        } else {
            value = 'active_escape';
        }
        let audio = document.getElementById('passiveAudioPlay');
        audio.src = 'sound/car/' + value + '.wav';
        audio.play();
        /*
        audio.addEventListener('ended', playEnd, false);
        function playEnd() {
            audioPlayerStatus = false;
            audio.removeEventListener('ended', playEnd, false);
        }
        */
    }

}