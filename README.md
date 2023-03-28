# msAuthHelper

Helps with the client-authentication against microsoft

## downlaod

Download the zip file from the [release page](https://github.com/MeroFuruya/msAuthHelper/releases/latest) and extract it.

in there is the executable `msAuthHelper.exe`.

## usage

```ps1
.\msAuthHelper.exe [port]
```

Go to [`http://localhost:port`](_) in your browser.

Fill out all the fields and click `OK`.
you will be redirected to the microsoft login page.
Do the login and you will be redirected to the `http://localhost:port/redirect` page.

If eveything went well, you will see your `access_token` on this page.
