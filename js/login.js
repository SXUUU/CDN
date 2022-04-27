function Press() {
    console.log(window.event);
    var keycode = window.event.keyCode;
    if (keycode == 13) {
        $(".btn").click();
    }
}

$(function () {
    var eye = document.querySelector(".eye");
    var pwd = document.querySelector("#pwd");
    var flag = true;
    eye.addEventListener("click", () => {
        if (flag) {
            eye.innerHTML = "&#xe61c;";
            pwd.attributes[0].value = "text";
            flag = false;
        } else {
            eye.innerHTML = "&#xe61b;";
            pwd.attributes[0].value = "password";
            flag = true;
        }
    })

    $(".popup_btn").on("click", close);
    function close() {
        $('.popup_back,.popup_window_first').hide();
    }
    $(".btn").on("click", () => {
        var username = $(".username input").val().trim();
        var psw = $(".pwd input").val().trim();
        $.ajax({
            type: "post",
            url: "http://dorm.zryyyy.xyz:1016/api/load",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "account": "" + username + "",
                "password": "" + psw + ""
            }),
            success: () => {
                if ($(".remember").is(":checked")) {
                    localStorage.setItem("data", JSON.stringify({
                        "account": "" + username + "",
                        "password": "" + psw + ""
                    }))
                }
                sessionStorage.setItem("account", username);
                $(".btn").attr("onclick", "window.location.href='form.html'").click();
            },
            error: (res) => {
                if (res.responseJSON) {
                    if (res.responseJSON.code === 400) {
                        // alert("Password Error")
                        $(".popup_cont").text("Password Error");
                        $('.popup_window_first,.popup_back').show();
                        $(".pwd input").val("");
                    } else if (res.responseJSON.code === 422) {
                        // alert("Student ID Error");
                        $(".popup_cont").text("Student ID Error");
                        $('.popup_window_first,.popup_back').show();
                        $(".username input").val("");
                        $(".pwd input").val("");
                    } else {
                        // alert("System Exception");
                        $(".popup_cont").text("System Exception");
                        $('.popup_window_first,.popup_back').show();
                        $(".username input").val("");
                        $(".pwd input").val("");
                    }
                }
                else {
                    $(".popup_cont").text("Server Exception");
                    $('.popup_window_first,.popup_back').show();
                    $(".username input").val("");
                    $(".pwd input").val("");
                }
            }
        })
    })


})