var container = document.querySelector(".container");
var button = container.querySelector(".active .btn");
var form_register = container.querySelector(".form_register");
var close = form_register.querySelector(".close");
var sign_in = document.querySelector(".sign_in");
var sign_up = document.querySelector(".sign_up");
var button_up = sign_in.querySelector(".action .btn-up");
var button_in = sign_up.querySelector(".action .btn-in");
var submit_button_up = document.querySelector(".form_up .btn_submit");
var submit_button_in = document.querySelector(".form_in .btn_submit");

// var error_sign_in = document.querySelectorAll(".sign_in .error");
// var error_sign_up = document.querySelectorAll(".sign_up .error");
var eye_up = document.querySelector(".sign_up .eye");
var eye_in = document.querySelector(".sign_in .eye");
button.addEventListener("click", function () {
    form_register.style.opacity = 0.6;
    form_register.style.visibility = "visible";
    button.style.display = "none";
    if (
        sign_in.style.visibility === "hidden" &&
        sign_in.style.opacity === "0"
    ) {
        sign_in.style.visibility = "visible";
        sign_in.style.opacity = 1;
    }
    if (sign_up.querySelector(".sign_up_to .password").value !== "") {
        sign_up.querySelector(".sign_up_to .password").value = "";
    }
    if (sign_in.querySelector(".sign_in_to .password").value !== "") {
        sign_in.querySelector(".sign_in_to .password").value = "";
    }
    if (sign_in.querySelector(".sign_in_to .email").value !== "") {
        sign_in.querySelector(".sign_in_to .email").value = "";
    }
    if (sign_up.querySelector(".sign_up_to .email").value !== "") {
        sign_up.querySelector(".sign_up_to .email").value = "";
    }
    if (sign_up.querySelector(".sign_up_to .name").value !== "") {
        sign_up.querySelector(".sign_up_to .name").value = "";
    }
});

close.addEventListener("click", function () {
    form_register.style.opacity = 0;
    form_register.style.visibility = "hidden";
    button.style.display = "block";
    sign_in.style.visibility = "hidden";
    sign_in.style.opacity = 0;
    sign_up.style.visibility = "hidden";
    sign_up.style.opacity = 0;
});
button_up.onclick = function (e) {
    sign_in.style.visibility = "hidden";
    sign_in.style.opacity = 0;
    sign_up.style.visibility = "visible";
    sign_up.style.opacity = 1;
    eye_in.querySelector("#not").style.visibility = "hidden";
    eye_in.querySelector(":not(#not)").style.visibility = "visible";
    sign_in.querySelector(".sign_in_to .password").type = "password";
    if (sign_in.querySelector(".sign_in_to .password").value !== "") {
        sign_in.querySelector(".sign_in_to .password").value = "";
    }
    if (sign_in.querySelector(".sign_in_to .email").value !== "") {
        sign_in.querySelector(".sign_in_to .email").value = "";
    }
    sign_in.querySelectorAll(".error").forEach(function(value) {
        value.innerText = "";
    })
};
button_in.onclick = function (e) {
    sign_up.style.visibility = "hidden";
    sign_up.style.opacity = 0;
    sign_in.style.visibility = "visible";
    sign_in.style.opacity = 1;
    eye_up.querySelector("#not").style.visibility = "hidden";
    eye_up.querySelector(":not(#not)").style.visibility = "visible";
    sign_up.querySelector(".sign_up_to .password").type = "password";
    if (sign_up.querySelector(".sign_up_to .password").value !== "") {
        sign_up.querySelector(".sign_up_to .password").value = "";
    }
    if (sign_up.querySelector(".sign_up_to .email").value !== "") {
        sign_up.querySelector(".sign_up_to .email").value = "";
    }
    if (sign_up.querySelector(".sign_up_to .name").value !== "") {
        sign_up.querySelector(".sign_up_to .name").value = "";
    }
    sign_up.querySelectorAll(".error").forEach(function(value) {
        value.innerText = "";
    })
};

eye_up.addEventListener("click", function () {
    if (eye_up.querySelector("#not").style.visibility === "hidden") {
        eye_up.querySelector("#not").style.visibility = "visible";
        eye_up.querySelector(":not(#not)").style.visibility = "hidden";
        sign_up.querySelector(".sign_up_to .password").type = "text";
    } else {
        eye_up.querySelector("#not").style.visibility = "hidden";
        eye_up.querySelector(":not(#not)").style.visibility = "visible";
        sign_up.querySelector(".sign_up_to .password").type = "password";
    }
});

eye_in.addEventListener("click", function () {
    if (eye_in.querySelector("#not").style.visibility === "hidden") {
        eye_in.querySelector("#not").style.visibility = "visible";
        eye_in.querySelector(":not(#not)").style.visibility = "hidden";
        sign_in.querySelector(".sign_in_to .password").type = "text";
    } else {
        eye_in.querySelector("#not").style.visibility = "hidden";
        eye_in.querySelector(":not(#not)").style.visibility = "visible";
        sign_in.querySelector(".sign_in_to .password").type = "password";
    }
});
// var passw = document.querySelector("form .pass");
// var inputpass = document.querySelector(".email");
// inputpass.onfocus = function () {
//     inputpass.onblur = function () {
//         console.log("afdsa");
//     };
// };
// var mail = document.querySelector("form .mail");

console.log();
var arr_sign_in = [];
var arr_sign_up = [];
sign_in.querySelectorAll(".form_in input").forEach(function (value, index) {
    arr_sign_in[arr_sign_in.length] = value.className;
});
console.log(arr_sign_in);
sign_up.querySelectorAll(".form_up input").forEach(function (value, index) {
    arr_sign_up[arr_sign_up.length] = value.className;
});
console.log(arr_sign_up);
function checkDefinedEmail_in(email) {
    if (!email.value.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        sign_in.querySelector(`.form_in .email + .error`).innerText =
            "Vui lòng nhập đúng định dạng email";
    }
    else {
        sign_in.querySelector(`.form_in .email + .error`).innerText = ""
    }
}
function checkDefinedEmail_up(email) {
    if (!email.value.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        sign_up.querySelector(`.form_up .email + .error`).innerText =
            "Vui lòng nhập đúng định dạng email";
    }
    else {
        sign_up.querySelector(`.form_up .email + .error`).innerText = ""
    }
}
arr_sign_in.forEach(function (value) {
    sign_in
        .querySelector(`.form_in .${value}`)
        .addEventListener("blur", function () {
            arr_sign_in.forEach(function (value1) {
                if (sign_in.querySelector(`.form_in .${value1}`).value === "") {
                    // console.log(value1)
                    sign_in.querySelector(
                        `.form_in .${value1} + .error`
                    ).innerText = "Vui lòng nhập thông tin";
                } else {
                    if (value1 === "email") {
                        checkDefinedEmail_in(
                            sign_in.querySelector(`.form_in .email`)
                        );
                    }
                    else {
                        sign_in.querySelector(
                            `.form_in .${value1} + .error`
                        ).innerText = ""
                    }
                }
            });
        });
});
arr_sign_up.forEach(function (value) {
    sign_up.querySelector(`.form_up .${value}`).onblur = function () {
        console.log(`.form_up .${value}`);
        console.log(sign_up.querySelector(`.form_up .${value}`).value);
        arr_sign_up.forEach(function (value1) {
            // console.log(sign_up.querySelector(`.form_up .${value1}`).value)
            if (sign_up.querySelector(`.form_up .${value1}`).value === "") {
                sign_up.querySelector(
                    `.form_up .${value1} + .error`
                ).innerText = "Vui lòng nhập thông tin";
            } else {
                // console.log(value1)
                if (value1 === "email") {
                    checkDefinedEmail_up(sign_up.querySelector(`.form_up .email`));
                }
                else {
                    sign_up.querySelector(
                        `.form_up .${value1} + .error`
                    ).innerText = "";
                }
            }
        });
    };
});

console.log(arr_sign_up)

submit_button_up.addEventListener("click",function() {
    arr_sign_up.forEach(function(value) {
        if (sign_up.querySelector(`.form_up .${value}`).value === "") {
            sign_up.querySelector(
                `.form_up .${value} + .error`
            ).innerText = "Vui lòng nhập thông tin";
        }
        else {
            // console.log(value1)
            if (value === "email") {
                checkDefinedEmail_up(sign_up.querySelector(`.form_up .email`));
            }
            else {
                sign_up.querySelector(
                    `.form_up .${value} + .error`
                ).innerText = "";
            }
        }
    })
})

submit_button_in.addEventListener("click",function() {
    arr_sign_in.forEach(function(value) {
        if (sign_in.querySelector(`.form_in .${value}`).value === "") {
            sign_in.querySelector(
                `.form_in .${value} + .error`
            ).innerText = "Vui lòng nhập thông tin";
        }
        else {
            // console.log(value1)
            if (value === "email") {
                checkDefinedEmail_in(sign_in.querySelector(`.form_in .email`));
            }
            else {
                sign_in.querySelector(
                    `.form_in .${value} + .error`
                ).innerText = "";
            }
        }
    })
})
