/*$(function() { //wachtfunctie
console.log( "ready!" );

});*/
class FeedbackWidget{
    constructor(elementId) {
       this._elementId = elementId;
     }

     get elementId() { //getter, set keyword voor setter methode
         return this._elementId;
       }

       show(message, type){//message = succes met... //type = success
            let x = $(`#${this.elementId}`);
            x.removeClass("fade-in");
            x.addClass('fade-out');

            setInterval(() => {
                x.css("display",x.css("display") === "none" && "block");
                x.text(message);

           switch (type) {
               case "success":
                   x.removeClass('fade-out');
                   x.addClass("fade-in alert-success")
                   break;
               case "danger":
               default:
                   x.removeClass('fade-out');
                   x.addClass("fade-in alert-danger")
                   break;
           }
            }, 2000);
           this.log({
               message: message,
               type: type
           });
    };

       hide(){
           let div = $(`#${this.elementId}`);
           div.css("display", div.css("display") === "block" && "none");
   };

    log(message){
        if (localStorage.getItem("JanPietKlaas") === null) {

            let item = {
                messages: [message]
            }
            localStorage.setItem('JanPietKlaas', JSON.stringify(item))
        } else {
            let item = JSON.parse(localStorage.getItem('JanPietKlaas'));
            item.messages.unshift(message);

            if(item.messages.length > 10)
                item.messages.pop();
            localStorage.setItem('JanPietKlaas', JSON.stringify(item));
        }
    }
      removeLog(){
          localStorage.clear();
      }

    history(){
        let item = JSON.parse(localStorage.getItem('JanPietKlaas'));
        let string = "";
        item.messages.forEach(element => {
            string = string + element.type +" - " + element.message + " \n "
        });
        console.log(string);
    }
}