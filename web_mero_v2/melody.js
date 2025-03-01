var hasya_melody = "", tojime = "";

//ファイル読み込み
hasya_melody_file.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", function (e) {//ファイル読み込み後のイベント定義
        filecode = e.currentTarget.result;
        hasya_melody = new Audio(filecode);
        console.log(filecode);

        on.addEventListener("click", () => {
            melody_on();
        });
        off.addEventListener("click", () => {
            melody_off();
        });

        hasya_melody.addEventListener("play", (e) => {
            console.log('開始');
            console.log(e);
            jyoutai.innerHTML = '<span style="color: green;">再生中</span>';
            on.style.boxShadow = "none";
            on.style.transform = "translateY(5px)";
        });

        hasya_melody.addEventListener("pause", (e) => {
            console.log('停止');
            console.log(e);
            jyoutai.innerHTML = '<span style="color: red;">停止中</span>';
        });

    });
    if (hasya_melody_file.files[0] === undefined) {
        hasya_melody = "";
    } else {
        reader.readAsDataURL(hasya_melody_file.files[0]);//ファイルを読み込んでDataURLを生成
    }
});

tojime_file.addEventListener("change", function () {
    const reader2 = new FileReader();
    reader2.addEventListener("load", function (e) {
        filecode2 = e.currentTarget.result;
        tojime = new Audio(filecode2);
        console.log(filecode2);

        tojime.addEventListener("error", (e) => {
            console.log('err');
            console.log(e);
        });
    });

    reader2.addEventListener("error", () => {
        alert('エラーが発生しました');
    });
    console.log(tojime_file.files[0]);
    if (tojime_file.files[0] === undefined) {
        tojime = "";
    } else {
        reader2.readAsDataURL(tojime_file.files[0]);
    }
});

//メロディーの制御
function melody_on() {
    //window.navigator.vibrate([50]);
    if (hasya_melody == "") {
        alert("音声ファイルを選択してください");
    } else {
        hasya_melody.play();
        hasya_melody.loop = true;
    }
}

function melody_off() {
    on.style.boxShadow = "0 5px 0 #111";
    on.style.transform = "none";
    if (Tmode.checked) {
        hasya_melody.loop = false;
        if (tojime != "") {
            tojime.play()
        }
    } else {
        hasya_melody.pause();
        hasya_melody.currentTime = 0;
        if (tojime != "") {
            tojime.play()
        }
    }
    speak();
}

function speak() {
    if (tojispeak.checked) {
        let ssh = window.speechSynthesis;
        ssh.cancel();    
        let ssu = new SpeechSynthesisUtterance(tospnai.value);
        ssh.speak(ssu);
    }    
}

//キーイベント
document.addEventListener("keypress", function (keydata) {
    if (keydata.code == "KeyW") {
        melody_on();
    } else if (keydata.code == "KeyS") {
        melody_off();
    }
});

tojispeak.addEventListener("change", function () {
    if ('speechSynthesis' in window) {
        if (tojispeak.checked) {
            tospnai.removeAttribute("disabled");
        } else {
            tospnai.setAttribute("disabled", true);
        }
    }else{
        alert('このブラウザは音声合成に対応していません');
        tojispeak.setAttribute("disabled", true);
    }
});
