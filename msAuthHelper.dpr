program msAuthHelper;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils,
  System.StrUtils,
  System.Classes,
  IdHTTPServer,
  IdContext,
  IdCustomHTTPServer;

type
  TEventClass = class
    procedure onGet(AContext: TIdContext; ARequestInfo: TIdHTTPRequestInfo; AResponseInfo: TIdHTTPResponseInfo);
  end;


{ TEventClass }

procedure TEventClass.onGet(AContext: TIdContext;
  ARequestInfo: TIdHTTPRequestInfo; AResponseInfo: TIdHTTPResponseInfo);
begin
  if ARequestInfo.Document = '/' then
  begin
    AResponseInfo.ContentDisposition := 'text/html';
    AResponseInfo.ServeFile(AContext, './static/index.html');
  end
  else if ARequestInfo.Document = '/js/index.js' then
  begin
    AResponseInfo.ContentDisposition := 'text/html';
    AResponseInfo.ServeFile(AContext, './static/index.js');
  end
  else if ARequestInfo.Document = '/js/login_done.js' then
  begin
    AResponseInfo.ContentDisposition := 'text/html';
    AResponseInfo.ServeFile(AContext, './static/login_done.js');
  end
  else
  begin
    AResponseInfo.ContentDisposition := 'text/html';
    AResponseInfo.ServeFile(AContext, './static/login_done.html');
  end;
end;

var
  server: TIdHTTPServer;
  port: integer;
  events: TEventClass;
begin
  // parse port
  if ParamCount <= 1 then
  begin
    if not TryStrToInt(ParamStr(1), port) then
      port := 8080;
  end
  else
    port := 8080;

  // create events
  events := TEventClass.Create;

  server := TIdHTTPServer.Create(nil);
  server.DefaultPort := port;
  server.OnCommandGet := events.onGet;
  server.Active := True;
  WriteLn('Starting server on port ', port);
  Writeln('Press any key to stop the server.');

  readLn;

  server.Active := false;
end.
