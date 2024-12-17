const key = document.getElementById("key");
const data = document.getElementById("data");

key.addEventListener("keypress", function (event) {
    if (key.value.length === 0 && event.key === " ") event.preventDefault();
    if (event.key === " " && key.value.slice(-1) === " ")
        event.preventDefault();
    key.style.borderColor = "#ccc";
});

data.addEventListener("keypress", function (event) {
    if (data.value.length === 0 && event.key === " ") event.preventDefault();
    if (event.key === " " && data.value.slice(-1) === " ")
        event.preventDefault();

    data.style.borderColor = "#ccc";
});

function encryptMessage() {
    if (!key.value.trim() || !data.value.trim()) {
        if (!key.value.trim()) key.style.borderColor = "red";
        if (!data.value.trim()) data.style.borderColor = "red";
        alert("Please enter information first!");
        return;
    }
    const encryptedMessage = CryptoJS.AES.encrypt(
        data.value.trim(),
        key.value.trim()
    ).toString();
    document.getElementById("processedData").value = encryptedMessage;
}

function decryptMessage() {
    if (!key.value.trim() || !data.value.trim()) {
        if (!key.value.trim()) key.style.borderColor = "red";
        if (!data.value.trim()) data.style.borderColor = "red";
        alert("Please enter information first!");
        return;
    }
    const decryptedBytes = CryptoJS.AES.decrypt(
        data.value.trim(),
        key.value.trim()
    );
    const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    document.getElementById("processedData").value = decryptedMessage;
}

function copyToClipboard() {
    const copyBtn = document.getElementById("copy-btn");
    const processedData = document.getElementById("processedData");
    if (processedData.value)
        navigator.clipboard
            .writeText(processedData.value)
            .then(() => {
                copyBtn.innerText = "Copied!";
                setTimeout(() => {
                    copyBtn.innerText = "Copy";
                }, 1500);
            })
            .catch((err) => {
                alert("Failed to copy: " + err);
            });
}
