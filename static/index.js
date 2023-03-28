var tenant = encodeURIComponent(document.getElementById("tenant").value);
var clientId = encodeURIComponent(document.getElementById("client_id").value);
var redirectUri = encodeURIComponent(document.getElementById("redirect_uri").value);
var scopes = encodeURIComponent(document.getElementById("scope").value);
var state = encodeURIComponent(document.getElementById("state").value);

function updateValues() {
    tenant = encodeURIComponent(document.getElementById("tenant").value);
    clientId = encodeURIComponent(document.getElementById("client_id").value);
    redirectUri = encodeURIComponent(document.getElementById("redirect_uri").value);
    scopes = encodeURIComponent(document.getElementById("scope").value);
    state = encodeURIComponent(document.getElementById("state").value);
}

function getLoginUrl() {
    updateValues();
    return `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?
        client_id=${clientId}&
        response_type=code&
        redirect_uri=${redirectUri}&
        response_mode=query&
        scope=${scopes}&
        state=${state}`;
}

function goToLogin() {
    updateValues();
    if (tenant == "" || clientId == "" || redirectUri == "" || scopes == "" || state == "") {
        alert("Please fill in all the fields");
        return;
    } else {
        window.location.href = getLoginUrl();
    }
}

// set random state value
var state_value = "";
for (var i = 0; i < 20; i++) {
    state_value += Math.random().toString(36).substring(2, 15);
}
document.getElementById("state").value = state_value;

// set scope value
document.getElementById("scope").value = "openid profile offline_access";
