url_params = new URLSearchParams(window.location.search);

var message_element = document.getElementById("message");
var value_table = document.getElementById("value_table");

if (url_params.has("error")) {
    message_element.innerText = "Auth was not successful."
    new_row = value_table.insertRow(-1);
    new_row.insertCell(0).innerText = "Error";
    new_row.insertCell(1).innerText = url_params.get("error");
    new_row = value_table.insertRow(-1);
    new_row.insertCell(0).innerText = "Error Description";
    new_row.insertCell(1).innerText = url_params.get("error_description");
    new_row = value_table.insertRow(-1);
    new_row.insertCell(0).innerText = "error_subcode";
    new_row.insertCell(1).innerText = url_params.get("error_subcode");
    new_row = value_table.insertRow(-1);
    new_row.insertCell(0).innerText = "State";
    new_row.insertCell(1).innerText = url_params.get("state");
} else if (url_params.has("code")) {
    message_element.innerText = "Auth was successful."
    new_row = value_table.insertRow(-1);
    new_row.insertCell(0).innerText = "Code";
    new_row.insertCell(1).innerText = url_params.get("code");
    new_row = value_table.insertRow(-1);
    new_row.insertCell(0).innerText = "State";
    new_row.insertCell(1).innerText = url_params.get("state");

} else {
    message_element.innerText = "No auth code or error was returned."
}

