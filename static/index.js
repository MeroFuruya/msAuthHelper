var tenant = document.getElementById("tenant").value;
var clientId = document.getElementById("client_id").value;
var redirectUri = document.getElementById("redirect_uri").value;
var scopes = document.getElementById("scope").value;
var state = document.getElementById("state").value;

function updateValues() {
    tenant = document.getElementById("tenant").value;
    clientId = document.getElementById("client_id").value;
    redirectUri = document.getElementById("redirect_uri").value;
    scopes = document.getElementById("scope").value;
    state = document.getElementById("state").value;
}

function saveFieldsToCookie() {
    updateValues();
    document.cookie = `tenant=${tenant}`;
    document.cookie = `client_id=${clientId}`;
    document.cookie = `redirect_uri=${redirectUri}`;
    document.cookie = `scope=${scopes}`;
}

function loadFieldsFromCookie() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var cookie_name = cookie.split("=")[0];
        var cookie_value = cookie.split("=")[1];
        if (cookie_name == "tenant") {
            document.getElementById("tenant").value = cookie_value;
        } else if (cookie_name == "client_id") {
            document.getElementById("client_id").value = cookie_value;
        } else if (cookie_name == "redirect_uri") {
            document.getElementById("redirect_uri").value = cookie_value;
        } else if (cookie_name == "scope") {
            document.getElementById("scope").value = cookie_value;
        }
    }
    if (document.getElementById("scope").value == ""){
        document.getElementById("scope").value = "openid profile offline_access";
    }
}

function resetFields() {
    document.getElementById("tenant").value = "";
    document.getElementById("client_id").value = "";
    document.getElementById("redirect_uri").value = "";
    document.getElementById("scope").value = "openid profile offline_access";
}

function getLoginUrl() {
    updateValues();
    return `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?
        client_id=${encodeURIComponent(clientId)}&
        response_type=code&
        redirect_uri=${encodeURIComponent(redirectUri)}&
        response_mode=query&
        scope=${encodeURIComponent(scopes)}&
        state=${encodeURIComponent(state)}`;
}

function goToLogin() {
    updateValues();
    if (tenant == "" || clientId == "" || redirectUri == "" || scopes == "" || state == "") {
        alert("Please fill in all the fields");
        return;
    } else {
        saveFieldsToCookie();
        window.location.href = getLoginUrl();
    }
}

// set random state value
var state_value = "";
for (var i = 0; i < 20; i++) {
    state_value += Math.random().toString(36).substring(2, 15);
}
document.getElementById("state").value = state_value;

if (document.cookie == "") {
    resetFields();
} else {
    loadFieldsFromCookie();
}
