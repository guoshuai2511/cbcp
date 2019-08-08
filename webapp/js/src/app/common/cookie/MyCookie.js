export class MyCookie {

    static setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toGMTString();
        document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
    }

    static getCookie(cname) {
        let name = cname + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    static deleteCookie(cname) {
        let d = new Date(0);
        let expires = 'expires=' + d.toGMTString();
        document.cookie = cname + '=; ' + expires + '; path=/';
    }

}