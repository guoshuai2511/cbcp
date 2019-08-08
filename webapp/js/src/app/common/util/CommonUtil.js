export class CommonUtil {

    static getServerDate() {
        return new Date($.ajax({ async: false }).getResponseHeader("Date"));
    }

    // static getServerDate() {
    //     var xhr = null;
    //     if (window.XMLHttpRequest) {
    //         xhr = new window.XMLHttpRequest();
    //     } else { // ie
    //         xhr = new ActiveObject("Microsoft")
    //     }
    //     xhr.open("GET", "/", false)//false不可变
    //     xhr.send(null);
    //     var date = xhr.getResponseHeader("Date");
    //     return new Date(date);
    // }

    // static getServerDate(){
    //     var xhr = null;
    //     if(window.XMLHttpRequest){
    //       xhr = new window.XMLHttpRequest();
    //     }else{ // ie
    //       xhr = new ActiveObject("Microsoft")
    //     }

    //     xhr.open("GET","/",true);
    //     xhr.send(null);
    //     xhr.onreadystatechange=function(){
    //         var time,date;
    //         if(xhr.readyState == 2){
    //             time = xhr.getResponseHeader("Date");
    //             date = new Date(time);
    //             console.log(date);
    //         }
    //     }
    // }

}