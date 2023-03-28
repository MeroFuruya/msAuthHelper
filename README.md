# msAuthHelper

Helps with the client-authentication against microsoft

## Setup

Download the source code or clone the repository.

It is recommended to use a virtual environment.
Install the requirements with `pip install -r requirements.txt`.

## Usage

Run the script.

```ps1
python msAuthHelper.py [port]
```

Go to [`http://localhost:port`](_) in your browser.
Default port is `8080`.

Fill out all the fields and click `OK`.
you will be redirected to the microsoft login page.
Do the login and you will be redirected to the `http://localhost:port/redirect` page.

If eveything went well, you will see your `access_token` on this page.
