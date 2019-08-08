export class CenterMoveValue {

    static getCenterMoveValue(mapZoom) {
        let value;
        let windowHeight = $(window).height() / 2;
        switch (mapZoom) {
            case 19:
                value = 20 * (59 / 47) * (windowHeight / 47 - 3);
                break;
            case 18:
                value = 50 * (windowHeight / 59 - 3);
                break;
            case 17:
                value = 100 * (windowHeight / 59 - 3);
                break;
            case 16:
                value = 200 * (windowHeight / 59 - 3);
                break;
            case 15:
                value = 500 * (59 / 75) * (windowHeight / 75 - 2);
                break;
            case 14:
                value = 1000 * (59 / 75) * (windowHeight / 75 - 2);
                break;
            case 13:
                value = 2000 * (59 / 75) * (windowHeight / 75 - 2);
                break;
            case 12:
                value = 5000 * (59 / 94) * (windowHeight / 94 - 2);
                break;
            default:
                value = 5000 * (59 / 94) * (windowHeight / 94 - 2);
                break;
        }
        return value;
    }

}