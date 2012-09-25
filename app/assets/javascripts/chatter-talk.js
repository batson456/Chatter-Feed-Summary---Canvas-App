var chatterTalk;
if (!chatterTalk) {
    chatterTalk = {};
}

(function ($$) {

    "use strict";

    function onClickHandler() {
    }

    chatterTalk.init =  function(sr, button, input, userIdField, callback) {
        $$.byId(button).onclick=function() {
            var value = $$.byId(input).value;
            var userId = $$.byId(userIdField).value;
            chatterTalk.post(sr, value, userId, callback);
        };
    };


    chatterTalk.post =  function(sr, message, userId, callback) {
        var url = sr.context.links.chatterFeedsUrl+"/news/"+userId+"/feed-items";
        var body = {body : {messageSegments : [{type: "Text", text: message}]}};

        $$.client.ajax(url,
            {token : sr.oauthToken,
                method: 'POST',
                async: true,
                contentType: "application/json",
                data: JSON.stringify(body),
                success : function(data) {
                    if ($$.isFunction(callback)) {
                        callback(data);
                    }
                }
            });
    };

}(Sfdc.canvas));