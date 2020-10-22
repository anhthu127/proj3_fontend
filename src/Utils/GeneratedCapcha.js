
export function GenCapcha() {

    var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";

    var lengthOtp = 6;

    var captcha = [];

    for (var i = 0; i < lengthOtp; i++) {


        var index = Math.floor(Math.random() * charsArray.length + 1);

        if (captcha.indexOf(charsArray[index]) === -1)

            captcha.push(charsArray[index]);

        else i--;

    }
    let temp = captcha.join("")
    console.log(temp);
    return temp
}