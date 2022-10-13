function login() {
    const form = document.login_form;
    const chkUsername = checkValidUsername(form);
    const chkid = checkValidID(form);
    const chkPw = checkValidPassword(form);
    const chkPw2 = checkValidPassword2(form);

    if (chkUsername) {
        document.getElementById('alert_username').innerText = "";
        form.username.style.border = '2px solid';
        form.username.style.borderColor = '#00D000';
    } else {
        form.username.style.border = '2px solid';
        form.username.style.borderColor = '#FF0000';
        document.getElementById('alert_username').style.color = '#FF0000';
    }

    if (chkid) {
        document.getElementById('alert_id').innerText = "";
        form.id.style.border = '2px solid';
        form.id.style.borderColor = '#00D000';
    } else {
        form.id.style.border = '2px solid';
        form.id.style.borderColor = '#FF0000';
        document.getElementById('alert_id').style.color = '#FF0000';
    }

    if (chkPw) {
        document.getElementById('alert_password').innerText = "";
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#00D000';
    } else {
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#FF0000';
        document.getElementById('alert_password').style.color = '#FF0000';
    }
    if (chkPw2) {
        document.getElementById('alert_password2').innerText = "";
        form.password2.style.border = '2px solid';
        form.password2.style.borderColor = '#00D000';
    } else {
        form.password2.style.border = '2px solid';
        form.password2.style.borderColor = '#FF0000';
        document.getElementById('alert_password2').style.color = '#FF0000';
    }

    if (chkUsername && chkid && chkPw && chkPw2) {
        console.log('complete. form.submit();');
        //form.submit();
    }
}

function checkValidUsername(form) {
    if (form.username.value == "") {
        document.getElementById('alert_username').innerText = "닉네임을 입력해 주세요";
        //form.username.focus();
        return false;
    }

    return true;
}

function checkValidID(form) {
    if (form.id.value == "") {
        document.getElementById('alert_id').innerText = "아이디를 입력해주세요";
        //form.id.focus();
        return false;
    }

    return true;
}

function checkValidPassword(form) {
    if (form.password.value == "") {
        document.getElementById('alert_password').innerText = "비밀번호를 입력해 주세요";
        //form.password.focus();
        return false;
    }

    const pw = form.password.value;
    // String.prototype.search() :: 검색된 문자열 중에 첫 번째로 매치되는 것의 인덱스를 반환한다. 찾지 못하면 -1 을 반환한다.
    // number
    const num = pw.search(/[0-9]/g);
    // alphabet
    const eng = pw.search(/[a-z]/ig);
    // special characters
    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 10) {
        // 최소 10문자
        document.getElementById('alert_password').innerText = "10자 이상 입력해 주세요.";
        return false;
    } else if (pw.search(/\s/) != -1) {
        // 공백 제거
        document.getElementById('alert_password').innerText = "공백은 사용 불가능합니다.";
        return false;
    } else if (num < 0 && eng < 0 && spe < 0) {
        // 한글 입력 방지
        document.getElementById('alert_password').innerText = "사용 불가능한 문자입니다.";
        return false;
    }

    return true;
}

function checkValidPassword2(form) {
    if (form.password2.value == "") {
        document.getElementById('alert_password2').innerText = "비밀번호 확인이 필요합니다.";
        //form.password.focus();
        return false;
    }

    if (form.password.value !== form.password2.value) {
        document.getElementById('alert_password2').innerText = "비밀번호가 동일하지 않습니다.";
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#FF0000';
        document.getElementById('alert_password').style.color = '#FF0000';
        return false;
    }

    return true;
}